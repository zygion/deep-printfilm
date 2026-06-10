import React from 'react';
import { Plus, RotateCw, BrainCircuit } from 'lucide-react';
import { STYLES } from './constants';
import { useTranslation } from '../../i18n';

interface Props {
  script: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  onRewrite: () => void;
  isContinuing: boolean;
  isRewriting: boolean;
  lastModified?: number | string;
}

const ScriptEditor: React.FC<Props> = ({
  script,
  onChange,
  onContinue,
  onRewrite,
  isContinuing,
  isRewriting,
  lastModified
}) => {
  const { t } = useTranslation();
  const stats = {
    characters: script.length,
    lines: script.split('\n').length
  };

  const isDisabled = isContinuing || isRewriting || !script.trim();

  return (
    <div className="flex-1 flex flex-col bg-slate-950/25 relative">
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-slate-950/45 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/40"></div>
          <span className="text-xs font-bold text-cyan-100/75">{t('scriptEditor.title')}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onContinue}
            disabled={isDisabled}
            className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-1.5 transition-all shadow-sm ${
              isDisabled
                ? STYLES.button.disabled
                : STYLES.button.primary
            }`}
          >
            {isContinuing ? (
              <>
                <BrainCircuit className="w-3.5 h-3.5 animate-spin" />
                {t('scriptEditor.continuing')}
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                {t('scriptEditor.continue')}
              </>
            )}
          </button>
          <button
            onClick={onRewrite}
            disabled={isDisabled}
            className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-1.5 transition-all shadow-sm ${
              isDisabled
                ? STYLES.button.disabled
                : STYLES.button.primary
            }`}
          >
            {isRewriting ? (
              <>
                <BrainCircuit className="w-3.5 h-3.5 animate-spin" />
                {t('scriptEditor.rewriting')}
              </>
            ) : (
              <>
                <RotateCw className="w-3.5 h-3.5" />
                {t('scriptEditor.rewrite')}
              </>
            )}
          </button>
          <span className="text-[10px] font-mono text-cyan-100/35 uppercase tracking-widest">{t('scriptEditor.markdownSupported')}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col py-12 px-8">
          <textarea
            value={script}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-slate-950/35 border border-white/10 rounded-[1.75rem] text-slate-100 font-serif text-lg leading-loose focus:outline-none resize-none placeholder:text-slate-600 selection:bg-cyan-300/20 p-8 shadow-2xl shadow-slate-950/20"
            placeholder={t('scriptEditor.placeholder')}
            spellCheck={false}
          />
        </div>
      </div>

      <div className="h-8 border-t border-white/10 bg-slate-950/45 px-4 flex items-center justify-end gap-4 text-[10px] text-slate-500 font-mono select-none">
        <span>{t('scriptEditor.charactersStat', { count: stats.characters })}</span>
        <span>{t('scriptEditor.linesStat', { count: stats.lines })}</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-300/40"></div>
          {lastModified ? t('scriptEditor.saved') : t('scriptEditor.ready')}
        </div>
      </div>
    </div>
  );
};

export default ScriptEditor;
