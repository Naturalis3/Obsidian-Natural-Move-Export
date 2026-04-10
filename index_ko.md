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

**Natural Move/Export**는 Obsidian과 운영 체제 사이의 간극을 원활하게 메워주는 Obsidian 플러그인입니다. Obsidian의 파일 탐색기를 컴퓨터의 네이티브 폴더처럼 느끼게 해줍니다.

## 왜 Natural Move/Export인가요?

Obsidian의 파일 탐색기는 강력하지만 고립되어 있습니다. Obsidian 외부로 파일을 복사하려면 보통 Finder/Explorer에서 먼저 폴더를 열어야 합니다. **Natural Move/Export**는 Obsidian 내에서 직접 네이티브 시스템 전반의 복사-붙여넣기, 드래그 앤 드롭, 전문적인 내보내기 기능을 활성화하여 이 문제를 해결합니다.

## ✨ 주요 기능

### 📋 네이티브 시스템 복사 (무료 및 프로)
Obsidian에서 파일을 선택하고 `Cmd + C` (Mac) 또는 `Ctrl + C` (Win)를 누릅니다. 그런 다음 `Cmd + V`를 사용하여 데스크탑이나 다른 애플리케이션에 직접 붙여넣을 수 있습니다.
*   **무료:** 개별 파일 복사.
*   **프로:** 전체 폴더 및 내용 복사.

### 🖱️ 직접 드래그 앤 드롭 (무료 및 프로)
`Alt` 키를 누른 채 Obsidian에서 다른 앱(예: 메일, Slack 또는 폴더)으로 파일이나 폴더를 직접 드래그합니다.
*   **무료:** 개별 파일 드래그.
*   **프로:** 전체 폴더 드래그.

### 🚀 전문적인 Pandoc 내보내기 (프로)
클릭 한 번으로 Markdown 노트를 세련된 문서로 변환하세요.
*   **Word (.docx):** 전문적인 브랜딩을 위해 고유한 사용자 정의 `.docx` 템플릿을 사용하세요.
*   **PowerPoint (.pptx):** 노트를 즉시 프레젠테이션으로 변환하세요.
*   **PDF 및 Beamer:** 고품질 학술 및 슬라이드 내보내기.
*   **HTML 및 Markdown:** 깔끔한 독립형 내보내기.

### 📁 대상 폴더 동기화 (프로)
설정에서 고정된 대상 폴더를 구성하세요. 컨텍스트 메뉴를 통해 클릭 한 번으로 파일과 폴더를 해당 위치로 복사하세요. 백업, 공유 또는 프로젝트 내보내기에 적합합니다.

### 🌍 스마트 현지화 및 OS 감지
*   **자동 언어:** 플러그인이 Obsidian의 언어 설정에 자동으로 맞춰집니다.
*   **스마트 OS 감지:** Windows, macOS, Linux 중 어떤 것을 사용하는지에 따라 설정과 자리 표시자가 자동으로 조정됩니다.

## 💎 무료 vs 프로

| 기능 | 무료 | 프로 |
| :--- | :---: | :---: |
| 클립보드에 파일 복사 (`Cmd+C`) | ✅ | ✅ |
| 파일 드래그 앤 드롭 (`Alt+Drag`) | ✅ | ✅ |
| 오디오 피드백 | ✅ | ✅ |
| **클립보드에 폴더 복사** | ❌ | ✅ |
| **폴더 드래그 앤 드롭** | ❌ | ✅ |
| **고정된 대상 폴더로 복사** | ❌ | ✅ |
| **Pandoc 내보내기 (Word, PDF 등)** | ❌ | ✅ |
| **사용자 정의 Word 템플릿** | ❌ | ✅ |
| **사용자 정의 Pandoc 인수** | ❌ | ✅ |

### 프로 활성화 방법
1. [Lemon Squeezy](https://your-store.lemonsqueezy.com)에서 라이선스 키를 구매합니다.
2. Obsidian을 열고 **설정 > Natural Move**로 이동합니다.
3. **License Key** 필드에 라이선스 키를 입력합니다.
4. **Verify**를 클릭합니다.
5. 활성화되면 모든 프로 기능을 즉시 사용할 수 있습니다.

## 🛠️ Pandoc 내보내기를 위한 선결 조건

내보내기 기능(Word, PowerPoint, PDF 등)을 사용하려면 시스템에 **Pandoc**이 설치되어 있어야 합니다.

- **Mac:** Homebrew를 통해 `brew install pandoc`을 설치하거나 [Pandoc 웹사이트](https://pandoc.org/installing.html)에서 설치 프로그램을 다운로드하세요.
- **Windows:** Pandoc 웹사이트에서 설치 프로그램을 다운로드하세요.

### ⚠️ PDF 및 Beamer 내보내기 중요 사항 (MacTeX)

Pandoc은 PDF 및 Beamer 프레젠테이션을 생성하기 위해 백그라운드에서 LaTeX 배포판이 필요합니다. Mac에서는 **MacTeX**이 표준입니다.

**MacTeX 설치 (Mac):**

*옵션 1: Homebrew를 통해 (권장)*
터미널을 열고 다음 명령어를 입력하세요:
```bash
brew install --cask mactex-no-gui
```
*(참고: 필요한 모든 LaTeX 패키지가 포함되어 있어 다운로드 용량이 매우 큽니다(약 5GB). `mactex-no-gui` 버전은 명령줄 도구만 설치하므로 Pandoc에 충분합니다).*

*옵션 2: 수동 다운로드*
1. 공식 웹사이트 방문: [tug.org/mactex](https://www.tug.org/mactex/)
2. `MacTeX.pkg` 파일을 다운로드하고 설치 프로그램을 실행하세요.

Pandoc과 MacTeX을 설치한 후, 새로운 시스템 경로를 인식시키기 위해 Obsidian을 완전히 재시작해야 할 수도 있습니다. Natural Move/Export 플러그인은 표준 경로(`/Library/TeX/texbin`, `/opt/homebrew/bin`, `/usr/local/bin`)에서 필요한 프로그램을 자동으로 검색합니다.

## Obsidian에 설치하기

### BRAT을 통해 (베타 테스트)
1. 커뮤니티 플러그인에서 "Obsidian 42 - BRAT" 플러그인을 설치합니다.
2. BRAT 설정으로 이동하여 "Add Beta Plugin"을 클릭합니다.
3. 이 GitHub 저장소의 URL을 입력합니다.
4. "Add Plugin"을 클릭합니다.

### 수동 설치
1. 프로젝트를 ZIP 파일로 다운로드하고 압축을 풉니다.
2. Obsidian 보관함 내에 폴더를 생성합니다: `.obsidian/plugins/natural-move`
3. 압축을 푼 모든 프로젝트 파일을 이 새 폴더에 복사합니다.
4. 이 폴더에서 터미널을 열고 다음 명령어를 실행하세요:
   ```bash
   npm install
   npm run build
   ```
5. Obsidian을 열고 **설정 > 커뮤니티 플러그인**으로 이동합니다.
6. 아직 하지 않았다면 "안전 모드"를 비활성화하세요.
7. "새로고침"을 클릭하고 **Natural Move/Export** 플러그인을 활성화합니다.

## 크레딧 및 라이선스

- **저자:** Naturalis
- **라이선스:** MIT
- **제3자 도구:** 이 플러그인은 파일 변환을 위한 외부 명령줄 도구로 [Pandoc](https://pandoc.org/)(GPL 라이선스)을 사용합니다. Pandoc은 이 플러그인과 함께 제공되지 않으며 사용자가 별도로 설치해야 합니다.
