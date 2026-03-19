---
title: "Kako koristiti Elementor: Jednostavni koraci za početnike"
slug: "kako-koristiti-elementor-jednostavni-koraci-za-pocetnike"
originalUrl: "https://version2.hr/kako-koristiti-elementor-jednostavni-koraci-za-pocetnike/"
language: "hr"
translations:
  en: "how-to-use-elementor-simple-steps-for-beginners"
  de: "einfache-schritte-zur-verwendung-von-elementor-fur-anfanger"
date: "2023-10-26"
lastModified: "2026-03-19"
author: "Version2"
category: "wordpress"
tags: ["WordPress", "Web Design"]
excerpt: "Korak-po-korak vodič za izradu prvih stranica s Elementorom. Instalacija, predlošci, widgeti i savjeti za izbjegavanje uobičajenih početničkih grešaka."
featuredImage: "./assets/featured.jpg"
---

# Kako koristiti Elementor: Praktičan vodič za početnike

Elementor je WordPress builder stranica koji vam omogućuje vizualno kreiranje stranica, bez pisanja koda. Povlačite elemente na platno, raspoređujete ih, stilizirate i objavljujete. Preko 10 milijuna web stranica ga koristi.

Ako tek počinjete, ovaj vodič vas vodi kroz sve — od instalacije do izrade prve stranice. Bez ispraznog nabrajanja, samo koraci.

## Instalacija Elementora

Prije svega, trebate WordPress stranicu. Ako je još nemate, odaberite hosting providera (preporučujemo [Hostinger za većinu WordPress projekata](/blog/najbolje-platforme-za-hosting-wordpress-stranica/)) i instalirajte WordPress kroz njihovu kontrolnu ploču.

Kada je WordPress spreman, evo kako dodati Elementor:

1. Prijavite se u WordPress admin panel
2. Idite na **Dodaci** u lijevoj bočnoj traci
3. Kliknite **Dodaj novi**
4. Pretražite "Elementor"
5. Kliknite **Instaliraj sada** na "Elementor Website Builder"
6. Nakon instalacije, kliknite **Aktiviraj**

To je to. Elementor je sada dostupan na vašoj stranici. Vidjet ćete novu stavku "Elementor" u bočnoj traci.

Ako želite Pro verziju, kupite je na elementor.com, preuzmite zip datoteku, idite na **Dodaci > Dodaj novi > Učitaj dodatak**, odaberite datoteku, instalirajte i aktivirajte.

## Razumijevanje editora

Otvorite bilo koju stranicu u WordPressu i kliknite gumb "Uredi s Elementorom." Ovo pokreće Elementor editor.

Ekran se dijeli na dva dijela. Na lijevoj strani, panel s widgetima i postavkama. Na desnoj, pregled vaše stranice. Sve što napravite lijevo pojavljuje se desno u stvarnom vremenu.

**Struktura radi u dva sloja:**

**Kontejneri** su elementi layouta koji organiziraju vašu stranicu. Ispod haube koriste CSS flexbox, što znači da ih možete ugnijezditi, slagati horizontalno ili vertikalno i kontrolirati razmake s preciznošću. Zamislite kontejnere kao fleksibilne kutije koje drže vaš sadržaj. (Napomena: stariji Elementor tutoriali mogu spominjati "sekcije" i "stupce." Te su zamijenjene sustavom kontejnera 2023.)

**Widgeti** su stvarni elementi sadržaja. Tekst, slike, gumbi, ikone, forme, videi. Oni idu unutar kontejnera.

Za izradu stranice, dodate kontejner, postavite njegov smjer (redak ili stupac), pa povučete widgete u njega. Jednostavan koncept, i ostaje jednostavan u praksi.

## Izrada vaše prve stranice

Izgradimo osnovnu početnu stranicu. Otvorite novu stranicu u WordPressu, kliknite "Uredi s Elementorom" i pratite.

### Korak 1: Počnite s predloškom ili praznom stranicom

Elementor vam daje dvije opcije. Odaberite gotovi predložak iz njihove biblioteke (kliknite ikonu mape) i prilagodite ga. Ili počnite s praznim platnom i gradite ispočetka.

Za prvu stranicu, koristite predložak. Brže je i daje vam osjećaj kako su elementi strukturirani. Sve kasnije možete modificirati.

### Korak 2: Uredite tekst i slike

Kliknite na bilo koji tekstualni element u predlošku. Lijevi panel prebacuje se na postavke tog widgeta. Upišite vlastiti sadržaj. Promijenite font, veličinu, boju i poravnanje koristeći karticu Stil.

Za slike, kliknite na widget za sliku i uploadajte vlastitu. Postavite veličinu i poravnanje. Uvijek dodajte alt tekst za pristupačnost i SEO.

### Korak 3: Prilagodite layout kontejnera

Kliknite na ručicu kontejnera da odaberete cijeli kontejner. U lijevom panelu možete promijeniti boju pozadine, dodati pozadinsku sliku, prilagoditi padding i margine i postaviti širinu sadržaja.

**Padding** je prostor unutar sekcije (između ruba i sadržaja). **Margina** je prostor izvan sekcije (između nje i sljedeće sekcije). Naučiti razliku između ova dva uštedit će vam sate frustracije.

### Korak 4: Provjerite responzivne prikaze

Na dnu editora nalaze se ikone za desktop, tablet i mobilni prikaz. Kliknite svaku i provjerite kako vaša stranica izgleda.

Stvari koje izgledaju sjajno na desktopu često zahtijevaju prilagodbe na mobilnom. Tekst može biti prevelik. Stupci koji stoje jedan do drugog možda se moraju posložiti vertikalno. Slike mogu prelaziti granice kontejnera.

Popravite probleme na svakom breakpointu. Elementor vam dopušta postavljanje različitih vrijednosti po veličini uređaja za većinu svojstava.

### Korak 5: Objavite

Kada ste zadovoljni, kliknite zeleni gumb **Objavi** na dnu lijevog panela. Vaša stranica je online. Posjetite je u običnom pregledniku da potvrdite da sve izgleda kako treba.

## Osnovni widgeti koje ćete najčešće koristiti

Elementor ima desetke widgeta. Otprilike 10 ćete koristiti redovito.

**Naslov.** Za naslove i podnaslove. Koristite pravilnu hijerarhiju naslova (H1, H2, H3) za SEO. Stranica bi trebala imati jedan H1 i koristiti H2 za glavne sekcije.

**Tekst editor.** Za odlomke sadržaja. Podržava osnovno formatiranje poput bolda, italica i linkova.

**Slika.** Za fotografije i grafike. Podržava lightbox, prilagođenu veličinu i linkanje.

**Gumb.** Za pozive na akciju. Stilizirajte boje, dodajte hover efekte i linkajte na bilo koji URL.

**Razmaknica.** Dodaje vertikalni prostor između elemenata. Koristite štedljivo. Pravilne padding i margina postavke obično su bolje.

**Razdjelnik.** Horizontalna crta za vizualno odvajanje sadržaja. Suptilan ali koristan.

**Ikona.** Pojedinačne ikone iz Font Awesome ili Elementorove biblioteke ikona. Dobro za liste značajki.

**Video.** Ugradnje s YouTubea, Vimea ili vlastiti hostani. Koristite opciju lazy load da videi ne usporavaju stranicu.

**Google Maps.** Ugrađuje kartu. Korisno za kontakt stranice. Imajte na umu da dodaje težinu stranici.

**Forma (Pro).** Kontakt forme, prijave za newsletter i više. Dostupno samo u Elementor Pro.

## Rad s predlošcima i spremljenim elementima

Predlošci su jedna od najboljih Elementorovih značajki. Evo kako ih koristiti učinkovito.

**Predlošci stranica** su dizajni cijelih stranica. Importirajte jedan, zamijenite sadržaj i imate stranicu za minutu.

**Predlošci blokova** su pojedinačni blokovi (hero banner, blok sa svjedočanstvima, tablica cijena). Možete ih miješati i kombinirati kroz različite stranice.

**Spremljeni predlošci** su kontejneri ili stranice koje ste izgradili i spremili za ponovnu upotrebu. Ako dizajnirate savršen blok za poziv na akciju, spremite ga kao predložak i ubacite na bilo koju stranicu kasnije.

Za spremanje predloška: kliknite desnom tipkom na kontejner, odaberite "Spremi kao predložak," dajte mu ime. Za korištenje: kliknite ikonu mape kada dodajete novi kontejner i idite na "Moji predlošci."

## Uobičajene početničke greške za izbjegavanje

**Korištenje previše fontova.** Držite se dvaju. Jedan za naslove, jedan za tekst. Svaki dodatni font usporava stranicu. Pročitajte naš vodič za [odabir pravog fonta](/blog/kako-odabrati-pravi-font/) ako niste sigurni odakle početi.

**Ignoriranje mobilnog prikaza.** Uvijek provjerite tablet i mobilni prikaz prije objave. Ono što izgleda sjajno na vašem 27-inčnom monitoru može biti nečitljivo na telefonu.

**Pretjerivanje s animacijama.** Ulazne animacije su zabavne. Ali stranica gdje svaki element skače, bljeska i klizi unutra djeluje kaotično. Koristite animacije štedljivo i namjerno.

**Neorganiziranje kontejnera.** Koristite Navigator (ikona slojeva na dnu lijevog panela) za imenovanje kontejnera. "Hero," "Usluge," "Svjedočanstva," "CTA." Vaše buduće ja će vam zahvaliti.

**Preskakanje sigurnosnih kopija.** Prije velikih promjena, spremite rad. Elementor ima povijest revizija (ikona sata u donjem panelu), ali održavajte i prave sigurnosne kopije stranice preko hosting providera.

## Savjeti za performanse

Elementor stranice obično su teže od ručno kodiranih. Možete minimizirati utjecaj.

**Optimizirajte slike prije uploada.** Koristite alate poput TinyPNG ili ShortPixel. Uploadajte slike u veličini u kojoj će se prikazivati, ne 4000x3000 piksela za thumbnail od 400 px.

**Onemogućite nekorištene widgete.** U Elementor postavkama možete onemogućiti widgete koje ne koristite. Svaki aktivni widget učitava svoj CSS i JS bez obzira koristite li ga ili ne.

**Koristite caching dodatak.** WP Super Cache, W3 Total Cache ili LiteSpeed Cache (ako vaš hosting to podržava). Caching dramatično smanjuje opterećenje servera i ubrzava ponovljene posjete.

**Minimizirajte dodatke općenito.** Svaki aktivni dodatak dodaje težinu. Redovito revidirajte listu dodataka i deaktivirajte sve što aktivno ne trebate.

Za više o ubrzavanju stranice, naš [vodič za optimizaciju brzine](/blog/kako-optimizirati-brzinu-web-stranice/) pokriva detalje.

## Kad preraste Elementor

Elementor je sjajno polazište. Ozbiljno. Omogućuje nedeveloperima da grade prave web stranice i nauče što funkcionira za njihovo poslovanje.

Ali postoji gornja granica. Kad vašoj stranici trebaju bolje performanse, jedinstvene interakcije ili manje ovisnosti, prilagođeni razvoj postaje logičan sljedeći korak. Sam WordPress je [čvrst temelj](/blog/zasto-je-wordpress-najbolji-cms-za-vas-posao/) koji radi sa ili bez buildera stranica.

Obrazac koji često viđamo: tvrtka počne s Elementorom, shvati što njihova web stranica treba raditi, pa onda investira u prilagođenu izradu dizajniranu specifično za te potrebe. To nije neuspjeh. To je pametan rast.

---

*Elementor vam daje solidan način za početak. Kad udarite u granicu onoga što builder stranica može ponuditi, naš [tim za web dizajn](/services/web-design/) gradi prilagođene stranice koje rastu s vašim poslovanjem.*
