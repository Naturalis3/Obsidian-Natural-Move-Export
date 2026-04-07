# Obsidian-Natural-Move-Export
The ultimate export plugin for Obsidian
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

## 🎬 Showcase

*(Coming soon: Video/GIF demonstration of the plugin in action)*

> [!TIP]
> Check out the [PRESENTATION.md](PRESENTATION.md) for a storyboard on how to record your own demo video.

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

After installing Pandoc and MacTeX, you may need to restart Obsidian completely for the new system paths to be recognized. The Natural Move/Ex

## 📅 Status: Coming Soon
We are currently in the final testing phase. The plugin will be available in the Obsidian Community Store soon.

---
*Created with ❤️ for the Obsidian Community.*
