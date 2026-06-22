import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const fail = (message) => { console.error(`✗ ${message}`); process.exitCode = 1; };
const pass = (message) => console.log(`✓ ${message}`);

const cssFiles = [
  'src/base/tokens.css', 'src/base/reset.css', 'src/base/layout.css',
  'src/base/grid.css', 'src/base/forms.css', 'src/base/buttons.css',
  'src/base/tables.css', 'src/base/utilities.css',
  'src/extended/content.css', 'src/extended/feedback.css',
  'src/extended/navigation.css', 'src/extended/overlays.css',
  'src/extended/disclosure.css', 'src/extended/app-layout.css'
];
const css = cssFiles.map(read).join('\n');

// Baseline 2026 Newly available features are intentionally excluded from the core.
const newlyAvailable2026 = [
  ['contrast-color()', /contrast-color\s*\(/i],
  [':open', /:open\b/i],
  ['container style queries', /@container\s+style\s*\(/i],
  ['shape()', /(?:clip-path|offset-path)\s*:\s*shape\s*\(/i],
  ['active view transitions', /:active-view-transition/i]
];
for (const [name, pattern] of newlyAvailable2026) {
  if (pattern.test(css)) fail(`${name} must not be required by the production bundles`);
  else pass(`${name} is not required by the production bundles`);
}

const tokens = read('src/base/tokens.css');
if (!/--focus-ring-color:\s*rgb\(/.test(tokens) || !/--focus-ring:\s*[^;]*var\(--focus-ring-color\)/.test(tokens) || !/@supports\s*\(color:\s*color-mix/.test(tokens)) {
  fail('color-mix() focus ring must retain a static color fallback');
} else pass('color-mix() has a static focus-ring fallback');

const feedback = read('src/extended/feedback.css');
if (!/border:\s*2px solid var\(--border-strong\)/.test(feedback) || !/@supports\s*\(color:\s*color-mix/.test(feedback)) {
  fail('Spinner color-mix() enhancement must retain a static border fallback');
} else pass('Spinner color-mix() enhancement has a fallback');

const overlays = read('src/extended/overlays.css');
if (!/max-height:\s*calc\(100vh/.test(overlays) || !/@supports\s*\(height:\s*100dvh\)/.test(overlays)) {
  fail('Dynamic viewport units must retain a 100vh fallback');
} else pass('Dynamic viewport units have a 100vh fallback');
if (!/\.modal::backdrop\s*\{[^}]*background:/s.test(overlays) || !/@supports[^\{]*backdrop-filter/s.test(overlays)) {
  fail('Backdrop blur must be a progressive enhancement over a solid backdrop');
} else pass('Backdrop blur is progressive enhancement');

const pkg = JSON.parse(read('package.json'));
if (!Array.isArray(pkg.browserslist) || !pkg.browserslist.includes('extends browserslist-config-baseline')) {
  fail('package.json must target Baseline Widely Available through Browserslist');
} else pass('Browserslist targets Baseline Widely Available');

if (process.exitCode) process.exit(process.exitCode);
console.log('Lithe CSS Baseline checks passed.');
