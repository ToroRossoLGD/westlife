const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Zatvori meni' : 'Otvori meni');
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Otvori meni');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    menuButton.click();
    menuButton.focus();
  }
});
document.querySelectorAll('[data-insurance]').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelector('#insurance-select').value = card.dataset.insurance;
    document.querySelector('#kontakt').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    document.querySelector('[name="name"]').focus({ preventScroll: true });
  });
});
let downloadUrl;
document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const content = `West Life — upit za osiguranje\n\nIme: ${data.get('name')}\nEmail: ${data.get('email')}\nOsiguranje: ${data.get('insurance') || 'Savet pri izboru'}\n\n${data.get('message') || ''}\n\nDemo upit — nije poslat West Life timu.`;
  if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  downloadUrl = URL.createObjectURL(new Blob(['\uFEFF', content], { type: 'text/plain;charset=utf-8' }));
  const status = document.querySelector('#form-status');
  status.replaceChildren(document.createTextNode('Vaš upit je pripremljen, ali nije poslat. '));
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'West Life-upit.txt';
  link.textContent = 'Preuzmite upit';
  status.append(link);
  status.hidden = false;
});
document.querySelector('#year').textContent = new Date().getFullYear();
