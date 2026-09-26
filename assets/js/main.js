/* Embtec Konzultz — site behaviour. Plain JavaScript, no dependencies. */
(() => {
  const WHATSAPP = '2348029596214';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;

  /* ---------- Header state + floating WhatsApp button ---------- */
  const header = document.querySelector('.site-header');
  const waFloat = document.querySelector('.wa-float');
  const hero = document.querySelector('.hero, .page-hero');

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 8);
    if (waFloat) {
      const threshold = hero ? hero.offsetHeight * 0.6 : 400;
      waFloat.classList.toggle('is-visible', y > threshold);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');

  const setMenu = (open) => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.inert = !open;
    body.classList.toggle('menu-open', open);
  };

  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      setMenu(false);
      toggle?.focus();
    }
  });
  window.matchMedia('(min-width: 981px)').addEventListener('change', (e) => e.matches && setMenu(false));

  /* ---------- Reveal on scroll ---------- */
  const revealables = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Hero: type the code, render the preview ---------- */
  const code = document.querySelector('[data-typing]');
  if (code) {
    const showPreview = (key) => document.querySelector(`[data-pv="${key}"]`)?.classList.add('is-on');

    if (reduceMotion) {
      document.querySelectorAll('[data-pv]').forEach((el) => el.classList.add('is-on'));
      code.classList.add('is-ready');
    } else {
      const plan = [...code.querySelectorAll('.ln')].map((line) => {
        const walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
        const nodes = [];
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          nodes.push({ node: n, text: n.nodeValue });
          n.nodeValue = '';
        }
        return { line, nodes, show: line.dataset.show };
      });
      code.classList.add('is-ready');

      const caret = document.createElement('span');
      caret.className = 'caret';
      caret.setAttribute('aria-hidden', 'true');

      let li = 0;
      let ni = 0;
      let ci = 0;

      const tick = () => {
        const step = plan[li];
        if (!step) return;
        const current = step.nodes[ni];

        if (!current) {
          if (step.show) showPreview(step.show);
          li += 1;
          ni = 0;
          ci = 0;
          if (plan[li]) plan[li].line.appendChild(caret);
          setTimeout(tick, 90);
          return;
        }

        // Indentation appears instantly, like an editor's auto-indent.
        if (!current.text.trim()) {
          current.node.nodeValue = current.text;
          ni += 1;
          tick();
          return;
        }

        ci += 1;
        current.node.nodeValue = current.text.slice(0, ci);
        if (ci >= current.text.length) {
          ni += 1;
          ci = 0;
        }
        setTimeout(tick, 12 + Math.random() * 20);
      };

      plan[0]?.line.appendChild(caret);
      setTimeout(tick, 700);
    }
  }

  /* ---------- Contact form → WhatsApp message ---------- */
  const form = document.querySelector('[data-wa-form]');
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const preset = params.get('course');
    const select = form.querySelector('select[name="course"]');
    if (preset && select) {
      const match = [...select.options].find((o) => o.dataset.slug === preset);
      if (match) match.selected = true;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const get = (k) => String(data.get(k) || '').trim();

      const lines = ['Hello Embtec Konzultz,', '', `My name is ${get('name')}.`];
      if (get('course')) lines.push(`I am interested in: ${get('course')}.`);
      if (get('schedule')) lines.push(`Preferred class time: ${get('schedule')}.`);
      if (get('phone')) lines.push(`You can reach me on ${get('phone')}.`);
      if (get('message')) lines.push('', get('message'));

      const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
