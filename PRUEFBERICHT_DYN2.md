# TOSMC LIVE Sondertermine DYN2 – gezielter Korrekturbericht

## Ursache
DYN1 reicht die dynamisch reduzierte aktive ID-Menge (10) an `planOfficialChanges` und `applyOfficialChanges` weiter. Die unveränderte, bestehende Schutzbibliothek `terminwaechter-auto-core.mjs` verlangt dort ausdrücklich die vollständige ursprüngliche Whitelist mit 11 IDs. Deshalb `EXAKTE_ZIELSPIELLISTE_ERFORDERLICH` trotz amtlich verifizierter 10/10 aktiver Spiele.

## Korrektur
Die Quellenerkennung und Vollständigkeitskontrolle verwenden weiterhin ausschließlich die dynamische Menge aktiver Spiele. An die zwei Kernfunktionen wird hingegen die ursprüngliche, exakt 11 IDs umfassende geprüfte Whitelist `configuredIds` übergeben. Die Kernfunktionen sperren unabhängig davon abgeschlossene Spiele (`status === 'beendet'` oder vorhandene Tore) und erlauben nur amtlich verifizierte `ABWEICHUNG`-Befunde. Keine Änderungen an der Kernbibliothek, Konfiguration, Website oder anderen Workflows.

## Prüfung und Freigabegrenze
JavaScript-Syntaxprüfung und Paketintegrität durchgeführt. Quellbericht aus DYN1 zeigt 10/10 aktive Befunde, 1 abgeschlossen, 2 Termine offen, 0 Änderungen. Ein echter GitHub-Actions-DYN2-Lauf ist noch ausstehend. Zunächst manuell VORSCHAU; keine Freigabe zur LIVE-Terminänderung allein durch diesen Bericht.
