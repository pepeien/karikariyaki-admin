import PT_BR from './pt-br';
import EN_US from './en-us';

const Langs = {
	ptBr: PT_BR,
	enUs: EN_US,
};

type LangKey = keyof typeof Langs;

export { Langs, LangKey };
