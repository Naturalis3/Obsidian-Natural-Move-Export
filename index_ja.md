# Natural Move/Export

[English](index.md) | [Deutsch](index_de.md) | [Français](index_fr.md) | [Español](index_es.md) | [简体中文](index_zh.md) | [日本語](index_ja.md) | [한국어](index_ko.md) | [Português](index_pt.md) | [Русский](index_ru.md)

<div style="max-width: 900px; margin: 40px auto; position: relative; padding-bottom: 50.625%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
  <iframe 
    src="https://www.youtube.com/embed/7rfUTl3iBh8" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
  </iframe>
</div>

**Natural Move/Export** は、Obsidian とオペレーティングシステムの間のギャップをシームレスに埋める Obsidian プラグインです。Obsidian のファイルエクスプローラーを、コンピューター上のネイティブフォルダーのように感じさせます。

## なぜ Natural Move/Export なのか？

Obsidian のファイルエクスプローラーは強力ですが、孤立しています。Obsidian からファイルをコピーするには、通常、最初に Finder/エクスプローラーでフォルダーを開く必要があります。**Natural Move/Export** は、Obsidian 内から直接、ネイティブなシステム全体のコピー＆ペースト、ドラッグ＆ドロップ、およびプロフェッショナルなエクスポートを可能にすることで、この問題を解決します。

## ✨ 主な機能

### 📋 ネイティブシステムコピー (無料版 & プロ版)
Obsidian でファイルを選択し、`Cmd + C` (macOS) または `Ctrl + C` (Win) を押します。その後、`Cmd + V` でデスクトップや他のアプリケーションに直接貼り付けることができます。
*   **無料版:** 個別ファイルのコピー。
*   **プロ版:** フォルダー全体とその内容のコピー。

### 🖱️ 直接ドラッグ＆ドロップ (無料版 & プロ版)
`Alt` キーを押しながら、Obsidian から他のアプリ (メール、Slack、フォルダーなど) にファイルやフォルダーを直接ドラッグします。
*   **無料版:** 個別ファイルのドラッグ。
*   **プロ版:** フォルダー全体のドラッグ。

### 🚀 プロフェッショナルな Pandoc エクスポート (プロ版)
ワンクリックで Markdown ノートを洗練されたドキュメントに変換します。
*   **Word (.docx):** プロフェッショナルなブランディングのために、独自のカスタム `.docx` テンプレートを使用します。
*   **PowerPoint (.pptx):** ノートを即座にプレゼンテーションに変換します。
*   **PDF & Beamer:** 高品質な学術およびスライドのエクスポート。
*   **HTML & Markdown:** クリーンでスタンドアロンなエクスポート。

### 📁 ターゲットフォルダー同期 (プロ版)
設定で固定のターゲットフォルダーを構成します。コンテキストメニューからワンクリックでファイルやフォルダーをそこにコピーします。バックアップ、共有、またはプロジェクトのエクスポートに最適です。

### 🌍 スマートローカリゼーションとOS検出
*   **自動言語設定：** プラグインはObsidianの言語設定に自動的に適応します。
*   **スマートOS検出：** Windows、macOS、Linuxのどれを使用しているかに応じて、設定とプレースホルダーが自動的に調整されます。

## 💎 無料版 vs プロ版

| 機能 | 無料版 | プロ版 |
| :--- | :---: | :---: |
| クリップボードにファイルをコピー (`Cmd+C`) | ✅ | ✅ |
| ファイルのドラッグ＆ドロップ (`Alt+ドラッグ`) | ✅ | ✅ |
| オーディオフィードバック | ✅ | ✅ |
| **クリップボードにフォルダーをコピー** | ❌ | ✅ |
| **フォルダーのドラッグ＆ドロップ** | ❌ | ✅ |
| **固定ターゲットフォルダーへのコピー** | ❌ | ✅ |
| **Pandoc エクスポート (Word, PDF など)** | ❌ | ✅ |
| **カスタム Word テンプレート** | ❌ | ✅ |
| **カスタム Pandoc 引数** | ❌ | ✅ |

### プロ版の有効化方法
1. [Lemon Squeezy](https://your-store.lemonsqueezy.com) からライセンスキーを購入します。
2. Obsidian を開き、**設定 > Natural Move** に移動します。
3. **License Key** フィールドにライセンスキーを入力します。
4. **Verify** をクリックします。
5. 有効化されると、すべてのプロ機能がすぐに利用可能になります。

## 🛠️ Pandoc エクスポートの前提条件

エクスポート機能 (Word、PowerPoint、PDF など) を使用するには、システムに **Pandoc** がインストールされている必要があります。

- **Mac:** Homebrew 経由で `brew install pandoc` を実行するか、[Pandoc ウェブサイト](https://pandoc.org/installing.html)からインストーラーをダウンロードします。
- **Windows:** Pandoc ウェブサイトからインストーラーをダウンロードします。

### ⚠️ PDF および Beamer エクスポートに関する重要事項 (MacTeX & MiKTeX)

Pandoc は、PDF および Beamer プレゼンテーションを生成するために、バックグラウンドで LaTeX ディストリビューションを必要とします。macOS では **MacTeX** が標準です。Windows では **MiKTeX** が推奨されます。

**MacTeX のインストール (macOS):**

*オプション 1: Homebrew 経由 (推奨)*
ターミナルを開き、次のコマンドを入力します。
```bash
brew install --cask mactex-no-gui
```
*(注: 必要な LaTeX パッケージがすべて含まれているため、ダウンロードサイズは非常に大きくなります (約 5 GB)。`mactex-no-gui` バージョンはコマンドラインツールのみをインストールするため、Pandoc にはこれで十分です)。*

*オプション 2: 手動ダウンロード*
1. 公式サイトにアクセス: [tug.org/mactex](https://www.tug.org/mactex/)
2. `MacTeX.pkg` ファイルをダウンロードしてインストーラーを実行します。


**MiKTeX のインストール (Windows):**
1. 公式サイトにアクセスします: [miktex.org/download](https://miktex.org/download)
2. インストーラーをダウンロードして実行します。
3. インストール中に、不足しているパッケージを自動的にインストールすることを選択します。

Pandoc と MacTeX/MiKTeX をインストールした後、新しいシステムパスを認識させるために Obsidian を完全に再起動する必要がある場合があります。Natural Move/Export プラグインは、標準パス (`/Library/TeX/texbin`、`/opt/homebrew/bin`、`/usr/local/bin`) で必要なプログラムを自動的に検索します。

## Obsidian でのインストール

### BRAT 経由 (ベータテスト)
1. コミュニティプラグインから "Obsidian 42 - BRAT" プラグインをインストールします。
2. BRAT の設定に移動し、"Add Beta Plugin" をクリックします。
3. この GitHub リポジトリの URL を入力します。
4. "Add Plugin" をクリックします。

### 手動インストール
1. プロジェクトを ZIP ファイルとしてダウンロードし、解凍します。
2. Obsidian Vault 内にフォルダーを作成します: `.obsidian/plugins/natural-move`
3. 解凍したすべてのプロジェクトファイルをこの新しいフォルダーにコピーします。
4. このフォルダーでターミナルを開き、次のコマンドを実行します。
   ```bash
   npm install
   npm run build
   ```
5. Obsidian を開き、**設定 > コミュニティプラグイン** に移動します。
6. まだの場合は「セーフモード」を無効にします。
7. 「再読み込み」をクリックし、**Natural Move/Export** プラグインを有効にします。

## クレジット & ライセンス

- **作者:** Naturalis
- **ライセンス:** MIT
- **サードパーティツール:** このプラグインは、ファイル変換用の外部コマンドラインツールとして [Pandoc](https://pandoc.org/) (GPL ライセンス) を使用しています。Pandoc はこのプラグインに同梱されていないため、ユーザーが別途インストールする必要があります。
