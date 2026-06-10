import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';

export type LocaleCode = 'en' | 'zh-CN';

export interface LocaleDefinition {
  code: LocaleCode;
  label: string;
  englishLabel: string;
  flag: string;
}

export const SUPPORTED_LOCALES: LocaleDefinition[] = [
  { code: 'en', label: 'English', englishLabel: 'English', flag: 'EN' },
  { code: 'zh-CN', label: '简体中文', englishLabel: 'Simplified Chinese', flag: 'ZH' },
];

export type TranslationDictionary = typeof en;

export const LOCALE_STORAGE_KEY = 'ai_manga_studio_locale';
export const DEFAULT_LOCALE: LocaleCode = 'en';

export const dictionaries: Record<LocaleCode, TranslationDictionary> = {
  en,
  'zh-CN': zhCN,
};
