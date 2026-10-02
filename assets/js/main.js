/* Firula Bar
   Interações da página. Tudo aqui é melhoria progressiva: sem JavaScript,
   o menu fica sempre visível e todos os links continuam funcionando. */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Menu (celular e tablet) ---------- */

  function initMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var menu = document.querySelector('[data-menu]');
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    }

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (isOpen() && !event.target.closest('[data-header]')) setOpen(false);
    });

    window.matchMedia('(min-width: 1060px)').addEventListener('change', function (event) {
      if (event.matches) setOpen(false);
    });
  }

  /* ---------- Revelação na rolagem ---------- */

  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length || reduceMotion.matches || !('IntersectionObserver' in window)) return;

    root.classList.add('motion-ok');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ---------- Cabeçalho: translúcido sobre o hero, sólido ao rolar ---------- */

  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var update = function () { header.classList.toggle('is-solid', window.scrollY > 24); };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---------- Contador da nota, sobe de 0 a 4,6 quando aparece ---------- */

  function initCounter() {
    var el = document.querySelector('[data-count]');
    if (!el || reduceMotion.matches || !('IntersectionObserver' in window)) return;
    var target = parseFloat(el.getAttribute('data-count'));
    var observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      var start = null;
      var step = function (now) {
        if (!start) start = now;
        var t = Math.min(1, (now - start) / 1200);
        el.textContent = (target * (1 - Math.pow(1 - t, 3))).toFixed(1).replace('.', ',');
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    observer.observe(el);
  }

  initMenu();
  initReveal();
  initHeader();
  initCounter();
})();
