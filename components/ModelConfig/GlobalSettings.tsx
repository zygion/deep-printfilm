/**
 * Global settings component
 * Includes API key configuration and discount banner
 */

import React, { useState, useEffect } from 'react';
import { Key, Loader2, CheckCircle, AlertCircle, ExternalLink, Gift, Sparkles } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { getGlobalApiKey } from '../../services/modelRegistry';
import { verifyApiKey } from '../../services/modelService';
import { setGlobalApiKey } from '../../services/geminiService';

interface GlobalSettingsProps {
  onRefresh: () => void;
}

const GlobalSettings: React.FC<GlobalSettingsProps> = ({ onRefresh }) => {
  const { t } = useTranslation();
  const [apiKey, setApiKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [verifyMessage, setVerifyMessage] = useState('');

  useEffect(() => {
    const currentKey = getGlobalApiKey() || '';
    setApiKey(currentKey);
    if (currentKey) {
      setVerifyStatus('success');
      setVerifyMessage(t('onboarding.apiKey.configured'));
    }
  }, [t]);

  const handleVerifyAndSave = async () => {
    if (!apiKey.trim()) {
      setVerifyStatus('error');
      setVerifyMessage(t('onboarding.apiKey.empty'));
      return;
    }

    setIsVerifying(true);
    setVerifyStatus('idle');
    setVerifyMessage('');

    try {
      const result = await verifyApiKey(apiKey.trim());

      if (result.success) {
        setVerifyStatus('success');
        setVerifyMessage(t('modelConfig.global.saved') + ' - ' + t('onboarding.apiKey.verifySuccess'));
        setGlobalApiKey(apiKey.trim());
        onRefresh();
      } else {
        setVerifyStatus('error');
        setVerifyMessage(result.message);
      }
    } catch (error: any) {
      setVerifyStatus('error');
      setVerifyMessage(error.message || t('onboarding.apiKey.verifyFailed'));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClearKey = () => {
    setApiKey('');
    setVerifyStatus('idle');
    setVerifyMessage('');
    setGlobalApiKey('');
    onRefresh();
  };

  return (
    <div className="space-y-6">
      {/* Discount banner */}
      <div className="bg-gradient-to-r from-cyan-300/10 via-sky-400/10 to-fuchsia-400/10 border border-cyan-200/20 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-300 to-sky-400 flex items-center justify-center flex-shrink-0">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              {t('modelConfig.global.title')}
            </h3>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              {t('modelConfig.global.help')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://api.gitcc.com"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-cyan-300 text-slate-950 text-xs font-bold rounded-xl hover:bg-cyan-200 transition-colors inline-flex items-center gap-1.5"
              >
                {t('modelConfig.global.buyLink')}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* API Key config */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Key className="w-4 h-4 text-cyan-300" />
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            {t('modelConfig.global.title')}
          </label>
        </div>

        <div className="space-y-3">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setVerifyStatus('idle');
              setVerifyMessage('');
            }}
            placeholder={t('modelConfig.global.placeholder')}
            className="w-full bg-white/[0.06] border border-white/10 text-white px-4 py-3 text-sm rounded-xl focus:border-cyan-300/40 focus:outline-none focus:ring-2 focus:ring-cyan-300/10 transition-all font-mono placeholder:text-slate-500"
            disabled={isVerifying}
          />

          {verifyMessage && (
            <div className={`flex items-center gap-2 text-xs ${
              verifyStatus === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {verifyStatus === 'success' ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              {verifyMessage}
            </div>
          )}

          <p className="text-[10px] text-zinc-600 leading-relaxed">
            {t('modelConfig.global.help')}
          </p>

          <div className="flex gap-3">
            {getGlobalApiKey() && (
              <button
                onClick={handleClearKey}
                className="flex-1 py-3 bg-white/[0.06] hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors rounded-xl border border-white/10"
              >
                {t('modelConfig.global.clear')}
              </button>
            )}
            <button
              onClick={handleVerifyAndSave}
              disabled={isVerifying || !apiKey.trim()}
              className="flex-1 py-3 bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-cyan-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  {t('onboarding.apiKey.verifying')}
                </>
              ) : (
                t('modelConfig.global.save')
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettings;