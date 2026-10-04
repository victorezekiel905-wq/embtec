// Embtec Konzultz: motion, navigation, hero video and the enquiry form.
(function () {
  'use strict';

  var WHATSAPP = '2348029596214';
  var doc = document.documentElement;
  var body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Start entrance animations once the first frame is painted.
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { body.classList.add('is-loaded'); });
  });

  /* ---------------- Header stays put; WhatsApp shortcut appears after scrolling ---------------- */
  var header = document.querySelector('.site-header');
  var wa = document.querySelector('.wa');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    if (wa) wa.classList.toggle('is-visible', y > 500);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.inert = !open;
    body.classList.toggle('menu-open', open);
    if (!open) onScroll();
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
    });
    window.matchMedia('(min-width: 1025px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });
  }

  /* ---------------- Hero video: right crop per screen, play/pause control ---------------- */
  var video = document.querySelector('[data-hero-video]');
  var toggle = document.querySelector('[data-video-toggle]');
  if (video) {
    var tall = window.matchMedia('(max-aspect-ratio: 4/5), (max-width: 640px)').matches;
    var src = tall ? video.getAttribute('data-tall') : video.getAttribute('data-wide');
    var poster = tall ? video.getAttribute('data-tall-poster') : video.getAttribute('data-wide-poster');
    if (poster) video.setAttribute('poster', poster);
    // Start the video only after the page has finished loading, so text and images come first.
    // On data-saver or very slow connections the poster image stays instead.
    var conn = navigator.connection || {};
    var slow = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
    var startVideo = function () {
      video.src = src;
      var play = video.play();
      if (play && play.catch) play.catch(function () { if (toggle) toggle.classList.add('is-paused'); });
    };
    if (!reduce && !slow) {
      if (document.readyState === 'complete') setTimeout(startVideo, 300);
      else window.addEventListener('load', function () { setTimeout(startVideo, 300); });
    } else if (toggle) {
      toggle.classList.add('is-paused');
    }
    if (toggle) {
      toggle.addEventListener('click', function () {
        if (!video.src) video.src = src;
        if (video.paused) {
          video.play();
          toggle.classList.remove('is-paused');
          toggle.setAttribute('aria-label', 'Pause background video');
        } else {
          video.pause();
          toggle.classList.add('is-paused');
          toggle.setAttribute('aria-label', 'Play background video');
        }
      });
    }
  }

  /* ---------------- Rotating course word ---------------- */
  document.querySelectorAll('[data-rotator]').forEach(function (rot) {
    var words = Array.prototype.slice.call(rot.children);
    if (!words.length) return;
    words[0].classList.add('is-active');
    if (reduce || words.length < 2) return;
    // Size the box to the widest word so the line never jumps.
    var i = 0;
    setTimeout(function cycle() {
      var cur = words[i];
      var next = words[(i + 1) % words.length];
      cur.classList.remove('is-active');
      cur.classList.add('is-leaving');
      next.classList.remove('is-leaving');
      next.classList.add('is-active');
      setTimeout(function () { cur.classList.remove('is-leaving'); }, 900);
      i = (i + 1) % words.length;
      setTimeout(cycle, 2600);
    }, 3000);
  });

  /* ---------------- Scroll reveals ---------------- */
  var revealables = document.querySelectorAll('[data-reveal], .steps, .underline');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------------- Count-up numbers ---------------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = (el.getAttribute('data-count').split('.')[1] || '').length;
    var start = performance.now();
    var dur = 1600;
    (function frame(now) {
      var t = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - t, 4);
      el.textContent = (target * eased).toFixed(decimals);
      if (t < 1) requestAnimationFrame(frame);
    })(start);
  }
  if ('IntersectionObserver' in window && !reduce) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCount(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------------- Gentle parallax on marked images (desktop only) ---------------- */
  var parallax = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (parallax.length && !reduce && window.matchMedia('(min-width: 1025px)').matches) {
    var pTick = false;
    var updateParallax = function () {
      var vh = window.innerHeight;
      parallax.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.08;
        var offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0) scale(1.08)';
      });
      pTick = false;
    };
    window.addEventListener('scroll', function () {
      if (!pTick) { requestAnimationFrame(updateParallax); pTick = true; }
    }, { passive: true });
    updateParallax();
  }

  /* ---------------- Course page: highlight the section in view ---------------- */
  var subLinks = document.querySelectorAll('.subnav a[href^="#"]');
  if (subLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    subLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          subLinks.forEach(function (a) { a.classList.remove('is-active'); });
          map[entry.target.id].classList.add('is-active');
          // Scroll the tab strip sideways only; never move the page.
          var link = map[entry.target.id];
          var strip = link.closest('ul');
          if (strip && strip.scrollWidth > strip.clientWidth) {
            strip.scrollTo({ left: link.offsetLeft - (strip.clientWidth - link.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
          }
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) so.observe(sec);
    });
  }

  /* ---------------- Enquiry form: compose a WhatsApp message ---------------- */
  var form = document.querySelector('[data-whatsapp-form]');
  if (form) {
    var select = form.querySelector('select[name="course"]');
    var preset = new URLSearchParams(window.location.search).get('course');
    if (preset && select) {
      Array.prototype.forEach.call(select.options, function (o) {
        if (o.getAttribute('data-slug') === preset) o.selected = true;
      });
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var get = function (k) { return String(data.get(k) || '').trim(); };
      var lines = ['Hello Embtec Konzultz,', '', 'My name is ' + get('name') + '.'];
      if (get('course')) lines.push('I am interested in: ' + get('course') + '.');
      if (get('schedule')) lines.push('Preferred class time: ' + get('schedule') + '.');
      if (get('phone')) lines.push('You can reach me on ' + get('phone') + '.');
      if (get('message')) lines.push('', get('message'));
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }

  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  doc.classList.add('js-ready');
})();
