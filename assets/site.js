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

// Muted preview loops (Lab site pilots): play only while on screen, never under reduced motion.
(function () {
  var vids = document.querySelectorAll('video[data-loop]');
  if (!vids.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else v.pause();
    });
  }, { threshold: 0.25 });
  vids.forEach(function (v) { io.observe(v); });
})();
