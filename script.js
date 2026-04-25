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

document.getElementById('joinForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = e.target.querySelector('input[name="name"]');
  const name = input.value.trim();
  if (name) {
    input.value = '';
    alert('ଜୟ ହିନ୍ଦ! 🙏\nWelcome to Lulu Sena, ' + name + '!');
  }
});
