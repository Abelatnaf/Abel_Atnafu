(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ---------- Mobile nav ---------- */
  var menuOpen = document.getElementById('menuOpen');
  var menuClose = document.getElementById('menuClose');
  var mobileNav = document.getElementById('mobileNav');

  function openMenu() {
    mobileNav.classList.add('is-open');
    menuOpen.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileNav.classList.remove('is-open');
    menuOpen.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (menuOpen && mobileNav) {
    menuOpen.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- Scroll progress + header state ---------- */
  var progress = document.getElementById('scrollProgress');
  var header = document.getElementById('siteHeader');
  var ticking = false;

  function onScroll() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var height = doc.scrollHeight - doc.clientHeight;
    var pct = height > 0 ? (scrollTop / height) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (header) header.classList.toggle('is-scrolled', scrollTop > 8);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Scroll-spy nav ---------- */
  var sections = document.querySelectorAll('main [id]');
  var navLinks = document.querySelectorAll('.main-nav a');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var reveal = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { reveal.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      var label = copyBtn.querySelector('[data-label]');
      var reset = function () {
        copyBtn.removeAttribute('data-copied');
        if (label) label.textContent = 'Copy email';
      };
      var succeed = function () {
        copyBtn.setAttribute('data-copied', 'true');
        if (label) label.textContent = 'Copied!';
        window.setTimeout(reset, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(succeed).catch(function () {
          fallbackCopy(email, succeed);
        });
      } else {
        fallbackCopy(email, succeed);
      }
    });
  }

  /* ---------- Print résumé ---------- */
  var printBtn = document.getElementById('printResume');
  if (printBtn) {
    printBtn.addEventListener('click', function () { window.print(); });
  }

  function fallbackCopy(text, onDone) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); onDone(); } catch (e) {}
    document.body.removeChild(ta);
  }
})();
