---
title: "WordPress-Sicherheitscheckliste: Hacker dauerhaft stoppen"
slug: "so-schutzen-sie-ihre-wordpress-website-vor-hackern-und-viren"
originalUrl: "https://version2.hr/de/so-schutzen-sie-ihre-wordpress-website-vor-hackern-und-viren/"
language: "de"
translations:
  hr: "zastita-wordpress-web-stranice"
  en: "wordpress-security-checklist"
date: "2024-06-08"
lastModified: "2026-03-19"
author: "Version2"
category: "wordpress"
tags: ["WordPress", "Security"]
excerpt: "WordPress-Websites werden täglich gehackt. Die meisten Angriffe nutzen grundlegende Schwachstellen aus, die in wenigen Minuten behoben werden können. Hier ist eine praktische Sicherheitscheckliste."
featuredImage: "./assets/featured.jpeg"
---

# WordPress-Sicherheitscheckliste: Hacker dauerhaft stoppen

WordPress betreibt über 40 % des Webs. Das macht es zum größten Ziel für Hacker, Bots und automatisierte Angriffe. Jeden einzelnen Tag werden tausende WordPress-Websites kompromittiert. Nicht weil WordPress von Haus aus unsicher wäre, sondern weil Websitebetreiber grundlegende Sicherheitspraktiken überspringen.

Die gute Nachricht: Die meisten Angriffe nutzen dieselbe Handvoll Schwachstellen aus. Beheben Sie diese, und Sie eliminieren die überwiegende Mehrheit der Bedrohungen. Dies ist die praktische Checkliste, die wir bei jeder WordPress-Website befolgen, die wir bauen und betreuen.

## Beginnen Sie mit gutem Hosting

Ihr Hosting-Anbieter ist Ihre erste Verteidigungslinie. Ein schlechter Hoster mit veralteter Serversoftware, ohne Firewall und mit geteilten Ressourcen ist eine offene Einladung.

**Worauf Sie achten sollten:**

- Firewalls auf Serverebene und DDoS-Schutz
- Automatisierte tägliche Backups (nicht nur wöchentliche)
- Kostenlose SSL-Zertifikate inklusive
- PHP-Version 8.2 oder höher (8.3+ empfohlen für beste Performance und Sicherheit)
- 24/7-Support, der tatsächlich antwortet

Shared Hosting ist die günstigste Option, bedeutet aber, dass Sie Serverressourcen mit Hunderten anderer Websites teilen. Wird eine davon kompromittiert, kann sich der Angriff ausbreiten. VPS oder dediziertes Hosting gibt Ihnen Isolation. Für die meisten kleinen bis mittleren Websites ist ein qualitativ hochwertiger Shared-Hoster wie [Hostinger](/blog/najbolji-web-hosting-hostinger/) ein vernünftiger Ausgangspunkt.

## Halten Sie alles aktuell

Dies ist die wichtigste Sicherheitspraxis überhaupt. Und die am meisten ignorierte.

Der WordPress-Kern, Ihr Theme und jedes installierte Plugin erhalten regelmäßige Updates. Viele dieser Updates schließen bekannte Sicherheitslücken. Wenn Sie Updates überspringen, lassen Sie dokumentierte Einstiegspunkte sperrangelweit offen für Angreifer.

**Richten Sie ein System ein:**

- Aktivieren Sie automatische Updates für den WordPress-Kern
- Aktualisieren Sie Plugins und Themes mindestens wöchentlich
- Löschen Sie alle Plugins oder Themes, die Sie nicht verwenden. Deaktivierte Plugins können trotzdem ausgenutzt werden. Das gilt auch für Page-Builder — wenn Sie sich fragen, ob [Elementor das richtige Tool für Ihr Projekt](/blog/je-li-elementor-dobar-alat-za-web-dizajn/) ist, berücksichtigen Sie den Sicherheitswartungsaufwand, den es mit sich bringt.
- Prüfen Sie Updates manuell, wenn automatische Updates keine Option sind

Wenn ein Update etwas kaputtmacht, dafür haben Sie Backups. Apropos Backups...

## Automatisieren Sie Ihre Backups

Backups sind keine Option. Sie sind Ihre Versicherungspolice. Wenn Ihre Website gehackt wird, ist ein sauberes Backup der schnellste Weg zur Wiederherstellung.

**Verwenden Sie UpdraftPlus oder BlogVault** für automatische Backups nach Zeitplan. Täglich ist ideal. Wöchentlich ist das Minimum. Speichern Sie sie extern — auf Google Drive, Dropbox oder Amazon S3. Verlassen Sie sich nie ausschließlich auf Backups, die auf demselben Server wie Ihre Website liegen. Wird der Server kompromittiert, gehen Ihre Backups mit verloren.

Testen Sie Ihre Backups regelmäßig. Ein Backup, das Sie nicht wiederherstellen können, ist kein Backup.

## Sichern Sie Ihre Login-Seite ab

Die WordPress-Anmeldeseite unter `/wp-admin` ist die Eingangstür, die jeder Bot im Internet kennt. So verstärken Sie sie.

**Verwenden Sie starke, einzigartige Passwörter.** Nicht "Firmenname2024." Nutzen Sie einen Passwortmanager. Generieren Sie etwas Zufälliges und Langes. Das ist nicht verhandelbar.

**Aktivieren Sie Zwei-Faktor-Authentifizierung (2FA).** Installieren Sie ein Plugin wie WP 2FA oder Two-Factor. Selbst wenn jemand Ihr Passwort stiehlt, kann er sich ohne den zweiten Faktor nicht anmelden. Verwenden Sie Google Authenticator oder Authy für die Verifizierungscodes.

**Begrenzen Sie die Anmeldeversuche.** Standardmäßig erlaubt WordPress unbegrenzte Anmeldeversuche. Das bedeutet, Bots können Tausende von Passwortkombinationen durchprobieren. Plugins wie Limit Login Attempts Reloaded oder Wordfence sperren IP-Adressen nach einer festgelegten Anzahl fehlgeschlagener Versuche.

**Ändern Sie Ihre Login-URL.** Die Standard-Pfade `/wp-admin` und `/wp-login.php` sind die ersten Stellen, die Angreifer aufsuchen. Ein Plugin wie WPS Hide Login ermöglicht es Ihnen, dies in etwas Unvorhersehbares zu ändern. Eine einfache Änderung, die viele automatisierte Angriffe stoppt.

**Beschränken Sie den Admin-Zugang nach IP-Adresse.** Wenn Sie und Ihr Team immer von denselben Standorten aus arbeiten, können Sie diese IP-Adressen auf eine Whitelist setzen und alle anderen blockieren. Das ist nicht für jeden praktikabel, aber äußerst wirksam, wenn es funktioniert.

## Installieren Sie ein Sicherheits-Plugin

Ein dediziertes Sicherheits-Plugin fügt mehrere Schutzebenen hinzu, ohne dass Sie jede einzeln konfigurieren müssen.

**Wordfence** ist die beliebteste Option. Es umfasst eine Web Application Firewall, Malware-Scanner, Login-Sicherheitsfunktionen und Echtzeit-Bedrohungsintelligenz. Die kostenlose Version deckt das Wesentliche ab. Die Premium-Version fügt Echtzeit-Firewall-Regeln und Länderblockierung hinzu.

**Sucuri** ist eine weitere starke Wahl, besonders wenn Sie eine Cloud-basierte Firewall wünschen, die den Datenverkehr filtert, bevor er Ihren Server überhaupt erreicht.

**iThemes Security** (jetzt SolidWP) bietet Dateiänderungserkennung, Datenbank-Backups und Brute-Force-Schutz.

Wählen Sie eines. Konfigurieren Sie es richtig. Installieren Sie nicht mehrere Sicherheits-Plugins. Sie kollidieren miteinander und schaffen mehr Probleme als sie lösen.

## SSL/TLS korrekt einrichten

Ein SSL-Zertifikat verschlüsselt die Verbindung zwischen Ihren Besuchern und Ihrem Server. Ohne dieses reisen Daten im Klartext. Passwörter, Formulardaten — alles.

Die meisten Hoster bieten mittlerweile kostenloses SSL über Let's Encrypt an. Stellen Sie sicher, dass es aktiv ist. Ihre Website sollte ausschließlich über `https://` laden.

**Aktivieren Sie HSTS (HTTP Strict Transport Security).** Dies weist Browser an, immer HTTPS zu verwenden, selbst wenn jemand die HTTP-Version Ihrer URL eingibt. Es verhindert Downgrade-Angriffe und stellt zu jeder Zeit verschlüsselte Verbindungen sicher.

**Erzwingen Sie HTTPS in WordPress.** Aktualisieren Sie Ihre WordPress-Adresse und Website-Adresse unter Einstellungen > Allgemein auf `https://`. Installieren Sie ein Plugin wie Really Simple SSL, wenn Sie Mixed-Content-Probleme beheben müssen.

## Benutzerkonten richtig verwalten

Nicht jeder, der Zugang zu Ihrem WordPress-Admin hat, braucht volle Administratorrechte. Das Prinzip der minimalen Berechtigung gilt auch hier.

- **Redakteure** können Inhalte verwalten, aber keine Plugins installieren oder Einstellungen ändern.
- **Autoren** können ihre eigenen Beiträge schreiben und veröffentlichen.
- **Mitarbeiter** können Entwürfe schreiben, aber nicht veröffentlichen.

Verwenden Sie das Plugin User Role Editor, wenn Sie benutzerdefinierte Rollen benötigen, die über die WordPress-Standardrollen hinausgehen.

Entfernen Sie inaktive Benutzerkonten. Ändern Sie Passwörter, wenn Teammitglieder ausscheiden. Überprüfen Sie Ihre Benutzerliste vierteljährlich.

## Überwachen Sie Ihre Website

Sicherheit ist keine Einmal-Einrichten-und-Vergessen-Angelegenheit. Sie müssen wissen, wenn etwas schiefgeht.

**Aktivitätsprotokollierung.** Plugins wie WP Activity Log verfolgen jede Änderung in Ihrem Admin-Panel. Wer hat sich angemeldet, was wurde geändert, wann wurde es gemacht. Unschätzbar für Fehlerbehebung und Incident Response.

**Verfügbarkeitsüberwachung.** Nutzen Sie einen Dienst wie UptimeRobot oder die integrierte Überwachung Ihres Hosters, um Sie zu benachrichtigen, wenn Ihre Website ausfällt.

**Dateiintegritätsüberwachung.** Ihr Sicherheits-Plugin sollte Sie warnen, wenn WordPress-Kerndateien unerwartet verändert werden. Unbefugte Dateiänderungen sind eines der ersten Anzeichen einer Kompromittierung.

## Wenn Sie über WordPress-Sicherheitsbedenken hinausgewachsen sind

Für viele Unternehmen ist eine gut abgesicherte WordPress-Website völlig ausreichend. Befolgen Sie die oben genannten Praktiken, und Sie werden 95 % der WordPress-Websitebetreiber voraus sein.

Aber wenn Ihre Website sensible Daten verarbeitet, Transaktionen abwickelt oder in einer Branche mit strengen Compliance-Anforderungen operiert, stößt der Plugin-Ansatz zur Sicherheit an seine Grenzen. Sie stapeln Tools von Drittanbietern auf eine Plattform, die ursprünglich für das Bloggen konzipiert wurde.

[Individuell entwickelte Webanwendungen](/services/web-applications/) geben Ihnen Sicherheit auf Architekturebene. Keine Plugin-Schwachstellen. Keine Theme-Exploits. Keine Angriffsfläche durch ungenutzte Features. Nur der Code, den Ihre Anwendung braucht, so abgesichert, wie es sein sollte.

Wir verwalten die Sicherheit für beide Projekttypen. Für WordPress-Kunden kümmern wir uns um Updates, Überwachung und Incident Response durch unsere [Wartungspläne](/services/). Für individuelle Projekte ist Sicherheit von Tag eins an in den Bau integriert.

---

*Nicht sicher, ob Ihre WordPress-Website richtig geschützt ist? [Fordern Sie eine kostenlose Analyse an](/analysis/) und wir prüfen Ihre aktuelle Konfiguration und sagen Ihnen genau, was behoben werden muss.*
