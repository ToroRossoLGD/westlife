const key = 'westlife.clients.v1';
const statuses = ['Novi upit', 'Ponuda u pripremi', 'Spremno za Generali'];
const fields = ['id', 'name', 'phone', 'email', 'insurance', 'status', 'followUp', 'associate', 'note'];
const form = document.querySelector('#form');
const dialog = document.querySelector('#dialog');
const message = document.querySelector('#message');
let clients = [], readable = true, downloadUrl;
try {
  const stored = JSON.parse(localStorage.getItem(key) || '[]');
  if (!Array.isArray(stored) || stored.some(c => !c || fields.some(f => typeof c[f] !== 'string') || !statuses.includes(c.status))) throw new Error('Invalid data');
  clients = stored;
} catch { readable = false; message.textContent = 'Lokalna evidencija nije dostupna. Čuvanje je zaustavljeno da postojeći podaci ne bi bili prepisani.'; }
function openClient(client) {
  form.reset(); form.elements.id.value = '';
  document.querySelector('#error').hidden = true;
  document.querySelector('#title').textContent = client ? 'Podaci o klijentu' : 'Novi klijent';
  if (client) fields.forEach(f => { form.elements[f].value = client[f]; });
  dialog.showModal(); form.elements.name.focus();
}
function render() {
  document.querySelector('#total').textContent = clients.length;
  ['new', 'offer', 'ready'].forEach((id, i) => { document.getElementById(id).textContent = clients.filter(c => c.status === statuses[i]).length; });
  const query = document.querySelector('#search').value.trim().toLowerCase();
  const filter = document.querySelector('#filter').value;
  const visible = clients.filter(c => (!filter || c.status === filter) && `${c.name} ${c.phone} ${c.email}`.toLowerCase().includes(query));
  document.querySelector('#count').textContent = `Prikazano: ${visible.length}`;
  const rows = document.querySelector('#rows'); rows.replaceChildren();
  visible.forEach(client => {
    const row = document.createElement('tr');
    [client.name, [client.phone, client.email].filter(Boolean).join(' · '), client.insurance, client.status, client.followUp || 'Nije zakazan'].forEach((value, i) => {
      const td = document.createElement('td');
      if (i === 3) { const badge = document.createElement('span'); badge.className = `badge state-${statuses.indexOf(client.status)}`; badge.textContent = value; td.append(badge); }
      else td.textContent = value;
      row.append(td);
    });
    const td = document.createElement('td'), button = document.createElement('button');
    button.textContent = 'Otvori'; button.setAttribute('aria-label', `Otvori klijenta ${client.name}`); button.addEventListener('click', () => openClient(client)); td.append(button); row.append(td); rows.append(row);
  });
  const empty = document.querySelector('#empty'); empty.hidden = visible.length > 0;
  empty.querySelector('h3').textContent = clients.length ? 'Nema rezultata.' : 'Prvi klijent. Prvi korak.';
  empty.querySelector('p').textContent = clients.length ? 'Promenite pretragu ili status da pronađete klijenta.' : 'Unesite osnovne podatke i izaberite osiguranje. Sve ostalo možete dopuniti kasnije.';
  empty.querySelector('button').hidden = clients.length > 0;
}
function data() { return Object.fromEntries(fields.map(f => [f, form.elements[f].value.trim()])); }
function valid() {
  const error = document.querySelector('#error'); error.hidden = true;
  if (!form.reportValidity()) return false;
  if (!form.elements.name.value.trim()) { error.textContent = 'Unesite ime klijenta.'; error.hidden = false; return false; }
  return true;
}
document.querySelectorAll('[data-new]').forEach(button => button.addEventListener('click', () => openClient()));
document.querySelector('#close').addEventListener('click', () => dialog.close());
document.querySelector('#search').addEventListener('input', render);
document.querySelector('#filter').addEventListener('change', render);
form.addEventListener('submit', event => {
  event.preventDefault(); if (!valid()) return;
  const client = data(), editing = Boolean(client.id);
  if (!editing) client.id = crypto.randomUUID();
  const next = editing ? clients.map(c => c.id === client.id ? client : c) : [client, ...clients];
  try { if (!readable) throw new Error('Storage unavailable'); localStorage.setItem(key, JSON.stringify(next)); }
  catch { const error = document.querySelector('#error'); error.textContent = 'Čuvanje nije uspelo. Proverite dozvole i prostor za čuvanje u browseru. Možete preuzeti zapis iz obrasca.'; error.hidden = false; return; }
  clients = next; document.querySelector('#search').value = ''; document.querySelector('#filter').value = ''; render(); dialog.close();
  message.textContent = `${client.name}: podaci su sačuvani u ovom browseru.`;
});
document.querySelector('#download').addEventListener('click', () => {
  if (!valid()) return;
  const c = data();
  const text = `WestLife — priprema podataka\n\nKlijent: ${c.name}\nTelefon: ${c.phone}\nEmail: ${c.email}\nOsiguranje: ${c.insurance}\nStatus: ${c.status}\nSledeći kontakt: ${c.followUp}\nSaradnik: ${c.associate}\nNapomena: ${c.note}\n\nPodaci nisu poslati u Generali. Ovaj zapis ne potvrđuje izdavanje polise.`;
  if (downloadUrl) URL.revokeObjectURL(downloadUrl);
  downloadUrl = URL.createObjectURL(new Blob(['\uFEFF', text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = downloadUrl; link.download = 'westlife-klijent.txt'; link.click();
});
render();
