import { Scene } from '../../types';
import { useTranslation } from '../../i18n';

export type ConfigValidationError =
  | 'emptyScript'
  | 'emptyDuration'
  | 'emptyModel'
  | 'emptyStyle';

export const getFinalValue = (selected: string, customInput: string): string => {
  return selected === 'custom' ? customInput : selected;
};

export const deduplicateScenes = (scenes: Scene[] = []): Scene[] => {
  const seenLocations = new Set<string>();
  return scenes.filter(scene => {
    const normalizedLoc = scene.location.trim().toLowerCase();
    if (seenLocations.has(normalizedLoc)) {
      return false;
    }
    seenLocations.add(normalizedLoc);
    return true;
  });
};

export const getTextStats = (text: string) => {
  const { t } = useTranslation();
  return {
    characters: text.length,
    lines: text.split('\n').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0
  };
};

export const validateConfig = (config: {
  script: string;
  duration: string;
  model: string;
  visualStyle: string;
}): { valid: boolean; error: ConfigValidationError | null } => {
  if (!config.script.trim()) {
    return { valid: false, error: 'emptyScript' };
  }
  if (!config.duration) {
    return { valid: false, error: 'emptyDuration' };
  }
  if (!config.model) {
    return { valid: false, error: 'emptyModel' };
  }
  if (!config.visualStyle) {
    return { valid: false, error: 'emptyStyle' };
  }
  return { valid: true, error: null };
};
