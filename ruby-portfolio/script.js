const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const cursorGlow = document.querySelector('.cursor-glow');
const toast = document.querySelector('.toast');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, {passive:true});

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', e => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }, {passive:true});
} else {
  cursorGlow.style.display = 'none';
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('[data-project]').forEach(link => {
  link.addEventListener('click', () => {
    toast.textContent = `${link.dataset.project} selected — connect the project URL here.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
/* =========================================================
   THEME TOGGLE
   ========================================================= */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");

  if (themeIcon) {
    themeIcon.textContent = "☾";
  }

  themeToggle?.setAttribute(
    "aria-label",
    "Switch to dark theme"
  );
}

themeToggle?.addEventListener("click", () => {

  const isLight =
    document.documentElement.getAttribute("data-theme") === "light";

  if (isLight) {

    document.documentElement.removeAttribute("data-theme");

    localStorage.setItem(
      "portfolio-theme",
      "dark"
    );

    if (themeIcon) {
      themeIcon.textContent = "☀";
    }

    themeToggle.setAttribute(
      "aria-label",
      "Switch to light theme"
    );

  } else {

    document.documentElement.setAttribute(
      "data-theme",
      "light"
    );

    localStorage.setItem(
      "portfolio-theme",
      "light"
    );

    if (themeIcon) {
      themeIcon.textContent = "☾";
    }

    themeToggle.setAttribute(
      "aria-label",
      "Switch to dark theme"
    );
  }

});