document.addEventListener('DOMContentLoaded', () => {
  const donationForm = document.getElementById('donationForm');
  const requestForm = document.getElementById('requestForm');

  if (donationForm) {
    donationForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const messageBox = document.getElementById('donationMessage');
      messageBox.classList.remove('d-none');
      messageBox.textContent = 'Thank you! Your donation request has been received and our team will follow up shortly.';
      donationForm.reset();
    });
  }

  if (requestForm) {
    requestForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const messageBox = document.getElementById('requestMessage');
      messageBox.classList.remove('d-none');
      messageBox.textContent = 'Thanks! Your request has been submitted and we will help coordinate the next steps.';
      requestForm.reset();
    });
  }
});
