import React from 'react';
import { useTranslation } from '../../i18n';
import { FileText, Film } from 'lucide-react';

interface ActionPageProps {
  onComplete: () => void;
  onQuickStart: (option: 'script' | 'example') => void;
}

const icons = {
  script: FileText,
  example: Film,
};

const ActionPage: React.FC<ActionPageProps> = ({ onComplete, onQuickStart }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-white mb-2">
        {t('onboarding.action.title')}
      </h2>

      <p className="text-zinc-500 text-sm mb-8">
        {t('onboarding.action.subtitle')}
      </p>

      <div className="w-full max-w-md space-y-3 mb-8">
        {(['script', 'example'] as const).map((id) => {
          const Icon = icons[id];
          return (
            <button
              key={id}
              onClick={() => onQuickStart(id)}
              className="w-full flex items-center gap-4 bg-white/[0.045] border border-white/10 rounded-2xl p-4 text-left hover:border-cyan-200/35 hover:bg-white/[0.07] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-300/10 border border-cyan-200/25 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-300/20 transition-colors">
                <Icon className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1">
                  {t(`onboarding.action.options.${id}.title`)}
                </h3>
                <p className="text-zinc-500 text-xs">{t(`onboarding.action.options.${id}.description`)}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onComplete}
        className="px-8 py-3 bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-200 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
      >
        {t('onboarding.action.primaryCta')}
      </button>

      <p className="mt-6 text-[10px] text-zinc-600">
        {t('onboarding.action.helper')}
      </p>
    </div>
  );
};

export default ActionPage;