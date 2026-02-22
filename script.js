// ===== Header scroll effect =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Fechar menu ao clicar em um link
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !menuToggle.contains(e.target)) {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
  }
});

// ===== Scroll animations (fade-in) =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Aplicar fade-in nos elementos
document.querySelectorAll(
  '.sobre-grid, .diff-card, .produto-card, .processo-step, .depoimento-card, .contato-grid, .section-header'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== Form handling =====
const form = document.getElementById('contatoForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = form.querySelector('#nome').value.trim();
  const mensagem = form.querySelector('#mensagem').value.trim();

  const texto = `Olá, meu nome é ${nome}.\n\n${mensagem}`;
  const url = `https://wa.me/5541995989755?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');

  const wrapper = form.closest('.contato-form-wrapper');
  wrapper.innerHTML = `
    <div class="form-success">
      <div class="success-icon">&#10004;&#65039;</div>
      <h3>Mensagem enviada!</h3>
      <p>Obrigada pelo contato. Responderei o mais breve possível!</p>
    </div>
  `;
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});
