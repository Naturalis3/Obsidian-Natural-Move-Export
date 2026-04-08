import { App, Notice, Plugin, TFile, TFolder, TAbstractFile, Menu, MenuItem, PluginSettingTab, Setting, FileSystemAdapter } from 'obsidian';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as os from 'os';
import { t } from './lang/helpers';
import { verifyLicense } from './license';
// @ts-ignore
import * as electron from 'electron';

// Wir nutzen Electron für den Zugriff auf das Dateisystem-Clipboard und Drag & Drop
const { clipboard } = electron;

interface NaturalMoveSettings {
	targetFolderPath: string;
	enableAudioFeedback: boolean;
	pandocPath: string;
	customPandocArgs: string;
	wordTemplatesFolderPath: string;
	licenseKey: string;
	instanceId: string;
	isPro: boolean;
}

const DEFAULT_SETTINGS: NaturalMoveSettings = {
	targetFolderPath: '',
	enableAudioFeedback: true,
	pandocPath: 'pandoc',
	customPandocArgs: '',
	wordTemplatesFolderPath: '',
	licenseKey: '',
	instanceId: '',
	isPro: false
}

interface PandocFormat {
	name: string;
	ext: string;
	args: string;
	icon: string;
	menuKey: string;
}

const PANDOC_FORMATS: Record<string, PandocFormat> = {
	'docx': { name: 'Word', ext: 'docx', args: '', icon: 'file-text', menuKey: 'WORD_TEMPLATES_MENU' },
	'pptx': { name: 'PowerPoint', ext: 'pptx', args: '', icon: 'presentation', menuKey: 'PPT_TEMPLATES_MENU' },
	'pdf': { name: 'PDF', ext: 'pdf', args: '', icon: 'file-text', menuKey: 'PDF_TEMPLATES_MENU' },
	'beamer': { name: 'Beamer-Slides', ext: 'pdf', args: '-t beamer', icon: 'presentation', menuKey: 'BEAMER_TEMPLATES_MENU' },
	'markdown': { name: 'Markdown', ext: 'md', args: '-t markdown', icon: 'file-text', menuKey: 'MD_TEMPLATES_MENU' },
	'html': { name: 'HTML', ext: 'html', args: '--embed-resources --standalone', icon: 'globe', menuKey: 'HTML_TEMPLATES_MENU' }
};

export default class NaturalMove extends Plugin {
	settings!: NaturalMoveSettings;
	private audioCtx: AudioContext | null = null;
	private boundDragStartHandler!: (evt: DragEvent) => void;

	private boundKeyDownHandler!: (evt: KeyboardEvent) => void;

	async onload() {
		console.debug(t('LOAD_PLUGIN'));
		await this.loadSettings();

		// Pro-Status beim Start prüfen (falls Key vorhanden)
		if (this.settings.licenseKey) {
			const status = await verifyLicense(this.settings.licenseKey, this.settings.instanceId);
			// Nur wenn der Server explizit sagt "Ungültig", entziehen wir Pro.
			// Bei Verbindungsfehlern behalten wir den gespeicherten Status bei.
			if (status.isValid) {
				this.settings.isPro = true;
				if (status.instanceId) {
					this.settings.instanceId = status.instanceId;
					await this.saveSettings();
				}
			} else if (status.errorType === 'invalid') {
				this.settings.isPro = false;
				this.settings.instanceId = '';
				await this.saveSettings();
			}
			// Bei 'connection' lassen wir isPro einfach so, wie es in den Settings steht.
		} else {
			this.settings.isPro = false;
		}

		// Audio Context initialisieren
		this.initAudio();

		// 1. Globaler Copy-Handler für Cmd+C / Ctrl+C (via keydown)
		this.boundKeyDownHandler = (evt: KeyboardEvent) => {
			if ((evt.metaKey || evt.ctrlKey) && (evt.key.toLowerCase() === 'c' || evt.code === 'KeyC')) {
				const target = evt.target as HTMLElement;
				
				// Wenn der Fokus im Editor oder einem Eingabefeld liegt, IMMER das Standard-Copy von Obsidian/System zulassen
				if (
					target.tagName === 'INPUT' || 
					target.tagName === 'TEXTAREA' || 
					target.isContentEditable || 
					target.closest('.cm-editor, .markdown-source-view, .markdown-rendered')
				) {
					return;
				}

				const files = this.getSelectedFiles();
				if (files.length > 0) {
					// PRO: Folder Copying
					const hasFolder = files.some(f => f instanceof TFolder);
					if (hasFolder && !this.settings.isPro) {
						new Notice(t('PRO_FEATURE_LOCKED'));
						return;
					}

					evt.preventDefault();
					evt.stopPropagation();
					void this.copyFilesToClipboard(files);
				}
			}
		};
		document.addEventListener('keydown', this.boundKeyDownHandler, true);

		// 1b. Obsidian Command als Fallback
		this.addCommand({
			id: 'copy-selected-files',
			name: t('COPY_COMMAND_NAME'),
			callback: () => {
				const files = this.getSelectedFiles();
				if (files.length > 0) {
					// PRO: Folder Copying
					const hasFolder = files.some(f => f instanceof TFolder);
					if (hasFolder && !this.settings.isPro) {
						new Notice(t('PRO_FEATURE_LOCKED'));
						return;
					}
					void this.copyFilesToClipboard(files);
				} else {
					new Notice(t('NO_FILES_SELECTED'));
				}
			}
		});

		// 2. Drag & Drop Event (Capture Phase)
		this.boundDragStartHandler = this.handleDragStart.bind(this);
		document.addEventListener('dragstart', this.boundDragStartHandler, true);

		// 3. Kontextmenü (File Explorer)
		this.registerEvent(
			this.app.workspace.on('file-menu', (menu, file) => {
				if (file instanceof TAbstractFile) {
					this.addCopyMenuItems(menu, [file], false);
				}
			})
		);

		this.registerEvent(
			this.app.workspace.on('files-menu', (menu, files) => {
				if (files.length > 0) {
					this.addCopyMenuItems(menu, files, false);
				}
			})
		);

		this.addSettingTab(new NaturalMoveSettingTab(this.app, this));
	}

	onunload() {
		console.debug(t('UNLOAD_PLUGIN'));
		if (this.audioCtx) void this.audioCtx.close();
		document.getElementById('natural-move-style')?.remove();
		document.removeEventListener('dragstart', this.boundDragStartHandler, true);
		document.removeEventListener('keydown', this.boundKeyDownHandler, true);
	}

	// ──────────────────────────────────────────────
	//  Drag & Drop Handler
	// ──────────────────────────────────────────────
	private handleDragStart(evt: DragEvent) {
		const target = evt.target as Node;
		const el = target.nodeType === 3 ? target.parentElement : target as HTMLElement;
		if (!el) return;

		// Fall: File Explorer Item
		if (!evt.altKey) return; 

		const navFile = el.closest('.nav-file-title, .nav-file, .nav-folder-title, .nav-folder');
		if (navFile) {
			const selectedFiles = this.getSelectedFiles();
			let files: TAbstractFile[] = [];
			
			const path = navFile.getAttribute('data-path') || navFile.querySelector('.nav-file-title, .nav-folder-title')?.getAttribute('data-path');
			const clickedFile = this.app.vault.getAbstractFileByPath(path || "");
			
			if (clickedFile) {
				if (selectedFiles.length > 1 && selectedFiles.some(f => f.path === clickedFile.path)) {
					files = selectedFiles;
				} else {
					files = [clickedFile];
				}
			}

			if (files.length > 0) {
				// PRO: Folder Dragging
				const hasFolder = files.some(f => f instanceof TFolder);
				if (hasFolder && !this.settings.isPro) {
					new Notice(t('PRO_FEATURE_LOCKED'));
					evt.preventDefault();
					return;
				}

				const absolutePaths = files
					.map(f => this.getAbsolutePath(f))
					.filter((p): p is string => p !== null);

				if (absolutePaths.length > 0) {
					this.startNativeDrag(evt, files, absolutePaths);
				}
			}
		}
	}

	private startNativeDrag(evt: DragEvent, files: TAbstractFile[], absolutePaths: string[]) {
		let nativeDragSuccess = false;

		// 1. Versuch: Native Electron Drag (startDrag)
		try {
			const remote = (window as unknown as { require: (mod: string) => { getCurrentWebContents: () => { startDrag: (item: unknown) => void } } }).require('@electron/remote');
			const wc = remote.getCurrentWebContents();

			if (typeof wc.startDrag === 'function') {
				// Obsidian's internes Dragging stoppen, da startDrag übernimmt
				evt.preventDefault();
				evt.stopPropagation();

				let iconImage;
				try {
					const transparent1x1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
					iconImage = electron.nativeImage.createFromDataURL(transparent1x1);
				} catch {
					iconImage = "";
				}

				if (this.audioCtx?.state === 'suspended') {
					void this.audioCtx.resume();
				}

				wc.startDrag({
					file: absolutePaths[0],
					files: absolutePaths, // Für neuere Electron-Versionen (Multi-File)
					icon: iconImage
				});

				nativeDragSuccess = true;
				setTimeout(() => this.playSuccessSound(), 500);
			}
		} catch {
			console.debug("Native drag not available, falling back to HTML5 drag");
		}

		// 2. Fallback: HTML5 Drag (DownloadURL / ZIP)
		if (!nativeDragSuccess) {
			const isWin = os.platform() === 'win32';
			evt.dataTransfer?.clearData();

			if (absolutePaths.length === 1) {
				// Einzelne Datei
				let uri = absolutePaths[0].replace(/\\/g, '/');
				if (isWin && !uri.startsWith('/')) uri = '/' + uri;
				
				const downloadUrl = `application/octet-stream:${files[0].name}:file://${uri}`;
				evt.dataTransfer?.setData('DownloadURL', downloadUrl);
				evt.dataTransfer?.setData('text/uri-list', `file://${uri}`);
			} else {
				// Mehrere Dateien (ZIP Workaround)
				const zipName = `Obsidian_Export_${Date.now()}.zip`;
				const zipPath = path.join(os.tmpdir(), zipName);
				this.createZip(absolutePaths, zipPath);
				
				let uri = zipPath.replace(/\\/g, '/');
				if (isWin && !uri.startsWith('/')) uri = '/' + uri;
				
				const downloadUrl = `application/octet-stream:${zipName}:file://${uri}`;
				evt.dataTransfer?.setData('DownloadURL', downloadUrl);
				evt.dataTransfer?.setData('text/uri-list', `file://${uri}`);
			}

			evt.dataTransfer?.setData('text/plain', absolutePaths.join('\n'));
			evt.stopPropagation(); // Verhindert, dass Obsidian die Daten überschreibt
		}
	}

	private createZip(sourcePaths: string[], destPath: string) {
		const platform = os.platform();
		try {
			if (platform === 'darwin') {
				// Mac: natives zip Kommando (-j ignoriert Ordnerstrukturen, -q ist quiet)
				const escapedPaths = sourcePaths.map(p => `"${p.replace(/"/g, '\\"')}"`).join(' ');
				exec(`zip -j -q "${destPath}" ${escapedPaths}`, (error) => {
					if (error) console.error('Zip creation failed (Mac):', error);
				});
			} else if (platform === 'win32') {
				// Windows: PowerShell Compress-Archive
				const escapedPaths = sourcePaths.map(p => `'${p.replace(/'/g, "''")}'`).join(',');
				const script = `powershell.exe -NoProfile -Command "Compress-Archive -Path ${escapedPaths} -DestinationPath '${destPath}' -Force"`;
				exec(script, (error) => {
					if (error) console.error('Zip creation failed (Win):', error);
				});
			}
		} catch (e) {
			console.error('Failed to execute zip command:', e);
		}
	}

	// ──────────────────────────────────────────────
	//  Hilfsfunktionen
	// ──────────────────────────────────────────────

	private addCopyMenuItems(menu: Menu, files: TAbstractFile[], isLink: boolean = false) {
		const fileCount = files.length;
		const labelSuffix = fileCount > 1 ? ` (${fileCount})` : '';
		const prefix = isLink ? t('LINKED_FILE') : '';

		// FREE: Copy to Clipboard (Files only) | PRO: Folders
		const hasFolder = files.some(f => f instanceof TFolder);
		menu.addItem((item: MenuItem) => {
			const title = `${prefix}${t('COPY_TO_CLIPBOARD')}${labelSuffix}${hasFolder && !this.settings.isPro ? ' (Pro)' : ''}`;
			item
				.setTitle(title)
				.setIcon('copy')
				.setSection('action')
				.onClick(() => {
					if (hasFolder && !this.settings.isPro) {
						new Notice(t('PRO_FEATURE_LOCKED'));
						return;
					}
					this.copyFilesToClipboard(files);
				});
		});

		// PRO: Copy to Target Folder
		menu.addItem((item: MenuItem) => {
			const title = `${prefix}${t('COPY_TO_TARGET_FOLDER')}${labelSuffix}${!this.settings.isPro ? ' (Pro)' : ''}`;
			item
				.setTitle(title)
				.setIcon('folder-check')
				.setSection('action')
				.onClick(() => {
					if (!this.settings.isPro) {
						new Notice(t('PRO_FEATURE_LOCKED'));
						return;
					}
					this.copyToTargetFolder(files);
				});
		});

		// PRO: Pandoc Exports (Submenu)
		const mdFiles = files.filter(f => f instanceof TFile && f.extension === 'md') as TFile[];
		if (mdFiles.length > 0) {
			menu.addItem((mainItem: MenuItem) => {
				const mainTitle = t('EXPORT_SUBMENU_TITLE') + labelSuffix + (!this.settings.isPro ? ' (Pro)' : '');
				mainItem
					.setTitle(mainTitle)
					.setIcon('export')
					.setSection('action');

				if (!this.settings.isPro) {
					mainItem.onClick(() => new Notice(t('PRO_FEATURE_LOCKED')));
					return;
				}

				const exportSubmenu = (mainItem as MenuItem & { setSubmenu: () => Menu }).setSubmenu();

				Object.entries(PANDOC_FORMATS).forEach(([key, format]) => {
					exportSubmenu.addItem((formatItem: MenuItem) => {
						formatItem
							.setTitle(t(format.menuKey as any))
							.setIcon(format.icon);

						const formatSubmenu = (formatItem as MenuItem & { setSubmenu: () => Menu }).setSubmenu();

						// 1. Standard Export (No Template)
						formatSubmenu.addItem((item: MenuItem) => {
							item
								.setTitle(t('EXPORT_WITHOUT_TEMPLATE'))
								.setIcon(format.icon)
								.onClick(async () => {
									await this.exportWithPandoc(mdFiles, format);
								});
						});

						// 2. Templates (Pro)
						if (this.settings.wordTemplatesFolderPath) {
							try {
								if (fs.existsSync(this.settings.wordTemplatesFolderPath)) {
									const templateExts: Record<string, string[]> = {
										'docx': ['.docx'],
										'pptx': ['.pptx'],
										'pdf': ['.tex', '.latex'],
										'beamer': ['.tex', '.latex']
									};

									const allowedExts = templateExts[key] || [];
									if (allowedExts.length === 0) return; // Skip formats without template support
									const templateFiles = fs.readdirSync(this.settings.wordTemplatesFolderPath)
										.filter(f => allowedExts.some(ext => f.endsWith(ext)));
									
									templateFiles.forEach(templateFile => {
										formatSubmenu.addItem((item: MenuItem) => {
											const templateName = path.basename(templateFile, path.extname(templateFile));
											const isExperimental = ['pdf', 'beamer', 'pptx'].includes(key);
											item
												.setTitle(t('EXPORT_WITH_TEMPLATE', templateName) + (isExperimental ? ' ' + t('EXPERIMENTAL') : ''))
												.setIcon('file-text')
												.onClick(async () => {
													const templatePath = path.join(this.settings.wordTemplatesFolderPath, templateFile);
													await this.exportWithPandoc(mdFiles, format, templatePath);
												});
										});
									});
								}
							} catch (e) {
								console.error('Error reading templates folder:', e);
							}
						}
					});
				});
			});
		}
	}

	private getSelectedFiles(): TAbstractFile[] {
		const files: TAbstractFile[] = [];
		// Suche nach allen Elementen, die ausgewählt oder aktiv sind (unterstützt alte und neue Obsidian DOM-Strukturen)
		const activeEls = document.querySelectorAll('.is-selected, .is-active, .has-active-menu');
		
		activeEls.forEach(el => {
			// data-path kann auf dem Element selbst oder einem Kind/Elternteil liegen
			let path = el.getAttribute('data-path');
			
			if (!path) {
				const childWithPath = el.querySelector('[data-path]');
				if (childWithPath) path = childWithPath.getAttribute('data-path');
			}
			
			if (!path) {
				const parentWithPath = el.closest('[data-path]');
				if (parentWithPath) path = parentWithPath.getAttribute('data-path');
			}
			
			if (path) {
				const file = this.app.vault.getAbstractFileByPath(path);
				if (file && !files.includes(file)) files.push(file);
			}
		});
		return files;
	}

	private copyFilesToClipboard(files: TAbstractFile[]) {
		const absolutePaths = files
			.map(f => this.getAbsolutePath(f))
			.filter((p): p is string => p !== null);

		if (absolutePaths.length === 0) {
			new Notice(t('COPY_ERROR_PATHS'));
			return;
		}

		const platform = os.platform();

		try {
			if (platform === 'darwin') {
				// macOS: Nutze Objective-C via JXA/AppleScript für echten File-Clipboard-Support
				const script = `
use framework "Foundation"
use framework "AppKit"
set pb to current application's NSPasteboard's generalPasteboard()
pb's clearContents()
set fileArray to current application's NSMutableArray's array()
${absolutePaths.map(p => `fileArray's addObject:(current application's NSURL's fileURLWithPath:"${p.replace(/"/g, '\\"')}")`).join('\n')}
pb's writeObjects:fileArray
`;
				const child = exec('osascript', (error) => {
					if (error) {
						console.error('AppleScript Error:', error);
						clipboard.writeText(absolutePaths.join('\n'));
						new Notice(t('COPY_ERROR_GENERIC'));
					} else {
						this.playSuccessSound();
						new Notice(t('COPY_SUCCESS', absolutePaths.length.toString()));
					}
				});
				child.stdin?.write(script);
				child.stdin?.end();
			} else if (platform === 'win32') {
				// Windows: PowerShell mit speziellem File-Drop Format
				const escapedPaths = absolutePaths.map(p => `'${p.replace(/'/g, "''")}'`).join(', ');
				const script = `powershell.exe -NoProfile -Command "Set-Clipboard -Path ${escapedPaths}"`;
				
				exec(script, (error) => {
					if (error) {
						console.error('PowerShell Error:', error);
						clipboard.writeText(absolutePaths.join('\n'));
						new Notice(t('COPY_ERROR_GENERIC'));
					} else {
						this.playSuccessSound();
						new Notice(t('COPY_SUCCESS', absolutePaths.length.toString()));
					}
				});
			} else {
				clipboard.writeText(absolutePaths.join('\n'));
				this.playSuccessSound();
				new Notice(t('COPY_SUCCESS', absolutePaths.length.toString()));
			}
		} catch (err) {
			console.error('Clipboard Error:', err);
			new Notice(t('CRITICAL_COPY_ERROR'));
		}
	}

	private copyToTargetFolder(files: TAbstractFile[]) {
		if (!this.settings.isPro) {
			new Notice(t('PRO_FEATURE_LOCKED'));
			return;
		}
		if (!this.settings.targetFolderPath) {
			new Notice(t('TARGET_FOLDER_NOT_SET'));
			return;
		}

		let successCount = 0;
		let errorCount = 0;

		for (const file of files) {
			const sourcePath = this.getAbsolutePath(file);
			if (!sourcePath) {
				errorCount++;
				continue;
			}

			const destinationPath = path.join(this.settings.targetFolderPath, file.name);
			try {
				if (file instanceof TFolder) {
					fs.cpSync(sourcePath, destinationPath, { recursive: true });
				} else {
					fs.copyFileSync(sourcePath, destinationPath);
				}
				successCount++;
			} catch (err) {
				console.error(`Copy Error (${file.name}):`, err);
				errorCount++;
			}
		}

		if (successCount > 0) {
			this.playSuccessSound();
			new Notice(t('TARGET_FOLDER_SUCCESS', successCount.toString()));
		}
		if (errorCount > 0) {
			new Notice(t('TARGET_FOLDER_ERROR', errorCount.toString()));
		}
	}

	private async exportWithPandoc(files: TFile[], format: PandocFormat, templatePath?: string) {
		if (!this.settings.isPro) {
			new Notice(t('PRO_FEATURE_LOCKED'));
			return;
		}
		if (!this.settings.targetFolderPath || !fs.existsSync(this.settings.targetFolderPath)) {
			new Notice(t('TARGET_FOLDER_NOT_EXISTS'));
			return;
		}

		let successCount = 0;
		let errorCount = 0;
		let lastError = "";
		const pandocCmd = this.settings.pandocPath || 'pandoc';

		const exportName = templatePath ? path.basename(templatePath, '.docx') : format.name;
		new Notice(t('EXPORTING_FILES', files.length.toString(), exportName));

		// Erweitere PATH für Mac (Homebrew, MacTeX)
		const env = {
			...process.env,
			PATH: `${process.env.PATH || ''}:/usr/local/bin:/opt/homebrew/bin:/Library/TeX/texbin:/usr/bin:/bin:/usr/sbin:/sbin`
		};

		for (const file of files) {
			const sourcePath = this.getAbsolutePath(file);
			if (!sourcePath) {
				errorCount++;
				continue;
			}

			let destName = file.basename + '.' + format.ext;
			// Verhindere Überschreiben der Quelldatei, falls Zielordner = Vault-Ordner
			if (format.ext === 'md' && sourcePath === path.join(this.settings.targetFolderPath, destName)) {
				destName = file.basename + '_export.' + format.ext;
			}
			
			const destPath = path.join(this.settings.targetFolderPath, destName);

			// Pandoc Befehl zusammenbauen
			let customArgs = (this.settings.isPro && this.settings.customPandocArgs) ? ` ${this.settings.customPandocArgs}` : '';
			
			// Pro Feature: Templates
			if (this.settings.isPro && templatePath && fs.existsSync(templatePath)) {
				const ext = path.extname(templatePath).toLowerCase();
				if (ext === '.docx' || ext === '.pptx') {
					customArgs += ` --reference-doc="${templatePath}"`;
				} else {
					customArgs += ` --template="${templatePath}"`;
				}
			}

			const cmd = `"${pandocCmd}" "${sourcePath}" ${format.args}${customArgs} -o "${destPath}"`;

			try {
				await new Promise<void>((resolve, reject) => {
					exec(cmd, { env }, (error, stdout, stderr) => {
						if (error) {
							console.error('Pandoc Error:', error, stderr);
							lastError = stderr || error.message;
							reject(error);
						} else {
							resolve();
						}
					});
				});
				successCount++;
			} catch (err) {
				console.error(`Fehler beim Export von ${file.name}:`, err);
				errorCount++;
			}
		}

		if (successCount > 0) {
			this.playSuccessSound();
			new Notice(t('EXPORT_SUCCESS', successCount.toString(), format.name));
		}
		if (errorCount > 0) {
			new Notice(t('EXPORT_ERROR', errorCount.toString(), lastError.substring(0, 100)));
		}
	}

	private getAbsolutePath(file: TAbstractFile): string | null {
		const adapter = this.app.vault.adapter;
		if (adapter instanceof FileSystemAdapter) {
			return adapter.getFullPath(file.path);
		}
		return null; 
	}

	private initAudio() {
		try {
			this.audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
		} catch {
			console.error('AudioContext konnte nicht initialisiert werden');
		}
	}

	public playSuccessSound() {
		if (!this.settings.enableAudioFeedback) return;
		
		if (this.audioCtx?.state === 'suspended') {
			void this.audioCtx.resume();
		}

		if (!this.audioCtx) return;

		try {
			const oscillator = this.audioCtx.createOscillator();
			const gainNode = this.audioCtx.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(this.audioCtx.destination);

			// Mac-ähnlicher "Pop" (Bottle)
			oscillator.type = 'sine';
			oscillator.frequency.setValueAtTime(600, this.audioCtx.currentTime); 
			oscillator.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.1);

			gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.1);

			oscillator.start();
			oscillator.stop(this.audioCtx.currentTime + 0.1);
		} catch (e) {
			console.error('Audio Feedback Error:', e);
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class NaturalMoveSettingTab extends PluginSettingTab {
	plugin: NaturalMove;

	constructor(app: App, plugin: NaturalMove) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		new Setting(containerEl).setName(t('SETTINGS_TITLE')).setHeading();

		// --- LICENSE SECTION ---
		const licenseSetting = new Setting(containerEl).setName(t('SETTING_LICENSE_KEY_NAME')).setHeading();
		if (this.plugin.settings.isPro) {
			licenseSetting.nameEl.createEl('span', { 
				text: ' Pro', 
				cls: 'natural-move-pro-badge' 
			});
		}

		new Setting(containerEl)
			.setName(t('SETTING_BUY_PRO_NAME'))
			.setDesc(t('SETTING_BUY_PRO_DESC'))
			.addButton(btn => btn
				.setButtonText(t('SETTING_BUY_PRO_BUTTON'))
				.onClick(() => {
					window.open("https://naturalis.lemonsqueezy.com/checkout/buy/9223dcd2-5bd9-4787-a1cc-3972c78b067b");
				}));

		new Setting(containerEl)
			.setName(t('SETTING_LICENSE_KEY_NAME'))
			.setDesc(t('SETTING_LICENSE_KEY_DESC'))
			.addText(text => text
				.setPlaceholder('NM-xxxx-xxxx-xxxx')
				.setValue(this.plugin.settings.licenseKey)
				.onChange(async (value) => {
					const trimmedValue = value.trim();
					this.plugin.settings.licenseKey = trimmedValue;
					
					// Wenn der Key gelöscht wird, Pro sofort deaktivieren
					if (!trimmedValue) {
						this.plugin.settings.isPro = false;
						this.plugin.settings.instanceId = '';
						await this.plugin.saveSettings();
						this.display(); // UI aktualisieren (Felder sperren)
					} else {
						await this.plugin.saveSettings();
					}
				}))
			.addButton(btn => btn
				.setButtonText(t('SETTING_LICENSE_VERIFY_BUTTON'))
				.setCta()
				.onClick(async () => {
					// Verhindere Mehrfach-Klicks
					btn.setDisabled(true);
					btn.setButtonText("...");
					
					try {
						const status = await verifyLicense(this.plugin.settings.licenseKey, this.plugin.settings.instanceId);
						
						if (status.isValid) {
							this.plugin.settings.isPro = true;
							if (status.instanceId) {
								this.plugin.settings.instanceId = status.instanceId;
							}
							new Notice(t('LICENSE_VALID'));
						} else {
							if (status.errorType === 'invalid') {
								this.plugin.settings.isPro = false;
								this.plugin.settings.instanceId = '';
								new Notice(t('LICENSE_INVALID') + (status.message ? `: ${status.message}` : ''));
							} else {
								// Verbindungsfehler: Wir lassen den Status wie er ist, informieren aber den User
								new Notice(status.message || "Connection error");
							}
						}
						
						await this.plugin.saveSettings();
						this.display(); // Refresh UI
					} finally {
						btn.setDisabled(false);
						btn.setButtonText(t('SETTING_LICENSE_VERIFY_BUTTON'));
					}
				}));

		containerEl.createEl('hr');

		new Setting(containerEl)
			.setName(t('SETTING_TARGET_FOLDER_NAME') + (!this.plugin.settings.isPro ? ' (Pro)' : ''))
			.setDesc(t('SETTING_TARGET_FOLDER_DESC'))
			.addText(text => {
				text
					.setPlaceholder(t('PLACEHOLDER_TARGET_FOLDER'))
					.setValue(this.plugin.settings.targetFolderPath)
					.onChange(async (value) => {
						this.plugin.settings.targetFolderPath = value.trim();
						await this.plugin.saveSettings();
					});
				
				if (!this.plugin.settings.isPro) {
					text.inputEl.disabled = true;
					text.inputEl.classList.add('natural-move-disabled');
				}
				return text;
			});

		new Setting(containerEl)
			.setName(t('SETTING_PANDOC_PATH_NAME') + (!this.plugin.settings.isPro ? ' (Pro)' : ''))
			.setDesc(t('SETTING_PANDOC_PATH_DESC'))
			.addText(text => {
				text
					.setPlaceholder('pandoc')
					.setValue(this.plugin.settings.pandocPath)
					.onChange(async (value) => {
						this.plugin.settings.pandocPath = value.trim();
						await this.plugin.saveSettings();
					});
				
				if (!this.plugin.settings.isPro) {
					text.inputEl.disabled = true;
					text.inputEl.classList.add('natural-move-disabled');
				}
				return text;
			});

		new Setting(containerEl)
			.setName(t('SETTING_CUSTOM_ARGS_NAME') + (!this.plugin.settings.isPro ? ' (Pro)' : ''))
			.setDesc(t('SETTING_CUSTOM_ARGS_DESC'))
			.addTextArea(text => {
				text
					.setPlaceholder('--toc --citeproc ...')
					.setValue(this.plugin.settings.customPandocArgs)
					.onChange(async (value) => {
						this.plugin.settings.customPandocArgs = value.trim();
						await this.plugin.saveSettings();
					});
				
				// Lock if not Pro
				if (!this.plugin.settings.isPro) {
					text.inputEl.disabled = true;
					text.inputEl.classList.add('natural-move-disabled');
					text.inputEl.title = t('PRO_FEATURE_LOCKED');
				}
				return text;
			});

		new Setting(containerEl)
			.setName(t('SETTING_WORD_TEMPLATES_FOLDER_NAME') + (!this.plugin.settings.isPro ? ' (Pro)' : ''))
			.setDesc(t('SETTING_WORD_TEMPLATES_FOLDER_DESC'))
			.addText(text => {
				text
					.setPlaceholder(t('PLACEHOLDER_TEMPLATES_FOLDER'))
					.setValue(this.plugin.settings.wordTemplatesFolderPath)
					.onChange(async (value) => {
						this.plugin.settings.wordTemplatesFolderPath = value.trim();
						await this.plugin.saveSettings();
					});
				
				if (!this.plugin.settings.isPro) {
					text.inputEl.disabled = true;
					text.inputEl.classList.add('natural-move-disabled');
				}
				return text;
			});

		new Setting(containerEl)
			.setName(t('SETTING_AUDIO_FEEDBACK_NAME'))
			.setDesc(t('SETTING_AUDIO_FEEDBACK_DESC'))
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enableAudioFeedback)
				.onChange(async (value) => {
					this.plugin.settings.enableAudioFeedback = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName(t('SETTING_TEST_SOUND_NAME'))
			.setDesc(t('SETTING_TEST_SOUND_DESC'))
			.addButton(btn => btn
				.setButtonText(t('SETTING_TEST_SOUND_BUTTON'))
				.onClick(() => {
					this.plugin.playSuccessSound();
				}));
	}
}
