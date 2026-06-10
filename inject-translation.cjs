// inject-translation.cjs - Add useTranslation to files that have t() but no import
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

const SKIP_FILES = new Set([
  // Service files - they don't have React context, skip
]);

let totalChanged = 0;
const changes = [];

for (const f of files) {
  // Skip service files
  if (f.includes(path.sep + 'services' + path.sep)) continue;
  if (f.includes(path.sep + 'types' + path.sep)) continue;
  if (f.includes(path.sep + 'i18n' + path.sep)) continue;
  // Skip entry points
  if (f.endsWith('App.tsx') || f.endsWith('index.tsx') || f.endsWith('main.cjs')) continue;
  if (f.endsWith('index.ts')) continue;

  let content = fs.readFileSync(f, 'utf8');
  // Check if t() is used but useTranslation not imported
  if (content.match(/t\(['"`]/) && !content.match(/useTranslation/)) {
    // Find a sensible place to add the import
    // Look for the last import line
    const lines = content.split('\n');
    let lastImportLine = -1;
    let firstImportLine = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^import\s/.test(lines[i])) {
        if (firstImportLine < 0) firstImportLine = i;
        lastImportLine = i;
      }
    }
    if (lastImportLine < 0) continue;
    // Compute the relative path to i18n
    const relPath = path.relative(path.dirname(f), path.join(process.cwd(), 'i18n')).replace(/\\/g, '/');
    const importPath = relPath.startsWith('.') ? relPath : './' + relPath;
    const importLine = `import { useTranslation } from '${importPath}';`;
    // Check if any existing import already includes useTranslation via *
    if (content.includes('useTranslation')) continue;
    lines.splice(lastImportLine + 1, 0, importLine);
    content = lines.join('\n');
    // Also: find the component/const declaration and inject `const { t } = useTranslation();`
    // Look for `const Xxx: React.FC<...> = ({` or `export const Xxx: React.FC<...> = ({`
    // Then add the t() after the opening `) => {` line
    const match = content.match(/(export\s+)?(const|function)\s+(\w+)(?::\s*React\.FC[^=]*)?\s*=\s*(\([^)]*\))\s*=>\s*\{/);
    if (match) {
      // find the position after this `=> {`
      const arrowPos = content.indexOf('=> {', match.index);
      if (arrowPos > 0) {
        const insertAt = arrowPos + '=> {'.length;
        content = content.slice(0, insertAt) + '\n  const { t } = useTranslation();' + content.slice(insertAt);
      }
    }
    fs.writeFileSync(f, content, 'utf8');
    totalChanged++;
    changes.push(path.relative(process.cwd(), f));
  }
}
console.log(`Updated ${totalChanged} files:`);
for (const c of changes) console.log('  ' + c);
