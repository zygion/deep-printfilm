// bulk-replace-2.cjs - More targeted replacements across the codebase
const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, fileList);
    else if (/\.(tsx?)$/.test(entry.name)) fileList.push(full);
  }
  return fileList;
}

const files = walk(process.cwd());

const replacements = [
  // AspectRatioSelector
  { find: /label: '横屏',/g, replace: "label: t('aspectRatio.landscape')," },
  { find: /label: '竖屏',/g, replace: "label: t('aspectRatio.portrait')," },
  { find: /label: '方形',/g, replace: "label: t('aspectRatio.square')," },
  { find: /\{d\}秒/g, replace: "{t('aspectRatio.seconds', { d })}" },
  { find: /<span className="text-\[10px\] text-zinc-500 uppercase">比例<\/span>/g, replace: '<span className="text-[10px] text-zinc-500 uppercase">{t(\'aspectRatio.aspect\')}</span>' },
  { find: /<span className="text-\[10px\] text-zinc-500 uppercase">时长<\/span>/g, replace: '<span className="text-[10px] text-zinc-500 uppercase">{t(\'aspectRatio.duration\')}</span>' },

  // ModelManagerTab
  { find: /showAlert\('确定要删除这个提供商吗？',/g, replace: "showAlert(t('modelManager.deleteProviderConfirm')," },
  { find: /showAlert\('提供商已删除', \{ type: 'success' \}\);/g, replace: "showAlert(t('modelManager.providerDeleted'), { type: 'success' });" },
  { find: /推荐使用 GitCC API/g, replace: "{t('modelManager.adTitle')}" },
  { find: /支持 GPT-5\.1、Gemini-3、Veo 3\.1、Sora-2 等多种模型，稳定快速，价格优惠。/g, replace: "{t('modelManager.adDesc')}" },
  { find: /本开源项目由 GitCC API 提供支持。/g, replace: "{t('modelManager.adFooter')}" },
  { find: /立即购买/g, replace: "{t('modelManager.buyNow')}" },
  { find: /使用教程已隐藏/g, replace: "{t('modelManager.tutorialHidden')}" },
  { find: /提供商列表/g, replace: "{t('modelManager.providersList')}" },
  { find: /API 提供商/g, replace: "{t('modelManager.providersTitle')}" },
  { find: /添加提供商/g, replace: "{t('modelManager.addProvider')}" },
  { find: /添加新提供商表单/g, replace: "{t('modelManager.addProviderForm')}" },
  { find: /placeholder="提供商名称"/g, replace: 'placeholder={t(\'modelManager.providerNamePlaceholder\')}' },
  { find: /placeholder="API 基础 URL（如 https:\/\/api\.example\.com）"/g, replace: 'placeholder={t(\'modelManager.providerBaseUrlPlaceholder\')}' },
  { find: /placeholder="独立 API Key（可选，不填则使用全局 Key）"/g, replace: 'placeholder={t(\'modelManager.providerApiKeyPlaceholder\')}' },
  { find: /确认添加/g, replace: "{t('modelManager.confirmAdd')}" },
  { find: /placeholder="独立 API Key（可选）"/g, replace: 'placeholder={t(\'modelManager.providerApiKeyEditPlaceholder\')}' },
  { find: /<span className="px-1\.5 py-0\.5 bg-indigo-500\/20 text-indigo-400 text-\[10px\] rounded">默认<\/span>/g, replace: '<span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 text-[10px] rounded">{t(\'modelManager.default\')}</span>' },
  { find: /<span className="px-1\.5 py-0\.5 bg-zinc-700 text-zinc-400 text-\[10px\] rounded">内置<\/span>/g, replace: '<span className="px-1.5 py-0.5 bg-zinc-700 text-zinc-400 text-[10px] rounded">{t(\'modelManager.builtIn\')}</span>' },
  { find: /模型选择/g, replace: "{t('modelManager.modelSelection')}" },
  { find: /对话模型/g, replace: "{t('modelManager.chatModel')}" },
  { find: /视频模型/g, replace: "{t('modelManager.videoModel')}" },
  { find: /默认设置/g, replace: "{t('modelManager.defaultSettings')}" },
  { find: /默认生成设置/g, replace: "{t('modelManager.defaultGenSettings')}" },
  { find: /<label className="text-\[10px\] text-zinc-600 mb-1\.5 block">默认比例<\/label>/g, replace: '<label className="text-[10px] text-zinc-600 mb-1.5 block">{t(\'modelManager.defaultAspect\')}</label>' },
  { find: /<label className="text-\[10px\] text-zinc-600 mb-1\.5 block">默认时长 \(Sora\)<\/label>/g, replace: '<label className="text-[10px] text-zinc-600 mb-1.5 block">{t(\'modelManager.defaultDurationSora\')}</label>' },
  { find: /\{d\}秒(?=\s*\}|\s*<)/g, replace: "{t('aspectRatio.seconds', { d })}" },

  // ModelSelector
  { find: /chat: '对话模型',/g, replace: "chat: t('modelSelector.chat')," },
  { find: /image: '图片模型',/g, replace: "image: t('modelSelector.image')," },
  { find: /video: '视频模型',/g, replace: "video: t('modelSelector.video')," },
  { find: /视频模型(?=[\s\S]{0,40}<\/)/g, replace: "{t('modelSelector.videoModelTitle')}" },
  { find: /videoModel\.params\.mode === 'async' \? '异步' : '同步'/g, replace: "videoModel.params.mode === 'async' ? t('modelSelector.modeAsync') : t('modelSelector.modeSync')" },
  { find: /模式: \{selectedModel\.params\.mode === 'async' \? '异步（需要轮询）' : '同步（直接返回）'\}/g, replace: "{t('modelSelector.modeLabel', { mode: selectedModel.params.mode === 'async' ? t('modelSelector.modeAsyncPolling') : t('modelSelector.modeSyncDirect') })}" },
  { find: /` · 支持时长: \$\{selectedModel\.params\.supportedDurations\.join\([^)]+\)\}秒`/g, replace: "{t('videoGenerator.supportedDurations', { durations: selectedModel.params.supportedDurations.join('/') })}" },

  // ModelConfig defaults
  { find: /\{ name: 'GPT-5\.2', value: 'gpt-5\.2', description: '默认推荐，结构化输出稳定' \},/g, replace: "{ name: t('builtinModels.gpt52Name'), value: 'gpt-5.2', description: t('builtinModels.gpt52Desc') }," },
  { find: /\{ name: 'GPT-5\.4', value: 'gpt-5\.4', description: '创意增强，适合改写与多种切分方案' \},/g, replace: "{ name: t('builtinModels.gpt54Name'), value: 'gpt-5.4', description: t('builtinModels.gpt54Desc') }," },
  { find: /\{ name: 'Qwen Image 2\.0', value: 'qwen-image-2\.0', description: '默认推荐，文生图 \/v1\/images\/generations' \},/g, replace: "{ name: t('builtinModels.qwenName'), value: 'qwen-image-2.0', description: t('builtinModels.qwenDesc') }," },
  { find: /\{ name: '豆包 Seedance 2\.0 Fast', value: 'doubao-seedance-2-0-fast', type: 'sora' as const, description: '默认推荐，异步 \/v1\/videos' \},/g, replace: "{ name: t('builtinModels.doubaoName'), value: 'doubao-seedance-2-0-fast', type: 'sora' as const, description: t('builtinModels.doubaoDesc') }," },
  { find: /\{ name: 'Sora-2', value: 'sora-2', type: 'sora' as const, description: '异步模式，支持 4\/8\/12 秒' \},/g, replace: "{ name: t('builtinModels.soraName'), value: 'sora-2', type: 'sora' as const, description: t('builtinModels.soraDesc') }," },
];

let totalChanged = 0;
const changes = {};
for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  for (const r of replacements) {
    const before = content;
    content = content.replace(r.find, r.replace);
    if (content !== before) {
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    totalChanged++;
    changes[path.relative(process.cwd(), f)] = 1;
  }
}
console.log(`Updated ${totalChanged} files:`);
for (const f of Object.keys(changes)) console.log('  ' + f);
