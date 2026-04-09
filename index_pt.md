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

**Natural Move/Export** é um plugin para o Obsidian que preenche perfeitamente a lacuna entre o Obsidian e o seu sistema operacional. Ele faz com que o Explorador de Arquivos do Obsidian pareça uma pasta nativa no seu computador.

## Por que o Natural Move/Export?

O Explorador de Arquivos do Obsidian é poderoso, mas isolado. Copiar arquivos para fora do Obsidian geralmente requer abrir a pasta no Finder/Explorer primeiro. O **Natural Move/Export** resolve isso habilitando copiar e colar nativo em todo o sistema, arrastar e soltar e exportações profissionais diretamente de dentro do Obsidian.

## ✨ Principais Características

### 📋 Cópia Nativa do Sistema (Grátis & Pro)
Selecione arquivos no Obsidian e pressione `Cmd + C` (Mac) ou `Ctrl + C` (Win). Você pode então colá-los diretamente na sua área de trabalho ou em qualquer outro aplicativo com `Cmd + V`.
*   **Grátis:** Copiar arquivos individuais.
*   **Pro:** Copiar pastas inteiras e seus conteúdos.

### 🖱️ Arrastar e Soltar Direto (Grátis & Pro)
Mantenha pressionada a tecla `Alt` e arraste arquivos ou pastas do Obsidian diretamente para outros aplicativos (ex: E-mail, Slack ou uma pasta).
*   **Grátis:** Arrastar arquivos individuais.
*   **Pro:** Arrastar pastas inteiras.

### 🚀 Exportação Profissional com Pandoc (Pro)
Converta suas notas Markdown em documentos polidos com um único clique.
*   **Word (.docx):** Use seus próprios modelos `.docx` personalizados para uma marca profissional.
*   **PowerPoint (.pptx):** Transforme notas em apresentações instantaneamente.
*   **PDF & Beamer:** Exportações acadêmicas e de slides de alta qualidade.
*   **HTML & Markdown:** Exportações limpas e independentes.

### 📁 Sincronização de Pasta de Destino (Pro)
Configure uma pasta de destino fixa nas configurações. Copie arquivos e pastas para lá com um clique através do menu de contexto. Perfeito para backups, compartilhamento ou exportações de projetos.

## 💎 Grátis vs Pro

| Característica | Grátis | Pro |
| :--- | :---: | :---: |
| Copiar arquivos para a área de transferência (`Cmd+C`) | ✅ | ✅ |
| Arrastar e soltar arquivos (`Alt+Drag`) | ✅ | ✅ |
| Feedback de áudio | ✅ | ✅ |
| **Copiar pastas para a área de transferência** | ❌ | ✅ |
| **Arrastar e soltar pastas** | ❌ | ✅ |
| **Copiar para pasta de destino fixa** | ❌ | ✅ |
| **Exportação Pandoc (Word, PDF, etc.)** | ❌ | ✅ |
| **Modelos Word personalizados** | ❌ | ✅ |
| **Argumentos Pandoc personalizados** | ❌ | ✅ |

### Como Ativar o Pro
1. Compre uma chave de licença no [Lemon Squeezy](https://your-store.lemonsqueezy.com).
2. Abra o Obsidian e vá em **Configurações > Natural Move**.
3. Insira sua chave de licença no campo **Chave de Licença (License Key)**.
4. Clique em **Verificar (Verify)**.
5. Uma vez ativado, todos os recursos Pro serão desbloqueados imediatamente.

## 🛠️ Pré-requisitos para Exportação com Pandoc

Para usar as funções de exportação (Word, PowerPoint, PDF, etc.), o **Pandoc** deve estar instalado no seu sistema.

- **Mac:** `brew install pandoc` (via Homebrew) ou baixe o instalador no [site do Pandoc](https://pandoc.org/installing.html).
- **Windows:** Baixe o instalador no site do Pandoc.

### ⚠️ Importante para Exportação de PDF e Beamer (MacTeX)

O Pandoc requer uma distribuição LaTeX em segundo plano para gerar PDFs e apresentações Beamer. No Mac, o **MacTeX** é o padrão.

**Instalando o MacTeX (Mac):**

*Opção 1: Via Homebrew (Recomendado)*
Abra o terminal e digite o seguinte comando:
```bash
brew install --cask mactex-no-gui
```
*(Nota: O download é muito grande (aprox. 5 GB), pois contém todos os pacotes LaTeX necessários. A versão `mactex-no-gui` instala apenas as ferramentas de linha de comando, lo que é suficiente para o Pandoc).*

*Option 2: Download Manual*
1. Vá ao site oficial: [tug.org/mactex](https://www.tug.org/mactex/)
2. Baixe o arquivo `MacTeX.pkg` e execute o instalador.

Após instalar o Pandoc e o MacTeX, você pode precisar reiniciar o Obsidian completamente para que os novos caminhos do sistema sejam reconhecidos. O plugin Natural Move/Export procura automaticamente pelos programas necessários nos caminhos padrão (`/Library/TeX/texbin`, `/opt/homebrew/bin`, `/usr/local/bin`).

## Instalação no Obsidian

### Via BRAT (Testes Beta)
1. Instale o plugin "Obsidian 42 - BRAT" a partir dos Plugins da Comunidade.
2. Vá para as configurações do BRAT e clique em "Add Beta Plugin".
3. Insira a URL deste repositório GitHub.
4. Clique em "Add Plugin".

### Instalação Manual
1. Baixe o projeto como um arquivo ZIP e extraia-o.
2. Crie a pasta no seu Vault do Obsidian: `.obsidian/plugins/natural-move`
3. Copie todos os arquivos do projeto extraídos para esta nova pasta.
4. Abra um terminal nesta pasta e execute os seguintes comandos:
   ```bash
   npm install
   npm run build
   ```
5. Abra o Obsidian e vá em **Configurações > Plugins da Comunidade**.
6. Desative o "Modo Seguro" se ainda não o fez.
7. Clique em "Atualizar" e ative o plugin **Natural Move/Export**.

## Créditos & Licença

- **Autor:** Naturalis
- **Licença:** MIT
- **Ferramentas de terceiros:** Este plugin usa o [Pandoc](https://pandoc.org/) (licenciado sob GPL) como uma ferramenta de linha de comando externa para conversão de arquivos. O Pandoc não é fornecido com este plugin e deve ser instalado separadamente pelo usuário.
