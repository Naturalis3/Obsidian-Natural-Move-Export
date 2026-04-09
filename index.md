# Natural Move/Export

[English](README.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Español](README_es.md) | [简体中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Português](README_pt.md) | [Русский](README_ru.md)

---
<div style="max-width: 900px; margin: 40px auto; position: relative; padding-bottom: 50.625%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
  <iframe 
    src="https://www.youtube.com/embed/7rfUTl3iBh8" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
  </iframe>
</div>
---

**Natural Move/Export** is an Obsidian plugin that seamlessly bridges the gap between Obsidian and your operating system. It makes Obsidian's File Explorer feel like a native folder on your computer.

## Why Natural Move/Export?

Obsidian's File Explorer is powerful, but isolated. Copying files out of Obsidian usually requires opening the folder in Finder/Explorer first. **Natural Move/Export** fixes this by enabling native system-wide copy-paste, drag & drop, and professional exports directly from within Obsidian.

## ✨ Key Features

### 📋 Native System Copy (Free & Pro)
Select files in Obsidian and press `Cmd + C` (Mac) or `Ctrl + C` (Win). You can then paste them directly onto your desktop or into any other application with `Cmd + V`.
*   **Free:** Copy individual files.
*   **Pro:** Copy entire folders and their contents.

### 🖱️ Direct Drag & Drop (Free & Pro)
Hold the `Alt` key and drag files or folders from Obsidian directly into other apps (e.g., Mail, Slack, or a folder).
*   **Free:** Drag individual files.
*   **Pro:** Drag entire folders.

### 🚀 Professional Pandoc Export (Pro)
Convert your Markdown notes into polished documents with a single click.
*   **Word (.docx):** Use your own custom `.docx` templates for professional branding.
*   **PowerPoint (.pptx):** Turn notes into presentations instantly.
*   **PDF & Beamer:** High-quality academic and slide exports.
*   **HTML & Markdown:** Clean, standalone exports.

### 📁 Target Folder Sync (Pro)
Configure a fixed target folder in the settings. Copy files and folders there with one click via the context menu. Perfect for backups, sharing, or project exports.

## 💎 Free vs. Pro

| Feature | Free | Pro |
| :--- | :---: | :---: |
| Copy Files to Clipboard (`Cmd+C`) | ✅ | ✅ |
| Drag & Drop Files (`Alt+Drag`) | ✅ | ✅ |
| Audio Feedback | ✅ | ✅ |
| **Copy Folders to Clipboard** | ❌ | ✅ |
| **Drag & Drop Folders** | ❌ | ✅ |
| **Copy to Fixed Target Folder** | ❌ | ✅ |
| **Pandoc Export (Word, PDF, etc.)** | ❌ | ✅ |
| **Custom Word Templates** | ❌ | ✅ |
| **Custom Pandoc Arguments** | ❌ | ✅ |

### How to Activate Pro
1. Purchase a license key from [Lemon Squeezy](https://your-store.lemonsqueezy.com).
2. Open Obsidian and go to **Settings > Natural Move**.
3. Enter your license key in the **License Key** field.
4. Click **Verify**.
5. Once activated, all Pro features will be unlocked immediately.

## 🛠️ Prerequisites for Pandoc Export

To use the export functions (Word, PowerPoint, PDF, etc.), **Pandoc** must be installed on your system.

- **Mac:** `brew install pandoc` (via Homebrew) or download the installer from the [Pandoc website](https://pandoc.org/installing.html).
- **Windows:** Download the installer from the Pandoc website.

### ⚠️ Important for PDF and Beamer Export (MacTeX)

Pandoc requires a LaTeX distribution in the background to generate PDFs and Beamer presentations. On Mac, **MacTeX** is the standard.

**Installing MacTeX (Mac):**

*Option 1: Via Homebrew (Recommended)*
Open the terminal and enter the following command:
```bash
brew install --cask mactex-no-gui
```
*(Note: The download is very large (approx. 5 GB) as it contains all necessary LaTeX packages. The `mactex-no-gui` version only installs the command-line tools, which is sufficient for Pandoc).*

*Option 2: Manual Download*
1. Go to the official website: [tug.org/mactex](https://www.tug.org/mactex/)
2. Download the `MacTeX.pkg` file and run the installer.

After installing Pandoc and MacTeX, you may need to restart Obsidian completely for the new system paths to be recognized. The Natural Move/Export plugin automatically searches for the required programs in the standard paths (`/Library/TeX/texbin`, `/opt/homebrew/bin`, `/usr/local/bin`).

## Installation in Obsidian

### Via BRAT (Beta Testing)
1. Install the "Obsidian 42 - BRAT" plugin from the Community Plugins.
2. Go to the BRAT settings and click on "Add Beta Plugin".
3. Enter the URL of this GitHub repository.
4. Click on "Add Plugin".

### Manual Installation
1. Download the project as a ZIP file and extract it.
2. Create the folder in your Obsidian Vault: `.obsidian/plugins/natural-move`
3. Copy all extracted project files into this new folder.
4. Open a terminal in this folder and run the following commands:
   ```bash
   npm install
   npm run build
   ```
5. Open Obsidian and go to **Settings > Community Plugins**.
6. Disable "Safe Mode" if you haven't already.
7. Click "Refresh" and enable the **Natural Move/Export** plugin.

## Credits & License

- **Author:** Naturalis
- **License:** MIT
- **Third-party tools:** This plugin uses [Pandoc](https://pandoc.org/) (GPL licensed) as an external command-line tool for file conversion. Pandoc is not bundled with this plugin and must be installed separately by the user.
