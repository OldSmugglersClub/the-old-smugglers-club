# Version 3.2 – Statistik- und Highscore-Erweiterung

- Feldanalyse mit Durchschnitt, Median, Punktespanne und Streuung ergänzt.
- Leistungszonen für den bestätigten Gesamtstand ergänzt.
- Transparenter Bereitschaftsmodus ohne simulierte Werte.
- Keine Änderungen an Grundlayout, Kachelgrößen oder Navigation.

# Version 3.0.1 – Repository Cleanup (31.07.2026)

- GitHub-Paket auf direkte Root-Struktur bereinigt.
- Alte Versions-READMEs, Upload-Anleitungen und Testdateien entfernt.
- Nicht referenzierte Zwischenstände von Bildern, CSS, JavaScript und JSON entfernt.
- Explizite Dateiänderungsliste für GitHub ergänzt.
- Keine Änderung an Layout, Kachelgrößen, Navigation oder produktiven Website-Funktionen.

# Changelog

## Version 2.43 – Zentrale Wettbewerbs- und Saisonmetadaten

- Wettbewerbsnavigation, Seitenfilter und Saisonmetadaten in `wettbewerbe.json` zusammengeführt.
- Saisonübersicht an das zentrale Wettbewerbsregister angebunden.
- Doppelte Pflege von Wettbewerbsnamen, Seitenzielen, Filtern, Zielwerten, Zeiträumen und Statusangaben entfernt.
- `saison-2026-2027.json` auf globale Saison- und Seitentexte reduziert.
- Startseiten-Spieltaganzeige lädt ihre vier Datenquellen nun vollständig über `datenregister.json`.
- Rückfallpfade bleiben erhalten; Grundlayout, Kachelgrößen und freigegebene Bereiche unverändert.


## Version 2.41 – Zentrale Wettbewerbsregistrierung

- Neue zentrale Datei `wettbewerbe.json` für Navigation, Seitenzuordnung und Spiel-Filter.
- Alle acht Wettbewerbsseiten lesen dieselben Wettbewerbsdefinitionen.
- Doppelt gepflegte Filter- und Navigationslisten in der Laufzeitlogik entfallen.
- Neuer Bereich „Zentrale Datenbasis“ zeigt die gemeinsam genutzten Quellen und den aktiven Seitenfilter.
- Seitenspezifische JSON-Dateien bleiben auf redaktionelle Texte beschränkt.
- Grundlayout, Raster, Kachelgrößen und freigegebene Bereiche unverändert.

# Version 2.40 – Wettbewerbs-Dashboard & Bereitschaftsmatrix

- Aufklappbare Gesamtlage aller acht Wettbewerbe auf jeder Wettbewerbsseite ergänzt.
- Erfassten Spielumfang, Terminierungsstand, beendete Spiele und nächsten offenen Eintrag zentral vergleichbar gemacht.
- Belastbare Statusstufen „Nicht vorbereitet“, „Struktur vorbereitet“, „Teilweise terminiert“, „Terminbereit“ und „Abgeschlossen“ eingeführt.
- Aktive Wettbewerbsseite in der Matrix markiert und alle Wettbewerbe direkt verlinkt.
- Alle Werte ausschließlich aus `spieldaten.json` abgeleitet; keine Termine oder Ergebnisse geschätzt.
- Kontrollansicht als Vorbereitung für die anschließende Vereinheitlichung der zentralen Datenpflege umgesetzt.
- Mobile Tabellenansicht innerhalb des Bereichs scrollbar gehalten.
- Grundlayout, Raster, Kachelgrößen und übrige Websitebereiche unverändert gelassen.

# Changelog

## Version 2.39 – Wettbewerbs-Lagebild

- Einheitliches aktuelles Lagebild auf allen acht Wettbewerbsseiten ergänzt.
- Letztes bestätigtes Ergebnis wird mit Termin und Resultat ausgewiesen.
- Nächste bestätigte Partie wird getrennt von noch offenen Einträgen angezeigt.
- Wettbewerbsfortschritt wird ausschließlich aus zentral erfassten Spielen und Endergebnissen berechnet.
- Anzahl der erfassten Runden beziehungsweise Abschnitte wird transparent dargestellt.
- Fehlende Termine, Paarungen und Ergebnisse bleiben ausdrücklich als offen markiert.
- Responsive Darstellung für Desktop, Tablet und Mobilgeräte ergänzt.
- Grundlayout, Raster, Kachelgrößen und bereits freigegebene Bereiche bleiben unverändert.

## Version 2.37 – Wettbewerbs-Navigator & Datenkompass

- Alle acht Wettbewerbsseiten besitzen jetzt einen gemeinsamen, responsiven Wettbewerbs-Navigator.
- Die aktuell geöffnete Wettbewerbsseite wird eindeutig markiert.
- Neuer Wettbewerbs-Kompass mit zentral erfassten Spielen, abgeschlossenen Partien, offenen Begegnungen und nächstem Termin.
- Der Datenstand wird direkt aus `spieldaten.json` übernommen.
- Fehlende Daten werden ausdrücklich ausgewiesen und nicht geschätzt.
- Keine Änderungen am freigegebenen Grundlayout, Raster oder an den Kachelgrößen der Startseite.

## Version 2.36 – Highscore Saisonarchiv & Clubchronik

- Zentrale `hall-of-fame.json` zusätzlich in die Highscore eingebunden.
- Neuer Bereich „Saisonarchiv & Bestmarken“ mit ausschließlich bestätigten Titeln und Rekorden.
- Offene oder unbestätigte Chronikeinträge werden automatisch ausgeblendet.
- Spielerprofile zeigen vorhandene historische Titel und Rekorde des jeweiligen Spielers.
- Ausfall der Hall-of-Fame-Datei beeinträchtigt die aktuelle Rangliste nicht.
- Desktop-, Tablet- und Mobilgestaltung im bestehenden Holz-, Leder- und Messingstil ergänzt.
- Grundlayout, Raster, Kachelgrößen und übrige Websitebereiche unverändert.

# Version 2.35 – Highscore Saisonverlauf & Trendprüfung

- Verlaufskompass für archivierte Highscore-Stände ergänzt.
- Führungswechsel und größte dokumentierte Rangverbesserung werden nur bei mindestens zwei vollständigen Archivständen berechnet.
- Spielerprofile um eine Verlaufsanalyse mit Rangbewegung, Punktezuwachs und bestem dokumentierten Rang erweitert.
- Fehlende Historiedaten werden transparent als nicht berechenbar ausgewiesen; es werden keine Trends simuliert.
- Flexible Unterstützung für archivierte Ranglisten unter `standings`, `overall` oder `players` ergänzt.
- Darstellung im bestehenden Holz-, Leder- und Messingdesign für Desktop, Tablet und Mobilgeräte ergänzt.
- Grundlayout, Raster, Kachelgrößen, zentrale JSON-Struktur und übrige Websitebereiche unverändert gelassen.

# Version 2.34 – Highscore Rangabstände & Positionsanalyse

- Spielerprofile um eine datenbasierte Positionsanalyse erweitert.
- Rangzone, Feldposition, Abstand zur Spitze, nächstes Angriffsziel und Absicherung werden aus dem aktuellen Gesamtstand berechnet.
- Punktgleiche Spieler werden transparent ausgewiesen; die offizielle Rangfolge des Exports bleibt maßgeblich.
- Bei noch fehlender sportlicher Wertung bleibt die Analyse bewusst inaktiv und simuliert keine Entwicklung.
- Darstellung im bestehenden Holz-, Leder- und Messingdesign für Desktop, Tablet und Mobilgeräte ergänzt.
- Grundlayout, Raster, Kachelgrößen, zentrale JSON-Struktur und übrige Websitebereiche unverändert gelassen.

# Version 2.33 – Highscore Spieler-Direktvergleich

- Spielerprofile um einen direkten Vergleich mit jedem anderen registrierten Spieler ergänzt.
- Vergleich von Gesamtrang, Gesamtpunkten, Bonuspunkten, Spieltagssiegen, aktuellem Spieltag und Spieltagsrang.
- Bessere Werte werden nachvollziehbar hervorgehoben; bei Rangwerten gilt der niedrigere Wert.
- Transparenter Nullstand-Hinweis, solange noch keine sportliche Wertung vorliegt.
- Vergleichsansicht vollständig im bestehenden Holz-, Leder- und Messingdesign umgesetzt.
- Desktop-, Tablet- und Mobilansicht ergänzt, ohne Grundlayout oder andere Websitebereiche zu verändern.

# Version 2.32 – Highscore Datenkompass & Spielerprofile

## Geändert
- Datenkompass für Quelle, Aktualität, Registerumfang und strukturelle Datenprüfung ergänzt.
- Exportalter wird automatisch bewertet; veraltete Datenstände werden sichtbar gekennzeichnet.
- Gesamt- und Spieltagslisten werden auf Dubletten, Namensabweichungen und ungültige Rangwerte geprüft.
- Spielernamen in Podium und Rangliste öffnen nun ein barrierearmes Detailprofil.
- Spielerprofile vergleichen bestätigte Gesamt-, Bonus- und Spieltagswerte, ohne fehlende Daten zu schätzen.
- Dialogdarstellung für Desktop, Tablet und Mobilgeräte im bestehenden Holz-, Leder- und Messingstil ergänzt.
- Grundlayout, Raster, Kachelgrößen und übrige Websitebereiche bleiben unverändert.

# Changelog

## Version 2.31 – Highscore Registerausgabe & Zustandsübernahme

- CSV-Export für die aktuell gewählte Gesamt- oder Spieltagswertung ergänzt.
- Export berücksichtigt aktive Suche und Sortierung, exportiert aber unabhängig von der sichtbaren Seitengröße alle Treffer.
- Druckansicht für eine reduzierte, klar lesbare Ranglistenausgabe ergänzt.
- Gewählte Ranglistenansicht, Sortierung und Seitengröße werden lokal im Browser gespeichert und beim nächsten Besuch wiederhergestellt.
- Exportdateien enthalten Saison, Ansicht und Datenstand aus der zentralen Highscore-Datendatei.
- Neue Bedienelemente vollständig im bestehenden Holz-, Leder- und Messingstil umgesetzt.
- Mobile Darstellung der Registerausgabe angepasst.
- Grundlayout, Raster, Kachelgrößen und alle übrigen Websitebereiche unverändert gelassen.

## Version 2.30 – Highscore Robustheit & Barrierefreiheit

- Sichtbaren Lade-, Erfolgs- und Fehlerstatus für die zentrale Highscore-Datendatei ergänzt.
- Direkte Wiederholungsfunktion eingebaut, falls `highscore.json` nicht geladen werden kann.
- Strukturprüfung für Gesamtwertung, Spieltagswertung, Teamwertung und Metadaten ergänzt.
- Fehlerzustände liefern jetzt eine verständliche Meldung statt einer leeren oder beschädigten Ansicht.
- Sprunglink zum Highscore-Inhalt und deutlichere Tastatur-Fokusmarkierungen ergänzt.
- Reiternavigation um Home-/Ende-Tasten erweitert.
- Sortierschalter mit präziseren zugänglichen Beschriftungen versehen.
- Unterstützung für reduzierte Bewegungen ergänzt.
- Mobile Darstellung der Systemmeldungen angepasst.
- Grundlayout, Raster, Kachelgrößen und alle übrigen Websitebereiche unverändert gelassen.

## Version 2.29 – Highscore Statistikregister & Detailhierarchie

- Kopfregister für Saison, Berechnungsgrundlage, Exportstand und aktive Statistikmodule ergänzt.
- Rekordkarten in einheitliche gravierte Registertafeln mit eindeutigen Zuständen „Aktiv“ und „Noch offen“ überführt.
- Piratenorden gestalterisch vereinheitlicht und ihre Zustände klarer in die Kartenhierarchie integriert.
- Lesbarkeit, Abstände und visuelle Gewichtung innerhalb der Rekord- und Ordenmodule verbessert.
- Historienzeilen um dezente, nicht aufdringliche Interaktionsrückmeldung ergänzt.
- Responsive Darstellung des neuen Statistikregisters für Tablet und Mobilgeräte ergänzt.
- Keine Bildassets, Cliparts, Emojis oder Standardicons hinzugefügt.
- Grundlayout, Raster, Kachelgrößen und alle übrigen Websitebereiche unverändert gelassen.

# Version 2.28 – Highscore Ranglisten-Kompass

- Kompakte Statusleiste für aktive Ansicht, Sortierung und Trefferzahl ergänzt.
- Zentrale Rücksetzfunktion für Suche, Sortierung, Seitengröße und Pagination eingebaut.
- Leerer Suchzustand als klar gestalteter Schiffsregister-Hinweis mit direkter Rücksetzung umgesetzt.
- Deaktivierte Seitennavigation visuell und funktional eindeutiger dargestellt.
- Fehlerhafte Statuslogik beim Orden „Aufholjäger“ korrigiert: Vorhandene Archivstände allein vergeben keinen Orden.
- Responsive Darstellung der neuen Bedienelemente für Tablet und Mobilgeräte ergänzt.
- Grundlayout, Raster, Kachelgrößen und alle übrigen Websitebereiche unverändert gelassen.

# Changelog

## Version 2.24 – Highscore-Podium im Piratendesign

- Highscore-Podium vollständig innerhalb der bestehenden Seitenstruktur überarbeitet.
- Freien Podiumsbereich mit einem dunklen Rangdeck aus Holz, Messingkanten, Seil-/Takelage-Details und gravierten Rangplaketten ausgestaltet.
- Keine neuen Bilddateien, Cliparts, Emojis oder Standardicons verwendet; alle Gestaltungselemente entstehen aus HTML und CSS.
- Karten der Plätze 1 bis 3 kontrastreicher und klarer hierarchisiert.
- Textbereich oberhalb der Sockel vergrößert; Platz 3 ist nun vollständig lesbar und wird nicht mehr vom Sockel überdeckt.
- Mobile Darstellung des Podiums auf eine einspaltige, vollständig lesbare Variante angepasst.
- Grundlayout, Raster, Seitenaufbau und übrige freigegebene Bereiche unverändert gelassen.

# Änderungsprotokoll

## Version 2.23 – Highscore 3.0

### Neu gestaltet
- Highscore-Seite vollständig an den bestehenden dunklen Piratenstil angeglichen.
- Top-3-Bereich als dreistufiges Holzpodium mit Messingkanten umgesetzt.
- Siegerpodest in der Mitte höher; Platz 2 links und Platz 3 rechts.
- Rekorde und Piratenorden als reine Messing-/Holztafeln gestaltet.

### Entfernt
- Sämtliche Clipart-, Emoji-, Medaillen- und generischen Symbol-Elemente auf der Highscore-Seite.
- Symbolmarken in den Hauptreitern.
- Bildhafte Orden-Icons.

### Unverändert
- Highscore-Datenstruktur und Kicktipp-Import.
- Einzelwertung, Spieltagswertung, Gruppierungen und Rekordlogik.
- Spielersuche sowie Seitennavigation mit 25, 50 oder 100 Einträgen.
- Bestehende Wettbewerbsseiten und das 3×3-Kachelraster.

### Geänderte Dateien
- `highscore.html`
- `highscore.css`
- `highscore.js`
- `VERSION.txt`
- `CHANGELOG.md`

## Version 2.25 – Highscore Professional

- Highscore-Navigation in dunkler Holz- und Messingoptik vereinheitlicht.
- Statistikfelder als eingelassene Schiffstafeln gestaltet.
- Rangliste optisch zu einem historischen Schiffsregister weiterentwickelt.
- Tabellenkopf, Tabellenzeilen, Rangdarstellung und Suchbereich hochwertiger gestaltet.
- Rekord-, Team- und Ordenkarten an die freigegebene Piratendesign-Sprache angepasst.
- Historienbereich und Seitennavigation gestalterisch vereinheitlicht.
- Vorhandenes Podium aus Version 2.24 vollständig beibehalten und in das Gesamtbild eingebunden.
- Keine Bildassets, Cliparts, Emojis oder Standardicons ergänzt.
- Grundlayout, Raster, Kachelgrößen und Seitenaufbau unverändert gelassen.
- Mobile Darstellung berücksichtigt.

## Version 2.26 – Highscore Datenlogik & Bedienung

- Vorläufige Saisonstände mit 0 Punkten werden nicht mehr irreführend als echte Plätze 1 bis 3 ausgegeben.
- Das Podium kennzeichnet eine noch unbesetzte Rangliste transparent als vorläufige alphabetische Reihenfolge.
- Geteilte Führungen werden im Podiumsbereich ausdrücklich ausgewiesen.
- Tabellenführer- und Rekordanzeigen zeigen vor Saisonbeginn korrekt „Noch offen“ statt eines zufälligen Spielernamens.
- Sortierbare Spalten für Rang, Spieler, Punkte, Bonuspunkte und Spieltagssiege ergänzt.
- Mobile Rangliste von einer horizontal scrollenden Tabelle auf vollständig lesbare Registerkarten umgestellt.
- Tastaturbedienung, Fokusdarstellung und ARIA-Zustände der Highscore-Reiter verbessert.
- Der gewählte Highscore-Bereich wird in der URL gespeichert und kann direkt verlinkt werden.
- Grundlayout, Kachelgrößen, Raster und alle übrigen Websitebereiche unverändert gelassen.

## Version 2.27 – Highscore Statistikmodule

- Teamseiten um ein datenbasiertes Mannschaftsduell mit Vorsprung/Rückstand und Vergleichsbalken ergänzt.
- Teamkennzahlen um klare Erläuterungen und belastbare Nullstand-Anzeigen erweitert.
- Neuer Statistikstatus zeigt transparent die Datenreife aller Highscore-Module.
- Rekordkarten unterscheiden nun sichtbar zwischen verfügbaren und noch offenen Bestwerten.
- Piratenorden besitzen eindeutige Zustände „Vergeben“ oder „Gesperrt“; fehlende Daten werden nicht geschätzt.
- Historie als Logbuch-Zeitleiste überarbeitet und um einen sachlichen Leerzustand ergänzt.
- Desktop- und Mobile-Darstellung der neuen Module angepasst.
- Grundlayout, Kachelraster und übrige Websitebereiche unverändert belassen.

## 2.38 – Wettbewerbs-Terminstatus und Datenqualität

- Einheitliche Statusplaketten für beendete, terminierte und noch nicht zeitgenau angesetzte Spiele ergänzt.
- Filter für alle, terminierte, offene und beendete Partien auf den zentralen Spielplänen ergänzt.
- Datenqualitätsprüfung für fehlende Teamreferenzen, Datumsangaben und Quellenstände ergänzt.
- Mobile Darstellung der neuen Filter und Statusinformationen angepasst.
- Grundlayout, Raster und Kachelgrößen unverändert gelassen.

## 2.42 – 2026-07-31

- Neues zentrales `datenregister.json` für gemeinsam genutzte Datenquellen.
- Neuer gemeinsamer Loader `datenregister.js` mit Rückfallpfaden.
- Wettbewerbsseiten, Saisonübersicht, Highscore und Startseiten-Highscore-Teaser an das Register angebunden.
- Dateipfade müssen künftig nicht mehr in mehreren JavaScript-Modulen parallel geändert werden.
- Grundlayout, Kachelgrößen, Abstände und freigegebene Inhalte unverändert belassen.

## 2.44 – 31.07.2026
- Gemeinsames Laufzeit-Datenmodell `datenmodell.js` eingeführt.
- Wettbewerbe, Spiele, Teams und Tippspieltage werden zentral geladen und normalisiert.
- Saisonübersicht und Wettbewerbsseiten verwenden dieselbe Wettbewerbsdefinition.
- Zentrale Statussummen je Wettbewerb vorbereitet.
- Sichere Rückfalllogik und bestehendes Layout beibehalten.

## 2.45 – 31.07.2026
- Zentrale Validierung in `datenmodell.js` ergänzt.
- Automatische Prüfung auf doppelte IDs, unbekannte Teamreferenzen, ungültige Datumsfelder, vertauschte Zeiträume und unvollständige Ergebnisse.
- Tippspieltag-Verweise auf nicht vorhandene Spiele werden erkannt.
- Wettbewerbsdefinitionen und leere Zuordnungen werden geprüft.
- Einheitlicher Konsistenzstatus auf allen Wettbewerbsseiten ergänzt.
- Detailanzeige begrenzt lange Fehlerlisten und bleibt mobil lesbar.
- Grundlayout, Raster, Kachelgrößen und freigegebene Bereiche unverändert belassen.

## Version 2.46 – 31.07.2026
- Zentralen Bereich „Datenpflege & Prüfprotokoll“ auf allen Wettbewerbsseiten ergänzt.
- Datenstände von `wettbewerbe.json`, `spieldaten.json`, `teams.json` und `tippspieltage.json` werden gemeinsam ausgewiesen.
- Strukturelles Prüfprotokoll kann als JSON-Datei heruntergeladen werden.
- Export enthält Datenmengen, Quellenstände sowie erkannte Fehler und Hinweise, verändert aber keine Website-Daten.
- Pflege- und Diagnosefunktionen verwenden das gemeinsame Datenmodell aus Version 2.44/2.45.
- Grundlayout, Raster, Kachelgrößen und freigegebene Inhalte unverändert belassen.

## Version 2.47 – Technischer Feinschliff

- Ressourcenhinweise für zentrale JavaScript- und JSON-Dateien ergänzt.
- Fokusdarstellung, Tastaturbedienung und Touch-Ziele weiter verbessert.
- Unterstützung reduzierter Bewegungen erweitert.
- Doppelte Initialisierung gemeinsamer Module defensiv verhindert.
- Keine Änderungen an Grundlayout, Kachelgrößen oder freigegebenen Inhalten.

## Version 2.48 – Gesamtprüfung & Release-Audit

- Reproduzierbares Prüfskript `scripts/release_audit.py` ergänzt.
- Lokale HTML- und JavaScript-Dateireferenzen werden auf fehlende Ziele geprüft.
- Sämtliche JSON-Dateien werden strukturell validiert.
- Pflichtdateien und Versionsstand werden kontrolliert.
- Maschinenlesbares Prüfergebnis `RELEASE-AUDIT.json` ergänzt.
- Grundlayout, Raster, Kachelgrößen und freigegebene Inhalte unverändert belassen.

## Version 2.49 – Finalisierung & Release-Vorbereitung

- Versionsstand und technische Release-Prüfung auf 2.49 aktualisiert.
- Reproduzierbares Release-Manifest `RELEASE-MANIFEST.json` ergänzt.
- SHA-256-Prüfsummen und Dateigrößen aller auslieferungsrelevanten Dateien dokumentiert.
- Audit kontrolliert zusätzlich das Vorhandensein des Release-Manifests.
- Grundlayout, Raster, Kachelgrößen, Navigation und freigegebene Inhalte unverändert belassen.

## Version 2.50 – Release Candidate – 31.07.2026

- Vollständigen Release Candidate auf Basis der geprüften Version 2.49 erstellt.
- Versionsstand in `VERSION.txt`, Audit und Release-Manifest auf 2.50 vereinheitlicht.
- Abschlussdokumentation `README-V50.md`, `RELEASE-CANDIDATE.md` und `FINAL-CHECKLIST.md` ergänzt.
- Pflichtdateien, lokale Referenzen und sämtliche JSON-Dateien erneut automatisiert geprüft.
- Release-Manifest mit SHA-256-Prüfsummen und Dateigrößen aller ausgelieferten Dateien neu erzeugt.
- Keine Änderungen an Grundlayout, Raster, Kachelgrößen, Navigation oder freigegebenen Inhalten vorgenommen.


## Version 3.0 FINAL
- Offizieller Final-Release auf Basis des Release Candidates 2.50.
## Version 3.0.2 – Daten- und Wartungsoptimierung – 31.07.2026

- Website-, Schema- und Datenversion im zentralen Datenregister vereinheitlicht.
- Diagnosezustand und Ladezeit zentraler Datenquellen im gemeinsamen Datenmodell ergänzt.
- Wartungspanel um Versionsanzeige, Registerstand und Rückfallstatus erweitert.
- Exportiertes Prüfprotokoll um Registry- und Quelldiagnosen erweitert.
- Loader gegen doppelte Initialisierung abgesichert und Reset-Funktion ergänzt.
- Layout, Raster, Kachelgrößen, Navigation und freigegebene Inhalte unverändert belassen.


## Version 3.1 – Administrations- und Wartungszentrum
- Neue lesende Kontrollseite `admin.html`.
- Live-Prüfung der registrierten Datenquellen mit Ladezeiten und Fehleranzeige.
- Systembericht als JSON exportierbar.
- Wartungspanel der Wettbewerbsseiten um direkten Administrationslink ergänzt.
- Datenregister auf Datenversion 4 aktualisiert.
