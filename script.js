const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function setMenuOpen(open) {
  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => {
  setMenuOpen(!mobileMenu.classList.contains('open'));
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => setMenuOpen(false));
});

/* ── HERO CAROUSEL ── */
(function () {
  const carousel = document.getElementById('heroCarousel');
  const dotsWrap = document.getElementById('heroDots');
  if (!carousel || !dotsWrap) return;

  const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
  if (slides.length === 0) return;

  let current = slides.findIndex(s => s.classList.contains('is-active'));
  if (current < 0) { current = 0; slides[0].classList.add('is-active'); }

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === current) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.querySelectorAll('button'));

  const INTERVAL = 5500;
  let timer = null;

  function goTo(index, userTriggered) {
    if (index === current) return;
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    if (userTriggered) restart();
  }

  function next() { goTo(current + 1); }

  function start() { timer = setInterval(next, INTERVAL); }
  function stop()  { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) start();

  carousel.parentElement.addEventListener('mouseenter', stop);
  carousel.parentElement.addEventListener('mouseleave', () => { if (!reduceMotion) start(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (!reduceMotion) start();
  });
})();

document.getElementById('joinForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input[name="name"]');
  const name = input.value.trim();
  if (name) {
    input.value = '';
    alert('ଜୟ ହିନ୍ଦ! 🙏\nWelcome to Lulu Sena, ' + name + '!');
  }
});
