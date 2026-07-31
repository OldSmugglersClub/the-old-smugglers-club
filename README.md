# The Old Smugglers Club

Aktueller Paketstand: **Version 2.50 – Release Candidate**.

Dieses Repository enthält den vollständigen Stand der Website einschließlich zentralem Datenmodell, Wettbewerbsseiten, Highscore, Hall of Fame, Diagnosefunktionen und Release-Dokumentation.

## Zentrale Release-Dateien

- `VERSION.txt`
- `CHANGELOG.md`
- `README-V50.md`
- `RELEASE-CANDIDATE.md`
- `FINAL-CHECKLIST.md`
- `RELEASE-AUDIT.json`
- `RELEASE-MANIFEST.json`

## Prüfung

```bash
python3 scripts/release_audit.py
python3 scripts/build_release_manifest.py
```
