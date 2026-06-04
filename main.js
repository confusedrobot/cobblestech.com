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