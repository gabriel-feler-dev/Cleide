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
  '.sobre-grid, .diff-card, .processo-step, .depoimento-card, .contato-grid, .section-header'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Produtos: observar o wrapper — quando visível, todos os cards aparecem de uma vez
const produtosWrapper = document.querySelector('.produtos-carousel-wrapper');
if (produtosWrapper) {
  const produtoCards = produtosWrapper.querySelectorAll('.produto-card');
  produtoCards.forEach(el => el.classList.add('fade-in'));
  const produtosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        produtoCards.forEach(el => el.classList.add('visible'));
        produtosObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  produtosObserver.observe(produtosWrapper);
}

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

// ===== Produtos carousel / list toggle (mobile) =====
const produtosGrid = document.querySelector('.produtos-grid');
const viewBtns = document.querySelectorAll('.view-btn');
const carouselWrapper = document.querySelector('.produtos-carousel-wrapper');

function isMobile() {
  return window.innerWidth <= 768;
}

function createIndicators() {
  const existing = carouselWrapper.querySelector('.carousel-indicators');
  if (existing) existing.remove();

  if (!produtosGrid.classList.contains('carousel-mode')) return;

  const cards = produtosGrid.querySelectorAll('.produto-card');
  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Produto ${i + 1}`);
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
    indicators.appendChild(dot);
  });

  carouselWrapper.appendChild(indicators);
}

function updateIndicators() {
  const dots = carouselWrapper.querySelectorAll('.carousel-dot');
  if (!dots.length) return;

  const cards = produtosGrid.querySelectorAll('.produto-card');
  const gridRect = produtosGrid.getBoundingClientRect();
  const center = gridRect.left + gridRect.width / 2;

  let closestIndex = 0;
  let closestDist = Infinity;

  cards.forEach((card, i) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const dist = Math.abs(cardCenter - center);
    if (dist < closestDist) {
      closestDist = dist;
      closestIndex = i;
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === closestIndex);
  });
}

function setView(mode) {
  if (mode === 'carousel' && isMobile()) {
    produtosGrid.classList.add('carousel-mode');
    produtosGrid.classList.remove('list-mode');
    createIndicators();
  } else {
    produtosGrid.classList.remove('carousel-mode');
    produtosGrid.classList.add('list-mode');
    const indicators = carouselWrapper.querySelector('.carousel-indicators');
    if (indicators) indicators.remove();
  }
}

viewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    viewBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setView(btn.dataset.view);
  });
});

produtosGrid.addEventListener('scroll', updateIndicators);

// Initialize on load and resize
function initProdutosView() {
  const activeBtn = document.querySelector('.view-btn.active');
  if (isMobile()) {
    setView(activeBtn ? activeBtn.dataset.view : 'carousel');
  } else {
    produtosGrid.classList.remove('carousel-mode', 'list-mode');
    const indicators = carouselWrapper.querySelector('.carousel-indicators');
    if (indicators) indicators.remove();
  }
}

initProdutosView();
window.addEventListener('resize', initProdutosView);

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
