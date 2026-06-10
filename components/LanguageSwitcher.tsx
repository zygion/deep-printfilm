import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe, Languages } from 'lucide-react';
import { SUPPORTED_LOCALES, type LocaleCode } from '../i18n/types';
import { useI18n } from '../i18n';

interface LanguageSwitcherProps {
  variant?: 'floating' | 'inline';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'floating' }) => {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const active = SUPPORTED_LOCALES.find((l) => l.code === locale) ?? SUPPORTED_LOCALES[0];

  const handleSelect = (code: LocaleCode) => {
    setLocale(code);
    setOpen(false);
  };

  const isFloating = variant === 'floating';

  return (
    <div
      ref={wrapperRef}
      className={isFloating ? 'absolute top-4 right-6 z-50' : 'relative inline-block'}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.switcher.label')}
        className={
          isFloating
            ? 'pointer-events-auto flex items-center gap-2 text-xs font-mono text-cyan-100 bg-slate-950/60 border border-cyan-300/20 hover:border-cyan-300/45 hover:bg-slate-900/70 px-3 py-1.5 rounded-full backdrop-blur-xl shadow-lg shadow-cyan-500/10 transition-colors'
            : 'flex items-center gap-2 text-xs font-mono text-cyan-100 bg-slate-950/40 border border-cyan-300/20 hover:border-cyan-300/45 hover:bg-slate-900/60 px-3 py-1.5 rounded-xl backdrop-blur-xl shadow-lg shadow-cyan-500/10 transition-colors'
        }
      >
        <Globe className="w-3.5 h-3.5 text-cyan-200" />
        <span className="font-semibold tracking-wider uppercase">{active.flag}</span>
        <span className="text-cyan-50/90 hidden sm:inline">{active.label}</span>
        <ChevronDown className={`w-3 h-3 text-cyan-200/70 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t('language.switcher.label')}
          className="absolute right-0 mt-2 w-56 origin-top-right bg-slate-950/95 border border-cyan-200/20 rounded-2xl shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl overflow-hidden z-50"
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2 text-[10px] uppercase tracking-widest text-cyan-100/60 font-mono">
            <Languages className="w-3.5 h-3.5" />
            {t('language.switcher.title')}
          </div>
          <ul className="py-1">
            {SUPPORTED_LOCALES.map((option) => {
              const isActive = option.code === locale;
              return (
                <li key={option.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handleSelect(option.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-cyan-300/10 text-cyan-50'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono tracking-widest border ${
                        isActive
                          ? 'bg-cyan-300/20 text-cyan-100 border-cyan-300/40'
                          : 'bg-slate-900/70 text-cyan-100/70 border-white/10'
                      }`}
                    >
                      {option.flag}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium truncate">{option.label}</span>
                      <span className="block text-[10px] text-slate-500 font-mono uppercase tracking-widest truncate">
                        {option.englishLabel}
                      </span>
                    </span>
                    {isActive && <Check className="w-4 h-4 text-cyan-200" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
