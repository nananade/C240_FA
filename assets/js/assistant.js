document.addEventListener('DOMContentLoaded', () => {
  const assistantInput = document.getElementById('assistantInput');
  const assistantSend = document.getElementById('assistantSend');
  const assistantMessages = document.getElementById('assistantMessages');
  const promptButtons = document.querySelectorAll('.prompt-btn');

  const addMessage = (text, sender) => {
    const message = document.createElement('div');
    message.className = `message ${sender}`;
    message.innerHTML = `<strong>${sender === 'user' ? 'You' : 'FoodLink AI'}:</strong> ${text}`;
    assistantMessages.appendChild(message);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  };

  const respond = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('donat')) {
      addMessage('Great choice. Please share the food type, quantity, pickup window, and storage details through our donation form.', 'assistant');
    } else if (lower.includes('request')) {
      addMessage('We can help. Please tell us your organisation name, urgency, and the type of food or support you need.', 'assistant');
    } else {
      addMessage('Thanks for reaching out. We can help you donate food, request support, or learn more about the platform.', 'assistant');
    }
  };

  const handleSend = () => {
    const text = assistantInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    assistantInput.value = '';
    setTimeout(() => respond(text), 400);
  };

  assistantSend?.addEventListener('click', handleSend);
  assistantInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  });

  promptButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const text = button.getAttribute('data-text');
      if (assistantInput) {
        assistantInput.value = text;
      }
    });
  });
});
