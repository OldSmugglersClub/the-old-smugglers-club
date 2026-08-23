# TOSMC – Test2 Update „Logbuch im Stalk-O-Meter“

Dieses Paket ist ausschließlich für die Test2-Prüfung vorgesehen. Es ist **kein Live-Update**.

## Einspielen
1. Im Test2-Repository ausschließlich die beiden Projektdateien `stalk-o-meter.js` und `STALK-O-METER-HANDBUCH.md` ersetzen.
2. Deployment abwarten.
3. `stalk-o-meter.html` mit hartem Reload öffnen.
4. Prüfen, ob `Logbuch` als zusätzlicher Ranglisteneintrag erscheint.
5. Prüfen, ob der Logbuch-Wert dem öffentlichen GoatCounter-Zähler für `/logbuch.html` entspricht.
6. Prüfen, ob die Gesamtsumme nun die 13 dargestellten Inhaltsseiten umfasst.
7. Bestehende Sortierung, Fehlermeldung und Darstellung auf Desktop/Mobil unverändert kontrollieren.

## Sicherheitsgrenze
Keine Dateien dieses Pakets nach Live übernehmen, bevor Test2 vollständig geprüft und ausdrücklich abgenommen wurde. Für die spätere Live-Übernahme ist ein Bestands-/Differenzcheck gegen das dann aktuelle Live-Repository erforderlich.

## Hinweis zur FULL-Version
Aus Sicherheitsgründen enthält dieses Paket bewusst **keinen künstlich aus dem Live-ZIP erzeugten Test2-FULL-Stand**. Der aktuelle Test2-Repository-Stand wurde in diesem Chat nicht als ZIP bereitgestellt. Ein FULL-Paket darf erst aus genau diesem Test2-Bestand erzeugt werden, damit keine produktiven oder historischen Dateien versehentlich zur Testbasis werden.
