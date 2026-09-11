(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var mode = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function apply(m) { root.setAttribute('data-theme', m); if (btn) { btn.textContent = m === 'dark' ? 'Light' : 'Dark'; btn.setAttribute('aria-pressed', m === 'dark' ? 'true' : 'false'); } }
  apply(mode);
  if (btn) btn.addEventListener('click', function () { mode = mode === 'dark' ? 'light' : 'dark'; apply(mode); try { localStorage.setItem('theme', mode); } catch (e) {} });
})();
