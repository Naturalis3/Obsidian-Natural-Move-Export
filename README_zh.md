# Natural Move/Export

[English](README.md) | [Deutsch](README_de.md) | [Français](README_fr.md) | [Español](README_es.md) | [简体中文](README_zh.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Português](README_pt.md) | [Русский](README_ru.md)

---

https://github.com/user-attachments/assets/331368f7-fb1a-44b2-999c-d52296116d0e

---
**Natural Move/Export** 是一款 Obsidian 插件，可无缝桥接 Obsidian 与您的操作系统。它让 Obsidian 的文件资源管理器感觉就像您计算机上的原生文件夹。

## 为什么选择 Natural Move/Export？

Obsidian 的文件资源管理器功能强大，但相对孤立。将文件从 Obsidian 中复制出来通常需要先在访达 (Finder)/资源管理器 (Explorer) 中打开文件夹。**Natural Move/Export** 通过在 Obsidian 内部直接启用原生的系统级复制粘贴、拖放以及专业导出功能解决了这个问题。

## ✨ 核心功能

### 📋 原生系统复制 (免费版和专业版)
在 Obsidian 中选择文件并按 `Cmd + C` (Mac) 或 `Ctrl + C` (Win)。然后，您可以使用 `Cmd + V` 直接将其粘贴到桌面或任何其他应用程序中。
*   **免费版：** 复制单个文件。
*   **专业版：** 复制整个文件夹及其内容。

### 🖱️ 直接拖放 (免费版和专业版)
按住 `Alt` 键并将文件或文件夹从 Obsidian 直接拖动到其他应用程序（例如邮件、Slack 或文件夹）中。
*   **免费版：** 拖动单个文件。
*   **专业版：** 拖动整个文件夹。

### 🚀 专业 Pandoc 导出 (专业版)
只需单击一下，即可将您的 Markdown 笔记转换为精美的文档。
*   **Word (.docx)：** 使用您自己的自定义 `.docx` 模板进行专业品牌定制。
*   **PowerPoint (.pptx)：** 立即将笔记转换为演示文稿。
*   **PDF 和 Beamer：** 高质量的学术和幻灯片导出。
*   **HTML 和 Markdown：** 干净、独立的导出。

### 📁 目标文件夹同步 (专业版)
在设置中配置固定的目标文件夹。通过右键菜单一键将文件和文件夹复制到那里。非常适合备份、共享或项目导出。

### 🌍 智能本地化与操作系统检测
*   **自动语言：** 插件会自动适应您的 Obsidian 语言设置。
*   **智能操作系统检测：** 无论您使用的是 Windows、macOS 还是 Linux，设置和占位符都会自动调整。

## 💎 免费版 vs 专业版

| 功能 | 免费版 | 专业版 |
| :--- | :---: | :---: |
| 复制文件到剪贴板 (`Cmd+C`) | ✅ | ✅ |
| 拖放文件 (`Alt+拖动`) | ✅ | ✅ |
| 音频反馈 | ✅ | ✅ |
| **复制文件夹到剪贴板** | ❌ | ✅ |
| **拖放文件夹** | ❌ | ✅ |
| **复制到固定目标文件夹** | ❌ | ✅ |
| **Pandoc 导出 (Word, PDF 等)** | ❌ | ✅ |
| **自定义 Word 模板** | ❌ | ✅ |
| **自定义 Pandoc 参数** | ❌ | ✅ |

### 如何激活专业版
1. 从 [Lemon Squeezy](https://your-store.lemonsqueezy.com) 购买许可密钥。
2. 打开 Obsidian 并转到 **设置 > Natural Move**。
3. 在 **许可密钥 (License Key)** 字段中输入您的许可密钥。
4. 单击 **验证 (Verify)**。
5. 激活后，所有专业版功能将立即解锁。

## 🛠️ Pandoc 导出的先决条件

要使用导出功能（Word、PowerPoint、PDF 等），您的系统中必须安装 **Pandoc**。

- **Mac：** 通过 Homebrew 安装 `brew install pandoc` 或从 [Pandoc 官网](https://pandoc.org/installing.html)下载安装程序。
- **Windows：** 从 Pandoc 官网下载安装程序。

### ⚠️ PDF 和 Beamer 导出重要提示 (MacTeX)

Pandoc 需要后台的 LaTeX 发行版来生成 PDF 和 Beamer 演示文稿。在 Mac 上，**MacTeX** 是标准配置。

**安装 MacTeX (Mac)：**

*选项 1：通过 Homebrew (推荐)*
打开终端并输入以下命令：
```bash
brew install --cask mactex-no-gui
```
*(注意：下载量非常大（约 5 GB），因为它包含所有必要的 LaTeX 软件包。`mactex-no-gui` 版本仅安装命令行工具，这对于 Pandoc 来说已经足够了)。*

*选项 2：手动下载*
1. 访问官方网站：[tug.org/mactex](https://www.tug.org/mactex/)
2. 下载 `MacTeX.pkg` 文件并运行安装程序。

安装 Pandoc 和 MacTeX 后，您可能需要完全重启 Obsidian 才能识别新的系统路径。Natural Move/Export 插件会自动在标准路径（`/Library/TeX/texbin`、`/opt/homebrew/bin`、`/usr/local/bin`）中搜索所需的程序。

## 在 Obsidian 中安装

### 通过 BRAT (测试版测试)
1. 从社区插件中安装 "Obsidian 42 - BRAT" 插件。
2. 转到 BRAT 设置并单击 "Add Beta Plugin"。
3. 输入此 GitHub 仓库的 URL。
4. 单击 "Add Plugin"。

### 手动安装
1. 下载项目为 ZIP 文件并解压。
2. 在您的 Obsidian 库中创建文件夹：`.obsidian/plugins/natural-move`
3. 将所有解压后的项目文件复制到此新文件夹中。
4. 在此文件夹中打开终端并运行以下命令：
   ```bash
   npm install
   npm run build
   ```
5. 打开 Obsidian 并转到 **设置 > 社区插件**。
6. 如果尚未禁用，请禁用“安全模式”。
7. 单击“刷新”并启用 **Natural Move/Export** 插件。

## 致谢与许可

- **作者：** Naturalis
- **许可：** MIT
- **第三方工具：** 此插件使用 [Pandoc](https://pandoc.org/) (GPL 许可) 作为文件转换的外部命令行工具。Pandoc 不随此插件捆绑，必须由用户单独安装。
