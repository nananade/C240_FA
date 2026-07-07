document.addEventListener('DOMContentLoaded', () => {
  const fullPageInput = document.getElementById('assistantInput');
  const fullPageSend = document.getElementById('assistantSend');
  const fullPageMessages = document.getElementById('assistantMessages');
  const promptButtons = document.querySelectorAll('.prompt-btn');

  const initializeFullPageAssistant = () => {
    if (!fullPageInput || !fullPageSend || !fullPageMessages) {
      return;
    }

    const addMessage = (text, sender) => {
      const message = document.createElement('div');
      message.className = `message ${sender}`;
      message.innerHTML = `<strong>${sender === 'user' ? 'You' : 'FoodLink AI'}:</strong> ${text}`;
      fullPageMessages.appendChild(message);
      fullPageMessages.scrollTop = fullPageMessages.scrollHeight;
    };

    const respond = (text) => {
      const lower = text.toLowerCase();
      if (lower.includes('donat')) {
        addMessage('Great choice. Please share the food type, quantity, pickup window, and storage details through our donation form.', 'assistant');
      } else if (lower.includes('request')) {
        addMessage('We can help. Please tell us your organisation name, urgency, and the type of food or support you need.', 'assistant');
      } else if (lower.includes('prepare') || lower.includes('storage') || lower.includes('safe')) {
        addMessage('Please ensure items are sealed, labelled, and stored safely. We can also help you prepare a donation checklist.', 'assistant');
      } else {
        addMessage('Thanks for reaching out. We can help you donate food, request support, or learn more about the platform.', 'assistant');
      }
    };

    const handleSend = () => {
      const text = fullPageInput.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      fullPageInput.value = '';
      setTimeout(() => respond(text), 350);
    };

    fullPageSend.addEventListener('click', handleSend);
    fullPageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSend();
      }
    });

    promptButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const text = button.getAttribute('data-text');
        if (fullPageInput) {
          fullPageInput.value = text;
        }
      });
    });
  };

  initializeFullPageAssistant();

  const floatingAssistant = document.createElement('div');
  floatingAssistant.className = 'floating-assistant';
  floatingAssistant.innerHTML = `
    <div class="floating-assistant__panel" role="dialog" aria-label="FoodLink AI assistant">
      <div class="floating-assistant__header">
        <div class="fw-semibold text-success">FoodLink AI</div>
        <div class="small text-muted">Ask for help with donations or requests</div>
      </div>
      <div class="floating-assistant__messages"></div>
      <div class="floating-assistant__input-row">
        <input class="floating-assistant__input" type="text" placeholder="Ask the assistant..." />
        <button class="floating-assistant__send" type="button" aria-label="Send message">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
    <button class="floating-assistant__toggle" type="button" aria-label="Open AI assistant">
      <i class="fa-solid fa-robot"></i>
    </button>
  `;

  document.body.appendChild(floatingAssistant);

  const toggleButton = floatingAssistant.querySelector('.floating-assistant__toggle');
  const panel = floatingAssistant.querySelector('.floating-assistant__panel');
  const messages = floatingAssistant.querySelector('.floating-assistant__messages');
  const input = floatingAssistant.querySelector('.floating-assistant__input');
  const sendButton = floatingAssistant.querySelector('.floating-assistant__send');

  const addFloatingMessage = (text, sender) => {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.innerHTML = `<strong>${sender === 'user' ? 'You' : 'FoodLink AI'}:</strong> ${text}`;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const respondToFloatingInput = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('donat')) {
      addFloatingMessage('Great choice. Please share the food type, quantity, pickup window, and storage details through our donation form.', 'assistant');
    } else if (lower.includes('request')) {
      addFloatingMessage('We can help. Please tell us your organisation name, urgency, and the type of food or support you need.', 'assistant');
    } else if (lower.includes('prepare') || lower.includes('storage') || lower.includes('safe')) {
      addFloatingMessage('Please ensure items are sealed, labelled, and stored safely. We can also help you prepare a donation checklist.', 'assistant');
    } else {
      addFloatingMessage('Thanks for reaching out. We can help you donate food, request support, or learn more about the platform.', 'assistant');
    }
  };

  const handleFloatingSend = () => {
    const text = input.value.trim();
    if (!text) return;
    addFloatingMessage(text, 'user');
    input.value = '';
    setTimeout(() => respondToFloatingInput(text), 350);
  };

  toggleButton.addEventListener('click', () => {
    const isOpen = floatingAssistant.classList.contains('is-open');
    floatingAssistant.classList.toggle('is-open', !isOpen);
    if (!isOpen) {
      input.focus();
    }
  });

  sendButton.addEventListener('click', handleFloatingSend);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFloatingSend();
    }
  });

  document.addEventListener('click', (event) => {
    if (!floatingAssistant.contains(event.target) && floatingAssistant.classList.contains('is-open')) {
      floatingAssistant.classList.remove('is-open');
    }
  });

  addFloatingMessage('Hi! I can help you donate food, request support, or learn more about the platform.', 'assistant');
});
