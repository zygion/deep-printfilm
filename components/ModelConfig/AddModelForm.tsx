/**
 * 添加模型表单组件
 * 支持自定义提供商和 endpoint
 */

import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  ModelType, 
  ModelDefinition,
  ChatModelParams,
  ImageModelParams,
  VideoModelParams,
  DEFAULT_CHAT_PARAMS,
  DEFAULT_IMAGE_PARAMS,
  DEFAULT_VIDEO_PARAMS_SORA,
  DEFAULT_VIDEO_PARAMS_VEO,
  DEFAULT_VIDEO_PARAMS_DOUBAO,
} from '../../types/model';
import { getProviders } from '../../services/modelRegistry';
import { DEPEI_PROVIDER_BASE_URL } from '../../types/model';
import { useAlert } from '../GlobalAlert';
import { useTranslation } from '../../i18n';

/** 只允许使用 GitCC {t('modelManager.providersTitle')}（https://api.gitcc.com） */
const normalizeBaseUrl = (url: string) => url.trim().replace(/\/+$/, '').toLowerCase();
const getAllowedProviders = () =>
  getProviders().filter((p) => normalizeBaseUrl(p.baseUrl) === normalizeBaseUrl(DEPEI_PROVIDER_BASE_URL));

interface AddModelFormProps {
  type: ModelType;
  onSave: (model: Omit<ModelDefinition, 'id' | 'isBuiltIn'>) => void;
  onCancel: () => void;
}

const AddModelForm: React.FC<AddModelFormProps> = ({ type, onSave, onCancel }) => {
  const { t } = useTranslation();
  const allowedProviders = getAllowedProviders();
  const defaultProvider = allowedProviders[0];
  const { showAlert } = useAlert();
  
  const [name, setName] = useState('');
  const [apiModel, setApiModel] = useState('');
  const [description, setDescription] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [videoMode, setVideoMode] = useState<'sync' | 'async' | 'doubao'>('async');
  
  // 固定使用 GitCC {t('modelManager.providersTitle')}，不允许添加其他
  const selectedProviderId = defaultProvider?.id || 'antsk';
  
  // 展开高级选项
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !apiModel.trim()) {
      showAlert(t('addModelForm.missingFields'), { type: 'warning' });
      return;
    }

    // 仅使用 GitCC {t('modelManager.providersTitle')}
    const providerId = selectedProviderId;

    // 根据模型类型设置默认参数
    let params: ChatModelParams | ImageModelParams | VideoModelParams;
    
    if (type === 'chat') {
      params = { ...DEFAULT_CHAT_PARAMS };
    } else if (type === 'image') {
      params = { ...DEFAULT_IMAGE_PARAMS };
    } else {
      if (videoMode === 'async') {
        params = { ...DEFAULT_VIDEO_PARAMS_SORA };
      } else if (videoMode === 'doubao') {
        params = { ...DEFAULT_VIDEO_PARAMS_DOUBAO };
      } else {
        params = { ...DEFAULT_VIDEO_PARAMS_VEO };
      }
    }

    const model: Omit<ModelDefinition, 'id' | 'isBuiltIn'> = {
      name: name.trim(),
      apiModel: apiModel.trim(),
      type,
      providerId,
      endpoint: endpoint.trim() || undefined,
      description: description.trim() || undefined,
      apiKey: apiKey.trim() || undefined,
      isEnabled: true,
      params,
    } as any;

    onSave(model);
  };

  return (
    <div className="bg-white/[0.045] border border-white/10 rounded-2xl p-4 space-y-4">
      <h4 className="text-sm font-bold text-white">{t('addModelForm.title')}</h4>
      
      {/* {t('addModelForm.sectionBasic')} */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-zinc-500 block mb-1">{t('addModelForm.nameLabel')}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('addModelForm.namePlaceholder')}
            className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500"
          />
        </div>
        <div>
          <label className="text-[10px] text-zinc-500 block mb-1">{t('addModelForm.apiModelLabel')}</label>
          <input
            type="text"
            value={apiModel}
            onChange={(e) => setApiModel(e.target.value)}
            placeholder={t('addModelForm.apiModelPlaceholder')}
            className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 font-mono"
          />
          <p className="text-[9px] text-zinc-600 mt-1">
            {t('addModelForm.apiModelHint')}
          </p>
        </div>
      </div>

      <div>
        <label className="text-[10px] text-zinc-500 block mb-1">{t('addModelForm.descriptionLabel')}</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('addModelForm.descriptionPlaceholder')}
          className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500"
        />
      </div>

      {/* {t('addModelForm.sectionEndpoint')} */}
      <div>
        <label className="text-[10px] text-zinc-500 block mb-1">{t('addModelForm.endpointLabel')}</label>
        <input
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder={type === 'chat' ? '/v1/chat/completions' : type === 'image' ? '/v1beta/models/{model}:generateContent' : '/v1/videos'}
          className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 font-mono"
        />
        <p className="text-[9px] text-zinc-600 mt-1">
          {t('addModelForm.endpointHint')}
        </p>
      </div>

      {/* {t('addModelForm.sectionApiKey')} */}
      <div>
        <label className="text-[10px] text-zinc-500 block mb-1">{t('addModelForm.apiKeyLabel')}</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={t('addModelForm.apiKeyPlaceholder')}
          className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 font-mono"
        />
        <p className="text-[9px] text-zinc-600 mt-1">
          {t('addModelForm.apiKeyHint')}
        </p>
      </div>

      {/* {t('addModelForm.sectionVideo')} */}
      {type === 'video' && (
        <div>
          <label className="text-[10px] text-zinc-500 block mb-1">{t('addModelForm.videoModeLabel')}</label>
          <div className="flex gap-2">
            <button
              onClick={() => setVideoMode('sync')}
              className={`flex-1 py-2 text-xs rounded transition-colors ${
                videoMode === 'sync'
                  ? 'bg-cyan-300 text-slate-950'
                  : 'bg-white/[0.06] text-zinc-400 hover:bg-white/10'
              }`}
            >
              {t('addModelForm.videoModeSync')}
            </button>
            <button
              onClick={() => setVideoMode('async')}
              className={`flex-1 py-2 text-xs rounded transition-colors ${
                videoMode === 'async'
                  ? 'bg-cyan-300 text-slate-950'
                  : 'bg-white/[0.06] text-zinc-400 hover:bg-white/10'
              }`}
            >
              {t('addModelForm.videoModeAsync')}
            </button>
            <button
              onClick={() => setVideoMode('doubao')}
              className={`flex-1 py-2 text-xs rounded transition-colors ${
                videoMode === 'doubao'
                  ? 'bg-cyan-300 text-slate-950'
                  : 'bg-white/[0.06] text-zinc-400 hover:bg-white/10'
              }`}
            >
              {t('addModelForm.videoModeDoubao')}
            </button>
          </div>
          <p className="text-[9px] text-zinc-600 mt-1">
            {t('addModelForm.videoModeHint')}
          </p>
        </div>
      )}

      {/* {t('addModelForm.sectionActions')} */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSave}
          className="flex-1 py-2.5 bg-cyan-300 text-slate-950 text-xs font-bold rounded-xl hover:bg-cyan-200 transition-colors flex items-center justify-center gap-1"
        >
          <Check className="w-3 h-3" />
          {t('addModelForm.save')}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2.5 bg-white/10 text-zinc-400 text-xs rounded-xl hover:bg-white/15 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default AddModelForm;
