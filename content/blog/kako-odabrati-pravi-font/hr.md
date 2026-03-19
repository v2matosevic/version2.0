---
title: "Kako odabrati pravi font za svoju web stranicu"
slug: "kako-odabrati-pravi-font"
originalUrl: "https://version2.hr/kako-odabrati-pravi-font/"
language: "hr"
translations:
  en: "how-to-choose-the-right-font"
  de: "so-wahlen-sie-die-richtige-schriftart-aus"
date: "2023-10-25"
lastModified: "2026-03-19"
author: "Version2"
category: "web-development"
tags: ["Typography", "Web Design"]
excerpt: "Pogrešan font može uništiti kredibilitet vaše web stranice u manje od sekunde. Evo kako odabrati tipografiju koja izgleda dobro, čita se lako i učitava brzo."
featuredImage: "./assets/featured.jpg"
---

# Kako odabrati pravi font za svoju web stranicu

Imate otprilike 50 milisekundi da ostavite prvi dojam svojom web stranicom. A tipografija nosi više tog tereta nego što većina ljudi shvaća.

Pogrešan font čini profesionalno poslovanje amaterskim. Pravi font čini mali startup etabliranim. Toliku moć nosi tipografija. Odabir fonta nije kozmetička odluka. To je dizajnerska odluka koja utječe na čitljivost, percepciju brenda, pa čak i na brzinu učitavanja vaše web stranice.

## Razumijevanje glavnih kategorija fontova

Prije nego počnete pregledavati Google Fonts, trebate znati na što gledate. Svaki font pripada jednoj od nekoliko kategorija, a svaka komunicira nešto drugačije.

### Serifni fontovi

To su oni s malim potezima (serifima) na krajevima slova. Pomislite na Georgia, Merriweather ili Playfair Display. Serifi se osjećaju tradicionalno, etablirano i pouzdano. Dobro funkcioniraju za dugačke tekstove i brendove koji žele projicirati autoritet.

Na webu su serifi nekada imali problem s čitljivošću na ekranima niske rezolucije. To je uglavnom nestalo s high-DPI zaslonima, ali ipak vrijedi testirati na manjim veličinama.

### Sans-serif fontovi

Bez poteza na krajevima. Čisti, moderni, minimalni. Inter, Open Sans, Roboto. Ovo je zadani izbor za većinu web stranica, i to s dobrim razlogom. Sans-serif fontovi su izuzetno čitljivi na ekranima svih veličina i rezolucija.

Ako niste sigurni odakle početi, dobro odabran sans-serif je siguran i učinkovit izbor za tijelo teksta.

### Display i dekorativni fontovi

Ovo su fontovi s osobnošću. Podebljani, ekspresivni, ponekad neobični. Prekrasno funkcioniraju za naslove, hero sekcije i kratke tekstove koji trebaju privući pažnju. Užasni su za tijelo teksta. Nitko ne želi čitati cijeli odlomak u dekorativnom fontu.

Koristite ih štedljivo i namjerno. Jedan display font za naslove uparen s čistim fontom za tijelo teksta je solidan obrazac.

### Monospace fontovi

Svaki znak zauzima istu širinu. Tradicionalno se koriste za kod, ali neki brendovi ih koriste za tehnički ili uredivalački estetski dojam. Fira Code, JetBrains Mono, IBM Plex Mono. Daju vašoj stranici prepoznatljiv osjećaj, ali mogu smanjiti brzinu čitanja za dugačke blokove teksta.

## Što čini font da funkcionira na webu

Odabir fonta za web stranicu razlikuje se od odabira za tiskanu brošuru. Ekrani imaju svoja pravila.

### Čitljivost na svakoj veličini

Vaš tekst tijela mora biti kristalno jasan na 16px. Navigacija mora funkcionirati na 14px. Naslovi moraju izgledati oštro na 48px. Ne podnosi svaki font ovaj raspon dobro. Testirajte svoje kandidate na više veličina prije nego se odlučite.

Obratite pažnju na x-visinu (visinu malih slova). Fontovi s većom x-visinom obično su čitljiviji na ekranima. Zato fontovi poput Intera i Source Sansa tako dobro funkcioniraju za web sadržaj.

### Performanse su važnije nego što mislite

Svaki font koji dodate svojoj web stranici je datoteka koju preglednik mora preuzeti prije nego se tekst može prikazati. Jedna obitelj fontova s regular, bold, italic i bold-italic težinama može lako dodati 200-400KB vašem učitavanju stranice.

To je bitno. Google koristi brzinu stranice kao faktor rangiranja. Posjetitelji na sporim vezama vide bljesak nevidljivog ili nestiliziranog teksta. Evo kako održati fontove brzima:

**Ograničite težine.** Trebate li zaista light, regular, medium, semibold, bold i black? Većina stranica savršeno funkcionira s dvije ili tri težine.

**Koristite moderne formate.** WOFF2 je trenutni standard. Značajno je manji od TTF ili OTF datoteka. Ako vaš pružatelj fontova još uvijek servira starije formate, prebacite se.

**Razmislite o sustavskim fontovima.** Za tekst tijela, stack poput `system-ui, -apple-system, sans-serif` renderira se trenutno jer koristi fontove koji su već na korisnikovom uređaju. Bez preuzimanja. Ne daje vam istu kontrolu brenda, ali daje savršene performanse.

**Preloadajte kritične fontove.** Ako koristite prilagođene web fontove, koristite `<link rel="preload">` da kažete pregledniku da ih dohvati rano. Ovo smanjuje kašnjenje prije nego se tekst pojavi.

## Uparivanje fontova bez nereda

Većina web stranica treba dva fonta. Jedan za naslove, jedan za tekst tijela. Možda treći za naglaske ili UI elemente ako gradite nešto složeno. Više od tri je gotovo uvijek previše.

Klasična strategija uparivanja: kontrast. Serifni naslov sa sans-serif tijelom. Podebljani display font s neutralnim fontom tijela. Naslov privlači pažnju, font tijela se miče s puta i pušta ljude da čitaju.

Nekoliko principa uparivanja koji funkcioniraju:

**Kontrast, ne sukob.** Dva fonta trebaju se osjećati drugačije ali ne kao da dolaze s različitih planeta. Trebali bi dijeliti sličan ugođaj čak i ako im se strukture razlikuju.

**Jedan font vodi razgovor.** Vaš font za naslove je ekspresivan. Vaš font za tijelo je radni konj. Nemojte da se oba fonta natječu za pažnju.

**Testirajte s pravim sadržajem.** Ne procjenjujte uparivanje s "Lorem ipsum." Stavite unutra svoje stvarne naslove i odlomke. Neke kombinacije izgledaju sjajno u biračima fontova, a užasno s pravim riječima.

Ako želite istražiti konkretne preporuke, naš post o [najnovijim besplatnim fontovima koje trebate isprobati](/blog/najnoviji-besplatni-fontovi-koje-morate-isprobati/) je dobra polazna točka.

## Tipografija i identitet brenda

Vaši odabiri fontova su izravan izraz vašeg brenda. Odvjetnički ured koji koristi Comic Sans bio bi apsurdan. Trgovina dječjih igračaka koja koristi formalan serif osjećala bi se hladno. Font mora odgovarati osobnosti.

Razmislite kako zvuči glas vašeg brenda. Je li prijateljski i ležeran? Pogledajte zaobljene sans-serifove. Je li sofisticiran i premijum? Razmislite o čistom serifu. Je li tehnički i precizan? Geometrijski sans-serif ili monospace mogao bi funkcionirati.

Što god odabrali, dosljednost je bitna. Koristite iste fontove na web stranici, marketinškim materijalima i poslovnim dokumentima. Tipografija je jedan od najvidljivijih dijelova vašeg [cjelokupnog identiteta brenda](/blog/kako-brendirati-vase-poslovanje-savjeti-za-uspjeh/), a nedosljednost brzo ruši povjerenje.

## Greške od kojih dizajneri strahuju

**Korištenje previše fontova.** Dva su idealna. Tri su maksimum. Pet je kaos.

**Ignoriranje visine retka i razmaka.** Čak i sjajan font izgleda loše s pregusto postavljenim retcima. Tekst tijela općenito treba visinu retka 1.5 do 1.7 za udobno čitanje.

**Biranje stila iznad funkcije.** Onaj ultratanki modni font izgleda prekrasno u Behance mockupu. Nečitljiv je na veličinama teksta tijela na pravoj web stranici. Ovo je česta zamka pri [izgradnji vizualnog identiteta koji se ističe](/blog/novi-trendovi-u-web-dizajnu-stranica/) na webu: prepoznatljivost nikada ne smije doći na račun čitljivosti.

**Zaboravljanje pristupačnosti.** Tekst niskog kontrasta je pravi problem. Svijetlo sivo na bijelom možda izgleda elegantno, ali osobe s oštećenjem vida to ne mogu pročitati. Provjeravajte omjere kontrasta.

**Preskakanje licenciranja fontova.** Nije svaki besplatni font besplatan za komercijalnu uporabu. Provjerite licencu prije objave.

## Donošenje konačne odluke

Nakon sve ove analize, evo praktičnog puta: počnite s fontom za tijelo teksta. Odaberite nešto visoko čitljivo, dostupno u težinama koje trebate, s dobrim web performansama. Ostatak tipografije gradite oko tog temelja.

Testirajte uživo. Ne u alatu za dizajn. Na stvarnoj web stranici, na telefonu, na sporoj vezi. Tu živi istina.

Dobra tipografija je nevidljiva. Čitatelji nikada ne bi trebali razmišljati o fontu. Trebali bi samo osjetiti da se tekst lako i ugodno čita. Kad se to dogodi, dobro ste odabrali. Tipografija je jedno od [modernih načela web dizajna](/blog/moderne-ideje-za-web-dizajn/) koja dobro stare bez obzira na trendove.

---

*Gradite web stranicu na kojoj svaki detalj vrijedi? [Pogledajte kako pristupamo web dizajnu](/services/web-design/) od tipografije do objave.*
