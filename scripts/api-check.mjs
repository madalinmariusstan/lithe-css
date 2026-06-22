import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const fail = (message) => { console.error(`✗ ${message}`); process.exitCode = 1; };
const pass = (message) => console.log(`✓ ${message}`);

const api = JSON.parse(read('docs/public-api.json'));
const pkg = JSON.parse(read('package.json'));
const base = read('dist/lithe-base.css');
const extended = read('dist/lithe-extended.css');
const full = read('dist/lithe.css');
const js = read('dist/lithe.js');
const tokens = read('src/base/tokens.css');

if (api.version !== pkg.version) fail(`API manifest ${api.version} differs from package ${pkg.version}`);
else pass(`API manifest version ${api.version}`);

for (const file of api.bundles) {
  if (!fs.existsSync(path.join(root, file))) fail(`Missing public bundle ${file}`);
}

const hasClass = (css, name) => new RegExp(`\\.${name.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}(?![a-zA-Z0-9_-])`).test(css);
for (const name of api.baseClasses) if (!hasClass(base, name)) fail(`Missing Base class .${name}`);
for (const name of api.extendedClasses) if (!hasClass(extended, name)) fail(`Missing Extended class .${name}`);
for (const name of api.modifiers) if (!hasClass(full, name)) fail(`Missing public modifier .${name}`);

for (const attr of api.dataAttributes) {
  if (attr === 'data-theme') continue;
  if (!js.includes(attr) && !full.includes(`[${attr}`)) fail(`Missing public data attribute ${attr}`);
}

for (const token of api.publicTokens) {
  if (!tokens.includes(`${token}:`)) fail(`Missing public token ${token}`);
}

for (const legacy of ['.small', '.large', '.switch-track']) {
  if (full.includes(legacy) || js.includes(legacy)) fail(`Legacy API remains: ${legacy}`);
}

if (process.exitCode) process.exit(process.exitCode);
pass('Public API manifest is present in the distribution');
