# Obsidian Plugin Release Checkliste (Naturalis)

Basierend auf den [Obsidian Developer Docs](https://docs.obsidian.md/Plugins/Releasing/Release+your+plugin+with+GitHub+Actions).

## 1. Manifest & Metadaten
- [x] **Author:** In `manifest.json` wurde "Naturalis" eingetragen.
- [x] **ID:** Die ID `natural-move` ist eindeutig und sollte nicht mehr geändert werden.
- [x] **Version:** Die Version in `manifest.json` (aktuell `0.1.0`) muss exakt mit dem GitHub Release Tag übereinstimmen.
- [x] **Beschreibung:** Eine klare, aussagekräftige Beschreibung auf Englisch wurde in `manifest.json` eingetragen.

## 2. GitHub Repository Setup
- [x] **Öffentliches Repo:** Erstelle ein öffentliches Repository auf GitHub.
- [x] **README.md:** Eine gute Anleitung auf Englisch und Deutsch wurde erstellt.
- [x] **Lizenz:** Eine `LICENSE` Datei (MIT) wurde hinzugefügt.

## 3. Release mit GitHub Actions
- [x] **Workflow Datei:** `.github/workflows/release.yml` wurde erstellt.
- [x] **Release Assets:** Jedes Release **muss** folgende Dateien als Assets enthalten (Workflow konfiguriert):
    - `main.js`
    - `manifest.json`
    - `styles.css` (falls vorhanden)

## 4. Plugin Richtlinien (Guidelines)
- [x] **Kein Obfuskierter Code:** Der Code in `src/main.ts` ist lesbar.
- [x] **Sicherheit:** Keine Telemetrie oder Datensammlung gefunden.
- [x] **Ressourcen:** Event-Listener und Intervalle werden in `onunload` entfernt.

## 5. Einreichung (Submission)
- [ ] **Fork:** Forke das Repository `obsidianmd/obsidian-releases`.
- [ ] **Eintrag:** Füge dein Plugin in `community-plugins.json` hinzu.
- [ ] **Pull Request:** Erstelle einen PR gegen das Haupt-Repo.

## 6. Beta-Tests (Optional aber empfohlen)
- [x] **BRAT:** Anleitung zur Installation via BRAT wurde in die `README.md` aufgenommen.
