---
title: "Wie verbinde ich Cloudflare mit meiner Website?"
slug: "so-verbinden-sie-cloudflare-mit-ihrer-website"
originalUrl: "https://version2.hr/de/so-verbinden-sie-cloudflare-mit-ihrer-website/"
language: "de"
translations:
  hr: "kako-povezati-cloudflare-s-vasom-web-stranicom"
  en: "how-to-connect-cloudflare-to-your-website"
date: "2023-09-15"
lastModified: "2026-03-19"
author: "Version2"
category: "web-development"
tags: ["Performance", "Security", "Hosting"]
excerpt: "Cloudflare kann Ihre Website kostenlos schneller und sicherer machen. So richten Sie es richtig ein, was jede Einstellung bewirkt und welche Fehler Probleme verursachen."
featuredImage: "./assets/featured.jpg"
---

# So richten Sie Cloudflare für Ihre Website ein (Schritt für Schritt)

Ihre Website sitzt auf einem Server irgendwo. Jeder Besucher verbindet sich direkt mit diesem Server, egal wo auf der Welt er sich befindet. Ein Besucher aus Zagreb, ein Besucher aus Tokio, ein Besucher aus New York. Alle treffen auf dieselbe Maschine im selben Rechenzentrum.

Cloudflare sitzt zwischen Ihren Besuchern und Ihrem Server. Es cached Ihre Inhalte über 330+ Rechenzentren in mehr als 120 Ländern, blockiert bösartigen Traffic bevor er Sie erreicht und beschleunigt die Auslieferung für alle. Der kostenlose Plan deckt das meiste ab, was kleine und mittlere Unternehmen brauchen.

So richten Sie es richtig ein.

## Warum Cloudflare für Ihre Website wichtig ist

Drei Gründe. Geschwindigkeit, Sicherheit und Zuverlässigkeit.

**Geschwindigkeit.** Cloudflares CDN (Content Delivery Network) speichert Kopien Ihrer statischen Dateien (Bilder, CSS, JavaScript) auf Servern weltweit. Wenn jemand aus München Ihre Website besucht, bekommt er Dateien von einem nahegelegenen Cloudflare-Server statt von Ihrem Hosting in Kroatien. Der Unterschied ist spürbar. [Geschwindigkeitsverbesserungen](/blog/kako-optimizirati-brzinu-web-stranice/) von 30-60% sind üblich für Websites mit internationalen Besuchern.

**Sicherheit.** Cloudflare filtert Traffic, bevor er Ihren Server erreicht. DDoS-Angriffe, bösartige Bots, Brute-Force-Loginversuche. Alles wird am Netzwerkrand behandelt. Das ist besonders wertvoll, wenn Sie WordPress oder ein anderes CMS betreiben, bei dem [Sicherheit](/blog/kako-svoju-web-stranicu-odrzati-sigurnom/) ständige Wachsamkeit erfordert.

**Zuverlässigkeit.** Wenn Ihr Server ausfällt, kann Cloudflare eine gecachte Version Ihrer Website ausliefern. Besucher sehen eine leicht veraltete Seite statt eines Fehlerbildschirms. Nicht perfekt, aber unendlich besser als nichts.

Und nochmal: Der kostenlose Plan kann all das.

## Bevor Sie beginnen

Sie brauchen drei Dinge.

**Zugang zu Ihrem Domain-Registrar.** Das ist der Anbieter, bei dem Sie Ihren Domainnamen gekauft haben (GoDaddy, Namecheap, Squarespace, Ihr lokaler Anbieter). Sie müssen Nameserver ändern, also stellen Sie sicher, dass Sie sich einloggen und DNS-Einstellungen bearbeiten können.

**Eine Liste Ihrer aktuellen DNS-Einträge.** Cloudflare scannt diese automatisch, aber eine eigene Referenz hilft, alles aufzufangen, was übersehen wird. Loggen Sie sich in Ihre aktuelle DNS-Verwaltung ein, machen Sie Screenshots von allem, oder exportieren Sie die Zone-Datei, wenn Ihr Anbieter das erlaubt.

**30 Minuten ununterbrochene Zeit.** Die Einrichtung selbst dauert etwa 10 Minuten. Aber die DNS-Propagation kann bis zu 48 Stunden dauern (normalerweise viel schneller). Planen Sie dies während einer verkehrsarmen Zeit, nicht direkt vor einem Produktlaunch.

## Schritt-für-Schritt-Einrichtung

### 1. Erstellen Sie ein Cloudflare-Konto

Gehen Sie zu cloudflare.com und registrieren Sie sich. Verwenden Sie eine E-Mail-Adresse, die Sie tatsächlich abrufen. Cloudflare sendet wichtige Benachrichtigungen über Sicherheitsereignisse und Konfigurationsprobleme.

### 2. Fügen Sie Ihre Website hinzu

Klicken Sie auf "Add a Site" und geben Sie Ihren Domainnamen ein. Nur die Domain, ohne www oder https-Prefix. Zum Beispiel: `ihredomain.de`.

Cloudflare wird Sie bitten, einen Plan zu wählen. Beginnen Sie mit Free. Sie können später upgraden. Der kostenlose Plan umfasst CDN, grundlegenden DDoS-Schutz, SSL und genügend Features für die meisten Websites.

### 3. DNS-Einträge überprüfen

Cloudflare scannt Ihre bestehenden DNS-Einträge und importiert sie. Das ist der wichtigste Schritt. Überprüfen Sie jeden Eintrag sorgfältig.

**A-Einträge** verweisen Ihre Domain auf die IP-Adresse Ihres Servers. Diese sollten "proxied" sein (oranges Wolken-Icon), damit der Traffic durch Cloudflare geleitet wird.

**CNAME-Einträge** verweisen Subdomains auf andere Domains. Proxyen Sie diese ebenfalls, es sei denn, Sie haben einen bestimmten Grund dagegen.

**MX-Einträge** steuern die E-Mail-Weiterleitung. Diese dürfen NICHT proxied sein. Wenn Sie MX-Einträge proxyen, funktioniert Ihre E-Mail nicht mehr. Cloudflare sollte diese automatisch auf "DNS only" (graue Wolke) setzen, aber überprüfen Sie es.

**TXT-Einträge** verwalten Dinge wie Domain-Verifizierung und E-Mail-Authentifizierung (SPF, DKIM, DMARC). Diese bleiben auf DNS-only.

Einen Eintrag hier zu übersehen bedeutet, dass dieser Dienst aufhört zu funktionieren, sobald Sie die Nameserver umstellen. Vergleichen Sie mit Ihrem früheren DNS-Screenshot.

### 4. Nameserver ändern

Cloudflare gibt Ihnen zwei Nameserver-Adressen. Etwas wie `ada.ns.cloudflare.com` und `wes.ns.cloudflare.com`.

Gehen Sie zu Ihrem Domain-Registrar. Finden Sie die Nameserver-Einstellungen. Ersetzen Sie Ihre aktuellen Nameserver durch die zwei, die Cloudflare bereitgestellt hat. Speichern.

Das ist der Punkt ohne Umkehr (gewissermaßen). Sobald sich DNS propagiert, fließt der gesamte Traffic durch Cloudflare. Wenn Sie in Schritt 3 einen DNS-Eintragsfehler gemacht haben, erfahren Sie es jetzt. Deshalb ist der Backup-Screenshot wichtig.

Die Propagation dauert normalerweise 15 Minuten bis wenige Stunden. Gelegentlich bis zu 48 Stunden. Cloudflare schickt Ihnen eine E-Mail, wenn es aktiv ist.

### 5. SSL/TLS konfigurieren

Sobald Cloudflare aktiv ist, gehen Sie zu den SSL/TLS-Einstellungen. Sie haben vier Optionen.

**Off:** Keine Verschlüsselung. Verwenden Sie dies niemals.

**Flexible:** Verschlüsselt Traffic zwischen Besuchern und Cloudflare, aber NICHT zwischen Cloudflare und Ihrem Server. Verwenden Sie dies nur, wenn Ihr Hosting absolut kein SSL unterstützt.

**Full:** Verschlüsselt alles, überprüft aber nicht das Zertifikat Ihres Servers. Besser als Flexible.

**Full (Strict):** Verschlüsselt alles und überprüft das SSL-Zertifikat Ihres Servers. Das ist die Option, die Sie wollen. Wenn Ihr Hosting SSL unterstützt (die meisten tun es), verwenden Sie Full (Strict).

Setzen Sie "Always Use HTTPS" auf Ein. Setzen Sie "Automatic HTTPS Rewrites" auf Ein. Das stellt sicher, dass Besucher immer die verschlüsselte Version Ihrer Website bekommen.

### 6. Regeln einrichten

Cloudflares Regeln ermöglichen es Ihnen, das Verhalten für bestimmte URLs zu steuern. Die alte "Page Rules"-Funktion wurde 2024-2025 eingestellt und durch leistungsfähigere moderne Regeltypen ersetzt: Cache Rules, Configuration Rules, Redirect Rules und andere.

**Cache Rules für statische Seiten.** Wenn Sie Seiten haben, die sich selten ändern (wie eine Landingpage), erstellen Sie eine Cache-Regel, die das gesamte HTML cached. Das macht diese Seiten unglaublich schnell.

**Configuration Rules für Admin-Bereiche.** Wenn Sie WordPress nutzen, erstellen Sie eine Configuration-Regel für `ihredomain.de/wp-admin/*`, um den Cache zu umgehen. Andernfalls sehen Sie möglicherweise veraltete Inhalte in Ihrem Admin-Panel.

**Redirect Rules für HTTPS.** Erstellen Sie eine Redirect-Regel, die allen HTTP-Traffic auf HTTPS umleitet, falls die automatische Einstellung nicht alles erfasst.

## Häufige Probleme und ihre Lösungen

**Mixed-Content-Warnungen.** Ihre Website lädt über HTTPS, aber einige Ressourcen (Bilder, Scripts) laden noch über HTTP. Beheben Sie das an der Quelle, indem Sie URLs in Ihrem CMS aktualisieren. Cloudflares Automatic HTTPS Rewrites helfen, fangen aber nicht alles ab.

**Endlose Weiterleitungsschleifen.** Das passiert, wenn Ihr Server HTTPS erzwingt und Cloudflares SSL-Modus auf "Flexible" steht. Cloudflare verbindet sich über HTTP mit Ihrem Server, Ihr Server leitet auf HTTPS um, Cloudflare verbindet sich wieder über HTTP. Schleife. Lösung: Setzen Sie SSL auf "Full" oder "Full (Strict)."

**Veraltete gecachte Inhalte.** Sie aktualisieren Ihre Website, aber Besucher sehen die alte Version. Gehen Sie zum Cloudflare-Dashboard, Caching, Purge Everything. Oder besser: Löschen Sie gezielt die URLs, die sich geändert haben. Richten Sie automatisches Cache-Purging nach Deployments ein, wenn Sie häufig deployen.

**E-Mail funktioniert nicht mehr.** Sie haben Ihre MX-Einträge proxied. Gehen Sie zurück zu DNS, finden Sie Ihre MX-Einträge, klicken Sie auf die orangene Wolke, um sie grau zu schalten (DNS only). E-Mail funktioniert wieder.

**WordPress-Login-Probleme.** Cloudflares Sicherheitsfunktionen markieren manchmal legitime Loginversuche. Setzen Sie Ihre IP-Adresse auf die Whitelist in Cloudflares Firewall-Regeln. Oder erstellen Sie eine Regel, um das Sicherheitsniveau für Ihre Login-URL zu reduzieren.

## Performance-Einstellungen, die sich lohnen

Im Speed-Bereich Ihres Cloudflare-Dashboards aktivieren Sie Folgendes.

**Brotli-Komprimierung.** Besser als gzip. Reduziert Dateigrößen weiter. Kein Grund, es nicht zu aktivieren. Hinweis: Cloudflares Auto-Minify-Funktion wurde im August 2024 eingestellt. Minifizierung sollte jetzt zur Build-Zeit über Ihr Framework oder Build-Tools erfolgen.

**Early Hints.** Teilt Browsern mit, mit dem Laden von Ressourcen zu beginnen, bevor die vollständige Seitenantwort eintrifft. Leichte Verbesserung der wahrgenommenen Ladezeit.

**Rocket Loader** (mit Vorsicht verwenden). Verzögert das Laden aller JavaScript-Dateien. Das kann einige Websites kaputtmachen. Aktivieren Sie es, testen Sie gründlich, deaktivieren Sie es, wenn etwas nicht funktioniert.

## Was der kostenlose Plan nicht abdeckt

Der kostenlose Plan ist großzügig, aber kostenpflichtige Pläne bieten echten Mehrwert für Unternehmen, die ihn brauchen.

**Pro (20$/Monat):** Bessere Bildoptimierung, eine Web Application Firewall mit verwalteten Regelsätzen und mobile Optimierung. Lohnenswert für Geschäftswebsites mit signifikantem Traffic.

**Business (200$/Monat):** Benutzerdefinierte SSL-Zertifikate, fortgeschrittener DDoS-Schutz und 100% Uptime-SLA. Für Websites, bei denen Ausfallzeiten echtes Geld kosten.

Für die meisten kleinen Geschäftswebsites und [Landingpages](/blog/kako-napraviti-dobar-landing-page/) reicht der kostenlose Plan völlig aus. Starten Sie damit. Upgraden Sie, wenn Sie auf eine spezifische Einschränkung stoßen, nicht weil eine Feature-Liste verlockend aussieht.

## Reicht Cloudflare für die Website-Sicherheit?

Cloudflare fügt eine bedeutende Sicherheitsschicht hinzu. Aber es ist keine vollständige Sicherheitsstrategie. Sie müssen weiterhin Ihr CMS aktuell halten, starke Passwörter verwenden, den Admin-Zugang einschränken und [Sicherheits-Best-Practices](/blog/kako-svoju-web-stranicu-odrzati-sigurnom/) auf Ihrem tatsächlichen Server befolgen.

Stellen Sie sich Cloudflare als Türsteher vor. Wichtig, aber kein Ersatz dafür, den Tresor drinnen abzuschließen.

---

*Brauchen Sie Hilfe bei der Cloudflare-Konfiguration oder ein vollständiges Performance- und Sicherheits-Audit? [Entdecken Sie unsere Webdesign-Services](/services/web-design/) oder [kontaktieren Sie uns](/contact/) und wir sorgen dafür, dass Ihre Website schnell, sicher und richtig konfiguriert ist.*
