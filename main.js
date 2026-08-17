// Active nav link based on scroll position
(function () {
  var sections = document.querySelectorAll('section[id]');
  var links = document.querySelectorAll('.nav-links a');

  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    var offset = 80;
    sections.forEach(function (sec) {
      var el = document.getElementById(sec.id);
      if (!el) return;
      var top = el.offsetTop - offset;
      var bot = top + el.offsetHeight;
      if (scrollY >= top && scrollY < bot) {
        links.forEach(function (l) { l.classList.remove('active'); });
        links.forEach(function (l) {
          var href = l.getAttribute('href');
          if (href === '#' + sec.id) l.classList.add('active');
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Screenshot lightbox — click a phone frame to view it full size.
(function () {
  var frames = document.querySelectorAll('.screenshot-frame');
  if (!frames.length) return;

  var lastFocused = null;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Screenshot viewer');
  box.hidden = true;

  var full = document.createElement('img');
  var close = document.createElement('button');
  close.type = 'button';
  close.className = 'lightbox-close';
  close.setAttribute('aria-label', 'Close screenshot');
  close.innerHTML = '&times;';

  box.appendChild(full);
  box.appendChild(close);
  document.body.appendChild(box);

  function open(img) {
    lastFocused = document.activeElement;
    full.src = img.currentSrc || img.src;
    full.alt = img.alt;
    box.hidden = false;
    // Next frame, so the opacity transition actually runs.
    requestAnimationFrame(function () { box.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    close.focus();
  }

  function hide() {
    if (box.hidden) return;
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    window.setTimeout(function () { box.hidden = true; }, 200);
    if (lastFocused) lastFocused.focus();
  }

  frames.forEach(function (frame) {
    frame.addEventListener('click', function () {
      var img = frame.querySelector('img');
      if (img) open(img);
    });
  });

  // Click the backdrop, the image, or the close button to dismiss.
  box.addEventListener('click', hide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') hide();
  });
})();