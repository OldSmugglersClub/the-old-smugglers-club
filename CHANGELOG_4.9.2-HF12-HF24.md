# CHANGELOG – 4.9.2-HF12-HF24

Finale Live-Freigabe der in Test2-v2 geprüften Champions-League-OpenLigaDB-Implementierung.

- OpenLigaDB-Ligaphase `ucl2026/2026` wird automatisch abgefragt.
- Rohpaarungen werden nicht als regulärer Spielplan ausgegeben, solange keine belastbare Zuordnung zu acht Spieltagen möglich ist.
- Reguläre Spieltagsdarstellung schaltet automatisch frei, sobald 144 Spiele in 8 plausiblen Terminclustern mit je 18 Spielen und 36 eindeutigen Teams vorliegen.
- Unvollständige Champions-League-Tabelle wird verborgen; ab 36 erkannten Teilnehmern erscheint sie automatisch.
- Lokale Vereinswappen haben Vorrang; sichere HTTP(S)-Wappen dienen nur als Fallback, Base64-Wappen werden ausgeschlossen.
- Keine Änderungen an Grid, Navigation, Kachelgrößen oder Grundlayout.
