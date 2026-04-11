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

**Natural Move/Export** est un plugin Obsidian qui comble de manière transparente le fossé entre Obsidian et votre système d'exploitation. Il fait en sorte que l'explorateur de fichiers d'Obsidian ressemble à un dossier natif sur votre ordinateur.

## Pourquoi Natural Move/Export ?

L'explorateur de fichiers d'Obsidian est puissant, mas isolé. Copier des fichiers hors d'Obsidian nécessite généralement d'ouvrir d'abord le dossier dans le Finder/Explorateur. **Natural Move/Export** corrige cela en permettant le copier-coller natif à l'échelle du système, le glisser-déposer et les exportations professionnelles directement depuis Obsidian.

## ✨ Caractéristiques principales

### 📋 Copie système native (Gratuit & Pro)
Sélectionnez des fichiers dans Obsidian et appuyez sur `Cmd + C` (Mac) ou `Ctrl + C` (Win). Vous pouvez ensuite les coller directement sur votre bureau ou dans toute autre application avec `Cmd + V`.
*   **Gratuit :** Copie de fichiers individuels.
*   **Pro :** Copie de dossiers entiers et de leur contenu.

### 🖱️ Glisser-déposer direct (Gratuit & Pro)
Maintenez la touche `Alt` enfoncée et faites glisser des fichiers ou des dossiers d'Obsidian directement vers d'autres applications (par exemple, Mail, Slack ou un dossier).
*   **Gratuit :** Glisser-déposer de fichiers individuels.
*   **Pro :** Glisser-déposer de dossiers entiers.

### 🚀 Exportation Pandoc professionnelle (Pro)
Convertissez vos notes Markdown en documents soignés d'un seul clic.
*   **Word (.docx) :** Utilisez vos propres modèles `.docx` personnalisés pour une image de marque professionnelle.
*   **PowerPoint (.pptx) :** Transformez instantanément vos notes en présentations.
*   **PDF & Beamer :** Exportations académiques et de diapositives de haute qualité.
*   **HTML & Markdown :** Exportations propres et autonomes.

### 📁 Synchronisation du dossier cible (Pro)
Configurez un dossier cible fixe dans les paramètres. Copiez-y des fichiers et des dossiers en un clic via le menu contextuel. Parfait pour les sauvegardes, le partage ou les exportations de projets.

### 🌍 Localisation Intelligente & Détection d'OS
*   **Langue Automatique :** Le plugin s'adapte automatiquement aux paramètres de langue de votre Obsidian.
*   **Détection d'OS Intelligente :** Les paramètres et les espaces réservés s'ajustent automatiquement selon que vous utilisez Windows, macOS ou Linux.

## 💎 Gratuit vs Pro

| Caractéristique | Gratuit | Pro |
| :--- | :---: | :---: |
| Copier des fichiers dans le presse-papiers (`Cmd+C`) | ✅ | ✅ |
| Glisser-déposer des fichiers (`Alt+Drag`) | ✅ | ✅ |
| Retour audio | ✅ | ✅ |
| **Copier des dossiers dans le presse-papiers** | ❌ | ✅ |
| **Glisser-déposer des dossiers** | ❌ | ✅ |
| **Copier vers un dossier cible fixe** | ❌ | ✅ |
| **Exportation Pandoc (Word, PDF, etc.)** | ❌ | ✅ |
| **Modèles Word personnalisés** | ❌ | ✅ |
| **Arguments Pandoc personnalisés** | ❌ | ✅ |

### Comment activer Pro
1. Achetez une clé de licence sur [Lemon Squeezy](https://your-store.lemonsqueezy.com).
2. Ouvrez Obsidian et accédez à **Paramètres > Natural Move**.
3. Entrez votre clé de licence dans le champ **Clé de licence**.
4. Cliquez sur **Vérifier**.
5. Une fois activées, toutes les fonctionnalités Pro seront débloquées immédiatement.

## 🛠️ Prérequis pour l'exportation Pandoc

Pour utiliser les fonctions d'exportation (Word, PowerPoint, PDF, etc.), **Pandoc** doit être installé sur votre système.

- **Mac :** `brew install pandoc` (via Homebrew) ou téléchargez l'installateur sur le [site web de Pandoc](https://pandoc.org/installing.html).
- **Windows :** Téléchargez l'installateur sur le site web de Pandoc.

### ⚠️ Important pour l'exportation PDF et Beamer (MacTeX & MiKTeX)

Pandoc nécessite une distribution LaTeX en arrière-plan pour générer des PDF et des présentations Beamer. Sur Mac, **MacTeX** est la norme. Sur Windows, **MiKTeX** est recommandé.

**Installation de MacTeX (Mac) :**

*Option 1 : Via Homebrew (Recommandé)*
Ouvrez le terminal et entrez la commande suivante :
```bash
brew install --cask mactex-no-gui
```
*(Remarque : Le téléchargement est très volumineux (environ 5 Go) car il contient tous les packages LaTeX nécessaires. La version `mactex-no-gui` n'installe que les outils en ligne de commande, ce qui est suffisant pour Pandoc).*

*Option 2 : Téléchargement manuel*
1. Allez sur le site officiel : [tug.org/mactex](https://www.tug.org/mactex/)
2. Téléchargez le fichier `MacTeX.pkg` et lancez l'installateur.


**Installation de MiKTeX (Windows):**
1. Allez sur le site officiel : [miktex.org/download](https://miktex.org/download)
2. Téléchargez l'installateur et exécutez-le.
3. Lors de l'installation, choisissez d'installer automatiquement les packages manquants.

Après avoir installé Pandoc et MacTeX/MiKTeX, vous devrez peut-être redémarrer complètement Obsidian pour que les nouveaux chemins système soient reconnus. Le plugin Natural Move/Export recherche automatiquement les programmes requis dans les chemins standard (`/Library/TeX/texbin`, `/opt/homebrew/bin`, `/usr/local/bin`).

## Installation dans Obsidian

### Via BRAT (Tests Bêta)
1. Installez le plugin "Obsidian 42 - BRAT" depuis les plugins de la communauté.
2. Allez dans les paramètres de BRAT et cliquez sur "Add Beta Plugin".
3. Entrez l'URL de ce dépôt GitHub.
4. Cliquez sur "Add Plugin".

### Installation manuelle
1. Téléchargez le projet sous forme de fichier ZIP et extrayez-le.
2. Créez le dossier dans votre coffre Obsidian : `.obsidian/plugins/natural-move`
3. Copiez tous les fichiers du projet extraits dans ce nouveau dossier.
4. Ouvrez un terminal dans ce dossier et exécutez les commandes suivantes :
   ```bash
   npm install
   npm run build
   ```
5. Ouvrez Obsidian et accédez à **Paramètres > Plugins de la communauté**.
6. Désactivez le "Mode sans échec" si vous ne l'avez pas déjà fait.
7. Cliquez sur "Actualiser" et activez le plugin **Natural Move/Export**.

## Crédits & Licence

- **Auteur :** Naturalis
- **Licence :** MIT
- **Outils tiers :** Ce plugin utilise [Pandoc](https://pandoc.org/) (sous licence GPL) comme outil de ligne de commande externe pour la conversion de fichiers. Pandoc n'est pas fourni avec ce plugin et doit être installé séparément par l'utilisateur.
