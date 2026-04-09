# Natural Move/Export

[English](README.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Español](README_es.md) | [简体中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Português](README_pt.md) | [Русский](README_ru.md)

---

https://github.com/user-attachments/assets/331368f7-fb1a-44b2-999c-d52296116d0e

---

**Natural Move/Export** ist ein Obsidian-Plugin, das die Lücke zwischen Obsidian und deinem Betriebssystem nahtlos schließt. Es sorgt dafür, dass sich der Datei-Explorer von Obsidian wie ein nativer Ordner auf deinem Computer anfühlt.

## Warum Natural Move/Export?

Der Datei-Explorer von Obsidian ist mächtig, aber isoliert. Das Kopieren von Dateien aus Obsidian heraus erfordert normalerweise, dass man zuerst den Ordner im Finder/Explorer öffnet. **Natural Move/Export** behebt dies, indem es natives systemweites Kopieren und Einfügen, Drag & Drop und professionelle Exporte direkt aus Obsidian heraus ermöglicht.

## ✨ Hauptfunktionen

### 📋 Natives System-Kopieren (Free & Pro)
Wähle Dateien in Obsidian aus und drücke `Cmd + C` (Mac) oder `Ctrl + C` (Win). Du kannst sie dann mit `Cmd + V` direkt auf deinen Desktop oder in jede andere Anwendung einfügen.
*   **Free:** Kopieren einzelner Dateien.
*   **Pro:** Kopieren ganzer Ordner und deren Inhalte.

### 🖱️ Direktes Drag & Drop (Free & Pro)
Halte die `Alt`-Taste gedrückt und ziehe Dateien oder Ordner aus Obsidian direkt in andere Apps (z. B. Mail, Slack oder einen Ordner).
*   **Free:** Ziehen einzelner Dateien.
*   **Pro:** Ziehen ganzer Ordner.

### 🚀 Professioneller Pandoc-Export (Pro)
Konvertiere deine Markdown-Notizen mit einem Klick in polierte Dokumente.
*   **Word (.docx):** Nutze deine eigenen `.docx`-Vorlagen für ein professionelles Branding.
*   **PowerPoint (.pptx):** Verwandle Notizen sofort in Präsentationen.
*   **PDF & Beamer:** Hochwertige akademische und Folien-Exporte.
*   **HTML & Markdown:** Saubere, eigenständige Exporte.

### 📁 Zielordner-Synchronisation (Pro)
Konfiguriere einen festen Zielordner in den Einstellungen. Kopiere Dateien und Ordner mit einem Klick über das Kontextmenü dorthin. Perfekt für Backups, Freigaben oder Projektexporte.

## 💎 Free vs. Pro

| Funktion | Free | Pro |
| :--- | :---: | :---: |
| Dateien in Zwischenablage kopieren (`Cmd+C`) | ✅ | ✅ |
| Drag & Drop von Dateien (`Alt+Ziehen`) | ✅ | ✅ |
| Audio-Feedback | ✅ | ✅ |
| **Ordner in Zwischenablage kopieren** | ❌ | ✅ |
| **Drag & Drop von Ordnern** | ❌ | ✅ |
| **Kopieren in festen Zielordner** | ❌ | ✅ |
| **Pandoc-Export (Word, PDF, etc.)** | ❌ | ✅ |
| **Eigene Word-Vorlagen** | ❌ | ✅ |
| **Eigene Pandoc-Argumente** | ❌ | ✅ |

### So aktivierst du Pro
1. Kaufe einen Lizenzschlüssel bei [Lemon Squeezy](https://your-store.lemonsqueezy.com).
2. Öffne Obsidian und gehe zu **Einstellungen > Natural Move**.
3. Gib deinen Lizenzschlüssel in das Feld **Lizenzschlüssel** ein.
4. Klicke auf **Prüfen**.
5. Nach der Aktivierung werden alle Pro-Funktionen sofort freigeschaltet.

## 🛠️ Voraussetzungen für den Pandoc-Export

Um die Exportfunktionen (Word, PowerPoint, PDF, etc.) nutzen zu können, muss **Pandoc** auf deinem System installiert sein.

- **Mac:** `brew install pandoc` (via Homebrew) oder lade das Installationsprogramm von der [Pandoc-Website](https://pandoc.org/installing.html) herunter.
- **Windows:** Lade das Installationsprogramm von der Pandoc-Website herunter.

### ⚠️ Wichtig für PDF- und Beamer-Export (MacTeX)

Pandoc benötigt eine LaTeX-Distribution im Hintergrund, um PDFs und Beamer-Präsentationen zu generieren. Auf dem Mac ist **MacTeX** der Standard.

**Installation von MacTeX (Mac):**

*Option 1: Über Homebrew (Empfohlen)*
Öffne das Terminal und gib den folgenden Befehl ein:
```bash
brew install --cask mactex-no-gui
```
*(Hinweis: Der Download ist sehr groß (ca. 5 GB), da er alle notwendigen LaTeX-Pakete enthält. Die Version `mactex-no-gui` installiert nur die Befehlszeilen-Tools, was für Pandoc ausreicht).*

*Option 2: Manueller Download*
1. Gehe auf die offizielle Website: [tug.org/mactex](https://www.tug.org/mactex/)
2. Lade die Datei `MacTeX.pkg` herunter und führe das Installationsprogramm aus.

Nach der Installation von Pandoc und MacTeX musst du Obsidian möglicherweise komplett neu starten, damit die neuen Systempfade erkannt werden. Das Plugin Natural Move/Export sucht automatisch in den Standardpfaden (`/Library/TeX/texbin`, `/opt/homebrew/bin`, `/usr/local/bin`) nach den benötigten Programmen.

## Installation in Obsidian

### Über BRAT (Beta-Test)
1. Installiere das Plugin "Obsidian 42 - BRAT" aus den Community-Plugins.
2. Gehe zu den BRAT-Einstellungen und klicke auf "Add Beta Plugin".
3. Gib die URL dieses GitHub-Repositories ein.
4. Klicke auf "Add Plugin".

### Manuelle Installation
1. Lade das Projekt als ZIP-Datei herunter und entpacke es.
2. Erstelle den Ordner in deinem Obsidian Vault: `.obsidian/plugins/natural-move`
3. Kopiere alle entpackten Projektdateien in diesen neuen Ordner.
4. Öffne ein Terminal in diesem Ordner und führe die folgenden Befehle aus:
   ```bash
   npm install
   npm run build
   ```
5. Öffne Obsidian und gehe zu **Einstellungen > Community-Plugins**.
6. Deaktiviere den "Sicherheitsmodus", falls noch nicht geschehen.
7. Klicke auf "Aktualisieren" und aktiviere das Plugin **Natural Move/Export**.

## Credits & Lizenz

- **Autor:** Naturalis
- **Lizenz:** MIT
- **Drittanbieter-Tools:** Dieses Plugin verwendet [Pandoc](https://pandoc.org/) (GPL-lizenziert) als externes Befehlszeilen-Tool für die Dateikonvertierung. Pandoc ist nicht im Lieferumfang dieses Plugins enthalten und muss vom Benutzer separat installiert werden.
