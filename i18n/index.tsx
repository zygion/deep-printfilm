import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_LOCALE,
  dictionaries,
  type LocaleCode,
  type TranslationDictionary,
  LOCALE_STORAGE_KEY,
} from './types';

type InterpolationValues = Record<string, string | number>;

interface I18nContextValue {
  locale: LocaleCode;
  setLocale: (locale: LocaleCode) => void;
  t: (key: string, values?: InterpolationValues) => string;
  dictionary: TranslationDictionary;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const isLocaleCode = (value: string | null): value is LocaleCode =>
  value === 'en' || value === 'zh-CN';

const readStoredLocale = (): LocaleCode => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocaleCode(stored)) return stored;
  } catch {
    // ignore storage errors and fall through to default
  }
  return DEFAULT_LOCALE;
};

const getByPath = (source: TranslationDictionary, key: string): unknown => {
  if (key in source) {
    return (source as Record<string, unknown>)[key];
  }
  return key.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, source);
};

const interpolate = (template: string, values?: InterpolationValues): string => {
  if (!values) return template;
  return template.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (match, name: string) => {
    if (Object.prototype.hasOwnProperty.call(values, name)) {
      return String(values[name]);
    }
    return match;
  });
};

interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale?: LocaleCode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, initialLocale }) => {
  const [locale, setLocaleState] = useState<LocaleCode>(() => initialLocale ?? readStoredLocale());

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // ignore storage errors
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((next: LocaleCode) => {
    setLocaleState(next);
  }, []);

  const t = useCallback(
    (key: string, values?: InterpolationValues) => {
      const dict = dictionaries[locale];
      const fallback = dictionaries[DEFAULT_LOCALE];
      const raw = getByPath(dict, key) ?? getByPath(fallback, key) ?? key;
      const template = typeof raw === 'string' ? raw : String(raw);
      return interpolate(template, values);
    },
    [locale]
  );

  const dictionary = dictionaries[locale];

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, dictionary }),
    [locale, setLocale, t, dictionary]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
};

export const useTranslation = () => {
  const { t, locale, setLocale } = useI18n();
  return { t, locale, setLocale };
};
