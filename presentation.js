const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const aboutToggle = document.querySelector('.about-toggle');
const aboutLinks = document.querySelector('#about-links');
function closeAbout() {
  aboutToggle.setAttribute('aria-expanded', 'false');
  aboutLinks.hidden = true;
}
aboutToggle.addEventListener('click', () => {
  const open = aboutToggle.getAttribute('aria-expanded') !== 'true';
  aboutToggle.setAttribute('aria-expanded', String(open));
  aboutLinks.hidden = !open;
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown')) closeAbout();
});
document.addEventListener('focusin', (event) => {
  if (!event.target.closest('.nav-dropdown')) closeAbout();
});
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Zatvori meni' : 'Otvori meni');
  navigation.classList.toggle('open', open);
  if (!open) closeAbout();
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    closeAbout();
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Otvori meni');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !aboutLinks.hidden) {
    closeAbout();
    aboutToggle.focus();
    return;
  }
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    menuButton.click();
    menuButton.focus();
  }
});
document.querySelectorAll('[data-insurance]').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelector('#footer-kontakt').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
});document.querySelector('#year').textContent = new Date().getFullYear();

// Partner access is independent of the public contact form.
const generaliAccess = document.querySelector('#generali-access');
const generaliUrl = window.WEST_LIFE_PARTNERS?.generali?.url;
if (generaliAccess && generaliUrl) {
  try {
    const destination = new URL(generaliUrl);
    if (destination.protocol !== 'https:' || destination.username || destination.password) {
      throw new Error('An HTTPS portal URL without credentials is required.');
    }
    generaliAccess.href = destination.href;
    generaliAccess.target = '_blank';
    generaliAccess.rel = 'noopener noreferrer';
    generaliAccess.removeAttribute('aria-disabled');
    document.querySelector('#generali-status').textContent = 'Otvara Generali sistem u novoj kartici.';
  } catch {
    // Invalid configuration keeps the link unavailable.
  }
}
