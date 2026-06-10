// Onboarding constants configuration

export const ONBOARDING_STORAGE_KEY = 'ai_manga_studio_onboarding_completed';
export const LEGACY_ONBOARDING_STORAGE_KEY = ['big' + 'banana', 'onboarding', 'completed'].join('_');

export const ONBOARDING_PAGES = {
  WELCOME: 0,
  WORKFLOW: 1,
  HIGHLIGHTS: 2,
  API_KEY: 3,
  ACTION: 4,
} as const;

export const TOTAL_PAGES = 5;

export const WORKFLOW_STEPS = [
  {
    number: '①',
    title: 'stageScript',
    description: 'stageScriptDesc',
  },
  {
    number: '②',
    title: 'stageAssets',
    description: 'stageAssetsDesc',
  },
  {
    number: '③',
    title: 'stageDirector',
    description: 'stageDirectorDesc',
  },
  {
    number: '④',
    title: 'stageExport',
    description: 'stageExportDesc',
  },
] as const;

// Quick start option types only (UI text comes from translations)
export type QuickStartId = 'script' | 'example';

export const QUICK_START_OPTIONS: { id: QuickStartId }[] = [
  { id: 'script' },
  { id: 'example' },
];

// Highlight types only (UI text comes from translations)
export type HighlightType = 'consistency' | 'wardrobe' | 'style';