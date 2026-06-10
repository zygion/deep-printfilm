const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, fileList);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) fileList.push(full);
  }
  return fileList;
}

const files = walk(process.cwd());

// Patterns that ARE user-visible (skip comments, console, throw, log)
const isUserVisible = (line, idx) => {
  const t = line.trim();
  if (!t) return false;
  if (t.startsWith('//') || t.startsWith('/*') || t.startsWith('*')) return false;
  if (/^\s*\*/.test(line)) return false;
  if (t.startsWith('console.')) return false;
  if (t.startsWith('throw new Error')) return false;
  if (t.startsWith('reject(new Error')) return false;
  if (/^[\s]*\/\//.test(t)) return false;
  return true;
};

let total = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    if (/[\u4e00-\u9fff]/.test(lines[i]) && isUserVisible(lines[i], i)) {
      hits.push({ line: i + 1, text: lines[i].trim() });
    }
  }
  if (hits.length > 0) {
    const rel = path.relative(process.cwd(), f);
    console.log('\n===', rel, `(${hits.length} user-visible) ===`);
    for (const h of hits.slice(0, 50)) {
      console.log(`  L${h.line}: ${h.text.substring(0, 140)}`);
    }
    if (hits.length > 50) console.log(`  ... and ${hits.length - 50} more`);
    total += hits.length;
  }
}
console.log(`\nTotal user-visible Chinese lines: ${total}`);
