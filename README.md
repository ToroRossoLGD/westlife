# West Life

Prezentacioni sajt brokerske firme sa pristupom Generali sistemu sa početne stranice.

## Pokretanje

Potreban je Node.js 18 ili noviji. Pokrenite `npm start` i otvorite http://localhost:3000.
Provera JavaScript sintakse: `npm run check`.

## Aktiviranje Generali pristupa

U `partner-config.js` upišite odobrenu HTTPS adresu u `generali.url`.
Prazna ili neispravna adresa ostavlja karticu bez linka, uz poruku da pristup stiže uskoro.
Ispravna adresa aktivira celu karticu i otvara portal u novoj kartici.
Konfiguracija je javna; ne unositi lozinke, tokene ili druge tajne.
Trenutno se koristi tekstualna oznaka GENERALI, predviđena za zamenu zvaničnim logotipom kada bude dostavljen.

## Opseg

- Pristup za saradnike je sekcija `/#saradnici`. Stara putanja `/saradnici.html` preusmerava na nju.
- Poseban lokalni portal za klijente je uklonjen. Ranije sačuvani podaci u browseru se ne čitaju niti brišu.
- Link ne prenosi klijente, ne prijavljuje saradnike i ne izdaje polise. Dublja integracija zavisi od dokumentacije i pristupa koje obezbedi Generali.
- Javni kontakt obrazac priprema tekstualni upit za preuzimanje; nema slanja.
- `/presentation.html` je dodatna prezentaciona stranica sa istom konfiguracijom partnera.
