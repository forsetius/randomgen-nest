import { AppLanguageEnum } from '../../src/page/types/AppLanguageEnum';
import { NoSuchTranslationException } from '../../src/page/exceptions/NoSuchTranslationException';

const translations: Record<string, Record<AppLanguageEnum, string>> = {
  LAST_POSTS: { pl: 'Ostatnie wpisy', en: 'Last posts' },
};

export function translate(label: string, lang: AppLanguageEnum): string {
  if (!translations[label]) {
    throw new NoSuchTranslationException(label);
  }

  return translations[label]![lang];
}
