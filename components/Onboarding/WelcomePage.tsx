import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '../../i18n';
const LOGO_URL = 'https://www.gitcc.com/uploads/-/system/appearance/header_logo/1/gitpp.png';

interface WelcomePageProps {
  onNext: () => void;
  onSkip: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onNext, onSkip }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-8 bg-gradient-to-r from-cyan-300/20 via-sky-400/20 to-fuchsia-400/20 rounded-full blur-3xl opacity-50"></div>
        <img
          src={LOGO_URL}
          alt={t('sidebar.title')}
          className="w-24 h-24 relative z-10"
        />
        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
      </div>

      <h1 className="text-3xl font-bold text-white mb-3">
        {t('onboarding.welcome.greeting')}
      </h1>

      <p className="text-xl text-zinc-300 mb-2">
        {t('onboarding.welcome.value')}
      </p>

      <p className="text-sm text-zinc-500 mb-10 max-w-xs">
        {t('onboarding.welcome.description')}
      </p>

      <button
        onClick={onNext}
        className="px-8 py-3 bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-200 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
      >
        {t('onboarding.welcome.primaryCta')}
      </button>

      <button
        onClick={onSkip}
        className="mt-6 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
      >
        {t('onboarding.welcome.skipCta')}
      </button>
    </div>
  );
};

export default WelcomePage;