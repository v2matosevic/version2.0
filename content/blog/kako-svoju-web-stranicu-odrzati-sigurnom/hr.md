---
title: "Kako svoju web stranicu održati sigurnom?"
slug: "kako-svoju-web-stranicu-odrzati-sigurnom"
originalUrl: "https://version2.hr/kako-svoju-web-stranicu-odrzati-sigurnom/"
language: "hr"
translations:
  en: "how-to-keep-your-website-secure"
  de: "so-halten-sie-ihre-website-sicher"
date: "2023-10-14"
lastModified: "2026-03-19"
author: "Version2"
category: "web-development"
tags: ["Security", "Web Development"]
excerpt: "Vaša web stranica je upravo sada pod napadom. Botovi je ispituju tražeći slabosti dok vi čitate ovo. Evo što zaista funkcionira da ih držite podalje."
featuredImage: "./assets/featured.jpg"
---

# Sigurnost web stranice: praktičan vodič kako ne biti hakiran

Vaša web stranica je upravo sada pod napadom. Ne od strane nekog lika u kapuljači u mračnoj sobi. Od strane automatiziranih botova koji skeniraju tisuće stranica na sat, tražeći lake mete. Zastarjeli dodaci. Zadane lozinke. Sigurnosna zaglavlja koja nedostaju.

Većina vlasnika web stranica ne razmišlja o sigurnosti dok se nešto ne pokvari. Do tada se već bavite uništenim stranicama, ukradenim podacima kupaca ili Google upozorenjem o crnoj listi koje plaši svakog posjetitelja. Riješimo to prije nego što se dogodi.

## Znaj protiv čega se boriš

Prije nego što možete braniti bilo što, morate razumjeti napade. Evo onih koji pogađaju većinu web stranica.

**SQL Injection (SQLi)** se događa kada napadači ubace naredbe baze podataka u vaša polja za unos. Forma za prijavu koja ne filtrira unose može predati cijelu vašu bazu podataka. Ovo nije teoretski. To je jedan od najčešćih vektora napada na webu.

**Cross-Site Scripting (XSS)** omogućuje napadačima ubacivanje zlonamjernog JavaScripta u stranice koje vaši posjetitelji vide. Mogu ukrasti kolačiće sesije, preusmjeriti korisnike na phishing stranice ili bilježiti tipkovničke unose. Ako vaša stranica prikazuje korisnički generirani sadržaj bez pravilnog escapanja, ranjivi ste.

**Brute Force napadi** su točno ono kako zvuče. Botovi isprobavaju tisuće kombinacija korisničkog imena i lozinke dok jedna ne upali. Ako je vaša admin prijava na `/wp-admin` s korisničkim imenom "admin" i slabom lozinkom, to će s vremenom uspjeti.

**DDoS (Distributed Denial of Service)** preplavljuje vaš poslužitelj s toliko prometa da legitimni posjetitelji ne mogu proći. To je digitalni ekvivalent tisuću ljudi koji blokiraju ulaz u trgovinu.

Ništa od ovoga ne zahtijeva genijalnog napadača. Većina je automatizirana. Upravo to ih čini opasnim.

## HTTPS nije opcionalan

Ako vaša stranica još uvijek radi na HTTP-u, prestanite čitati i popravite to prvo. SSL/TLS certifikat šifrira sve između vašeg poslužitelja i vaših posjetitelja. Bez njega, lozinke, podaci iz formi i osobni podaci putuju u čistom tekstu. Svatko na istoj mreži ih može pročitati.

Osim sigurnosti, Google kažnjava HTTP stranice u rangiranju pretraživanja. Preglednici prikazuju upozorenje "Nije sigurno". Posjetitelji odlaze. Nema nijednog razloga da nemate HTTPS. Većina hosting providera nudi besplatne SSL certifikate putem Let's Encrypt.

Provjerite adresnu traku upravo sada. Ako vidite lokot, dobro. Ako ne vidite, to je vaš prvi zadatak.

## Držite sve ažurnim

Ovo zvuči dosadno. I jest dosadno. Također je najučinkovitija stvar koju možete učiniti.

Kada WordPress objavi sigurnosnu zakrpu, changelog govori cijelom svijetu točno koja je ranjivost postojala. Napadači obrnuto inženjeriraju popravak kako bi napravili exploit. Unutar sati, botovi počinju skenirati stranice koje se još nisu ažurirale.

Isto vrijedi za dodatke, teme, serverski softver, PHP verzije i svaki drugi dio vašeg tehničkog stoga. Svaka zastarjela komponenta su vrata koja ste zaboravili zaključati.

Postavite automatska ažuriranja gdje je moguće. Za kritične dodatke, provjeravajte tjedno. Ako koristite dodatak koji nije ažuriran više od godinu dana, pronađite zamjenu. Napušteni dodaci su tempirana bomba.

[Brzina](/blog/kako-optimizirati-brzinu-web-stranice/) vaše web stranice također profitira od ažuriranja. Novije verzije su gotovo uvijek brže.

## Koristite Web Application Firewall

Web Application Firewall (WAF) sjedi između vašeg poslužitelja i interneta. Filtrira dolazni promet, blokirajući poznate obrasce napada prije nego što stignu do vaše stranice.

Besplatna razina [Cloudflarea](/blog/kako-povezati-cloudflare-s-vasom-web-stranicom/) je solidan početak. Rješava osnovnu DDoS zaštitu, blokira poznate zlonamjerne IP adrese i dodaje korisna sigurnosna zaglavlja. Za stranice s većim prometom, plaćeni WAF poput Sucurija ili Cloudflare Pro dodaje dubinsku inspekciju.

WAF neće zaustaviti sve. Ali hvata automatizirano smeće koje čini 90% napada. Zamislite ga kao zaštitara na vratima. Nije savršen, ali puno bolji nego bez zaštitara.

## Lozinke i autentifikacija

Evo statistike koja bi vas trebala uplašiti: "123456" je još uvijek jedna od najčešćih lozinki na svijetu. Ako itko s pristupom vašoj stranici koristi slabu lozinku, vaša sigurnost je jaka samo koliko ta najslabija karika.

**Zahtijevajte jake lozinke.** Minimalno 16 znakova. Mješavina slova, brojeva, simbola. Još bolje, koristite upravitelj lozinki i generirajte nasumične.

**Omogućite dvofaktorsku autentifikaciju (2FA).** Čak i ako netko probije lozinku, i dalje treba drugi faktor. Koristite autentifikatorsku aplikaciju, ne SMS. SIM swapping je realan.

**Ograničite pokušaje prijave.** Nakon 5 neuspjelih pokušaja, zaključajte račun na 15 minuta. Ovo ubija brute force napade u korijenu.

**Promijenite zadana korisnička imena.** Ako se vaš administratorski račun zove "admin", preimenujte ga. Napadači to isprobavaju prvo.

## Sigurnosne kopije: vaša sigurnosna mreža

Sigurnosne kopije ne sprečavaju napade. Sprečavaju katastrofe.

Ako vaša stranica bude kompromitirana, čista sigurnosna kopija znači da možete sve vratiti u minutama umjesto da gradite od nule. Bez sigurnosnih kopija, uspješan napad može značiti tjedne izgubljenog rada.

Evo kako izgleda dobra strategija sigurnosnog kopiranja:

- **Dnevne automatske sigurnosne kopije** datoteka i baze podataka.
- **Pohrana na drugom mjestu.** Vaše sigurnosne kopije ne smiju živjeti na istom poslužitelju kao vaša stranica. Ako je poslužitelj kompromitiran, vaše kopije idu s njim.
- **Testirajte svoja vraćanja.** Sigurnosna kopija koju nikada niste testirali je kopija koja možda ne radi. Pokušajte vratiti na testno okruženje svaka tri mjeseca.
- **Čuvajte više verzija.** Ponekad otkrijete kompromitiranost tjednima nakon što se dogodila. Imati 30 dana sigurnosnih kopija znači da se možete vratiti dovoljno daleko.

## Sigurnosna zaglavlja su bitna

Većina developera potpuno preskače sigurnosna zaglavlja. To je greška. Ova HTTP zaglavlja govore preglednicima kako rukovati vašim sadržajem i mogu spriječiti čitave kategorije napada.

**Content-Security-Policy (CSP)** kontrolira koje skripte i resurse se mogu učitati na vašim stranicama. Strogi CSP čini XSS napade gotovo nemogućim.

**X-Frame-Options** sprečava da vaša stranica bude ugrađena u iframeove na drugim domenama. Ovo blokira clickjacking napade.

**Strict-Transport-Security (HSTS)** forsira HTTPS veze i sprečava napade degradacijom protokola.

**X-Content-Type-Options** sprečava preglednike od MIME-type sniffinga, koji može pretvoriti nedužne datoteke u izvršive skripte.

Dodavanje ovih zaglavlja traje 10 minuta. Zaštita koju pružaju je ogromna.

## Nadzor i odgovor

Sigurnost nije jednokratno postavljanje. To je stalan proces. Trebate znati kada nešto krene po zlu.

Postavite nadzor koji vas upozorava na sumnjive aktivnosti. Neuspjeli pokušaji prijave. Promjene datoteka. Novi admin računi. Neočekivani skokovi prometa. Što brže otkrijete problem, manja je šteta.

Povremeno pregledavajte serverske logove. Tražite obrasce. Poplava 404 grešaka na putanje poput `/wp-admin` ili `/.env` govori vam da netko ispituje vašu stranicu. To je normalna pozadinska buka, ali neobični obrasci zaslužuju istragu.

Za detaljniji pogled na zaštitu vaše stranice od ciljanih napada, pogledajte naše [profesionalne sigurnosne savjete](/blog/kako-cuvati-svoju-stranicu-od-hakera-profesionalni-savjeti-za-sigurnost/).

## Ljudski faktor

Najfantastičniji sigurnosni sustav na svijetu neće pomoći ako netko u vašem timu klikne na phishing link i preda svoje pristupne podatke.

Obučite svakoga tko ima pristup vašoj stranici. Naučite ih prepoznati phishing e-mailove. Pobrinite se da razumiju zašto su jake lozinke važne. Napravite proces za ukidanje pristupa kada netko napusti tim.

Sigurnost je i pitanje [korisničkog iskustva](/blog/kako-poboljsati-korisnicko-iskustvo-ux-na-svojoj-web-stranici/). Ako vaše sigurnosne mjere čine stranicu neupotrebljivom, ljudi će nalaziti zaobilaznice koje stvaraju nove ranjivosti. Sigurnost je također ključna za [izgradnju pouzdanosti vaše web stranice](/blog/kako-svoju-web-stranicu-uciniti-pouzdanijom/) u očima posjetitelja: upozorenje "Nije sigurno" u pregledniku može poništiti mjesece rada na izgradnji brenda.

---

*Sigurnost web stranice ne mora biti neodoljiva. Počnite s osnovama: HTTPS, ažuriranja, jake lozinke, sigurnosne kopije. Zatim nadogradite WAF, sigurnosna zaglavlja i nadzor. Ako biste radije da netko to riješi kako treba od samog početka, [mi gradimo stranice](/services/web-design/) sa sigurnošću ugrađenom od prvog dana.*
