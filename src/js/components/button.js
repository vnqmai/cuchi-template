// src/js/components/button.js

export function initScrollToTop() {
  const button = document.querySelector('.scroll-to-top');
  if (button) {
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
