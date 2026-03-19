---
title: "Što je responzivna web stranica i zašto bi vas trebalo biti briga?"
slug: "sto-je-responzivna-web-stranica"
originalUrl: "https://version2.hr/sto-je-responzivna-web-stranica/"
language: "hr"
translations:
  en: "what-is-a-responsive-website"
  de: "was-ist-eine-responsive-website"
date: "2023-08-19"
lastModified: "2026-03-19"
author: "Version2"
category: "web-development"
tags: ["Web Design", "UX"]
excerpt: "Responzivna web stranica prilagođava se svakoj veličini zaslona automatski. Evo kako funkcionira, zašto je neizbježna i što se događa kada ignorirate mobilne korisnike."
featuredImage: "./assets/featured.webp"
---

# Što je responzivna web stranica i zašto bi vas trebalo biti briga?

Izvadite telefon i posjetite svoju vlastitu web stranicu. Što vidite?

Ako stiskate za zumiranje, pomičete se bočno ili tapkate sićušne linkove palcem i promašujete, vaša stranica nije responzivna. I svaki dan gubite posjetitelje zbog toga.

Responzivna web stranica je ona koja prilagođava svoj raspored kako bi odgovarala bilo kojem zaslonu na kojem se gleda. Telefon, tablet, laptop, ultraširoki monitor. Ista web stranica, isti sadržaj, drugačija prezentacija. Stranica raspoznaje veličinu zaslona i sama se preuređuje.

Ovo nije ugodna dodatna značajka. To je osnovni standard za svaku web stranicu izgrađenu nakon 2015.

## Kako responzivni dizajn funkcionira

Ispod haube, responzivni dizajn oslanja se na tri ključna tehnička koncepta.

**Fluidne mreže.** Umjesto dizajniranja s fiksnim pikselnim širinama (ova bočna traka ima točno 300px), responzivni rasporedi koriste relativne jedinice poput postotaka. Bočna traka postavljena na 25% širine zaslona funkcionira i na telefonu i na desktopu. Proporcije se drže.

**Fleksibilne slike.** Slike se skaliraju unutar svojih kontejnera. Hero slika od 1200px na desktopu proporcionalno se smanjuje na zaslonu telefona umjesto da preliva i stvara horizontalnu traku za pomicanje.

**Media upiti.** To su CSS pravila koja primjenjuju različite stilove na temelju karakteristika zaslona. Na 768px širine, možda navigacija kolapsira u hamburger izbornik. Na 480px, možda dvostupčani raspored postaje jednostupčani. Dizajner definira ove prijelomne točke, a preglednik automatski primjenjuje prave stilove.

Ništa od ovoga nije nova tehnologija. Media upiti podržani su u svim glavnim preglednicima više od desetljeća. Ne postoji tehnički izgovor za neresponzivnu stranicu.

## Zašto je responzivni dizajn neizbježan

Brojevi su jasni. Mobilni uređaji čine preko 60% globalnog web prometa. U nekim industrijama i regijama bliže je 80%. Ako vaša web stranica ne radi na telefonima, većina vaših potencijalnih posjetitelja ima loše iskustvo.

Ali ne radi se samo o udobnosti korisnika. Responzivni dizajn utječe na vaš krajnji rezultat na mjerljive načine.

**Google koristi mobile-first indeksiranje.** To znači da Google primarno koristi mobilnu verziju vaše stranice za rangiranje i indeksiranje. Ako je vaše mobilno iskustvo problematično, vaš [SEO pati](/blog/sto-je-seo-optimizacija/) bez obzira na to koliko je dobra vaša desktop verzija.

**Stope napuštanja rastu na neresponzivnim stranicama.** Ako mobilni posjetitelj ne može čitati vaš sadržaj ili navigirati vašim izbornicima, odlazi. Odmah. Platili ste za taj promet (kroz SEO rad, oglašavanje ili marketing sadržaja) i potrošili ga na loše iskustvo.

**Stope konverzije padaju.** Ljudi ne ispunjavaju formulare, ne kupuju niti kontaktiraju tvrtke kroz web stranice s kojima se moraju boriti. Ako su vaši [gumbi za poziv na akciju](/blog/kako-izraditi-privlacne-cta-ove/) premaleni za tapkanje na mobilnom, jednako ih je dobro ni ne imati.

**Troškovi održavanja se udvostručuju.** Stari pristup bio je izgradnja odvojene mobilne stranice (često na m.primjer.com poddomeni). To znači održavanje dva codebasea, dva seta sadržaja i dva dizajnerska sustava. Responzivni dizajn eliminira ovo posluživanjem jedne stranice svim uređajima.

## Kako responzivni dizajn izgleda u praksi

Prošetajmo kroz ono što se zapravo mijenja između veličina zaslona na dobro izgrađenoj responzivnoj stranici.

**Navigacija.** Na desktopu vidite punu horizontalnu traku izbornika. Na mobilnom se sažima u hamburger ikonu koja otvara izbornik preko cijelog zaslona ili klizni izbornik. Područja dodira dovoljno su velika za palce.

**Raspored sadržaja.** Trostupčana mreža na desktopu postaje jedan stupac na mobilnom. Sadržaj se slaže vertikalno umjesto da stoji jedan pored drugog. Redoslijed čitanja je očuvan.

**Slike.** Različite veličine slika učitavaju se ovisno o uređaju. Telefon ne treba preuzimati hero sliku od 2400px kada bi 600px ispunilo zaslon. Ovo štedi propusnost i poboljšava [brzinu učitavanja](/blog/kako-optimizirati-brzinu-web-stranice/).

**Tipografija.** Veličine fonta, visine redaka i razmaci prilagođavaju se kako bi tekst ostao čitljiv bez zumiranja. Ono što funkcionira na dohvat ruke na monitoru ne funkcionira na dohvat šake na telefonu.

**Formulari.** Polja za unos šire se na punu širinu. Pojavljuju se odgovarajuće vrste tipkovnice (numerička za telefonske brojeve, e-mail tipkovnica za polja e-pošte). Gumbi za slanje dovoljno su veliki za pouzdano tapkanje.

**Tablice.** Široke tablice s podacima mogle bi postati pomične kartice ili naslagani rasporedi na malim zaslonima. Podaci ostaju dostupni bez horizontalnog pomicanja.

## Česte pogreške responzivnog dizajna

Nisu sve responzivne implementacije jednako dobre. Evo pogrešaka koje najčešće vidimo.

**Skrivanje sadržaja na mobilnom.** Ako je sadržaj dovoljno važan da se prikaže na desktopu, dovoljno je važan i za mobilni. Skrivanje cijelih sekcija s `display: none` znači da mobilni korisnici dobivaju manje informacija, ne bolje iskustvo.

**Presmale mete za dodir.** Prsti su veći od kursora miša. Apple preporučuje minimalnu metu za tapkanje od 44x44 piksela. Google preporučuje 48x48. Ako su vaši linkovi i gumbi manji od toga, mobilni korisnici će stalno krivo klikati.

**Netestiranje na stvarnim uređajima.** Alati za razvoj u pregledniku simuliraju responzivne rasporede, ali ne repliciraju ponašanje dodira, performanse u stvarnom svijetu ili kako vaša stranica izgleda na izravnom suncu. Testirajte na stvarnim telefonima.

**Ignoriranje pejzažne orijentacije.** Ljudi koriste telefone u pejzažnom načinu za formulare, videozapise i čitanje. Ako se vaš raspored lomi ili postaje neupotrebljiv u pejzažnoj orijentaciji, propustili ste značajan slučaj korištenja.

**Spore mobilne performanse.** Responzivni raspored je pola jednadžbe. Druga polovica su [performanse](/blog/kako-optimizirati-brzinu-web-stranice/). Lijepo responzivna stranica kojoj treba 8 sekundi za učitavanje na mobilnoj vezi i dalje ne valja.

## Kako provjeriti je li vaša stranica responzivna

Najbrži test: otvorite svoju stranicu na telefonu. Ako dobro radi, dobro se čita i omogućuje vam obavljanje bilo kojeg zadatka koji biste obavili na desktopu, vjerojatno ste u redu.

Za više detalja koristite Lighthouse (ugrađen u Chrome DevTools ili dostupan na PageSpeed Insights). Provjerava mobilnu upotrebljivost uz performanse, pristupačnost i SEO. Googleov samostalni test za mobilnu prilagodljivost povučen je u prosincu 2023., ali Lighthouse pokriva sve što je on radio i više.

Chrome DevTools ima način simulacije uređaja. Otvorite svoju stranicu, pritisnite F12 i kliknite ikonu za prebacivanje uređaja. Možete testirati razne veličine zaslona i čak simulirati sporije mrežne veze.

Ali alati pričaju samo dio priče. Dajte svoj telefon nekome tko nikada nije koristio vašu stranicu. Zamolite ga da pronađe vaš broj telefona, pročita specifičnu stranicu usluga ili ispuni vaš kontakt formular. Gledajte gdje se muči.

## Veza s [korisničkim iskustvom](/blog/kako-poboljsati-korisnicko-iskustvo-ux-na-svojoj-web-stranici/)

Responzivni dizajn nije samostalna značajka. Dio je šireg korisničkog iskustva. Responzivan raspored koji zbunjuje pri navigaciji i dalje je loša web stranica. Responzivna stranica koja se sporo učitava i dalje frustrira korisnike.

Zamislite responzivnost kao temelj. Ona osigurava da je vaša stranica fizički upotrebljiva na bilo kojem uređaju. Sve ostalo — jasan sadržaj, intuitivna navigacija, brze performanse, uvjerljiv dizajn — gradi se na tom temelju.

Ako je temelj pokvaren, ništa izgrađeno na njemu nije bitno.

---

*Niste sigurni kako vaša stranica performira na mobilnom? Pogledajmo. Naša [besplatna analiza web stranice](/analysis/) pokriva responzivnost, brzinu i upotrebljivost na svim uređajima.*
