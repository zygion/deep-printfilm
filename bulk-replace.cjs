// bulk-replace.cjs - Apply common replacements across the codebase
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
  // Common: showAlert messages
  { find: /showAlert\(`已加入资产库：\$\{char\.name\}`, \{ type: 'success' \}\);/g, replace: "showAlert(t('alertsAssets.addedToLibrary', { name: char.name }), { type: 'success' });" },
  { find: /showAlert\(e\?\.message \|\| '加入资产库失败', \{ type: 'error' \}\);/g, replace: "showAlert(e?.message || t('alertsAssets.addedToLibraryFailed'), { type: 'error' });" },
  { find: /showAlert\('该角色暂无参考图，仍要加入资产库吗？',/g, replace: "showAlert(t('alertsAssets.missingRefCharacter')," },
  { find: /showAlert\(`已加入资产库：\$\{scene\.location\}`, \{ type: 'success' \}\);/g, replace: "showAlert(t('alertsAssets.addedToLibrary', { name: scene.location }), { type: 'success' });" },
  { find: /showAlert\('该场景暂无参考图，仍要加入资产库吗？',/g, replace: "showAlert(t('alertsAssets.missingRefScene')," },
  { find: /showAlert\(`已导入：\$\{item\.name\}`, \{ type: 'success' \}\);/g, replace: "showAlert(t('alertsAssets.imported', { name: item.name }), { type: 'success' });" },
  { find: /showAlert\(e\?\.message \|\| '导入失败', \{ type: 'error' \}\);/g, replace: "showAlert(e?.message || t('alertsAssets.importFailed'), { type: 'error' });" },
  { find: /showAlert\('请选择角色资产进行替换', \{ type: 'warning' \}\);/g, replace: "showAlert(t('alertsAssets.pickCharacterReplace'), { type: 'warning' });" },
  { find: /showAlert\(`已替换角色：\$\{previous\.name\} → \$\{cloned\.name\}`, \{ type: 'success' \}\);/g, replace: "showAlert(t('alertsAssets.replacedCharacter', { from: previous.name, to: cloned.name }), { type: 'success' });" },
  { find: /showAlert\(e\?\.message \|\| '删除资产失败', \{ type: 'error' \}\);/g, replace: "showAlert(e?.message || t('alertsAssets.deleteAssetFailed'), { type: 'error' });" },
  { find: /showAlert\('新角色已创建，请编辑提示词并生成图片', \{ type: 'success' \}\);/g, replace: "showAlert(t('alertsAssets.characterCreated'), { type: 'success' });" },
  { find: /showAlert\('新场景已创建，请编辑提示词并生成图片', \{ type: 'success' \}\);/g, replace: "showAlert(t('alertsAssets.sceneCreated'), { type: 'success' });" },
  { find: /showAlert\('确定从资产库删除该资源吗？',/g, replace: "showAlert(t('alertsAssets.deleteAssetConfirm')," },
  // Default values
  { find: /name: '新角色',/g, replace: "name: t('characterForm.defaultName')," },
  { find: /gender: '未设定',/g, replace: "gender: t('characterForm.defaultGender')," },
  { find: /age: '未设定',/g, replace: "age: t('characterForm.defaultAge')," },
  { find: /personality: '待补充',/g, replace: "personality: t('characterForm.defaultPersonality')," },
  { find: /location: '新场景',/g, replace: "location: t('sceneForm.defaultName')," },
  { find: /time: '未设定',/g, replace: "time: t('sceneForm.defaultTime')," },
  { find: /atmosphere: '待补充',/g, replace: "atmosphere: t('sceneForm.defaultAtmosphere')," },
  // Show alerts with delete confirmations
  { find: /title: '删除角色',/g, replace: "title: t('alertsAssets.deleteCharacterTitle')," },
  { find: /title: '删除场景',/g, replace: "title: t('alertsAssets.deleteSceneTitle')," },
  { find: /confirmText: '删除',/g, replace: "confirmText: t('common.delete')," },
  { find: /cancelText: '取消',/g, replace: "cancelText: t('common.cancel')," },
  // Common UI patterns
  { find: /<p>请先完成 Phase 01 剧情创作<\/p>/g, replace: "<p>{t('assets.noProjectPhase')}</p>" },
  { find: /<h3 className="text-xl font-bold text-white mb-2">正在批量生成资源\.\.\.<\/h3>/g, replace: "<h3 className=\"text-xl font-bold text-white mb-2\">{t('assets.batchGenerating')}</h3>" },
  { find: /进度: \{batchProgress\.current\} \/ \{batchProgress\.total\}/g, replace: "{t('assets.batchProgress', { current: batchProgress.current, total: batchProgress.total })}" },
  { find: /<div className="text-sm font-bold text-white">资产库<\/div>/g, replace: "<div className=\"text-sm font-bold text-white\">{t('assets.libraryTitle')}</div>" },
  { find: /title="关闭"/g, replace: "title={t('common.close')}" },
  { find: /placeholder="搜索资产名称\.\.\."/g, replace: "placeholder={t('assets.searchPlaceholder')}" },
  { find: /\{type === 'all' \? '全部' : type === 'character' \? '角色' : '场景'\}/g, replace: "{type === 'all' ? t('assets.filterAll') : type === 'character' ? t('assets.filterCharacter') : t('assets.filterScene')}" },
  { find: /\{item\.type === 'character' \? '角色' : '场景'\}/g, replace: "{item.type === 'character' ? t('assets.filterCharacter') : t('assets.filterScene')}" },
  { find: /\{replaceTargetCharId \? '替换当前角色' : '导入到当前项目'\}/g, replace: "{replaceTargetCharId ? t('assets.replaceCharacter') : t('assets.useInProject')}" },
  { find: /title="删除"/g, replace: "title={t('common.delete')}" },
];

let totalChanged = 0;
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
    console.log('Updated:', path.relative(process.cwd(), f));
  }
}
console.log(`\nUpdated ${totalChanged} files`);
