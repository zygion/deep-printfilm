import React from 'react';
import { FileText, Users, Clapperboard, Film, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../i18n';

interface WorkflowPageProps {
  onNext: () => void;
}

const icons = [FileText, Users, Clapperboard, Film];

const STEP_KEYS = [
  { titleKey: 'onboardingSteps.step1Title', descKey: 'onboardingSteps.step1Desc' },
  { titleKey: 'onboardingSteps.step2Title', descKey: 'onboardingSteps.step2Desc' },
  { titleKey: 'onboardingSteps.step3Title', descKey: 'onboardingSteps.step3Desc' },
  { titleKey: 'onboardingSteps.step4Title', descKey: 'onboardingSteps.step4Desc' },
] as const;

const NUMBERS = ['①', '②', '③', '④'];

const WorkflowPage: React.FC<WorkflowPageProps> = ({ onNext }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-white mb-8">
        {t('onboarding.workflow.title')}
      </h2>

      <div className="w-full max-w-md mb-10">
        <div className="flex items-center justify-between mb-6">
          {STEP_KEYS.map((step, index) => {
            const Icon = icons[index];
            return (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-cyan-300/10 border border-cyan-200/25 flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">{NUMBERS[index]}</span>
                </div>
                {index < STEP_KEYS.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="space-y-3 text-left">
          {STEP_KEYS.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/[0.045] border border-white/10 rounded-xl px-4 py-3"
            >
              <span className="text-cyan-300 font-bold text-sm">{NUMBERS[index]}</span>
              <span className="text-white font-medium text-sm">{t(step.titleKey)}</span>
              <span className="text-zinc-500 text-xs">→ {t(step.descKey)}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        className="px-8 py-3 bg-cyan-300 text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-200 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
      >
        {t('onboarding.workflow.primaryCta')}
      </button>
    </div>
  );
};

export default WorkflowPage;