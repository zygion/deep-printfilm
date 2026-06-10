/**
 * Model list component
 * Displays the list of models for a specific type, supports selecting the active model
 */

import React, { useState, useEffect } from 'react';
import { Plus, Info, CheckCircle } from 'lucide-react';
import { useTranslation } from '../../i18n';
import {
  ModelType,
  ModelDefinition,
} from '../../types/model';
import {
  getModels,
  updateModel,
  registerModel,
  removeModel,
  getActiveModelsConfig,
  setActiveModel,
  getProviderById,
} from '../../services/modelRegistry';
import { useAlert } from '../GlobalAlert';
import ModelCard from './ModelCard';
import AddModelForm from './AddModelForm';

interface ModelListProps {
  type: ModelType;
  onRefresh: () => void;
}

const ModelList: React.FC<ModelListProps> = ({ type, onRefresh }) => {
  const { t } = useTranslation();
  const [models, setModels] = useState<ModelDefinition[]>([]);
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [expandedModelId, setExpandedModelId] = useState<string | null>(null);
  const [activeModelId, setActiveModelId] = useState<string>('');
  const { showAlert } = useAlert();

  useEffect(() => {
    loadModels();
  }, [type]);

  const loadModels = () => {
    const allModels = getModels(type);
    setModels(allModels);
    const activeConfig = getActiveModelsConfig();
    setActiveModelId(activeConfig[type]);
  };

  const handleSetActiveModel = (modelId: string) => {
    if (setActiveModel(type, modelId)) {
      setActiveModelId(modelId);
      const model = models.find(m => m.id === modelId);
      const provider = model ? getProviderById(model.providerId) : null;
      const providerSuffix = provider ? t('modelConfig.switchedWithProvider', { provider: provider.name }) : '';
      showAlert(
        t('modelConfig.switched', { name: model?.name, provider: providerSuffix }),
        { type: 'success' }
      );
      onRefresh();
    } else {
      showAlert(t('modelConfig.setActiveFailed'), { type: 'error' });
    }
  };

  const handleUpdateModel = (modelId: string, updates: Partial<ModelDefinition>) => {
    if (updateModel(modelId, updates)) {
      loadModels();
      onRefresh();
    }
  };

  const handleDeleteModel = (modelId: string) => {
    showAlert(t('modelConfig.deleteConfirm'), {
      type: 'warning',
      showCancel: true,
      onConfirm: () => {
        if (removeModel(modelId)) {
          loadModels();
          onRefresh();
          showAlert(t('modelConfig.deleted'), { type: 'success' });
        }
      }
    });
  };

  const handleAddModel = (model: Omit<ModelDefinition, 'id' | 'isBuiltIn'>) => {
    try {
      registerModel(model);
      setIsAddingModel(false);
      loadModels();
      onRefresh();
      showAlert(t('modelConfig.addSuccess'), { type: 'success' });
    } catch (error) {
      showAlert(error instanceof Error ? error.message : t('modelConfig.addFailed'), { type: 'error' });
    }
  };

  const handleToggleExpand = (modelId: string) => {
    setExpandedModelId(expandedModelId === modelId ? null : modelId);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <p className="text-xs text-zinc-400">{t(`modelConfig.typeDescriptions.${type}`)}</p>
      </div>

      <div className="bg-cyan-300/10 border border-cyan-200/20 rounded-2xl p-3">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle className="w-4 h-4 text-cyan-300" />
          <span className="text-xs font-bold text-cyan-200">{t('modelConfig.currentUsing')}</span>
        </div>
        {(() => {
          const activeModel = models.find(m => m.id === activeModelId);
          const provider = activeModel ? getProviderById(activeModel.providerId) : null;
          return (
            <p className="text-[11px] text-zinc-300">
              <span className="font-medium">{activeModel?.name || t('modelConfig.notSelected')}</span>
              {provider && (
                <span className="text-zinc-500 ml-2">
                  → {provider.name} ({provider.baseUrl})
                </span>
              )}
            </p>
          );
        })()}
      </div>

      <div className="bg-white/[0.045] border border-white/10 rounded-2xl p-3 flex items-start gap-2">
        <Info className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
        <p className="text-[10px] text-zinc-500 leading-relaxed">
          {t('modelConfig.hint')}
        </p>
      </div>

      <div className="space-y-2">
        {models.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            isExpanded={expandedModelId === model.id}
            isActive={activeModelId === model.id}
            onToggleExpand={() => handleToggleExpand(model.id)}
            onUpdate={(updates) => handleUpdateModel(model.id, updates)}
            onDelete={() => handleDeleteModel(model.id)}
            onSetActive={() => handleSetActiveModel(model.id)}
          />
        ))}
      </div>

      {isAddingModel ? (
        <AddModelForm
          type={type}
          onSave={handleAddModel}
          onCancel={() => setIsAddingModel(false)}
        />
      ) : (
        <button
          onClick={() => setIsAddingModel(true)}
          className="w-full py-3 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('modelConfig.addModel')}
        </button>
      )}
    </div>
  );
};

export default ModelList;