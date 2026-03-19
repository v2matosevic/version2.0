---
title: "Kako povezati Cloudflare s vašom web stranicom?"
slug: "kako-povezati-cloudflare-s-vasom-web-stranicom"
originalUrl: "https://version2.hr/kako-povezati-cloudflare-s-vasom-web-stranicom/"
language: "hr"
translations:
  en: "how-to-connect-cloudflare-to-your-website"
  de: "so-verbinden-sie-cloudflare-mit-ihrer-website"
date: "2023-09-15"
lastModified: "2026-03-19"
author: "Version2"
category: "web-development"
tags: ["Performance", "Security", "Hosting"]
excerpt: "Cloudflare može učiniti vašu stranicu bržom i sigurnijom besplatno. Evo kako ga pravilno postaviti, što svaka postavka radi i greške koje kvare stvari."
featuredImage: "./assets/featured.jpg"
---

# Kako postaviti Cloudflare za svoju web stranicu (korak po korak)

Vaša web stranica sjedi na serveru negdje. Svaki posjetitelj se direktno spaja na taj server, bez obzira gdje se nalazi u svijetu. Posjetitelj iz Zagreba, posjetitelj iz Tokija, posjetitelj iz New Yorka. Svi pogađaju isti stroj u istom podatkovnom centru.

Cloudflare stoji između vaših posjetitelja i vašeg servera. Predmemorira vaš sadržaj kroz 330+ podatkovnih centara u više od 120 zemalja, blokira zlonamjerni promet prije nego dođe do vas i ubrzava isporuku za svakoga. Besplatni plan pokriva većinu onoga što male i srednje tvrtke trebaju.

Evo kako ga pravilno postaviti.

## Zašto je Cloudflare bitan za vašu stranicu

Tri razloga. Brzina, sigurnost i pouzdanost.

**Brzina.** Cloudflareov CDN (Content Delivery Network) pohranjuje kopije vaših statičkih datoteka (slike, CSS, JavaScript) na serverima diljem svijeta. Kada netko iz Münchena posjeti vašu stranicu, prima datoteke s obližnjeg Cloudflare servera umjesto vašeg hostinga u Hrvatskoj. Razlika je primjetna. Poboljšanja [brzine stranice](/blog/kako-optimizirati-brzinu-web-stranice/) od 30-60% su uobičajena za stranice s međunarodnim posjetiteljima.

**Sigurnost.** Cloudflare filtrira promet prije nego dođe do vašeg servera. DDoS napadi, zlonamjerni botovi, pokušaji brute force prijave. Sve se rješava na rubu mreže. Ovo je posebno vrijedno ako koristite WordPress ili bilo koji CMS gdje [sigurnost](/blog/kako-svoju-web-stranicu-odrzati-sigurnom/) zahtijeva stalnu budnost.

**Pouzdanost.** Ako vaš server padne, Cloudflare može posluživati predmemoriranu verziju vaše stranice. Posjetitelji vide malo zastarjelu stranicu umjesto ekrana s greškom. Nije savršeno, ali je beskonačno bolje od ničega.

I opet: besplatni plan sve ovo radi.

## Prije nego počnete

Trebat će vam tri stvari.

**Pristup registru vaše domene.** To je mjesto gdje ste kupili ime domene (GoDaddy, Namecheap, Squarespace, vaš lokalni hrvatski pružatelj). Morat ćete promijeniti nameservere, pa provjerite možete li se prijaviti i uređivati DNS postavke.

**Popis vaših trenutnih DNS zapisa.** Cloudflare će ih automatski skenirati, ali vlastita referenca pomaže uhvatiti sve što se propusti. Prijavite se u trenutno DNS upravljanje, napravite screenshot svega ili eksportirajte zone datoteku ako vaš pružatelj to dopušta.

**30 minuta neprekinutog vremena.** Sama postava traje oko 10 minuta. Ali DNS propagacija može trajati do 48 sati (obično mnogo brže). Planirajte ovo napraviti tijekom perioda s malo prometa, ne neposredno prije lansiranja proizvoda.

## Postava korak po korak

### 1. Kreirajte Cloudflare račun

Idite na cloudflare.com i registrirajte se. Koristite e-mail koji zaista provjeravate. Cloudflare šalje važne obavijesti o sigurnosnim događajima i problemima s konfiguracijom.

### 2. Dodajte svoju web stranicu

Kliknite "Add a Site" i unesite ime domene. Samo domenu, bez www ili https prefiksa. Na primjer: `vasadomena.hr`.

Cloudflare će tražiti da odaberete plan. Počnite s besplatnim. Uvijek se možete nadograditi. Besplatni plan uključuje CDN, osnovnu DDoS zaštitu, SSL i dovoljno značajki za većinu stranica.

### 3. Pregledajte DNS zapise

Cloudflare skenira vaše postojeće DNS zapise i importira ih. Ovo je najvažniji korak. Provjerite svaki zapis pažljivo.

**A zapisi** usmjeravaju vašu domenu na IP adresu vašeg servera. Ovi bi trebali biti "proxied" (narančasta ikona oblaka) tako da promet ide kroz Cloudflare.

**CNAME zapisi** usmjeravaju poddomene na druge domene. I ove stavite na proxy, osim ako imate specifičan razlog da ne.

**MX zapisi** upravljaju rutiranjem e-maila. Ovi NE SMIJU biti na proxyju. Ako stavite MX zapise na proxy, vaš e-mail prestaje raditi. Cloudflare bi ih trebao automatski postaviti na "DNS only" (sivi oblak), ali provjerite.

**TXT zapisi** upravljaju stvarima poput verifikacije domene i autentifikacije e-maila (SPF, DKIM, DMARC). Ovi ostaju na DNS-only.

Propustiti zapis ovdje znači da ta usluga prestaje raditi kada prebacite nameservere. Dvaput provjerite uspoređujući s ranijim DNS screenshotom.

### 4. Promijenite nameservere

Cloudflare vam daje dvije adrese nameservera. Nešto poput `ada.ns.cloudflare.com` i `wes.ns.cloudflare.com`.

Idite na svog registra domene. Pronađite postavke nameservera. Zamijenite trenutne nameservere s dva koje je Cloudflare pružio. Spremite.

Ovo je točka bez povratka (donekle). Nakon što se DNS propagira, sav promet teče kroz Cloudflare. Ako ste napravili grešku u DNS zapisima u koraku 3, sad ćete saznati. Zato je backup screenshot bitan.

Propagacija obično traje 15 minuta do nekoliko sati. Ponekad do 48 sati. Cloudflare vam šalje e-mail kada je aktivan.

### 5. Konfigurirajte SSL/TLS

Nakon što je Cloudflare aktivan, idite na SSL/TLS postavke. Imate četiri opcije.

**Off:** Bez enkripcije. Nikad ne koristite ovo.

**Flexible:** Enkriptira promet između posjetitelja i Cloudflarea, ali NE između Cloudflarea i vašeg servera. Koristite ovo samo ako vaš hosting apsolutno ne podržava SSL.

**Full:** Enkriptira sve, ali ne verificira certifikat vašeg servera. Bolje od Flexible.

**Full (Strict):** Enkriptira sve i verificira SSL certifikat vašeg servera. Ovo je ono što želite. Ako vaš hosting podržava SSL (većina da), koristite Full (Strict).

Postavite "Always Use HTTPS" na On. Postavite "Automatic HTTPS Rewrites" na On. Ovo osigurava da posjetitelji uvijek dobivaju enkriptiranu verziju vaše stranice.

### 6. Postavite pravila

Cloudflareova pravila vam dopuštaju kontrolu ponašanja za specifične URL-ove. Naslijeđena značajka "Page Rules" je zastarjela 2024-2025 i zamijenjena moćnijim modernim tipovima pravila: Cache Rules, Configuration Rules, Redirect Rules i drugima.

**Cache Rules za statičke stranice.** Ako imate stranice koje se rijetko mijenjaju (poput landing stranice), kreirajte cache pravilo da predmemorira cijeli HTML. To čini te stranice nevjerojatno brzima za učitavanje.

**Configuration Rules za admin područja.** Ako koristite WordPress, kreirajte configuration pravilo za `vasadomena.hr/wp-admin/*` da zaobiđe predmemoriju. Inače biste mogli vidjeti zastarjeli sadržaj u admin panelu.

**Redirect Rules za HTTPS.** Kreirajte redirect pravilo da šalje sav HTTP promet na HTTPS ako automatska postavka ne uhvati sve.

## Česti problemi i kako ih riješiti

**Upozorenja o mješovitom sadržaju.** Vaša stranica se učitava preko HTTPS-a ali neki resursi (slike, skripte) se još učitavaju preko HTTP-a. Popravite to na izvoru ažuriranjem URL-ova u vašem CMS-u. Cloudflareovo Automatic HTTPS Rewrites pomaže, ali ne hvata sve.

**Beskonačne petlje preusmjeravanja.** Ovo se događa kada vaš server forsira HTTPS, a Cloudflareov SSL način je postavljen na "Flexible." Cloudflare se spaja na vaš server preko HTTP-a, vaš server preusmjerava na HTTPS, Cloudflare se opet spaja preko HTTP-a. Petlja. Rješenje: postavite SSL na "Full" ili "Full (Strict)."

**Zastarjeli predmemorirani sadržaj.** Ažurirate svoju stranicu ali posjetitelji vide staru verziju. Idite na Cloudflare dashboard, Caching, Purge Everything. Ili još bolje, očistite specifične URL-ove koji su se promijenili. Postavite automatsko čišćenje predmemorije nakon deploymenta ako često deplojirate.

**E-mail prestaje raditi.** Stavili ste MX zapise na proxy. Vratite se na DNS, pronađite MX zapise, kliknite narančasti oblak da ga prebacite na sivi (DNS only). E-mail opet radi.

**Problemi s WordPress prijavom.** Cloudflareove sigurnosne značajke ponekad označe legitimne pokušaje prijave. Stavite svoju IP adresu na bijelu listu u Cloudflareovim firewall pravilima. Ili kreirajte page rule za smanjenje razine sigurnosti za vaš URL prijave.

## Postavke performansi vrijedne aktiviranja

U Speed sekciji vašeg Cloudflare dashboarda, aktivirajte ovo.

**Brotli kompresija.** Bolja od gzipa. Dodatno smanjuje veličinu datoteka. Nema razloga ne aktivirati. Napomena: Cloudflareov Auto Minify je ukinut u kolovozu 2024. Minifikaciju sada treba obavljati u vremenu buildanja kroz vaš framework ili build alate.

**Early Hints.** Govori preglednicima da počnu učitavati resurse prije nego stigne potpuni odgovor stranice. Blago poboljšanje percipirane brzine učitavanja.

**Rocket Loader** (koristite s oprezom). Odgađa učitavanje svih JavaScript skripti. Ovo može pokvariti neke stranice. Aktivirajte ga, temeljito testirajte, deaktivirajte ako se bilo što pokvari.

## Što besplatni plan ne pokriva

Besplatni plan je velikodušan, ali plaćeni planovi donose stvarnu vrijednost za tvrtke koje to trebaju.

**Pro (20$/mjesečno):** Bolja optimizacija slika, Web Application Firewall s upravljanim pravilima i mobilna optimizacija. Vrijedi za poslovne stranice sa značajnim prometom.

**Business (200$/mjesečno):** Prilagođeni SSL certifikati, napredna DDoS zaštita i 100% uptime SLA. Za stranice gdje zastoj košta pravi novac.

Za većinu malih poslovnih stranica i [landing stranica](/blog/kako-napraviti-dobar-landing-page/), besplatni plan je sasvim dovoljan. Počnite s njim. Nadogradite kada naiđete na specifično ograničenje, ne zato što vam se popis značajki čini privlačnim.

## Je li Cloudflare dovoljan za sigurnost stranice?

Cloudflare dodaje značajan sigurnosni sloj. Ali nije kompletna sigurnosna strategija. I dalje morate održavati CMS ažuriranim, koristiti jake lozinke, ograničiti admin pristup i slijediti [sigurnosne najbolje prakse](/blog/kako-svoju-web-stranicu-odrzati-sigurnom/) na vašem stvarnom serveru.

Zamislite Cloudflare kao zaštitara na vratima. Bitan, ali nije zamjena za zaključavanje sefa unutra.

---

*Trebate pomoć s konfiguracijom Cloudflarea ili potpunu reviziju performansi i sigurnosti? [Istražite naše usluge web dizajna](/services/web-design/) ili [javite nam se](/contact/) i pobrinut ćemo se da je vaša stranica brza, sigurna i pravilno konfigurirana.*
