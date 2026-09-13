# WestLife

Prezentacioni sajt brokerske firme WestLife sa zasebnim portalom za saradnike.

## Pokretanje

Potreban je Node.js 18 ili noviji. Nema dodatnih zavisnosti.

```sh
npm start
```

Otvorite http://localhost:3000.

## Provera

```sh
npm run check
```

## Trenutno stanje

- Početna stranica `/` predstavlja brokersku firmu i ponudu osiguranja. Na kraju stranice i u footeru nalazi se link „Za saradnike“.
- Portal `/saradnici.html` sadrži evidenciju klijenata sa pretragom, filterom statusa i brojačima, uz povratak na glavni sajt.
- Unos i izmena kontakta, vrste osiguranja, saradnika, sledećeg kontakta i napomene.
- Podaci se čuvaju u localStorage ovog browsera; ovo je lokalni prototip za izmišljene podatke, bez autentifikacije i zajedničke baze. Brisanje podataka browsera briše evidenciju.
- Zapis se može preuzeti kao tekst za ručni rad. Nema integracije sa Generalijem; status „Spremno za Generali“ ne znači da je išta poslato ili da je polisa izdata.
- Pre stvarne upotrebe potrebno je povezati odobreni sistem, prijavu i prava pristupa saradnika.
- Prethodna prezentaciona stranica je sačuvana na `/presentation.html`.
