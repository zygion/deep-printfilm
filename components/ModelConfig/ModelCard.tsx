/**
 * 模型卡片组件
 * 显示单个模型的配置
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, ToggleLeft, ToggleRight, CheckCircle, Circle } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { 
  ModelDefinition, 
  ChatModelParams,
  ImageModelParams,
  VideoModelParams,
  AspectRatio,
  VideoDuration
} from '../../types/model';

interface ModelCardProps {
  model: ModelDefinition;
  isExpanded: boolean;
  isActive: boolean;
  onToggleExpand: () => void;
  onUpdate: (updates: Partial<ModelDefinition>) => void;
  onDelete: () => void;
  onSetActive: () => void;
}

const ModelCard: React.FC<ModelCardProps> = ({
  model,
  isExpanded,
  isActive,
  onToggleExpand,
  onUpdate,
  onDelete,
  onSetActive,
}) => {
  const { t } = useTranslation();
  const [editParams, setEditParams] = useState<any>(model.params);
  const [editApiKey, setEditApiKey] = useState<string>(model.apiKey || '');

  const handleParamChange = (key: string, value: any) => {
    const newParams = { ...editParams, [key]: value };
    setEditParams(newParams);
    onUpdate({ params: newParams } as any);
  };

  const handleToggleEnabled = () => {
    onUpdate({ isEnabled: !model.isEnabled });
  };

  const handleApiKeyChange = (value: string) => {
    setEditApiKey(value);
    onUpdate({ apiKey: value.trim() || undefined });
  };

  const renderChatParams = (params: ChatModelParams) => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-[10px] text-zinc-500 block mb-1">{t('modelCard.temperature')}</label>
        <input
          type="number"
          min="0"
          max="2"
          step="0.1"
          value={editParams.temperature}
          onChange={(e) => handleParamChange('temperature', parseFloat(e.target.value))}
          className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
        />
      </div>
      <div>
        <label className="text-[10px] text-zinc-500 block mb-1">{t('modelCard.maxTokens')}</label>
        <input
          type="number"
          min="1"
          max="128000"
          value={editParams.maxTokens ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            handleParamChange('maxTokens', value === '' ? undefined : parseInt(value));
          }}
          placeholder={t('modelCard.maxTokensPlaceholder')}
          className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
        />
        <p className="text-[9px] text-zinc-600 mt-1">{t('modelCard.maxTokensHint')}</p>
      </div>
    </div>
  );

  const renderImageParams = (params: ImageModelParams) => (
    <div>
      <label className="text-[10px] text-zinc-500 block mb-1">{t('modelCard.defaultAspectRatio')}</label>
      <div className="flex gap-2">
        {/* 从模型的 supportedAspectRatios 读取支持的比例 */}
        {(params.supportedAspectRatios || ['16:9', '9:16']).map((ratio) => (
          <button
            key={ratio}
            onClick={() => handleParamChange('defaultAspectRatio', ratio)}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              editParams.defaultAspectRatio === ratio
                ? 'bg-cyan-300 text-slate-950'
                : 'bg-white/[0.06] text-zinc-400 hover:bg-white/10'
            }`}
          >
            {ratio === '16:9' ? t('modelCard.landscape') : ratio === '9:16' ? t('modelCard.portrait') : t('modelCard.square')}
          </button>
        ))}
      </div>
    </div>
  );

  const renderVideoParams = (params: VideoModelParams) => (
    <div className="space-y-4">
      <div>
        <label className="text-[10px] text-zinc-500 block mb-1">{t('modelCard.defaultAspectRatio')}</label>
        <div className="flex gap-2">
          {editParams.supportedAspectRatios.map((ratio: AspectRatio) => (
            <button
              key={ratio}
              onClick={() => handleParamChange('defaultAspectRatio', ratio)}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                editParams.defaultAspectRatio === ratio
                  ? 'bg-cyan-300 text-slate-950'
                  : 'bg-white/[0.06] text-zinc-400 hover:bg-white/10'
              }`}
            >
              {ratio === '16:9' ? t('modelCard.landscape') : ratio === '9:16' ? t('modelCard.portrait') : t('modelCard.square')}
            </button>
          ))}
        </div>
      </div>
      {editParams.supportedDurations.length > 1 && (
        <div>
          <label className="text-[10px] text-zinc-500 block mb-1">{t('modelCard.defaultDuration')}</label>
          <div className="flex gap-2">
            {editParams.supportedDurations.map((duration: VideoDuration) => (
              <button
                key={duration}
                onClick={() => handleParamChange('defaultDuration', duration)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  editParams.defaultDuration === duration
                    ? 'bg-cyan-300 text-slate-950'
                    : 'bg-white/[0.06] text-zinc-400 hover:bg-white/10'
                }`}
              >
                {t('modelCard.seconds', { d: duration })}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="text-[10px] text-zinc-600">
        {t('modelCard.mode')}
        {editParams.mode === 'sync'
          ? t('modelCard.modeSync')
          : editParams.mode === 'async'
          ? t('modelCard.modeAsync')
          : t('modelCard.modeDoubao')}
      </div>
    </div>
  );

  const apiModel = model.apiModel || model.id;

  return (
    <div 
      className={`bg-white/[0.045] border rounded-2xl overflow-hidden transition-all ${
        isActive ? 'border-cyan-300/50 bg-cyan-300/5' : 'border-white/10'
      } ${!model.isEnabled ? 'opacity-60' : ''}`}
    >
      {/* 头部 */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {/* 模型信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{model.name}</span>
              {model.isBuiltIn && (
                <span className="px-1.5 py-0.5 bg-zinc-700 text-zinc-400 text-[9px] rounded">{t('modelCard.builtIn')}</span>
              )}
            </div>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              {t('modelCard.apiModel', { name: apiModel })}
              {model.id !== apiModel && t('modelCard.internalId', { id: model.id })}
              {model.endpoint && ` · ${model.endpoint}`}
              {model.description && ` · ${model.description}`}
            </p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex items-center gap-2">
          {/* 使用此模型按钮 */}
          {model.isEnabled && !isActive && (
            <button
              onClick={onSetActive}
              className="px-2.5 py-1 bg-cyan-300 text-slate-950 text-[10px] font-bold rounded-xl hover:bg-cyan-200 transition-colors flex items-center gap-1"
              title={t('modelCard.useTitle')}
            >
              <Circle className="w-3 h-3" />
              {t('modelCard.use')}
            </button>
          )}
          
          {/* 当前激活标记 */}
          {isActive && (
            <span className="px-2.5 py-1 bg-cyan-300/15 text-cyan-200 text-[10px] font-bold rounded-xl flex items-center gap-1 border border-cyan-200/15">
              <CheckCircle className="w-3 h-3" />
              {t('modelCard.currentUsing')}
            </span>
          )}

          {/* 启用/禁用开关 */}
          <button
            onClick={handleToggleEnabled}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
            title={model.isEnabled ? t('modelCard.disable') : t('modelCard.enable')}
          >
            {model.isEnabled ? (
              <ToggleRight className="w-5 h-5 text-cyan-300" />
            ) : (
              <ToggleLeft className="w-5 h-5" />
            )}
          </button>

          {/* 删除按钮（仅非内置模型） */}
          {!model.isBuiltIn && (
            <button
              onClick={onDelete}
              className="text-zinc-500 hover:text-red-400 transition-colors"
              title={t('common.delete')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* 展开/收起 */}
          <button
            onClick={onToggleExpand}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 展开的参数配置 */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t border-white/10">
          <div className="pt-4 space-y-4">
            {/* 模型专属 API Key */}
            <div>
              <label className="text-[10px] text-zinc-500 block mb-1">
                {t('modelCard.modelApiKeyLabel')}
              </label>
              <input
                type="password"
                value={editApiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder={t('modelCard.modelApiKeyPlaceholder')}
                className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 font-mono"
              />
              {model.apiKey && (
                <p className="text-[9px] text-green-500 mt-1">{t('modelCard.modelApiKeyConfigured')}</p>
              )}
            </div>
            
            {model.type === 'chat' && renderChatParams(model.params)}
            {model.type === 'image' && renderImageParams(model.params)}
            {model.type === 'video' && renderVideoParams(model.params)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelCard;
