import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));
const fail = (message) => { console.error(`✗ ${message}`); process.exitCode = 1; };
const pass = (message) => console.log(`✓ ${message}`);

const required = ['docs/getting-started.md','docs/base.md','docs/forms.md','docs/buttons.md','docs/layout.md','docs/components.md','docs/navigation.md','docs/overlays.md','docs/themes.md','docs/app-layout.md','docs/BASELINE.md','docs/BROWSER-SUPPORT.md','docs/MOBILE.md','docs/ACCESSIBILITY.md','docs/CUSTOMIZATION.md','docs/API.md','docs/TOKENS.md','docs/COMPONENTS.md','docs/JAVASCRIPT.md','docs/THEMING.md','docs/API-FREEZE.md','docs/public-api.json','demo/theme-system.html','demo/visual-mobile.html'];
const outputs = ['dist/lithe-base.css','dist/lithe-base.min.css','dist/lithe-extended.css','dist/lithe-extended.min.css','dist/lithe.css','dist/lithe.min.css','dist/lithe.js'];
for (const file of [...required,...outputs]) exists(file) ? pass(file) : fail(`Missing ${file}`);

const sourceFiles = [...fs.readdirSync(path.join(root,'src/base')).map(f=>`src/base/${f}`),...fs.readdirSync(path.join(root,'src/extended')).map(f=>`src/extended/${f}`)].filter(f=>f.endsWith('.css'));
const sources = sourceFiles.map(read).join('\n');
const base = read('dist/lithe-base.css');
const extended = read('dist/lithe-extended.css');
const full = read('dist/lithe.css');

for (const pattern of [/^\s*button\s*\{/m,/^\s*input\s*\{/m,/^\s*textarea\s*\{/m,/^\s*select\s*\{/m,/^\s*article\s*\{/m,/^\s*section\s*\{/m,/^\s*table\s*\{/m,/^\s*svg\s*\{/m,/^\s*canvas\s*\{/m]) if (pattern.test(full)) fail(`Forbidden global selector: ${pattern}`);
pass('No aggressive global component selectors');

for (const selector of ['.card','.modal','.drawer','.navbar','.dropdown-menu','.tabs','.toast','.app']) if (base.includes(selector)) fail(`${selector} leaked into Base`);
for (const selector of ['.input','.select','.textarea','.button','.table','.switch','.row']) if (!base.includes(selector)) fail(`Base is missing ${selector}`);
for (const selector of ['.card','.alert','.navbar','.modal','.tabs','.toolbar','.app']) if (!extended.includes(selector)) fail(`Extended is missing ${selector}`);

for (const deprecated of ['.small','.large','.switch-track','--control-height-lg']) if (sources.includes(deprecated)) fail(`Deprecated API remains: ${deprecated}`);
pass('Deprecated aliases are absent from the public alpha API');

const defined = new Set([...sources.matchAll(/(--[a-z0-9-]+)\s*:/gi)].map(m=>m[1]));
const used = new Set([...sources.matchAll(/var\((--[a-z0-9-]+)/gi)].map(m=>m[1]));
for (const token of used) if (!defined.has(token)) fail(`Undefined custom property: ${token}`);
pass('All used custom properties are defined');

const tokens = read('src/base/tokens.css');
for (const token of ['--primary-active','--primary-soft','--danger-text','--danger-on-color','--success-on-color','--warning-on-color','--focus-ring-color','--focus-width','--focus-offset']) if (!tokens.includes(token)) fail(`Missing theme token ${token}`);
if (!tokens.includes('[data-theme="dark"]') || !tokens.includes(':root:not([data-theme])') || !tokens.includes('[data-theme="light"]')) fail('Light, dark or system theme mode is missing');
if (!tokens.includes('--switch-on: var(--primary)')) fail('Switch does not derive from primary');
pass('Semantic light, dark and system themes are present');

const extractBlock = (css, marker) => {
  const start = css.indexOf(marker);
  if (start < 0) return new Map();
  const brace = css.indexOf('{', start);
  let depth = 0;
  for (let i = brace; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    if (css[i] === '}') depth -= 1;
    if (depth === 0) {
      const body = css.slice(brace + 1, i);
      return new Map([...body.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)].map((match) => [match[1], match[2].trim()]));
    }
  }
  return new Map();
};

const darkExplicit = extractBlock(tokens, '[data-theme="dark"]');
const systemMediaStart = tokens.indexOf('@media (prefers-color-scheme: dark)');
const darkSystem = extractBlock(tokens.slice(systemMediaStart), ':root:not([data-theme])');
for (const [token, value] of darkExplicit) {
  if (darkSystem.get(token) !== value) fail(`Dark/system token mismatch for ${token}`);
}
for (const token of darkSystem.keys()) {
  if (!darkExplicit.has(token)) fail(`System-only dark token: ${token}`);
}
pass('Explicit dark and system dark tokens are synchronized');

const componentSources = sourceFiles.filter(f=>f !== 'src/base/tokens.css').map(read).join('\n');
for (const m of componentSources.matchAll(/#[0-9a-f]{3,8}\b/gi)) fail(`Hardcoded hex color outside tokens.css: ${m[0]}`);
for (const m of componentSources.matchAll(/(?:rgb|hsl)a?\([^)]*\)/gi)) fail(`Hardcoded functional color outside tokens.css: ${m[0]}`);
pass('Component colors are token driven');

const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
const changelog = read('CHANGELOG.md');
if (lock.version !== pkg.version || lock.packages?.['']?.version !== pkg.version) fail('package and lock versions differ');
else if (!changelog.includes(`## ${pkg.version}`)) fail(`CHANGELOG missing ${pkg.version}`);
else pass(`Version ${pkg.version} is synchronized`);

if (read('src/js/lithe.js') !== read('dist/lithe.js')) fail('dist/lithe.js is not synchronized');
else pass('JavaScript distribution is synchronized');
if (!full.includes('min-height: 100svh') || !full.includes('safe-area-inset-bottom')) fail('Mobile viewport or safe-area fallback is missing');
if (!full.includes('@keyframes lithe-spin') || !full.includes('animation-iteration-count: infinite !important')) fail('Spinner reduced-motion override is missing');
if (process.exitCode) process.exit(process.exitCode);
console.log('Lithe CSS checks passed.');
