---
title: "Kako čuvati svoju stranicu od hakera? Profesionalni savjeti za sigurnost"
slug: "kako-cuvati-svoju-stranicu-od-hakera-profesionalni-savjeti-za-sigurnost"
originalUrl: "https://version2.hr/kako-cuvati-svoju-stranicu-od-hakera-profesionalni-savjeti-za-sigurnost/"
language: "hr"
translations:
  en: "website-security-guide"
  de: "so-schutzen-sie-ihre-website-vor-hackern-professionelle-sicherheitstipps"
date: "2024-08-20"
lastModified: "2026-03-19"
author: "Version2"
category: "web-development"
tags: ["Security", "Web Development"]
excerpt: "Većina web stranica biva hakirana zbog dosadnih, potpuno spiječivih pogrešaka. Evo prioritizirane liste mjera koje zaista štite vašu stranicu."
featuredImage: "./assets/featured.jpeg"
---

# Sigurnost web stranice: Praktičan vodič za zaštitu od hakera

Većina hakiranih web stranica nisu žrtve sofisticiranih cyber napada. Žrtve su nezakrpanog WordPress dodatka iz 2019. Ili lozinke koja je bila "admin123." Ili sigurnosne kopije koja nije postojala kad je bila potrebna.

Dobra vijest: 95% web sigurnosti su dosadne, osnovne stvari koje svatko može implementirati. Evo što zaista funkcionira, poredano po prioritetu.

## Neizostavne mjere

Ovo su stvari koje, ako ih preskočite, ništa drugo nema smisla. Ovo sredite prvo.

### HTTPS svugdje

Ako se vaša stranica još uvijek učitava na HTTP-u, prestanite čitati i odmah to popravite. HTTPS šifrira vezu između vašeg servera i preglednika posjetitelja. Bez toga, svi podaci poslani kroz vašu stranicu (lozinke, obrasci, podaci o plaćanju) putuju kao čisti tekst koji bilo tko na istoj mreži može pročitati.

SSL certifikati su besplatni kroz Let's Encrypt. Nema apsolutno nikakvog izgovora da bilo koja web stranica ne koristi HTTPS. Preglednici aktivno upozoravaju korisnike o HTTP stranicama, Google ih kažnjava u [rezultatima pretraživanja](/blog/sto-je-seo-optimizacija/), a posjetitelji im ne vjeruju. To je goli minimum.

### Jake, jedinstvene lozinke

Najčešći vektor napada nije neki genijalac haker koji piše prilagođene exploite. To su automatizirane skripte koje isprobavaju milijune kombinacija lozinki na vašoj stranici za prijavu.

**Minimalni standardi:**
- 16+ znakova (12 je zastarjeli savjet)
- Generirane nasumično, ne "kreativne" varijacije pravih riječi
- Jedinstvene za svaki račun. Nikad se ne ponavljaju
- Pohranjene u upravitelju lozinki (Bitwarden, 1Password, KeePass). Nikad u pregledniku, nikad u tekstualnoj datoteci, nikad u glavi

Ako je vaša admin lozinka ime kućnog ljubimca plus godina rođenja, promijenite je odmah. Brute force napadi razbijaju lozinke od 8 znakova za minutu.

### Dvofaktorska autentifikacija

Čak i jaka lozinka može biti kompromitirana phishingom, curenjem podataka ili malwareom. 2FA znači da čak i ako netko dođe do vaše lozinke, i dalje se ne može prijaviti bez drugog faktora.

**Koristite aplikaciju za autentifikaciju** (Google Authenticator, Authy, ili upravitelj lozinki s TOTP podrškom). SMS-bazirana 2FA je bolja od ničega, ali ranjiva na SIM swapping napade.

Omogućite 2FA na:
- Admin panelu vaše web stranice
- Hosting računu
- Registraru domene
- Emailu (jer je email glavni ključ za sve vaše ostale račune)
- Alatima za analitiku i poslovanje

Ovaj jedan korak blokira ogromnu većinu pokušaja neovlaštenog pristupa.

## Sve držite ažurnim

Ažuriranja softvera su dosadna. Biti hakiran je dosadnije.

### Zašto su ažuriranja bitna

Svaki komad softvera ima ranjivosti. Kad ih istraživači otkriju, prijave ih. Proizvođač softvera izdaje zakrpu. Zatim objave detalje o ranjivosti. U tom trenutku, svaki haker na svijetu zna točno kako iskoristiti sustave koji nisu ažurirani.

Prozor između "zakrpa izdana" i "exploit u divljini" sve se više sužava. Za kritične WordPress ranjivosti, može biti riječ o satima. Ne danima. Satima.

### Što ažurirati i kada

**CMS jezgra (WordPress, Joomla, itd.):** Ažurirajte unutar 24 sata od sigurnosnog izdanja. Omogućite automatska ažuriranja ako možete.

**Dodaci i proširenja:** Ovo je napadni vektor broj jedan za CMS-bazirane stranice. Jedan jedini zastarjeli dodatak s poznatom ranjivošću su otvorena vrata. Ažurirajte minimalno tjedno. Uklonite sve dodatke koje aktivno ne koristite.

**Serverski softver (PHP, Node.js, web server):** Ažurirajte kvartalno ili kad god izađu sigurnosne zakrpe. Vaš hosting provider trebao bi se za to brinuti na upravljanom hostingu.

**Teme i predlošci:** Da, i oni dobivaju ranjivosti. Držite ih ažurnima ili zamijenite prilagođenim kodom koji vi kontrolirate.

## Sigurnosne kopije: Vaša polica osiguranja

Sve sigurnosne mjere mogu zakazati. Sigurnosne kopije su ono što vas spašava kad se to dogodi.

### Pravilo 3-2-1

Držite **3** kopije vaših podataka na **2** različite vrste pohrane s **1** kopijom izvan lokacije. To znači:

1. Vaša živa stranica (kopija 1, na serveru)
2. Lokalna sigurnosna kopija (kopija 2, druga vrsta pohrane)
3. Cloud sigurnosna kopija (kopija 3, izvan lokacije, drugi provider)

### Učestalost sigurnosnog kopiranja

**Baza podataka:** Dnevno. Vaša baza podataka sadrži sadržaj, korisničke podatke, narudžbe i sve što se često mijenja.

**Datoteke:** Tjedno. Datoteke vaše stranice se rjeđe mijenjaju osim ako konstantno dodajete medije.

**Potpuni snimak servera:** Mjesečno. Za potpuni oporavak od katastrofe.

### Testirajte svoje sigurnosne kopije

Sigurnosna kopija koju nikad niste testirali je kopija koja možda ne funkcionira. Svaki kvartal, vratite kopiju na staging okruženje i provjerite učitava li se sve ispravno. Otkriti da su vam kopije oštećene nakon što ste hakirani posebno je okrutno otkriće.

## Ojačavanje vaše stranice

Kada su osnove pokrivene, ove mjere dodaju dodatne slojeve zaštite.

### Web aplikacijski vatrozid

WAF sjedi između interneta i vaše web stranice, filtrirajući zlonamjerni promet prije nego dospije do vašeg servera. Blokira uobičajene napade poput SQL injekcije, cross-site scriptinga (XSS) i DDoS pokušaja.

Cloudflareov besplatni paket uključuje osnovnu WAF zaštitu i vrijedi ga postaviti za bilo koju web stranicu. Za ozbiljniju zaštitu, Sucuri ili Cloudflare Pro nude napredne skupove pravila.

### Ograničenje pokušaja prijave

Prema zadanim postavkama, većina stranica za prijavu dopušta neograničen broj pokušaja. To je pozivnica za brute force napade. Ograničite prijave na 5 pokušaja prije 15-minutnog zaključavanja. Nakon 15 neuspjelih pokušaja, blokirajte IP u potpunosti.

Također promijenite zadani URL za prijavu ako vaš CMS to dopušta. Prebacivanje s `/wp-admin` na nešto prilagođeno eliminira ogromnu količinu automatiziranog napadnog prometa.

### Dozvole datoteka

Dozvole datoteka na vašem serveru određuju tko može čitati, pisati i izvršavati datoteke. Netočne dozvole jedan su od najčešćih načina na koji napadači eskaliraju pristup nakon početnog prodora.

**Standardne dozvole:**
- Direktoriji: 755 (vlasnik može čitati/pisati/izvršavati, ostali mogu čitati/izvršavati)
- Datoteke: 644 (vlasnik može čitati/pisati, ostali mogu čitati)
- Konfiguracijske datoteke s pristupnim podacima: 600 (samo vlasnik)

Nikad ništa ne postavljajte na 777. Nikad. To daje svima potpuni pristup svemu.

### Content Security Policy zaglavlja

CSP zaglavlja govore preglednicima koji izvori sadržaja su dopušteni na vašoj stranici. Sprječavaju XSS napade blokiranjem inline skripti, neovlaštenih vanjskih skripti i drugih vektora injekcije.

Osnovno CSP zaglavlje izgleda ovako:

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self' 'unsafe-inline'
```

Ovo govori pregledniku: učitavaj resurse samo s moje domene i mog pouzdanog CDN-a. Sve ostalo se blokira.

### Onemogućite popis direktorija

Ako netko navigira na mapu na vašem serveru (poput `/wp-content/uploads/`), ne bi trebao vidjeti popis svih datoteka. Popis direktorija otkriva strukturu vaših datoteka i olakšava napadačima pronalaženje ranjivih datoteka.

Dodajte ovo u `.htaccess` ili konfiguraciju servera:

```
Options -Indexes
```

## Nadzor i odgovor

Sigurnost nije jednokratno postavljanje. To je kontinuirani proces.

**Nadzor dostupnosti.** Koristite servis poput UptimeRobota (besplatan) ili Better Stacka koji vas odmah obavještava ako vaša stranica padne. Neočekivani pad može ukazivati na prodor.

**Nadzor integriteta datoteka.** Alati poput Wordfencea (WordPress) ili OSSEC-a (općenito) upozoravaju vas kada se osnovne datoteke neočekivano promijene. Ako se vaš `index.php` promijeni, a vi ga niste mijenjali — nešto nije u redu.

**Redovita sigurnosna skeniranja.** Pokrenite mjesečna skeniranja alatima poput Sucuri SiteChecka ili Mozilla Observatoryja. Hvataju uobičajene pogreške u konfiguraciji i poznate ranjivosti.

**Imajte plan odgovora.** Znate što ćete učiniti prije nego budete hakirani. Kome se obratiti, kako skinuti stranicu, gdje su vaše kopije, kako ih vratiti. Smišljanje ovoga usred aktivnog incidenta je najgore moguće vrijeme za to.

## Jedna stvar koju većina ljudi preskoči

Sve gore navedeno je tehničko. Ali najveća ranjivost na većini stranica je ljudska. Phishing emailovi koji vas navedu da unesete lozinku na lažnu stranicu za prijavu. Socijalni inženjering pozivi koji uvjere hosting podršku da resetira vašu lozinku. Suradnik koji još uvijek ima admin pristup šest mjeseci nakon završetka projekta.

Revidirajte svoje korisničke račune kvartalno. Uklonite svakoga tko ne treba pristup. Educirajte sebe i svoj tim o phishingu. I nikad, ali nikad ne klikajte na link u emailu koji vas traži da "potvrdite svoj račun."

[Brza](/blog/kako-optimizirati-brzinu-web-stranice/), dobro izgrađena web stranica koja bude hakirana postaje bezvrijedna preko noći. Sigurnost nije glamurozan posao, ali štiti sve ostalo u što ste investirali u svoju [online prisutnost](/services/web-design/).

---

*Želite sigurnosnu reviziju svoje trenutne stranice? [Javite nam se](/contact/) i provjerit ćemo vašu konfiguraciju za ranjivosti prije nego to učini netko drugi.*
