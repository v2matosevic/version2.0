---
title: "Kako optimizirati brzinu web stranice?"
slug: "kako-optimizirati-brzinu-web-stranice"
originalUrl: "https://version2.hr/kako-optimizirati-brzinu-web-stranice/"
language: "hr"
translations:
  en: "how-to-optimize-web-page-speed"
  de: "so-optimieren-sie-die-geschwindigkeit-von-webseiten"
date: "2023-08-17"
lastModified: "2026-03-19"
author: "Version2"
category: "web-development"
tags: ["Performance", "Web Development"]
excerpt: "Spora web stranica vas košta posjetitelja, pozicija na tražilicama i novca. Evo praktičnih, provjerenih koraka za popravak brzine učitavanja od danas."
featuredImage: "./assets/featured.webp"
---

# Kako ubrzati svoju web stranicu (i zašto je to važno)

Jedna sekunda kašnjenja u učitavanju stranice smanjuje konverzije za 7%. To nije pretpostavka. To pokazuje Googleovo vlastito istraživanje.

Vaši posjetitelji ne čekaju. Ako se vaša stranica učitava više od 3 sekunde, više od polovice korisnika na mobilnim uređajima odlazi prije nego vide ijednu riječ vašeg sadržaja. A Google prati te stope napuštanja.

Brzina nije "lijepo za imati." To je temelj na kojem sve ostalo stoji.

## Zašto brzina utječe na vaše pozicije

Google koristi Core Web Vitals kao faktor rangiranja. Tri metrike su najvažnije:

- **Largest Contentful Paint (LCP)** mjeri koliko dugo traje dok glavni sadržaj ne postane vidljiv. Cilj: ispod 2,5 sekunde.
- **Interaction to Next Paint (INP)** mjeri koliko brzo vaša stranica reagira na korisničke interakcije tijekom cijelog posjeta, ne samo na prvi klik. Cilj: ispod 200ms. INP je zamijenio First Input Delay (FID) kao Core Web Vital u ožujku 2024.
- **Cumulative Layout Shift (CLS)** mjeri koliko stranica skače dok se učitava. Cilj: ispod 0,1.

Provjerite svoju stranicu kroz [PageSpeed Insights](https://pagespeed.web.dev/) odmah. Vidjet ćete točno gdje stojite. Za dublju analizu, Lighthouse tab u Chrome DevToolsu (ugrađen u svaki Chrome preglednik) daje vam iste podatke plus kompletni waterfall grafikon koji pokazuje koje se datoteke učitavaju kada i koliko dugo svaka traje.

## Najveći ubojice brzine

### Neoptimzirane slike

Ovo je ubojica broj jedan na gotovo svakoj sporoj stranici. Jedan JPEG visoke rezolucije može imati 3-5MB. Cijela vaša stranica bi idealno trebala biti ispod 1-2MB ukupno.

Rješenja:
- **Koristite WebP format.** 25-35% je manji od JPEG-a pri istoj kvaliteti.
- **Komprimirajte sve.** Alati poput Squoosha, TinyPNG-a ili ImageOptima smanjuju veličinu datoteke za 60-80% bez vidljivog gubitka kvalitete.
- **Postavite ispravne dimenzije.** Ne učitavajte sliku od 4000px da biste je prikazali na 400px. Promijenite veličinu na ono što vam zaista treba.
- **Lazy load za slike ispod vidljivog dijela.** Učitajte samo ono što je vidljivo. Ostatak može pričekati dok korisnik ne pomiče stranicu.

### Previše HTTP zahtjeva

Svaka datoteka koju vaša stranica učitava (CSS, JavaScript, fontovi, slike, skripte za praćenje) zahtijeva zasebni zahtjev. Više zahtjeva znači više čekanja.

Rješenja:
- Kombinirajte CSS datoteke gdje je moguće.
- Minimizirajte skripte treće strane. Onaj chatbot widget, ta analitička oznaka, taj embed s društvene mreže. Svaki dodaje težinu.
- Koristite SVG umjesto icon fontova za male grafike.
- Revidirajte svoje dodatke. WordPress stranice često imaju 20+ dodataka, svaki dodaje vlastite skripte.

### Nema strategije predmemoriranja

Kada se posjetitelj vrati na vašu stranicu, preglednik ne bi trebao sve učitavati ispočetka.

Rješenja:
- **Predmemorija preglednika.** Postavite cache zaglavlja tako da se statički resursi (slike, CSS, fontovi) pohranjuju lokalno danima ili tjednima.
- **CDN (Content Delivery Network).** Servisi poput [Cloudflarea](/blog/kako-povezati-cloudflare-s-vasom-web-stranicom/) distribuiraju vašu stranicu na servere širom svijeta. Posjetitelj iz Beča učitava s frankfurtskog servera, ne s jednog u SAD-u.

### Resursi koji blokiraju renderiranje

Neke CSS i JavaScript datoteke blokiraju stranicu od prikazivanja dok se potpuno ne učitaju.

Rješenja:
- Učitajte kritični CSS inline u HTML zaglavlju.
- Odgodite nekritični JavaScript s `defer` ili `async` atributom.
- Uklonite nekorišteni CSS i JS. Većina WordPress tema dolazi s mnogo više koda nego što ijedna stranica treba.

## WordPress problem s brzinom

WordPress sam po sebi nije inherentno spor. Ali način na koji je većina stranica izgrađena na WordPressu jest.

Page builderi poput Elementora dodaju slojeve HTML-a, CSS-a i JavaScripta koje ručno kodirana stranica ne treba. Tipična Elementor stranica generira 2-3x više koda nego što je potrebno. Dodajte nekoliko dodataka i tešku temu, i gledate 4-5 sekundi učitavanja bez intervencije.

Ako ste na WordPressu, [pravilna optimizacija](/blog/optimizacija-vase-web-stranice-s-10web/) čini stvarnu razliku. Ali ako počinjete iznova, prilagođeno kodirane stranice su brže prema zadanom jer isporučujete samo kod koji vam zaista treba. Razumijevanje [razlike između web dizajna i web developmenta](/blog/razlika-izmedu-web-dizajna-i-web-developmenta/) pomaže vam vidjeti zašto tehničke odluke vašeg programera imaju tako izravan utjecaj na brzinu.

## Kako popravak brzine zaista izgleda

Evo scenarija koji stalno viđamo. Lokalna tvrtka ima WordPress stranicu s Elementorom, 18 dodataka i nekomprimiranim slikama. PageSpeed mobilni rezultat: 28. Vrijeme učitavanja: 6,2 sekunde.

Nakon optimizacije — konverzije slika u WebP, uklanjanja 11 nekorištenih dodataka, zamjene Elementor sekcija čistim HTML-om, aktivacije Cloudflare predmemorije i odgode nekritičnih skripti — ista stranica postiže 89 na mobilnom. Vrijeme učitavanja: 1,8 sekundi. Isti sadržaj. Isti hosting. Samo manje balasta.

Rezultat? Stopa napuštanja pala je za 35%, prosječno trajanje sesije poraslo je za 40%, a stranica se pomaknula s treće na prvu stranicu za svoju primarnu ključnu riječ u roku od dva mjeseca.

## Brze pobjede koje možete ostvariti danas

1. Pokrenite PageSpeed Insights i napravite screenshot svojih rezultata.
2. Komprimirajte sve slike u WebP format koristeći [Squoosh](https://squoosh.app/) (besplatan, radi u pregledniku).
3. Aktivirajte predmemoriju preglednika kroz panel vašeg hostinga.
4. Postavite Cloudflare (besplatni plan radi sasvim dobro).
5. Uklonite dodatke i skripte koje aktivno ne koristite.
6. Testirajte ponovno i usporedite. Zadržite oba screenshota.

## Koliko brzo je dovoljno brzo?

Ispod 2 sekunde na desktopu. Ispod 3 sekunde na mobilnom preko 4G-a. To je cilj.

Svako poboljšanje se kumulira. Brže stranice bolje rangiraju, više konvertiraju i manje koštaju za posluživanje. Optimizacija brzine je rad s najvišim povratom ulaganja koji možete napraviti na bilo kojoj web stranici. Zapravo, [optimizacija web stranice izravno povećava prodaju](/blog/optimizacija-web-stranice-prodaja/) na načine koje većina tvrtki podcjenjuje.

---

*Mi izrađujemo [brze web stranice od nule](/services/web-design/). Želite znati kako vaša trenutna stranica performira? [Zatražite besplatnu analizu brzine.](/analysis/)*
