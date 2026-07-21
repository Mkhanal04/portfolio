const fs=require('fs'), path=require('path');
let JSDOM; try { ({JSDOM}=require('jsdom')); } catch(_) { try { ({JSDOM}=require(require('child_process').execSync('npm root -g').toString().trim()+'/jsdom')); }
catch(e){ console.error('jsdom not installed.  Run:  npm install --no-save jsdom'); process.exit(2); } }
const ROOT=path.resolve(__dirname,'..');
const STORY=path.join(ROOT,'stories/jobs-report-2026-06.html');
const CORPUS_P=path.join(ROOT,'data/corpus/jobs-report-2026-06.json');
const F=STORY;
const CORPUS=JSON.parse(fs.readFileSync(CORPUS_P,'utf8'));
const html=fs.readFileSync(F,'utf8'); const errs=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,beforeParse(w){
  w.IntersectionObserver=class{constructor(cb){this.cb=cb}observe(el){this.cb([{isIntersecting:true,target:el}],this)}unobserve(){}disconnect(){}};
  w.onerror=m=>errs.push(m);}});
const {window}=dom, d=window.document; const R=[]; const ck=(id,c,det)=>R.push({id,pass:!!c,det});

ck('JS executes with zero errors', errs.length===0, errs.join('|'));
ck('no placeholder text anywhere', !/verified at content phase|date pending data pass|pair pending verification|demo placeholder/i.test(d.body.textContent));

// counts vs dots vs provenance
const bad=[];
d.querySelectorAll('.claim[data-claimtext]').forEach(cl=>{
  const txt=cl.getAttribute('data-claimtext');
  const cnt=(cl.querySelector('.count')||{}).textContent||'';
  const m=cnt.match(/^(\d+)\/6$/); if(!m) return;
  const full=cl.querySelectorAll('.claim-row .mini .dot.full').length;
  if(parseInt(m[1])!==full) bad.push(`${txt}: count ${cnt} vs ${full} full dots`);
  const src=CORPUS.claims.find(c=>c.text===txt);
  if(!src){ bad.push(`${txt}: not in corpus`); return; }
  if(src.corroboration!==cnt) bad.push(`${txt}: page ${cnt} vs corpus ${src.corroboration}`);
  const named=cl.querySelectorAll('.prov .qte b').length;
  const have=Object.keys(src.sentences).length;
  if(named!==have) bad.push(`${txt}: shows ${named} sentences, corpus holds ${have}`);
});
ck('every count matches dots, corpus and provenance', bad.length===0, bad.join(' | '));

// every displayed sentence is byte-identical to the corpus
const mismatch=[];
CORPUS.claims.forEach(c=>Object.entries(c.sentences).forEach(([o,sent])=>{
  if(!d.body.textContent.includes(sent)) mismatch.push(`${c.id}/${o}`);
}));
ck('every corpus sentence appears verbatim on the page', mismatch.length===0, mismatch.join(','));

// links
const ext=[...d.querySelectorAll('a[target="_blank"]')];
ck('outbound links all point at real sources', ext.length>0 && ext.every(a=>/^https:\/\//.test(a.href)), ext.length+' links');
ck('BLS primary source is wired', !!d.querySelector('a[href*="bls.gov"]'));
const outletUrls=CORPUS.outlets.map(o=>o.url);
ck('all six outlet articles are linked', outletUrls.every(u=>html.includes(u)));

// toggle behaviour
window.setMode('expanded');
ck('expanded opens no third-party rating panel', [...d.querySelectorAll('.ctx')].filter(x=>x.classList.contains('open')).length===0);
ck('expanded opens claim provenance', [...d.querySelectorAll('.claim[data-claimtext]')].every(x=>x.classList.contains('open')));
ck('expanded opens the glass box', d.getElementById('glassDetails').open===true);
window.setMode('staged');
ck('staged closes them again', [...d.querySelectorAll('.claim[data-claimtext]')].every(x=>!x.classList.contains('open')));

// aria-expanded now tracks clicks (walkthrough F13)
const row=d.querySelector('.claim[data-claimtext] .claim-row');
row.onclick&&row.onclick.call(row);
ck('aria-expanded updates on click', row.getAttribute('aria-expanded')==='true', row.getAttribute('aria-expanded'));
// dots have accessible names (walkthrough F2)
ck('dots have accessible names', [...d.querySelectorAll('.mini .dot')].every(x=>x.getAttribute('aria-label')));

// contest modal still binds to the dropdown, not the button
const fb=[...d.querySelectorAll('.flag-open')][0], opened=fb.getAttribute('data-claim');
fb.dispatchEvent(new window.MouseEvent('click',{bubbles:true}));
const sel=d.getElementById('claimSelect');
const other=window.CLAIMS.findIndex(c=>c.claim!==opened);
sel.value=String(other); sel.dispatchEvent(new window.Event('change',{bubbles:true}));
window.submitContest();
const marked=[...d.querySelectorAll('.contested')].map(x=>x.closest('[data-claimtext]').getAttribute('data-claimtext'));
ck('contest marks the SELECTED claim', marked.length===1&&marked[0]===window.CLAIMS[other].claim, marked.join(','));
ck('dropdown exposes all 10 claims', sel.options.length===10, sel.options.length+' options');
{ // em dashes are allowed only inside verbatim source quotes
  const quoted=new Set(); CORPUS.claims.forEach(c=>Object.values(c.sentences).forEach(x=>{if(x.includes('\u2014'))quoted.add(x)}));
  let ui=d.body.textContent; quoted.forEach(q=>{ui=ui.split(q).join('')});
  ck('no em dashes in interface copy (quotes exempt)', !ui.includes('\u2014'));
}

let f=0; R.forEach(r=>{if(!r.pass)f++;console.log(`${r.pass?'PASS':'FAIL'}  ${r.id}${r.det?'  ['+r.det+']':''}`)});
console.log(`\n${R.length-f}/${R.length} passed.`); process.exit(f?1:0);
