---
title: "Core Web Vitals: Što Google mjeri i kako to popraviti"
slug: "sve-sto-trebate-znati-za-bolje-rangiranje-na-google-u"
originalUrl: "https://version2.hr/sve-sto-trebate-znati-za-bolje-rangiranje-na-google-u/"
language: "hr"
translations:
  en: "everything-you-need-to-know-for-a-better-ranking-on-google"
  de: "alles-was-sie-fur-ein-besseres-ranking-bei-google-wissen-mussen"
date: "2023-08-11"
lastModified: "2026-03-19"
author: "Version2"
category: "seo"
tags: ["SEO", "Performance", "UX"]
excerpt: "Google rangira web stranice na temelju metrika korisničkog iskustva zvanih Core Web Vitals. Evo što mjere, zašto su bitne i kako popraviti vaše."
featuredImage: "./assets/featured.webp"
---

# Core Web Vitals: Što Google mjeri i kako to popraviti

Google više ne brine samo o vašem sadržaju. Brine o tome kako se vaša web stranica osjeća pri korištenju. Vrijeme učitavanja, responzivnost, vizualna stabilnost. To nisu lijepe stvarčice. To su faktori rangiranja.

Metrike koje Google koristi za mjerenje toga zovu se Core Web Vitals. Ako vaša stranica ima loše ocjene, gubite pozicije u korist konkurenata koji imaju bolje. Čak i ako je vaš sadržaj superioran.

## Što su Core Web Vitals?

Core Web Vitals su tri specifična mjerenja koja Google koristi za procjenu korisničkog iskustva vaše web stranice. Fokusiraju se na brzinu učitavanja, interaktivnost i vizualnu stabilnost.

**Largest Contentful Paint (LCP)** mjeri koliko dugo treba da se učita najveći vidljivi element na vašoj stranici. To je obično hero slika, video thumbnail ili veliki blok teksta.

Dobar LCP: ispod 2,5 sekunde. Sve iznad 4 sekunde smatra se lošim.

**Interaction to Next Paint (INP)** zamijenio je stari First Input Delay metriku u ožujku 2024. Mjeri koliko brzo vaša stranica reagira kada netko s njom komunicira. Klikovi, tapkanja, pritisci tipki. INP promatra sve interakcije tijekom cijelog posjeta stranici, ne samo prvu.

Dobar INP: ispod 200 milisekundi. Ako se vaši gumbi osjećaju tromima ili obrasci kasne, vaš INP je vjerojatno loš.

**Cumulative Layout Shift (CLS)** mjeri koliko vaša stranica skače dok se učitava. Znate onu iritantnu stvar kada ste upravo u tijeku tapkanja na gumb, a stranica se pomakne, pa tapnete na oglas? To je pomak rasporeda. Google ga mrzi. Korisnici isto.

Dobar CLS: ispod 0,1. Što niže, to bolje.

## Zašto te metrike utječu na vaš rang

Googleov cilj je slati ljude na stranice koje će im se zaista svidjeti. Ako je vaša stranica spora, neresponzivna ili skakuće, ljudi odlaze. Google to primjećuje.

Stranice s dobrim Core Web Vitals rezultatima imaju niže stope napuštanja i veći angažman. Google to nagrađuje boljim pozicijama u rezultatima pretraživanja.

Ovo nije teorija. Google je izričito izjavio da su Core Web Vitals signali rangiranja. Dio su šireg ažuriranja "iskustva stranice" koje se uvodi i dorađuje od 2021.

Praktičan utjecaj: dvije stranice s jednako dobrim sadržajem, ali jedna se učitava za 1,5 sekunde a druga za 5 sekundi. Brža pobjeđuje. Svaki put.

## Kako provjeriti svoje rezultate

Prije nego što bilo što popravljate, morate znati gdje stojite.

**Google PageSpeed Insights** je glavni alat. Unesite svoj URL i dobit ćete ocjene za sva tri Core Web Vitals, plus prijedloge za poboljšanje. Prikazuje i laboratorijske podatke (simulirani testovi) i terenske podatke (mjerenja stvarnih korisnika).

**Google Search Console** ima Core Web Vitals izvještaj koji prikazuje koje stranice na vašoj stranici prolaze ili padaju, grupirane po tipu problema. Korisno za pronalaženje obrazaca na cijeloj stranici.

**Chrome DevTools** omogućuje dublje istraživanje za tehničke korisnike. Tab Performance prikazuje točno što se događa tijekom učitavanja stranice, kadar po kadar.

Počnite s PageSpeed Insights. Daje najjasniju sliku uz najmanji napor.

## Popravljanje sporog učitavanja (LCP)

LCP problemi gotovo uvijek dolaze od jedne stvari: nešto veliko predugo se učitava. Evo kako to popraviti.

**Optimizirajte slike.** Ovo je krivac broj jedan. Koristite moderne formate poput WebP ili AVIF umjesto PNG ili JPEG. Komprimirajte sve. Hero slika ne mora biti 4 MB.

**Koristite lazy loading.** Slike ispod vidljivog dijela stranice ne trebaju se učitati odmah. Neka se učitavaju dok korisnik skrola. Ali nemojte lazy-loadati hero sliku. To je ona koju želite učitanu prvu.

**Minimizirajte vrijeme odgovora servera.** Ako vašem serveru treba dvije sekunde samo da počne slati podatke, vaš LCP ne može biti dobar. Bolji hosting čini stvarnu razliku. Pokrili smo najbolje opcije u našem [vodiču za usporedbu hostinga](/blog/najbolje-platforme-za-hosting-wordpress-stranica/).

**Uklonite render-blokirajuće resurse.** Ako vaša stranica mora preuzeti i obraditi 15 CSS datoteka i 20 JavaScript datoteka prije nego što može nešto prikazati, bit će spora. Inline-ajte kritični CSS, odgodite nebitne skripte i uklonite ono što vam ne treba.

Za detaljnije uranjanje u brzinu, pogledajte naš vodič o [optimizaciji brzine web stranice](/blog/kako-optimizirati-brzinu-web-stranice/).

## Popravljanje sporih interakcija (INP)

INP problemi znače da vaša stranica radi previše posla kada netko pokuša s njom komunicirati. Preglednik je zauzet i ne može brzo reagirati.

**Smanjite vrijeme izvršavanja JavaScripta.** Teške skripte blokiraju glavni thread. Ako vaša stranica učitava 2 MB JavaScripta, svaki klik će se osjećati sporim. Revidirajte svoje skripte i uklonite ono što nije bitno.

**Razbijte dugačke zadatke.** Ako jedan JavaScript zadatak traje više od 50 milisekundi, preglednik ne može reagirati na korisnički unos za to vrijeme. Podijelite teške operacije u manje dijelove.

**Smanjite skripte trećih strana.** Analitika, chat widgeti, društveni embedi, pikseli za praćenje. Svaki dodaje težinu. Budite nemilosrdni oko toga što vam zaista treba.

**Koristite web workere za teško računanje.** Ako vaša stranica mora obrađivati podatke, premjestite to s glavnog threada kako bi UI ostao responzivan.

## Popravljanje pomaka rasporeda (CLS)

Pomak rasporeda je obično najlakši za popraviti jer su uzroci predvidivi.

**Uvijek postavite dimenzije na slike i video.** Ako preglednik ne zna koliko će slika biti velika, prikazuje stranicu bez nje, a onda pomakne sve kada se slika učita. Navedite width i height atribute u HTML-u.

**Rezervirajte prostor za oglase i embede.** Ako imate oglase koji se učitavaju nakon sadržaja stranice, gurnut će sve prema dolje. Dajte im fiksnu veličinu kontejnera.

**Izbjegavajte umetanje sadržaja iznad postojećeg sadržaja.** Banneri koji klize s vrha, obavijesti o kolačićima koje guraju stranicu prema dolje. To uništava vaš CLS rezultat.

**Koristite font-display: swap oprezno.** Web fontovi koji se učitavaju kasno mogu uzrokovati da se tekst prelijeva. Prethodno učitajte fontove ili koristite sistemske fontove kao fallback.

## Izvan Core Web Vitals: Što još utječe na rangiranje

Core Web Vitals su bitni, ali nisu sve. Google koristi stotine signala rangiranja. Najvažniji uz iskustvo stranice:

**Kvaliteta sadržaja.** Vaš sadržaj mora bolje odgovarati na upit od bilo koga drugog. Nikakva optimizacija brzine ne popravlja tanak, nekoristan sadržaj. Razumijevanje [SEO temelja](/blog/sto-je-seo-optimizacija/) je neophodno.

**Povratne veze.** Druge stranice koje vode na vašu signaliziraju autoritet. Kvaliteta ispred kvantitete.

**Prilagodba mobilnim uređajima.** Google indeksira mobilnu verziju vaše stranice prvo. Ako nije upotrebljiva na telefonu, imate problem.

**HTTPS.** Vaša stranica treba SSL certifikat. Ne-HTTPS stranice se kažnjavaju. To je također osnovni [sigurnosni zahtjev](/blog/zastita-wordpress-web-stranice/).

**Strukturirani podaci.** Schema markup pomaže Googleu razumjeti vaš sadržaj i može vam donijeti bogate isječke u rezultatima pretraživanja.

## Prava konkurentska prednost

Većina tvrtki ignorira Core Web Vitals jer djeluju tehnički. Upravo zato vam njihovo popravljanje daje prednost.

Ako vaši konkurenti imaju spore, trzave web stranice, a vaša je brza i glatka, Google primjećuje. Korisnici primjećuju. I razlika se akumulira s vremenom kako se vaše metrike angažmana poboljšavaju i pozicije rastu.

Ovo je jedno od onih područja gdje tehnički dobro izgrađena web stranica se sama isplati. Stranice izgrađene na čistom, prilagođenom kodu postižu mnogo bolje rezultate na Core Web Vitals od stranica natrpanih page builderima i dodacima. To je razlika između odijela po mjeri i onog s police. Oba funkcioniraju, ali jedno bolje pristaje. Prilagođena stranica s premium estetikom učitava se brzo na svakom uređaju jer nema opterećenja buildera koji je usporava.

---

*Vaš Google rang više nije samo stvar ključnih riječi i povratnih veza. Radi se o tome kako vaša stranica performira za stvarne korisnike. Ako želite znati gdje vaša stranica stoji i što popraviti prvo, naša [besplatna analiza web stranice](/analysis/) će vam to pokazati.*
