

const slides = document.querySelectorAll('.slider__slide');
let current = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('slider__slide--active'));
  slides[index].classList.add('slider__slide--active');
}

const leftBtn = document.querySelector('.slider__arrow--left');
const rightBtn = document.querySelector('.slider__arrow--right');

if (leftBtn) leftBtn.onclick = () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
};

if (rightBtn) rightBtn.onclick = () => {
  current = (current + 1) % slides.length;
  showSlide(current);
};


const header = document.querySelector('.header');
const toggle = document.querySelector('.header__toggle');
const backdrop = document.querySelector('.header__backdrop');
const navLinks = document.querySelectorAll('.header__nav a');
const nav = document.querySelector('.header__nav');
const closeBtn = document.querySelector('.header__close');

if (toggle && header) {
  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('header--open');
    toggle.setAttribute('aria-expanded', String(isOpen));

    document.body.classList.toggle('menu-open', isOpen);

    if (nav) nav.setAttribute('aria-hidden', String(!isOpen));
  });
}

if (backdrop) {
  backdrop.addEventListener('click', () => {
    header.classList.remove('header--open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (nav) nav.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('header--open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (nav) nav.setAttribute('aria-hidden', 'true');
  });
});


if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    header.classList.remove('header--open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (nav) nav.setAttribute('aria-hidden', 'true');
    if (toggle) toggle.focus();
    document.body.classList.remove('menu-open');
  });
}


if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = header.classList.contains('header--open');
    nav.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) {

      const firstLink = nav.querySelector('a');
      if (firstLink) setTimeout(() => firstLink.focus(), 120);
    }
  });
}


if (nav) {
  let startX = 0;
  let startY = 0;
  let moved = false;

  nav.addEventListener('touchstart', (e) => {
    if (!header.classList.contains('header--open')) return;
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    moved = false;
  }, {passive: true});

  nav.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;

    if (Math.abs(dx) > Math.abs(dy)) moved = true;
  }, {passive: true});

  nav.addEventListener('touchend', (e) => {
    if (!moved) return;
  
    const t = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : null;
    if (!t) return;
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;

    if (dx < -40 && Math.abs(dy) < 80) {
      header.classList.remove('header--open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      if (nav) nav.setAttribute('aria-hidden', 'true');
      if (toggle) toggle.focus();
      document.body.classList.remove('menu-open');
    }
  }, {passive: true});
}


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && header.classList.contains('header--open')) {
    header.classList.remove('header--open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
});


