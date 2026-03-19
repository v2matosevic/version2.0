---
title: "WordPress sigurnosna provjera: Zaustavite hakere zauvijek"
slug: "zastita-wordpress-web-stranice"
originalUrl: "https://version2.hr/zastita-wordpress-web-stranice/"
language: "hr"
translations:
  en: "wordpress-security-checklist"
  de: "so-schutzen-sie-ihre-wordpress-website-vor-hackern-und-viren"
date: "2024-06-08"
lastModified: "2026-03-19"
author: "Version2"
category: "wordpress"
tags: ["WordPress", "Security"]
excerpt: "WordPress stranice bivaju hakirane svaki dan. Većina napada iskorištava osnovne ranjivosti koje se popravljaju za nekoliko minuta. Evo praktične sigurnosne kontrolne liste."
featuredImage: "./assets/featured.jpeg"
---

# WordPress sigurnosna provjera: Zaustavite hakere zauvijek

WordPress pokreće preko 40% weba. To ga čini najvećom metom za hakere, botove i automatizirane napade. Svaki dan tisuće WordPress stranica biva kompromitirano. Ne zato što je WordPress nesiguran po dizajnu, nego zato što vlasnici stranica preskaču osnovne sigurnosne prakse.

Dobra vijest: većina napada iskorištava isti mali skup slabosti. Popravite ih i eliminirat ćete veliku većinu prijetnji. Ovo je praktična kontrolna lista koju slijedimo za svaku WordPress stranicu koju gradimo i održavamo.

## Počnite s dobrim hostingom

Vaš hosting je prva linija obrane. Loš hosting sa zastarjelim serverskim softverom, bez vatrozida i s dijeljenim resursima otvoreni je poziv napadačima.

**Na što obratiti pozornost:**

- Vatrozidi na razini servera i DDoS zaštita
- Automatizirane dnevne sigurnosne kopije (ne samo tjedne)
- Besplatni SSL certifikati uključeni
- PHP verzija 8.2 ili viša (8.3+ preporučena za najbolje performanse i sigurnost)
- 24/7 podrška koja zaista odgovara

Dijeljeni hosting najjeftinija je opcija, ali to znači da dijelite serverske resurse sa stotinama drugih stranica. Ako jedna od njih bude kompromitirana, napad se može proširiti. VPS ili namjenski hosting pruža vam izolaciju. Za većinu malih do srednjih stranica, kvalitetan dijeljeni hosting poput [Hostingera](/blog/najbolji-web-hosting-hostinger/) je razuman početak.

## Držite sve ažuriranim

Ovo je najvažnija sigurnosna praksa. I ona koja se najviše zanemaruje.

WordPress jezgra, vaša tema i svaki instalirani dodatak primaju redovita ažuriranja. Mnoga od tih ažuriranja zakrpavaju poznate sigurnosne ranjivosti. Kada preskočite ažuriranja, ostavljate dokumentirane ulazne točke širom otvorene za napadače.

**Postavite sustav:**

- Omogućite automatska ažuriranja za WordPress jezgru
- Ažurirajte dodatke i teme barem tjedno
- Izbrišite sve dodatke ili teme koje ne koristite. Deaktivirani dodaci još uvijek mogu biti iskorišteni. To se odnosi i na graditelje stranica — ako se pitate je li [Elementor pravi alat za vaš projekt](/blog/je-li-elementor-dobar-alat-za-web-dizajn/), uzmite u obzir sigurnosno održavanje koje dodaje.
- Ručno provjeravajte ažuriranja ako automatska ažuriranja nisu opcija

Ako ažuriranje nešto pokvari, zato imate sigurnosne kopije. A u vezi s njima...

## Automatizirajte sigurnosne kopije

Sigurnosne kopije nisu opcija. One su vaša polica osiguranja. Ako vaša stranica bude hakirana, čista sigurnosna kopija najbrži je put do oporavka.

**Koristite UpdraftPlus ili BlogVault** za zakazivanje automatskih kopija. Dnevno je idealno. Tjedno je minimum. Pohranjujte ih izvan servera — na Google Drive, Dropbox ili Amazon S3. Nikada se nemojte oslanjati isključivo na kopije pohranjene na istom serveru kao vaša stranica. Ako server bude kompromitiran, vaše kopije idu s njim.

Testirajte svoje sigurnosne kopije povremeno. Kopija koju ne možete vratiti nije kopija.

## Zaključajte stranicu za prijavu

WordPress stranica za prijavu na `/wp-admin` su ulazna vrata za koja svaki bot na internetu zna. Evo kako ih ojačati.

**Koristite jake, jedinstvene lozinke.** Ne "NazivTvrtke2024." Koristite upravitelj lozinkama. Generirajte nešto nasumično i dugačko. Ovo nije pregovaranje.

**Omogućite dvofaktorsku autentifikaciju (2FA).** Instalirajte dodatak poput WP 2FA ili Two-Factor. Čak i ako netko ukrade vašu lozinku, ne može se prijaviti bez drugog faktora. Koristite Google Authenticator ili Authy za verifikacijske kodove.

**Ograničite pokušaje prijave.** Prema zadanim postavkama WordPress dopušta neograničene pokušaje prijave. To znači da botovi mogu isprobati tisuće kombinacija lozinki. Dodaci poput Limit Login Attempts Reloaded ili Wordfence blokiraju IP adrese nakon određenog broja neuspjelih pokušaja.

**Promijenite URL za prijavu.** Zadani putevi `/wp-admin` i `/wp-login.php` prva su mjesta na kojima napadači traže. Dodatak poput WPS Hide Login omogućuje vam da to promijenite u nešto nepredvidivo. Jednostavna promjena koja zaustavlja mnoge automatizirane napade.

**Ograničite pristup administratorskoj ploči po IP adresi.** Ako vi i vaš tim uvijek radite s istih lokacija, možete dopustiti pristup samo tim IP adresama i blokirati sve ostale. To nije praktično za svakoga, ali je izuzetno učinkovito kada funkcionira.

## Instalirajte sigurnosni dodatak

Namjenski sigurnosni dodatak dodaje više slojeva zaštite bez potrebe da svaki konfigurirate ručno.

**Wordfence** je najpopularnija opcija. Uključuje vatrozid za web aplikacije, skener malwarea, sigurnosne značajke za prijavu i obavještajne podatke o prijetnjama u stvarnom vremenu. Besplatna verzija pokriva osnove. Premium verzija dodaje pravila vatrozida u stvarnom vremenu i blokiranje po državi.

**Sucuri** je još jedan jak izbor, posebno ako želite vatrozid u oblaku koji filtrira promet prije nego što uopće dođe do vašeg servera.

**iThemes Security** (sada SolidWP) nudi detekciju promjena datoteka, sigurnosne kopije baze podataka i zaštitu od brute force napada.

Odaberite jedan. Konfigurirajte ga pravilno. Nemojte instalirati više sigurnosnih dodataka. Oni se sukobljavaju i stvaraju više problema nego što rješavaju.

## Pravilno postavite SSL/TLS

SSL certifikat šifrira vezu između vaših posjetitelja i vašeg servera. Bez njega podaci putuju u čistom tekstu. Lozinke, slanje obrazaca — sve.

Većina hostinga sada uključuje besplatni SSL putem Let's Encrypt. Provjerite da je aktivan. Vaša stranica bi se trebala učitavati isključivo putem `https://`.

**Omogućite HSTS (HTTP Strict Transport Security).** To govori preglednicima da uvijek koriste HTTPS, čak i ako netko upiše HTTP verziju vašeg URL-a. Sprečava downgrade napade i osigurava šifrirane veze u svakom trenutku.

**Prisilite HTTPS u WordPressu.** Ažurirajte WordPress adresu i adresu stranice u Postavke > Općenito na korištenje `https://`. Instalirajte dodatak poput Really Simple SSL ako trebate riješiti probleme s mješovitim sadržajem.

## Pravilno upravljajte korisničkim računima

Ne trebaju svi koji imaju pristup vašem WordPress adminu pune administratorske privilegije. Načelo najmanje privilegije primjenjuje se i ovdje.

- **Urednici** mogu upravljati sadržajem, ali ne mogu instalirati dodatke ili mijenjati postavke.
- **Autori** mogu pisati i objavljivati vlastite objave.
- **Suradnici** mogu pisati skice, ali ne mogu objavljivati.

Koristite dodatak User Role Editor ako trebate prilagođene uloge izvan onoga što WordPress nudi prema zadanim postavkama.

Uklonite neaktivne korisničke račune. Promijenite lozinke kada članovi tima odlaze. Revidirajte svoju listu korisnika kvartalno.

## Nadgledajte svoju stranicu

Sigurnost nije nešto što postavite i zaboravite. Morate znati kada nešto krene po zlu.

**Zapisivanje aktivnosti.** Dodaci poput WP Activity Log prate svaku promjenu u vašoj administratorskoj ploči. Tko se prijavio, što je promijenio, kada je to napravio. Neprocjenjivo za rješavanje problema i odgovor na incidente.

**Praćenje dostupnosti.** Koristite uslugu poput UptimeRobot ili ugrađeno praćenje vašeg hostinga da vas upozori ako vaša stranica padne.

**Praćenje integriteta datoteka.** Vaš sigurnosni dodatak trebao bi vas upozoriti ako su jezgrene WordPress datoteke neočekivano modificirane. Neovlaštene promjene datoteka jedan su od prvih znakova kompromitiranja.

## Kada ste prerasli WordPress sigurnosne brige

Za mnoge tvrtke dobro osigurana WordPress stranica sasvim je dovoljna. Slijedite gore navedene prakse i bit ćete ispred 95% vlasnika WordPress stranica.

Ali ako vaša stranica obrađuje osjetljive podatke, procesira transakcije ili djeluje u industriji sa strogim zahtjevima usklađenosti, pristup sigurnosti kroz WordPress dodatke ima ograničenja. Slažete alate trećih strana na platformu koja je izvorno dizajnirana za bloganje.

[Web aplikacije izrađene po mjeri](/services/web-applications/) pružaju vam sigurnost na razini arhitekture. Bez ranjivosti dodataka. Bez sigurnosnih propusta tema. Bez napadačke površine od nekorištenih značajki. Samo kod koji vaša aplikacija treba, osiguran onako kako treba biti.

Upravljamo sigurnošću za obje vrste projekata. Za WordPress klijente vodimo ažuriranja, nadgledanje i odgovor na incidente putem naših [planova održavanja](/services/). Za prilagođene projekte, sigurnost je ugrađena u izgradnju od prvog dana.

---

*Niste sigurni je li vaša WordPress stranica pravilno zaštićena? [Zatražite besplatnu analizu](/analysis/) i provjerit ćemo vašu trenutnu konfiguraciju te vam reći točno što treba popraviti.*
