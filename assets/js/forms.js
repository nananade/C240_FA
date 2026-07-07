const N8N_BASE_URL = 'https://n8ngc.codeblazar.org';

const WEBHOOK_PATHS = {
  request: '/webhook-test/food-request',
  donation: '/webhook-test/food-donation',
};

document.addEventListener('DOMContentLoaded', () => {
  const donationForm = document.getElementById('donationForm');
  const requestForm = document.getElementById('requestForm');

  if (donationForm) {
    handleFormSubmit(donationForm, 'donation', 'donationMessage');
  }

  if (requestForm) {
    handleFormSubmit(requestForm, 'request', 'requestMessage');
    setupRequestCoverageCheck(requestForm);
  }
});

function getFieldValue(form, name) {
  const field = form.querySelector(`[name="${name}"]`);
  return field ? field.value.trim() : '';
}

function getCheckboxValues(form, name) {
  return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function parseQuantityValue(value) {
  if (!value) return null;
  const match = value.match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function getStoredDonationAvailability() {
  try {
    const stored = localStorage.getItem('foodlinkDonationAvailability');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Unable to read donation availability:', error);
    return null;
  }
}

function saveDonationAvailability(quantityValue) {
  const quantity = parseQuantityValue(quantityValue);
  if (quantity === null) return;

  const summary = {
    quantity,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem('foodlinkDonationAvailability', JSON.stringify(summary));
}

function setupRequestCoverageCheck(form) {
  const quantityField = form.querySelector('[name="quantity"]');
  const coverageMessage = document.getElementById('requestCoverageMessage');

  if (!quantityField || !coverageMessage) return;

  const updateCoverage = () => {
    const requestedQuantity = parseQuantityValue(quantityField.value);
    const donationAvailability = getStoredDonationAvailability();

    if (!requestedQuantity) {
      coverageMessage.className = 'form-text mt-2';
      coverageMessage.textContent = 'Enter the amount you need and we will compare it with current donation listings.';
      return;
    }

    if (!donationAvailability || donationAvailability.quantity === undefined) {
      coverageMessage.className = 'form-text mt-2 text-muted';
      coverageMessage.textContent = 'We will compare your request with available donations once a donation is submitted.';
      return;
    }

    const availableQuantity = donationAvailability.quantity;
    if (availableQuantity >= requestedQuantity) {
      coverageMessage.className = 'alert alert-success py-2 mt-2 mb-0';
      coverageMessage.textContent = `This request looks covered by current donations. Available quantity: ${availableQuantity}.`;
    } else {
      coverageMessage.className = 'alert alert-warning py-2 mt-2 mb-0';
      coverageMessage.textContent = `This request is larger than the current donation quantity. Additional support may be needed.`;
    }
  };

  quantityField.addEventListener('input', updateCoverage);
  updateCoverage();
}

async function handleFormSubmit(form, type, messageId) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const messageBox = document.getElementById(messageId);
    const webhookUrl = buildWebhookUrl(type);
    const payload = buildPayload(form, type);

    if (!webhookUrl) {
      showMessage(messageBox, 'Please configure your n8n webhook URL in assets/js/forms.js.', false);
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }

      const responseBody = await response.json();
      if (type === 'donation') {
        saveDonationAvailability(payload.quantity);
      }
      if (type === 'request') {
        setupRequestCoverageCheck(form);
      }
      showMessage(messageBox, responseBody.message || 'Submission received successfully.', true);
      form.reset();
    } catch (error) {
      console.error('Form submit error:', error);
      showMessage(messageBox, 'We could not send your submission. Please try again later.', false);
    }
  });
}

function buildWebhookUrl(type) {
  if (N8N_BASE_URL.includes('YOUR_N8N_HOST')) {
    return '';
  }

  return `${N8N_BASE_URL}${WEBHOOK_PATHS[type]}`;
}

function buildPayload(form, type) {
  if (type === 'request') {
    return {
      formType: getFieldValue(form, 'formType'),
      name: getFieldValue(form, 'name'),
      contact: getFieldValue(form, 'contact'),
      urgency: getFieldValue(form, 'urgency'),
      categories: getCheckboxValues(form, 'categories'),
      dietaryNotes: getFieldValue(form, 'dietaryNotes'),
      quantity: getFieldValue(form, 'quantity'),
    };
  }

  return {
    formType: getFieldValue(form, 'formType'),
    providerName: getFieldValue(form, 'providerName'),
    foodType: getFieldValue(form, 'foodType'),
    quantity: getFieldValue(form, 'quantity'),
    region: getFieldValue(form, 'region'),
    email: getFieldValue(form, 'email'),
    collectionDate: getFieldValue(form, 'collectionDate'),
    collectionTime: getFieldValue(form, 'collectionTime'),
    notes: getFieldValue(form, 'notes'),
  };
}

function showMessage(box, message, success) {
  box.classList.remove('d-none', 'alert-success', 'alert-danger');
  box.classList.add(success ? 'alert-success' : 'alert-danger');
  box.textContent = message;
}

