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

**Natural Move/Export** es un complemento de Obsidian que cierra a la perfección la brecha entre Obsidian y su sistema operativo. Hace que el Explorador de archivos de Obsidian se sienta como una carpeta nativa en su computadora.

## ¿Por qué Natural Move/Export?

El Explorador de archivos de Obsidian es potente, pero está aislado. Copiar archivos fuera de Obsidian generalmente requiere abrir primero la carpeta en Finder/Explorer. **Natural Move/Export** soluciona esto al permitir copiar y pegar nativos en todo el sistema, arrastrar y soltar y exportaciones profesionales directamente desde Obsidian.

## ✨ Características principales

### 📋 Copia nativa del sistema (Gratis y Pro)
Seleccione archivos en Obsidian y presione `Cmd + C` (Mac) o `Ctrl + C` (Win). Luego puede pegarlos directamente en su escritorio o en cualquier otra aplicación con `Cmd + V`.
*   **Gratis:** Copia de archivos individuales.
*   **Pro:** Copia de carpetas completas y su contenido.

### 🖱️ Arrastrar y soltar directo (Gratis y Pro)
Mantenga presionada la tecla `Alt` y arrastre archivos o carpetas desde Obsidian directamente a otras aplicaciones (por ejemplo, Mail, Slack o una carpeta).
*   **Gratis:** Arrastrar archivos individuales.
*   **Pro:** Arrastrar carpetas completas.

### 🚀 Exportación profesional con Pandoc (Pro)
Convierta sus notas de Markdown en documentos pulidos con un solo clic.
*   **Word (.docx):** Use sus propias plantillas `.docx` personalizadas para una imagen de marca profesional.
*   **PowerPoint (.pptx):** Convierta notas en presentaciones al instante.
*   **PDF y Beamer:** Exportaciones académicas y de diapositivas de alta calidad.
*   **HTML y Markdown:** Exportaciones limpias e independientes.

### 📁 Sincronización de carpeta de destino (Pro)
Configure una carpeta de destino fija en los ajustes. Copie archivos y carpetas allí con un clic a través del menú contextual. Perfecto para copias de seguridad, intercambio o exportaciones de proyectos.

## 💎 Gratis vs. Pro

| Característica | Gratis | Pro |
| :--- | :---: | :---: |
| Copiar archivos al portapapeles (`Cmd+C`) | ✅ | ✅ |
| Arrastrar y soltar archivos (`Alt+Drag`) | ✅ | ✅ |
| Retroalimentación de audio | ✅ | ✅ |
| **Copiar carpetas al portapapeles** | ❌ | ✅ |
| **Arrastrar y soltar carpetas** | ❌ | ✅ |
| **Copiar a una carpeta de destino fija** | ❌ | ✅ |
| **Exportación con Pandoc (Word, PDF, etc.)** | ❌ | ✅ |
| **Plantillas de Word personalizadas** | ❌ | ✅ |
| **Argumentos de Pandoc personalizados** | ❌ | ✅ |

### Cómo activar Pro
1. Compre una clave de licencia en [Lemon Squeezy](https://your-store.lemonsqueezy.com).
2. Abra Obsidian y vaya a **Ajustes > Natural Move**.
3. Ingrese su clave de licencia en el campo **Clave de licencia**.
4. Haga clic en **Verificar**.
5. Una vez activadas, todas las funciones Pro se desbloquearán de inmediato.

## 🛠️ Requisitos previos para la exportación con Pandoc

Para usar las funciones de exportación (Word, PowerPoint, PDF, etc.), **Pandoc** debe estar instalado en su sistema.

- **Mac:** `brew install pandoc` (a través de Homebrew) o descargue el instalador desde el [sitio web de Pandoc](https://pandoc.org/installing.html).
- **Windows:** Descargue el instalador desde el sitio web de Pandoc.

### ⚠️ Importante para la exportación a PDF y Beamer (MacTeX)

Pandoc requiere una distribución de LaTeX en segundo plano para generar archivos PDF y presentaciones de Beamer. En Mac, **MacTeX** es el estándar.

**Instalación de MacTeX (Mac):**

*Opción 1: A través de Homebrew (Recomendado)*
Abra la terminal e ingrese el siguiente comando:
```bash
brew install --cask mactex-no-gui
```
*(Nota: La descarga es very large (aprox. 5 GB), ya que contiene todos los paquetes de LaTeX necesarios. La versión `mactex-no-gui` solo instala las herramientas de línea de comandos, lo cual es suficiente para Pandoc).*

*Option 2: Descarga manual*
1. Vaya al sitio web oficial: [tug.org/mactex](https://www.tug.org/mactex/)
2. Descargue el archivo `MacTeX.pkg` y ejecute el instalador.

Después de instalar Pandoc y MacTeX, es posible que deba reiniciar Obsidian por completo para que se reconozcan las nuevas rutas del sistema. El complemento Natural Move/Export busca automáticamente los programas requeridos en las rutas estándar (`/Library/TeX/texbin`, `/opt/homebrew/bin`, `/usr/local/bin`).

## Instalación en Obsidian

### A través de BRAT (Pruebas Beta)
1. Instale el complemento "Obsidian 42 - BRAT" desde los complementos de la comunidad.
2. Vaya a los ajustes de BRAT y haga clic en "Add Beta Plugin".
3. Ingrese la URL de este repositorio de GitHub.
4. Haga clic en "Add Plugin".

### Instalación manual
1. Descargue el proyecto como un archivo ZIP y extráigalo.
2. Cree la carpeta en su bóveda de Obsidian: `.obsidian/plugins/natural-move`
3. Copie todos los archivos del proyecto extraídos en esta nueva carpeta.
4. Abra una terminal en esta carpeta y ejecute los siguientes comandos:
   ```bash
   npm install
   npm run build
   ```
5. Abra Obsidian y vaya a **Ajustes > Complementos de la comunidad**.
6. Desactive el "Modo seguro" si aún no lo ha hecho.
7. Haga clic en "Actualizar" y active el complemento **Natural Move/Export**.

## Créditos y Licencia

- **Autor:** Naturalis
- **Licencia:** MIT
- **Herramientas de terceros:** Este complemento utiliza [Pandoc](https://pandoc.org/) (con licencia GPL) como una herramienta de línea de comandos externa para la conversión de archivos. Pandoc no se incluye con este complemento y el usuario debe instalarlo por separado.
