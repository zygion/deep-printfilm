// build-i18n-additions.cjs - Add new keys to both en.json and zh-CN.json
const fs = require('fs');

// Load existing keys from disk
const existingEn = JSON.parse(fs.readFileSync('i18n/locales/en.json', 'utf8'));
const existingZh = JSON.parse(fs.readFileSync('i18n/locales/zh-CN.json', 'utf8'));

// Deep merge: keep existing values, add new keys, but allow script to OVERRIDE existing
const deepMerge = (target, source) => {
  const out = { ...target };
  for (const k of Object.keys(source)) {
    if (source[k] && typeof source[k] === 'object' && !Array.isArray(source[k]) && target[k] && typeof target[k] === 'object') {
      out[k] = deepMerge(target[k], source[k]);
    } else {
      out[k] = source[k];
    }
  }
  return out;
};

const additions = {
  // StageScript - ScriptEditor
  "scriptEditor": {
    "title": "Script editor",
    "continuing": "Continuing...",
    "continue": "AI continue",
    "rewriting": "Rewriting...",
    "rewrite": "AI rewrite",
    "markdownSupported": "MARKDOWN SUPPORTED",
    "placeholder": "Type the story outline or paste the script here...",
    "charactersStat": "{{count}} characters",
    "linesStat": "{{count}} lines",
    "saved": "Auto-saved",
    "ready": "Ready"
  },
  // StageScript - ConfigPanel
  "configPanel": {
    "title": "Project config",
    "projectTitle": "Project title",
    "projectTitlePlaceholder": "Enter project name...",
    "outputLanguage": "Output language",
    "targetDuration": "Target duration",
    "customDurationPlaceholder": "Enter duration (e.g. 90s, 3m)",
    "shotGenModel": "Shot generation model",
    "shotGenModelHint": "Built-in GPT-5.2 / GPT-5.4; add custom chat models in {{modelConfig}}",
    "visualStyle": "Visual style",
    "customStylePlaceholder": "Enter style (e.g. watercolor, pixel art)",
    "analyzing": "Smart analysis...",
    "analyze": "Generate shot script"
  },
  // StageScript - CharacterList
  "characterList": {
    "cast": "Cast",
    "visualDescPlaceholder": "Enter character visual description...",
    "emptyText": "No visual description"
  },
  // StageScript - InlineEditor
  "inlineEditor": {
    "placeholder": "Enter content...",
    "empty": "No content yet",
    "save": "Save",
    "cancel": "Cancel",
    "title": "Edit"
  },
  // StageScript - OptionSelector
  "optionSelector": {
    "tipPrefix": "Tip:"
  },
  // StageScript - SceneBreakdown
  "sceneBreakdown": {
    "title": "Shot list",
    "project": "Project",
    "duration": "Duration",
    "backToEdit": "Back to editor",
    "logline": "Logline"
  },
  // StageScript - SceneList
  "sceneList": {
    "title": "Scene list"
  },
  // StageScript - ShotRow
  "shotRow": {
    "actionLabel": "Action description",
    "actionPlaceholder": "Enter action description...",
    "dialogueLabel": "Dialogue (optional)",
    "dialoguePlaceholder": "Enter dialogue (leave empty for none)...",
    "save": "Save",
    "cancel": "Cancel",
    "editActionTitle": "Edit action and dialogue",
    "characters": "Characters",
    "editCharacters": "Edit character list",
    "currentCharacters": "Current characters",
    "noCharacters": "No characters",
    "allCharactersAdded": "All characters added",
    "addCharacter": "Add character",
    "removeCharacter": "Remove character",
    "addedCharacters": "Added characters",
    "visualPrompt": "Visual prompt",
    "visualPromptPlaceholder": "Enter visual prompt...",
    "editPromptTitle": "Edit prompt"
  },
  // StageScript - main
  "scriptMain": {
    "untitledCheck": "Untitled project",
    "errorWithMessage": "Error: {{message}}",
    "aiConnectionFailed": "AI connection failed",
    "emptyScriptPrompt": "Please enter some script content as a starting point.",
    "emptyModelPrompt": "Please select or enter a model name.",
    "continueFailed": "AI continue failed: {{message}}",
    "connectionFailed": "Connection failed",
    "emptyScriptFull": "Please enter script content first.",
    "rewriteFailed": "AI rewrite failed: {{message}}"
  },
  // StageScript - utils
  "scriptValidation": {
    "emptyScript": "Please enter script content.",
    "emptyDuration": "Please select a target duration.",
    "emptyModel": "Please select or enter a model name.",
    "emptyStyle": "Please select or enter a visual style."
  },
  // StageScript - config constants (durations/languages/styles)
  "durations": {
    "30s": "30s (Ad)",
    "60s": "60s (Trailer)",
    "120s": "2m (Highlights)",
    "300s": "5m (Short film)",
    "900s": "15m (Feature / Single episode)",
    "custom": "Custom"
  },
  "languages": {
    "chinese": "Chinese",
    "english": "English",
    "japanese": "Japanese",
    "french": "French",
    "spanish": "Spanish"
  },
  "visualStylesConfig": {
    "anime": "Japanese anime",
    "animeDesc": "Japanese anime style with strong line art",
    "2d-animation": "2D animation",
    "2d-animationDesc": "Classic Zoetrope / Disney style",
    "3d-animation": "3D animation",
    "3d-animationDesc": "Pixar / Dreamworks style",
    "cyberpunk": "Cyberpunk",
    "cyberpunkDesc": "High-tech cyberpunk style",
    "oil-painting": "Oil painting",
    "oil-paintingDesc": "Oil-painting texture and artistic feel",
    "live-action": "Live action",
    "live-actionDesc": "Hyper-realistic cinema / TV series look",
    "custom": "Other (custom)",
    "customDesc": "Enter your own style"
  },
  // StageAssets
  "assets": {
    "noProjectPhase": "Please complete Phase 01 - Script creation first",
    "batchGenerating": "Batch generating assets...",
    "batchProgress": "Progress: {{current}} / {{total}}",
    "libraryTitle": "Asset library",
    "close": "Close",
    "searchPlaceholder": "Search asset name...",
    "filterAll": "All",
    "filterCharacter": "Characters",
    "filterScene": "Scenes",
    "emptyAssets": "No assets yet. Choose \"Add to library\" from a character or scene card.",
    "useAsset": "{{type}} asset",
    "useImportOrReplace": "{{action}}",
    "useInProject": "Import to current project",
    "replaceCharacter": "Replace current character",
    "deleteAssetTitle": "Delete asset",
    "sectionTitle": "Scenes & characters",
    "modelLabel": "Model",
    "aspectLabel": "Aspect",
    "casting": "Character casting",
    "castingDesc": "Generate consistent reference visuals for the script's characters",
    "locations": "Scene concepts",
    "locationsDesc": "Generate environment reference images for the script's scenes",
    "newCharacter": "New character",
    "fromLibrary": "Pick from library",
    "batchGenCharacters": "Generate all characters",
    "regenAllCharacters": "Regenerate all characters",
    "newScene": "New scene",
    "batchGenScenes": "Generate all scenes",
    "regenAllScenes": "Regenerate all scenes",
    "replaceFromLibrary": "Replace from library",
    "addToLibrary": "Add to library",
    "deleteCharacter": "Delete character",
    "deleteScene": "Delete scene"
  },
  "characterForm": {
    "defaultName": "New character",
    "defaultGender": "Unset",
    "defaultAge": "Unset",
    "defaultPersonality": "To be filled"
  },
  "sceneForm": {
    "defaultName": "New scene",
    "defaultTime": "Unset",
    "defaultAtmosphere": "To be filled"
  },
  "alertsAssets": {
    "regenAllConfirm": "Regenerate all {{type}} images?",
    "regenAllCharacters": "Regenerate all character images?",
    "regenAllScenes": "Regenerate all scene images?",
    "addedToLibrary": "Added to library: {{name}}",
    "addedToLibraryFailed": "Failed to add to library",
    "missingRefCharacter": "This character has no reference image yet. Add it to the library anyway?",
    "missingRefScene": "This scene has no reference image yet. Add it to the library anyway?",
    "imported": "Imported: {{name}}",
    "importFailed": "Import failed",
    "pickCharacterReplace": "Please choose a character asset to replace",
    "replacedCharacter": "Replaced character: {{from}} -> {{to}}",
    "deleteAssetFailed": "Failed to delete asset",
    "deleteAssetConfirm": "Are you sure you want to remove this asset from the library?",
    "characterCreated": "New character created. Edit the prompt and generate the image.",
    "sceneCreated": "New scene created. Edit the prompt and generate the image.",
    "deleteCharacterTitle": "Delete character",
    "deleteCharacterConfirm": "Are you sure you want to delete character \"{{name}}\"?\n\nNote: this affects all shots that use this character and may break shot associations.",
    "characterDeleted": "Character \"{{name}}\" deleted",
    "deleteSceneTitle": "Delete scene",
    "deleteSceneConfirm": "Are you sure you want to delete scene \"{{location}}\"?\n\nNote: this affects all shots that use this scene and may break shot associations.",
    "sceneDeleted": "Scene \"{{location}}\" deleted"
  },
  "characterCard": {
    "failed": "Generation failed",
    "generating": "Generating...",
    "wardrobe": "Wardrobe / variations",
    "replaceFromLibrary": "Replace from library",
    "promptLabel": "Character prompt",
    "promptPlaceholder": "Enter the character's visual description...",
    "regenerateImage": "Regenerate image",
    "generateImage": "Generate character image",
    "addToLibrary": "Add to library",
    "deleteCharacter": "Delete character"
  },
  "sceneCard": {
    "generating": "Generating...",
    "failed": "Generation failed",
    "promptLabel": "Scene prompt",
    "promptPlaceholder": "Enter scene visual description...",
    "uploadImage": "Upload image",
    "addToLibrary": "Add to library",
    "deleteScene": "Delete scene"
  },
  "imageUploadButton": {
    "upload": "Upload",
    "generate": "Generate",
    "generating": "Generating...",
    "regenerate": "Regenerate"
  },
  "imagePreview": {
    "closeHint": "Click anywhere to close"
  },
  "promptEditor": {
    "label": "Prompt",
    "placeholder": "Enter visual description...",
    "title": "Edit prompt",
    "save": "Save",
    "cancel": "Cancel",
    "empty": "No prompt set. Click the edit button to add a visual description."
  },
  "wardrobe": {
    "title": "Wardrobe & Variations",
    "base": "Base Appearance",
    "default": "Default",
    "variations": "Variations / Outfits",
    "noImage": "No Image",
    "regenerate": "Regenerate",
    "generateLook": "Generate Look",
    "retry": "Retry",
    "upload": "Upload",
    "failed": "Failed",
    "addVariation": "Add Variation",
    "namePlaceholder": "Variation Name (e.g. Tactical Gear)",
    "promptPlaceholder": "Visual description of outfit/state..."
  },
  // StageDirector
  "director": {
    "sectionTitle": "AI workbench",
    "aiEnhance": "AI enhance prompts",
    "completed": "{{done}} / {{total}} completed",
    "regenerateAll": "Regenerate all start frames",
    "batchGenerate": "Batch generate start frames",
    "empty": "No shot data yet. Please go back to phase 1 to generate the shot list.",
    "regeneratingAll": "Regenerating all start frames...",
    "batchGenerating": "Batch generating missing start frames...",
    "singleShotProgress": "Generating shot {{current}}/{{total}}...",
    "shotDetails": "Shot details",
    "shot": "Shot",
    "viewHint": "Click to view",
    "aiSplit": "AI split shot",
    "aiGenerateAction": "AI generate action suggestion",
    "editAction": "Edit action",
    "visualProduction": "Visual Production",
    "startFrame": "Start frame",
    "endFrame": "End frame",
    "noStartFrame": "No start frame",
    "noEndFrame": "No end frame",
    "generate": "Generate",
    "regenerate": "Regenerate",
    "upload": "Upload",
    "aiOptimize": "AI optimize",
    "optimizeBoth": "AI optimize both keyframes",
    "noImage": "No image",
    "copyPrevEnd": "Use previous shot's end frame as start",
    "copyNextStart": "Use next shot's start frame as end",
    "regenerateFailed": "Generation failed: {{message}}",
    "selectImage": "Please choose an image file!",
    "readFileFailed": "Failed to read file!",
    "generateStartFirst": "Please generate a start frame first, or enable \"Text-to-video only (no start frame)\"",
    "videoGenFailed": "Video generation failed",
    "noVideoPrompt": "This shot has no optimizable video prompt. Generate a video or edit the prompt first.",
    "promptOptimized": "Description auto-optimized to pass moderation. Click \"Generate video\" to retry.",
    "optimizeFailed": "Optimization failed: {{message}}",
    "previousEndMissing": "Previous shot has no end frame yet",
    "nextStartMissing": "Next shot has no start frame yet",
    "regenAllConfirm": "Regenerate start frames for all shots? This will overwrite existing images.",
    "generateBothFrames": "Please generate or edit the start and end frame prompts first, so AI can understand the scene",
    "sceneNotFound": "Scene info not found",
    "undefinedStartScene": "Undefined start scene",
    "undefinedEndScene": "Undefined end scene",
    "panDefault": "Pan",
    "undefinedAction": "Undefined action",
    "startPromptOptimized": "Start frame prompt optimized",
    "endPromptOptimized": "End frame prompt optimized",
    "bothPromptsOptimized": "Start and end frame prompts optimized",
    "aiOptimizeFailed": "AI optimization failed: {{message}}",
    "shotSplit": "Shot split into {{count}} sub-shots",
    "splitFailed": "Split failed: {{message}}",
    "aiActionFailed": "AI action generation failed: {{message}}"
  },
  "keyframeEditor": {
    "aiOptimize": "AI optimize prompt",
    "editPrompt": "Edit prompt",
    "clickPreview": "Click to preview",
    "generating": "Generating...",
    "failed": "Generation failed",
    "moderationHint": "If blocked by content moderation, click \"Edit\" above to modify the prompt and try again.",
    "retry": "Retry",
    "notGenerated": "Not generated",
    "regenerate": "Regenerate",
    "upload": "Upload",
    "copyPrevEnd": "Copy previous shot's end frame",
    "copyNextStart": "Copy next shot's start frame",
    "aiEnhanceToggleOn": "Enable AI enhance: auto-expand into professional cinematic descriptions",
    "aiEnhanceToggleOff": "Disable AI enhance: use the base prompt for quick generation",
    "optimizeBoth": "AI optimize both start and end frames (recommended)",
    "optimizing": "Optimizing...",
    "aiOptimizeBoth": "AI optimize both frames"
  },
  "sceneContext": {
    "title": "Scene Context",
    "unknownScene": "Unknown scene",
    "baseLook": "Base look",
    "removeCharacter": "Remove character",
    "addCharacterToShot": "+ Add character to this shot"
  },
  "shotCard": {
    "clickEdit": "Click to edit"
  },
  "shotWorkbench": {
    "shotDetails": "Shot details",
    "actionDialogue": "Action & Dialogue"
  },
  "videoGenerator": {
    "title": "Video generation",
    "previewEditPrompt": "Preview/Edit video prompt",
    "selectModel": "Select video model",
    "settings": "Video settings",
    "textToVideoOnly": "Text-to-video only (no start frame)",
    "textToVideoHint": "Don't upload the start keyframe as a reference. Use only the video description. Useful when the start frame is blocked for moderation.",
    "generating": "Generating video ({{aspect}}, {{detail}})...",
    "regenerate": "Regenerate video",
    "generate": "Generate video",
    "generateStartFirst": "Please generate a start frame first, or enable \"Text-to-video only\"",
    "optimizingDesc": "Optimizing description…",
    "aiOptimizeDesc": "AI optimize description (bypass moderation)",
    "i2vMode": "* No end frame detected, will use image-to-video mode",
    "textToVideoMode": "* Text-to-video mode: start/end frames will not be uploaded, only the video description is sent",
    "noEndFrame": "* No end frame detected, will use single-image generation (Image-to-Video)",
    "modeAsync": "Async",
    "modeSync": "Sync",
    "modeAsyncPolling": "Async (requires polling)",
    "modeSyncDirect": "Sync (direct result)",
    "supportedDurations": " · Supported durations: {{durations}}s",
    "supportedRatios": " Supports {{ratios}}",
    "supportedRatiosDurations": " Supports {{ratios}}, optional {{durations}}s"
  },
  "editModal": {
    "placeholder": "Enter content...",
    "aiGenerating": "AI is generating action suggestion...",
    "aiGenerateAction": "AI generate action suggestion",
    "cancel": "Cancel",
    "save": "Save",
    "editAction": "Edit action",
    "editKeyframe": "Edit keyframe prompt",
    "editVideo": "Edit video prompt",
    "actionPlaceholder": "Describe the shot's action and content...",
    "keyframePlaceholder": "Enter the keyframe's prompt...",
    "videoPlaceholder": "Enter the video generation prompt..."
  },
  // StageExport
  "export": {
    "title": "Render & export",
    "exportFailed": "Export failed: {{message}}",
    "noAssets": "No downloadable assets. Please generate character, scene, or shot materials first.",
    "downloadAssetsFailed": "Failed to download source assets: {{message}}",
    "unknownError": "Unknown error",
    "notDeveloped": "Coming soon"
  },
  "videoPlayer": {
    "preview": "Video preview"
  },
  "statusPanel": {
    "untitled": "Untitled project"
  },
  // StagePrompts
  "prompts": {
    "title": "Asset manager",
    "subtitle": "View and edit prompts and variables for all generation tasks",
    "empty": "No prompt data yet",
    "emptyHint": "Please generate characters and scenes in the Script creation stage first, or generate shots in the AI workbench",
    "searchPlaceholder": "Search prompts, characters, scenes...",
    "filterAll": "All",
    "filterCharacters": "Characters",
    "filterScenes": "Scenes",
    "filterKeyframes": "Keyframes"
  },
  "characterSection": {
    "title": "Characters",
    "edit": "Edit",
    "noPrompt": "No prompt set",
    "variations": "Variations"
  },
  "sceneSection": {
    "title": "Scenes",
    "edit": "Edit",
    "noPrompt": "No prompt set"
  },
  "keyframeSection": {
    "title": "Shot keyframes",
    "shot": "Shot {{num}}",
    "standardShot": "Standard shot",
    "startFrame": "Start frame",
    "endFrame": "End frame",
    "edit": "Edit",
    "videoGenPrompt": "Video generation prompt",
    "unsavedPrompt": "⚠ This video was generated without a saved prompt. Content above is inferred."
  },
  "promptEditorSmall": {
    "placeholder": "Enter prompt...",
    "save": "Save",
    "cancel": "Cancel"
  },
  "promptUtils": {
    "defaultPrompt": "{{action}}\n\nCamera movement: {{movement}}\nModel: {{model}}"
  },
  // ModelConfig
  "addModelForm": {
    "missingFields": "Please fill in the model name and API model name.",
    "title": "Add custom model",
    "sectionBasic": "Basic info",
    "nameLabel": "Model name *",
    "namePlaceholder": "e.g. GPT-4 Turbo",
    "apiModelLabel": "API model name * (can match a built-in name)",
    "apiModelPlaceholder": "e.g. gpt-4-turbo, claude-3-opus",
    "apiModelHint": "This value is sent as the `model` parameter to the API. The internal ID is generated automatically.",
    "descriptionLabel": "Description (optional)",
    "descriptionPlaceholder": "Optional description",
    "sectionEndpoint": "API endpoint",
    "endpointLabel": "API endpoint (Endpoint)",
    "endpointHint": "Leave empty to use the default endpoint",
    "sectionApiKey": "Model-specific API key (optional)",
    "apiKeyLabel": "API key (optional)",
    "apiKeyPlaceholder": "Leave empty to use the global API key",
    "apiKeyHint": "Set a dedicated API key for this model. Leave empty to use the global key.",
    "sectionVideo": "Video model options",
    "videoModeLabel": "API mode",
    "videoModeSync": "Sync (Chat Completion style)",
    "videoModeAsync": "Async (Sora style)",
    "videoModeDoubao": "Doubao Seedance (Ark task-based)",
    "videoModeHint": "Sync returns the result directly. Async first creates a task and then polls for the result. Doubao matches the Ark task interface for Doubao Seedance.",
    "sectionActions": "Actions",
    "save": "Add model"
  },
  "modelCard": {
    "temperature": "Temperature",
    "maxTokens": "Max tokens",
    "maxTokensPlaceholder": "Empty = unlimited",
    "maxTokensHint": "Leave empty to set no cap on max tokens",
    "defaultAspectRatio": "Default aspect ratio",
    "defaultDuration": "Default duration",
    "seconds": "{{d}}s",
    "mode": "Mode:",
    "modeSync": "Sync (Veo style)",
    "modeAsync": "Async (Sora style)",
    "modeDoubao": "Doubao Seedance (Ark task-based)",
    "header": "Header",
    "modelInfo": "Model info",
    "builtIn": "Built-in",
    "apiModel": "API model name: {{name}}",
    "internalId": " · Internal ID: {{id}}",
    "actions": "Actions",
    "useBtn": "Use this model button",
    "useTitle": "Use this model",
    "use": "Use",
    "activeMarker": "Currently active",
    "currentUsing": "Currently using",
    "enableToggle": "Enable/Disable",
    "enable": "Enable",
    "disable": "Disable",
    "deleteTitle": "Delete",
    "delete": "Delete",
    "expand": "Expand/collapse",
    "paramsExpanded": "Expanded parameters",
    "modelApiKey": "Model-specific API key",
    "modelApiKeyLabel": "API key (leave empty to use global key)",
    "modelApiKeyPlaceholder": "Leave empty to use the global API key",
    "modelApiKeyConfigured": "✓ Custom API key configured",
    "landscape": "Landscape",
    "portrait": "Portrait",
    "square": "Square"
  },
  "modelManager": {
    "deleteProviderConfirm": "Are you sure you want to delete this provider?",
    "providerDeleted": "Provider deleted",
    "adTitle": "Recommended: GitCC API",
    "adDesc": "Supports GPT-5.1, Gemini-3, Veo 3.1, Sora-2 and more. Stable, fast, and budget-friendly.",
    "adFooter": "This open-source project is powered by GitCC API.",
    "buyNow": "Buy now",
    "tutorialHidden": "Tutorial hidden",
    "providersList": "Provider list",
    "providersTitle": "API providers",
    "addProvider": "Add provider",
    "addProviderForm": "Add new provider form",
    "providerNamePlaceholder": "Provider name",
    "providerBaseUrlPlaceholder": "API base URL (e.g. https://api.example.com)",
    "providerApiKeyPlaceholder": "Dedicated API key (optional; leave empty to use global key)",
    "confirmAdd": "Confirm add",
    "providersListSection": "Provider list",
    "providerApiKeyEditPlaceholder": "Dedicated API key (optional)",
    "save": "Save",
    "default": "Default",
    "builtIn": "Built-in",
    "modelSelection": "Model selection",
    "chatModel": "Chat model",
    "videoModel": "Video model",
    "defaultSettings": "Default settings",
    "defaultGenSettings": "Default generation settings",
    "defaultAspect": "Default aspect ratio",
    "defaultDurationSora": "Default duration (Sora)"
  },
  "modelSelector": {
    "chat": "Chat model",
    "image": "Image model",
    "video": "Video model",
    "videoModelTitle": "Video model",
    "modeAsync": "Async",
    "modeSync": "Sync",
    "modeLabel": "Mode: {{mode}}"
  },
  "aspectRatio": {
    "landscape": "Landscape",
    "portrait": "Portrait",
    "square": "Square",
    "aspect": "Aspect",
    "duration": "Duration"
  },
  // Dashboard
  "dashboardApp": {
    "noProject": "No project",
    "confirmUse": "Use in selected project"
  },
  // BuiltinModelDescriptions
  "builtinModels": {
    "gpt52Name": "GPT-5.2",
    "gpt52Desc": "Default choice for script parsing. Stable structured output, ideal for scene/shot breakdown and character/event extraction.",
    "gpt54Name": "GPT-5.4",
    "gpt54Desc": "Creative boost for parsing. Best for multiple breakdown options, pacing rewrites, and shot suggestions.",
    "qwenName": "Qwen Image 2.0",
    "qwenDesc": "Tongyi Wanxiang image generation. Text-to-image via /v1/images/generations.",
    "doubaoName": "Doubao Seedance 2.0 Fast",
    "doubaoDesc": "Doubao Seedance 2.0 Fast video generation (GitCC async /v1/videos, default).",
    "soraName": "Sora-2",
    "soraDesc": "OpenAI Sora video generation, async mode, supports multiple durations."
  },
  // globalKeys for stageAssets modal constants
  "languageConstants": {
    "chinese": "Chinese",
    "japanese": "Japanese"
  }
};

const zhAdditions = {
  "scriptEditor": {
    "title": "剧本编辑器",
    "continuing": "续写中...",
    "continue": "AI续写",
    "rewriting": "改写中...",
    "rewrite": "AI改写",
    "markdownSupported": "MARKDOWN SUPPORTED",
    "placeholder": "在此输入故事大纲或直接粘贴剧本...",
    "charactersStat": "{{count}} 字符",
    "linesStat": "{{count}} 行",
    "saved": "已自动保存",
    "ready": "准备就绪"
  },
  "configPanel": {
    "title": "项目配置",
    "projectTitle": "项目标题",
    "projectTitlePlaceholder": "输入项目名称...",
    "outputLanguage": "输出语言",
    "targetDuration": "目标时长",
    "customDurationPlaceholder": "输入时长 (如: 90s, 3m)",
    "shotGenModel": "分镜生成模型",
    "shotGenModelHint": "内置 GPT-5.2 / GPT-5.4，可在 {{modelConfig}} 中添加自定义对话模型",
    "visualStyle": "视觉风格",
    "customStylePlaceholder": "输入风格 (如: 水彩风格, 像素艺术)",
    "analyzing": "智能分析中...",
    "analyze": "生成分镜脚本"
  },
  "characterList": {
    "cast": "演员表",
    "visualDescPlaceholder": "输入角色视觉描述...",
    "emptyText": "暂无视觉描述"
  },
  "inlineEditor": {
    "placeholder": "输入内容...",
    "empty": "暂无内容",
    "save": "保存",
    "cancel": "取消",
    "title": "编辑"
  },
  "optionSelector": {
    "tipPrefix": "提示："
  },
  "sceneBreakdown": {
    "title": "拍摄清单",
    "project": "项目",
    "duration": "时长",
    "backToEdit": "返回编辑",
    "logline": "故事梗概"
  },
  "sceneList": {
    "title": "场景列表"
  },
  "shotRow": {
    "actionLabel": "动作描述",
    "actionPlaceholder": "输入动作描述...",
    "dialogueLabel": "台词（可选）",
    "dialoguePlaceholder": "输入台词（留空表示无台词）...",
    "save": "保存",
    "cancel": "取消",
    "editActionTitle": "编辑动作和台词",
    "characters": "角色",
    "editCharacters": "编辑角色列表",
    "currentCharacters": "当前角色",
    "noCharacters": "无角色",
    "allCharactersAdded": "所有角色已添加",
    "addCharacter": "添加角色",
    "removeCharacter": "移除角色",
    "addedCharacters": "添加角色",
    "visualPrompt": "画面提示词",
    "visualPromptPlaceholder": "输入画面提示词...",
    "editPromptTitle": "编辑提示词"
  },
  "scriptMain": {
    "untitledCheck": "未命名项目",
    "errorWithMessage": "错误: {{message}}",
    "aiConnectionFailed": "AI 连接失败",
    "emptyScriptPrompt": "请先输入一些剧本内容作为基础。",
    "emptyModelPrompt": "请选择或输入模型名称。",
    "continueFailed": "AI续写失败: {{message}}",
    "connectionFailed": "连接失败",
    "emptyScriptFull": "请先输入剧本内容。",
    "rewriteFailed": "AI改写失败: {{message}}"
  },
  "scriptValidation": {
    "emptyScript": "请输入剧本内容。",
    "emptyDuration": "请选择目标时长。",
    "emptyModel": "请选择或输入模型名称。",
    "emptyStyle": "请选择或输入视觉风格。"
  },
  "durations": {
    "30s": "30秒 (广告)",
    "60s": "60秒 (预告)",
    "120s": "2分钟 (片花)",
    "300s": "5分钟 (短片)",
    "900s": "15分钟 (长剧/单集)",
    "custom": "自定义"
  },
  "languages": {
    "chinese": "中文",
    "english": "English",
    "japanese": "日本語",
    "french": "French",
    "spanish": "Spanish"
  },
  "visualStylesConfig": {
    "anime": "日式动漫",
    "animeDesc": "日本动漫风格，线条感强",
    "2d-animation": "2D动画",
    "2d-animationDesc": "经典卓别林/迪士尼风格",
    "3d-animation": "3D动画",
    "3d-animationDesc": "皮克斯/梦工厂风格",
    "cyberpunk": "赛博朋克",
    "cyberpunkDesc": "高科技赛博朋克风",
    "oil-painting": "油画风格",
    "oil-paintingDesc": "油画质感艺术风",
    "live-action": "真人影视",
    "live-actionDesc": "超写实电影/电视剧风格",
    "custom": "其他 (自定义)",
    "customDesc": "手动输入风格"
  },
  "assets": {
    "noProjectPhase": "请先完成 Phase 01 剧情创作",
    "batchGenerating": "正在批量生成资源...",
    "batchProgress": "进度: {{current}} / {{total}}",
    "libraryTitle": "资产库",
    "close": "关闭",
    "searchPlaceholder": "搜索资产名称...",
    "filterAll": "全部",
    "filterCharacter": "角色",
    "filterScene": "场景",
    "emptyAssets": "暂无资产。可在角色或场景卡片中选择「加入资产库」。",
    "useAsset": "{{type}}",
    "useImportOrReplace": "{{action}}",
    "useInProject": "导入到当前项目",
    "replaceCharacter": "替换当前角色",
    "deleteAssetTitle": "删除",
    "sectionTitle": "场景角色",
    "modelLabel": "模型",
    "aspectLabel": "比例",
    "casting": "角色定妆",
    "castingDesc": "为剧本中的角色生成一致的参考形象",
    "locations": "场景概念",
    "locationsDesc": "为剧本场景生成环境参考图",
    "newCharacter": "新建角色",
    "fromLibrary": "从资产库选取",
    "batchGenCharacters": "批量生成角色",
    "regenAllCharacters": "重新生成全部角色",
    "newScene": "新建场景",
    "batchGenScenes": "批量生成场景",
    "regenAllScenes": "重新生成全部场景",
    "replaceFromLibrary": "从资产库替换",
    "addToLibrary": "加入资产库",
    "deleteCharacter": "删除角色",
    "deleteScene": "删除场景"
  },
  "characterForm": {
    "defaultName": "新角色",
    "defaultGender": "未设定",
    "defaultAge": "未设定",
    "defaultPersonality": "待补充"
  },
  "sceneForm": {
    "defaultName": "新场景",
    "defaultTime": "未设定",
    "defaultAtmosphere": "待补充"
  },
  "alertsAssets": {
    "regenAllConfirm": "确定要重新生成所有{{type}}图吗？",
    "regenAllCharacters": "确定要重新生成所有角色图吗？",
    "regenAllScenes": "确定要重新生成所有场景图吗？",
    "addedToLibrary": "已加入资产库：{{name}}",
    "addedToLibraryFailed": "加入资产库失败",
    "missingRefCharacter": "该角色暂无参考图，仍要加入资产库吗？",
    "missingRefScene": "该场景暂无参考图，仍要加入资产库吗？",
    "imported": "已导入：{{name}}",
    "importFailed": "导入失败",
    "pickCharacterReplace": "请选择角色资产进行替换",
    "replacedCharacter": "已替换角色：{{from}} -> {{to}}",
    "deleteAssetFailed": "删除资产失败",
    "deleteAssetConfirm": "确定从资产库删除该资源吗？",
    "characterCreated": "新角色已创建，请编辑提示词并生成图片",
    "sceneCreated": "新场景已创建，请编辑提示词并生成图片",
    "deleteCharacterTitle": "删除角色",
    "deleteCharacterConfirm": "确定要删除角色\"{{name}}\"吗？\n\n注意：这将会影响所有使用该角色的分镜，可能导致分镜关联错误。",
    "characterDeleted": "角色\"{{name}}\"已删除",
    "deleteSceneTitle": "删除场景",
    "deleteSceneConfirm": "确定要删除场景\"{{location}}\"吗？\n\n注意：这将会影响所有使用该场景的分镜，可能导致分镜关联错误。",
    "sceneDeleted": "场景\"{{location}}\"已删除"
  },
  "characterCard": {
    "failed": "生成失败",
    "generating": "生成中...",
    "wardrobe": "服装变体",
    "replaceFromLibrary": "从资产库替换",
    "promptLabel": "角色提示词",
    "promptPlaceholder": "输入角色的视觉描述...",
    "regenerateImage": "重新生成图片",
    "generateImage": "生成角色图片",
    "addToLibrary": "加入资产库",
    "deleteCharacter": "删除角色"
  },
  "sceneCard": {
    "generating": "生成中...",
    "failed": "生成失败",
    "promptLabel": "场景提示词",
    "promptPlaceholder": "输入场景视觉描述...",
    "uploadImage": "上传图片",
    "addToLibrary": "加入资产库",
    "deleteScene": "删除场景"
  },
  "imageUploadButton": {
    "upload": "上传",
    "generate": "生成",
    "generating": "生成中...",
    "regenerate": "重新生成"
  },
  "imagePreview": {
    "closeHint": "点击任意处关闭"
  },
  "promptEditor": {
    "label": "提示词",
    "placeholder": "输入视觉描述...",
    "title": "编辑提示词",
    "save": "保存",
    "cancel": "取消",
    "empty": "未设置提示词。点击编辑按钮添加视觉描述。"
  },
  "wardrobe": {
    "title": "衣橱与造型",
    "base": "基础造型",
    "default": "默认",
    "variations": "造型/服饰",
    "noImage": "暂无图片",
    "regenerate": "重新生成",
    "generateLook": "生成造型",
    "retry": "重试",
    "upload": "上传",
    "failed": "失败",
    "addVariation": "添加造型",
    "namePlaceholder": "造型名称（如：战术装备）",
    "promptPlaceholder": "造型/状态的视觉描述..."
  },
  "director": {
    "sectionTitle": "AI工作台",
    "aiEnhance": "AI增强提示词",
    "completed": "已完成 {{done}} / {{total}}",
    "regenerateAll": "重新生成所有首帧",
    "batchGenerate": "批量生成首帧",
    "empty": "暂无镜头数据，请先返回阶段 1 生成分镜表。",
    "regeneratingAll": "正在重新生成所有首帧...",
    "batchGenerating": "正在批量生成缺失的首帧...",
    "singleShotProgress": "正在生成镜头 {{current}}/{{total}}...",
    "shotDetails": "镜头详情",
    "shot": "镜头",
    "viewHint": "点击编辑",
    "aiSplit": "AI拆分镜头",
    "aiGenerateAction": "AI生成动作建议",
    "editAction": "编辑叙事动作",
    "visualProduction": "视觉制作 (Visual Production)",
    "startFrame": "起始帧",
    "endFrame": "结束帧",
    "noStartFrame": "无起始帧",
    "noEndFrame": "无结束帧",
    "generate": "生成",
    "regenerate": "重新生成",
    "upload": "上传",
    "aiOptimize": "AI优化",
    "optimizeBoth": "AI优化两帧",
    "noImage": "暂无图片",
    "copyPrevEnd": "复制上一镜头尾帧",
    "copyNextStart": "复制下一镜头首帧",
    "regenerateFailed": "生成失败: {{message}}",
    "selectImage": "请选择图片文件！",
    "readFileFailed": "读取文件失败！",
    "generateStartFirst": "请先生成起始帧，或勾选「纯文生视频（不使用首帧）」",
    "videoGenFailed": "视频生成失败",
    "noVideoPrompt": "当前镜头没有可优化的视频提示词，请先生成一次视频或编辑提示词后再试。",
    "promptOptimized": "已自动优化描述以规避审核，请点击「开始生成视频」重试。",
    "optimizeFailed": "优化失败: {{message}}",
    "previousEndMissing": "上一个镜头还没有生成结束帧",
    "nextStartMissing": "下一个镜头还没有生成起始帧",
    "regenAllConfirm": "确定要重新生成所有镜头的首帧吗？这将覆盖现有图片。",
    "generateBothFrames": "请先生成或编辑首帧和尾帧的提示词，以便AI更好地理解场景",
    "sceneNotFound": "找不到场景信息",
    "undefinedStartScene": "未定义的起始场景",
    "undefinedEndScene": "未定义的结束场景",
    "panDefault": "平移",
    "undefinedAction": "未定义的动作",
    "startPromptOptimized": "起始帧提示词已优化",
    "endPromptOptimized": "结束帧提示词已优化",
    "bothPromptsOptimized": "起始帧和结束帧提示词已优化",
    "aiOptimizeFailed": "AI优化失败: {{message}}",
    "shotSplit": "镜头已拆分为 {{count}} 个子镜头",
    "splitFailed": "拆分失败: {{message}}",
    "aiActionFailed": "AI动作生成失败: {{message}}"
  },
  "keyframeEditor": {
    "aiOptimize": "AI优化提示词",
    "editPrompt": "编辑提示词",
    "clickPreview": "点击预览",
    "generating": "生成中...",
    "failed": "生成失败",
    "moderationHint": "若因内容安全拦截，请点击上方「编辑」修改提示词后重试",
    "retry": "重试",
    "notGenerated": "未生成",
    "regenerate": "重新生成",
    "upload": "上传",
    "copyPrevEnd": "复制上一镜头尾帧",
    "copyNextStart": "复制下一镜头首帧",
    "aiEnhanceToggleOn": "开启AI增强：自动扩展为专业电影级描述",
    "aiEnhanceToggleOff": "关闭AI增强：使用基础提示词快速生成",
    "optimizeBoth": "AI一次性优化起始帧和结束帧（推荐）",
    "optimizing": "优化中...",
    "aiOptimizeBoth": "AI优化两帧"
  },
  "sceneContext": {
    "title": "场景环境 (Scene Context)",
    "unknownScene": "未知场景",
    "baseLook": "基础造型",
    "removeCharacter": "移除角色",
    "addCharacterToShot": "+ 添加角色到此镜头"
  },
  "shotCard": {
    "clickEdit": "点击编辑"
  },
  "shotWorkbench": {
    "shotDetails": "镜头详情",
    "actionDialogue": "叙事动作 (Action & Dialogue)"
  },
  "videoGenerator": {
    "title": "视频生成",
    "previewEditPrompt": "预览/编辑视频提示词",
    "selectModel": "选择视频模型",
    "settings": "视频设置",
    "textToVideoOnly": "纯文生视频（不使用首帧）",
    "textToVideoHint": "不上传起始关键帧作为参考图，仅根据视频描述生成。适用于首帧含人物被平台审核拦截的情况。",
    "generating": "生成视频中 ({{aspect}}, {{detail}})...",
    "regenerate": "重新生成视频",
    "generate": "开始生成视频",
    "generateStartFirst": "请先生成起始帧，或勾选「纯文生视频」",
    "optimizingDesc": "正在优化描述…",
    "aiOptimizeDesc": "AI 优化描述（规避审核）",
    "i2vMode": "* 未检测到结束帧，将使用单图生成模式 (Image-to-Video)",
    "textToVideoMode": "* 纯文生模式：不会上传首帧/尾帧，仅发送视频描述文本",
    "noEndFrame": "* 未检测到结束帧，将使用单图生成模式 (Image-to-Video)",
    "modeAsync": "异步",
    "modeSync": "同步",
    "modeAsyncPolling": "异步（需要轮询）",
    "modeSyncDirect": "同步（直接返回）",
    "supportedDurations": " · 支持时长: {{durations}}秒",
    "supportedRatios": " 支持 {{ratios}}",
    "supportedRatiosDurations": " 支持 {{ratios}}，可选 {{durations}}秒"
  },
  "editModal": {
    "placeholder": "输入内容...",
    "aiGenerating": "AI正在生成动作建议...",
    "aiGenerateAction": "AI生成动作建议",
    "cancel": "取消",
    "save": "保存",
    "editAction": "编辑动作",
    "editKeyframe": "编辑关键帧提示词",
    "editVideo": "编辑视频提示词",
    "actionPlaceholder": "描述镜头的动作和内容...",
    "keyframePlaceholder": "输入关键帧的提示词...",
    "videoPlaceholder": "输入视频生成的提示词..."
  },
  "export": {
    "title": "制片导出",
    "exportFailed": "导出失败: {{message}}",
    "noAssets": "没有可下载的资源。请先生成角色、场景或镜头素材。",
    "downloadAssetsFailed": "下载源资源失败: {{message}}",
    "unknownError": "未知错误",
    "notDeveloped": "暂未开发"
  },
  "videoPlayer": {
    "preview": "视频预览"
  },
  "statusPanel": {
    "untitled": "未命名项目"
  },
  "prompts": {
    "title": "资产管理",
    "subtitle": "查看和编辑所有生成任务的提示词和变量",
    "empty": "暂无提示词数据",
    "emptyHint": "请先在剧情创作阶段生成角色和场景，或在 AI工作台 生成分镜",
    "searchPlaceholder": "搜索提示词、角色、场景...",
    "filterAll": "全部",
    "filterCharacters": "角色",
    "filterScenes": "场景",
    "filterKeyframes": "关键帧"
  },
  "characterSection": {
    "title": "角色",
    "edit": "编辑",
    "noPrompt": "未设置提示词",
    "variations": "角色变体"
  },
  "sceneSection": {
    "title": "场景",
    "edit": "编辑",
    "noPrompt": "未设置提示词"
  },
  "keyframeSection": {
    "title": "分镜关键帧",
    "shot": "镜头 {{num}}",
    "standardShot": "标准镜头",
    "startFrame": "起始帧",
    "endFrame": "结束帧",
    "edit": "编辑",
    "videoGenPrompt": "视频生成提示词",
    "unsavedPrompt": "⚠ 此视频生成时未保存提示词，以上为推测内容"
  },
  "promptEditorSmall": {
    "placeholder": "输入提示词...",
    "save": "保存",
    "cancel": "取消"
  },
  "promptUtils": {
    "defaultPrompt": "{{action}}\n\n镜头运动：{{movement}}\n模型：{{model}}"
  },
  "addModelForm": {
    "missingFields": "请填写模型名称和 API 模型名",
    "title": "添加自定义模型",
    "sectionBasic": "基础信息",
    "nameLabel": "模型名称 *",
    "namePlaceholder": "如：GPT-4 Turbo",
    "apiModelLabel": "API 模型名 *（可与内置重复）",
    "apiModelPlaceholder": "如：gpt-4-turbo、claude-3-opus",
    "apiModelHint": "该字段会作为 API 请求中的 model 参数；内部 ID 会自动生成",
    "descriptionLabel": "描述（可选）",
    "descriptionPlaceholder": "可选的描述信息",
    "sectionEndpoint": "API 端点",
    "endpointLabel": "API 端点 (Endpoint)",
    "endpointHint": "留空则使用默认端点",
    "sectionApiKey": "模型专属 API Key（可选）",
    "apiKeyLabel": "API Key（可选）",
    "apiKeyPlaceholder": "留空则使用全局 API Key",
    "apiKeyHint": "为此模型单独配置 API Key，留空则使用全局配置的 Key",
    "sectionVideo": "视频模型特有选项",
    "videoModeLabel": "API 模式",
    "videoModeSync": "同步模式（Chat Completion 类）",
    "videoModeAsync": "异步模式（Sora 类）",
    "videoModeDoubao": "Doubao Seedance（Ark 任务制）",
    "videoModeHint": "同步模式：直接返回结果；异步模式：先创建任务，再轮询获取结果；Doubao：适配 Doubao Seedance 的 Ark 任务制接口",
    "sectionActions": "操作按钮",
    "save": "添加模型"
  },
  "modelCard": {
    "temperature": "温度",
    "maxTokens": "最大 Token",
    "maxTokensPlaceholder": "留空不限制",
    "maxTokensHint": "留空则不限制最大 Token",
    "defaultAspectRatio": "默认比例",
    "defaultDuration": "默认时长",
    "seconds": "{{d}}秒",
    "mode": "模式：",
    "modeSync": "同步（Veo 类）",
    "modeAsync": "异步（Sora 类）",
    "modeDoubao": "Doubao Seedance（Ark 任务制）",
    "header": "头部",
    "modelInfo": "模型信息",
    "builtIn": "内置",
    "apiModel": "API 模型名: {{name}}",
    "internalId": " · 内部ID: {{id}}",
    "actions": "操作按钮",
    "useBtn": "使用此模型按钮",
    "useTitle": "使用此模型",
    "use": "使用",
    "activeMarker": "当前激活标记",
    "currentUsing": "当前使用",
    "enableToggle": "启用/禁用开关",
    "enable": "启用",
    "disable": "禁用",
    "deleteTitle": "删除",
    "delete": "删除",
    "expand": "展开/收起",
    "paramsExpanded": "展开的参数配置",
    "modelApiKey": "模型专属 API Key",
    "modelApiKeyLabel": "API Key（留空使用全局 Key）",
    "modelApiKeyPlaceholder": "留空则使用全局 API Key",
    "modelApiKeyConfigured": "✓ 已配置专属 Key",
    "landscape": "横屏",
    "portrait": "竖屏",
    "square": "方形"
  },
  "modelManager": {
    "deleteProviderConfirm": "确定要删除这个提供商吗？",
    "providerDeleted": "提供商已删除",
    "adTitle": "推荐使用 GitCC API",
    "adDesc": "支持 GPT-5.1、Gemini-3、Veo 3.1、Sora-2 等多种模型，稳定快速，价格优惠。",
    "adFooter": "本开源项目由 GitCC API 提供支持。",
    "buyNow": "立即购买",
    "tutorialHidden": "使用教程已隐藏",
    "providersList": "提供商列表",
    "providersTitle": "API 提供商",
    "addProvider": "添加提供商",
    "addProviderForm": "添加新提供商表单",
    "providerNamePlaceholder": "提供商名称",
    "providerBaseUrlPlaceholder": "API 基础 URL（如 https://api.example.com）",
    "providerApiKeyPlaceholder": "独立 API Key（可选，不填则使用全局 Key）",
    "confirmAdd": "确认添加",
    "providersListSection": "提供商列表",
    "providerApiKeyEditPlaceholder": "独立 API Key（可选）",
    "save": "保存",
    "default": "默认",
    "builtIn": "内置",
    "modelSelection": "模型选择",
    "chatModel": "对话模型",
    "videoModel": "视频模型",
    "defaultSettings": "默认设置",
    "defaultGenSettings": "默认生成设置",
    "defaultAspect": "默认比例",
    "defaultDurationSora": "默认时长 (Sora)"
  },
  "modelSelector": {
    "chat": "对话模型",
    "image": "图片模型",
    "video": "视频模型",
    "videoModelTitle": "视频模型",
    "modeAsync": "异步",
    "modeSync": "同步",
    "modeLabel": "模式: {{mode}}"
  },
  "aspectRatio": {
    "landscape": "横屏",
    "portrait": "竖屏",
    "square": "方形",
    "aspect": "比例",
    "duration": "时长"
  },
  "dashboardApp": {
    "noProject": "未命名项目",
    "confirmUse": "在所选项目中使用"
  },
  "builtinModels": {
    "gpt52Name": "GPT-5.2",
    "gpt52Desc": "剧情脚本切分首选：结构化输出稳定，适合分场/分镜、提取人物与事件",
    "gpt54Name": "GPT-5.4",
    "gpt54Desc": "创意增强型切分：更适合提供多种切分方案、改写节奏与镜头建议",
    "qwenName": "Qwen Image 2.0",
    "qwenDesc": "通义万相图片生成，文生图走 /v1/images/generations",
    "doubaoName": "豆包 Seedance 2.0 Fast",
    "doubaoDesc": "豆包 Seedance 2.0 Fast 视频生成（GitCC 异步 /v1/videos，默认推荐）",
    "soraName": "Sora-2",
    "soraDesc": "OpenAI Sora 视频生成，异步模式，支持多种时长"
  },
  "languageConstants": {
    "chinese": "Chinese",
    "japanese": "Japanese"
  }
};

// Merge into both files
const en = existingEn;
const zh = existingZh;

const merged = deepMerge(en, additions);
const mergedZh = deepMerge(zh, zhAdditions);

// Preserve key ordering: existing first, then new
const finalEn = {};
for (const k of Object.keys(en)) finalEn[k] = merged[k];
for (const k of Object.keys(additions)) {
  if (!(k in finalEn)) finalEn[k] = merged[k];
}

const finalZh = {};
for (const k of Object.keys(zh)) finalZh[k] = mergedZh[k];
for (const k of Object.keys(zhAdditions)) {
  if (!(k in finalZh)) finalZh[k] = mergedZh[k];
}

fs.writeFileSync('i18n/locales/en.json', JSON.stringify(finalEn, null, 2) + '\n', 'utf8');
fs.writeFileSync('i18n/locales/zh-CN.json', JSON.stringify(finalZh, null, 2) + '\n', 'utf8');
console.log('Wrote en.json with', Object.keys(finalEn).length, 'top-level keys');
console.log('Wrote zh-CN.json with', Object.keys(finalZh).length, 'top-level keys');
