document.addEventListener('DOMContentLoaded', () => {
  const yearElements = document.querySelectorAll('#year');
  const currentYear = new Date().getFullYear();

  yearElements.forEach((el) => {
    el.textContent = currentYear;
  });
});
