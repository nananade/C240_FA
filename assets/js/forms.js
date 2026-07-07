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
  }
});

function getFieldValue(form, name) {
  const field = form.querySelector(`[name="${name}"]`);
  return field ? field.value.trim() : '';
}

function getCheckboxValues(form, name) {
  return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
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

