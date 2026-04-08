import en from './locale/en';
import de from './locale/de';
import fr from './locale/fr';
import es from './locale/es';
import zh from './locale/zh';
import ja from './locale/ja';
import ko from './locale/ko';
import pt from './locale/pt';
import ru from './locale/ru';

const localeMap: { [k: string]: Partial<typeof en> } = {
	en,
	de,
	fr,
	es,
	zh,
	'zh-cn': zh,
	ja,
	ko,
	pt,
	'pt-br': pt,
	ru,
};

const locale = localeMap[window.localStorage.getItem('language') || 'en'] || en;

export function t(str: keyof typeof en, ...args: string[]): string {
	let text = locale[str] || en[str] || str;
	
	if (args && args.length > 0) {
		args.forEach((arg, i) => {
			text = text.replace(`%${i + 1}`, arg);
		});
	}
	
	return text;
}
