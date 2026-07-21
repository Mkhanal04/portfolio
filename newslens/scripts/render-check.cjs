// Smoke test for the NewsLens design mock.
//
// Not a rendering test — a shipping test. It confirms the bundle that
// arrives at /newslens/ has the pieces it needs to render in a browser
// (React CDN scripts, support.js runtime, the x-dc template, the
// data-dc-script, and the "illustrative sample data" disclaimer that
// keeps the page honest about being a mock, per newslens/CLAUDE.md
// Rule 1). Actually running the design end-to-end requires a real
// browser with React + a live DOM; that's the manual spot-check step
// before pushing.
//
// Run: node newslens/scripts/render-check.cjs

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'index.html');
const SUPPORT = path.join(ROOT, 'support.js');

const checks = [];
const check = (id, pass, detail) => checks.push({ id, pass: !!pass, detail: detail || '' });

check('newslens/index.html exists', fs.existsSync(INDEX));
check('newslens/support.js exists', fs.existsSync(SUPPORT));

if (!fs.existsSync(INDEX) || !fs.existsSync(SUPPORT)) {
  report();
  process.exit(1);
}

const html = fs.readFileSync(INDEX, 'utf8');
const supportSize = fs.statSync(SUPPORT).size;

check('support.js is non-empty', supportSize > 1000, `${supportSize} bytes`);
check('index.html contains <x-dc> template', /<x-dc[\s>]/.test(html));
check('index.html contains </x-dc> close', html.includes('</x-dc>'));
check('index.html wires ./support.js runtime', html.includes('src="./support.js"'));
check('index.html loads React from CDN before support.js', (() => {
  const react = html.indexOf('react.production.min.js');
  const support = html.indexOf('src="./support.js"');
  return react > 0 && support > 0 && react < support;
})());
check('index.html loads ReactDOM from CDN before support.js', (() => {
  const rd = html.indexOf('react-dom.production.min.js');
  const support = html.indexOf('src="./support.js"');
  return rd > 0 && support > 0 && rd < support;
})());
check('index.html contains data-dc-script block', html.includes('data-dc-script'));
check('page states "illustrative sample data" (Rule 1 disclaimer)', html.includes('illustrative sample data'));

report();
process.exit(checks.some(c => !c.pass) ? 1 : 0);

function report() {
  let fails = 0;
  for (const c of checks) {
    if (!c.pass) fails++;
    console.log(`${c.pass ? 'PASS' : 'FAIL'}  ${c.id}${c.detail ? '  [' + c.detail + ']' : ''}`);
  }
  console.log(`\n${checks.length - fails}/${checks.length} passed.`);
}
