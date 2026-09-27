// Embtec Konzultz: header, mobile menu, WhatsApp shortcut and the enquiry form.
(function () {
  var WHATSAPP = '2348029596214';
  var body = document.body;

  // Header rule + WhatsApp shortcut appear once the page has scrolled.
  var header = document.querySelector('.site-header');
  var wa = document.querySelector('.wa');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 4);
    if (wa) wa.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var button = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    if (!button || !menu) return;
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close' : 'Menu';
    menu.inert = !open;
    body.classList.toggle('menu-open', open);
  }
  if (button && menu) {
    button.addEventListener('click', function () {
      setMenu(button.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('menu-open')) {
        setMenu(false);
        button.focus();
      }
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  // Enquiry form: compose a WhatsApp message instead of posting anywhere.
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
      function get(k) { return String(data.get(k) || '').trim(); }

      var lines = ['Hello Embtec Konzultz,', '', 'My name is ' + get('name') + '.'];
      if (get('course')) lines.push('I am interested in: ' + get('course') + '.');
      if (get('schedule')) lines.push('Preferred class time: ' + get('schedule') + '.');
      if (get('phone')) lines.push('You can reach me on ' + get('phone') + '.');
      if (get('message')) lines.push('', get('message'));

      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
