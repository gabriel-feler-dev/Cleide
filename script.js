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
  '.sobre-grid, .diff-card, .processo-step, .faq-item, .depoimento-card, .contato-grid, .section-header'
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

// ===== MODAL PRODUTO =====
const produtosData = [
  {
    nome: 'Frutas Vermelhas e Rosas',
    imagem: 'assets/images/frutas_vermelhas_e_rosas.png',
    badge: 'Mais vendido',
    resumo: 'Uma explosão sensorial de frutas vermelhas com um toque delicado de rosas. Hidratante, revigorante e perfeito para massagens relaxantes — deixa a pele suave, perfumada e revitalizada.',
    ingredientes: [
      { icone: '🍓', nome: 'Frutas Vermelhas' },
      { icone: '🌹', nome: 'Rosas Vermelhas' },
      { icone: '💝', nome: 'Corações Ocultos' }
    ],
    descricao: 'As <strong>frutas vermelhas</strong> — como morango, mirtilo e framboesa — são naturalmente ricas em vitaminas C e E e em antioxidantes que combatem os radicais livres, protegem as células da pele e estimulam a renovação celular, conferindo mais luminosidade e uniformidade ao tom da pele. As <strong>rosas vermelhas</strong>, além do perfume envolvente e romântico, possuem propriedades anti-inflamatórias e calmantes que ajudam a reduzir a vermelhidão e a irritação, sendo especialmente benéficas para peles sensíveis. Os <strong>corações ocultos</strong> no interior do sabonete liberam uma carga extra de hidratantes no momento do uso, prolongando a maciez e o frescor ao longo do dia. O conjunto é ideal para massagens, pois combina o relaxamento do aroma com o cuidado nutritivo da fórmula.'
  },
  {
    nome: 'Lavanda',
    imagem: 'assets/images/lavanda.jpeg',
    badge: null,
    resumo: 'A leveza da lavanda unida ao poder nutritivo do óleo de argan e da glicerina vegetal. Um sabonete calmante, ideal para peles secas ou sensíveis, que hidrata profundamente e deixa um perfume suave e duradouro.',
    ingredientes: [
      { icone: '🌸', nome: 'Lavanda' },
      { icone: '💧', nome: 'Glicerina Vegetal' },
      { icone: '🌰', nome: 'Óleo de Argan' }
    ],
    descricao: 'A <strong>lavanda</strong> é conhecida por suas propriedades relaxantes e calmantes: seu aroma atua diretamente sobre o sistema nervoso, reduzindo o estresse e promovendo bem-estar durante o banho. Na pele, possui ação antibacteriana e anti-inflamatória suave, auxiliando no controle de irritações e pequenas imperfeições. A <strong>glicerina vegetal</strong> é um umectante poderoso — atrai moléculas de água para as camadas superficiais da pele, mantendo-a hidratada por horas após o uso. O <strong>óleo de argan</strong>, rico em ácidos graxos essenciais (ômega 6 e 9) e vitamina E, penetra profundamente na pele, restaurando a barreira cutânea, combatendo o ressecamento e conferindo maciez, elasticidade e um aspecto saudável. A combinação dos três torna este sabonete especialmente indicado para peles secas, sensíveis ou que necessitam de cuidado extra no dia a dia.'
  },
  {
    nome: 'Maçã Verde e Maracujá',
    imagem: 'assets/images/maca_verde_e_maracuja.jpeg',
    badge: null,
    resumo: 'Frescor e nutrição em equilíbrio perfeito. A leveza da maçã verde encontra a suavidade do maracujá para oferecer hidratação profunda, renovação da pele e uma fragrância frutal revigorante.',
    ingredientes: [
      { icone: '🍏', nome: 'Maçã Verde' },
      { icone: '🌕', nome: 'Maracujá' },
      { icone: '🌱', nome: 'Sementes de Maracujá' }
    ],
    descricao: 'A <strong>maçã verde</strong> é rica em ácido málico, um alfa-hidroxiácido (AHA) de ação suave que auxilia na esfoliação química da pele — desobstruindo poros, refinando a textura e estimulando a renovação celular. Também fornece vitaminas C e B, que contribuem para o clareamento de manchas e para a proteção antioxidante. O <strong>maracujá</strong> é excepcionalmente hidratante: seu óleo é rico em ácido linoleico (ômega 6), que restaura a barreira lipídica da pele, prevenindo a perda de água e conferindo maciez imediata. As <strong>sementes secas de maracujá</strong>, presentes na formulação, realizam uma esfoliação física suave que remove as células mortas, revelando uma pele mais lisa e com maior luminosidade. O resultado é uma pele nutrida, renovada e envolta em um perfume tropical e refrescante.'
  },
  {
    nome: 'Flor de Laranjeira e Rosas',
    imagem: 'assets/images/flor_de_laranjeira_e_rosas.jpeg',
    badge: null,
    resumo: 'Uma combinação floral sofisticada com benefícios reais para a pele. A delicadeza da flor de laranjeira e o poder das rosas se unem à vitamina B para hidratar, renovar e proteger com frescor e suavidade.',
    ingredientes: [
      { icone: '🌸', nome: 'Flor de Laranjeira' },
      { icone: '🌹', nome: 'Rosas Vermelhas' },
      { icone: '✨', nome: 'Vitamina B' }
    ],
    descricao: 'A <strong>flor de laranjeira</strong> (neroli) é um ingrediente clássico da cosmética natural: possui ação calmante e levemente sedativa, reduzindo vermelhidão e irritação cutânea. Seu aroma delicado e cítrico-floral tem efeito relaxante comprovado, sendo muito valorizado em rituais de beleza e bem-estar. As <strong>rosas vermelhas</strong> contribuem com polifenóis e flavonoides de forte ação antioxidante, que protegem a pele do envelhecimento precoce causado por exposição ambiental. Também têm propriedade tonificante, auxiliando na firmeza e na uniformidade da pele. A <strong>vitamina B</strong> — em suas formas como niacinamida (B3) ou pantenol (B5) — age diretamente na hidratação profunda, fortalece a barreira cutânea, reduz poros dilatados e melhora a textura geral da pele ao longo do uso contínuo. Este sabonete é ideal para quem busca um cuidado completo com um toque floral revitalizante e sofisticado.'
  },
  {
    nome: 'Mel, Aloe Vera e Capim-Limão',
    imagem: 'assets/images/mel_aloe_vera_e%20capim_lim%C3%A3o.png',
    badge: null,
    resumo: 'Uma fusão de ingredientes da natureza que nutre, refresca e revitaliza. O dulçor do mel encontra o frescor do capim-limão e o poder calmante do aloe vera para deixar a pele profundamente hidratada, macia e com um perfume suave e acolhedor.',
    ingredientes: [
      { icone: '🍯', nome: 'Mel' },
      { icone: '🌵', nome: 'Aloe Vera' },
      { icone: '🍃', nome: 'Capim-Limão' }
    ],
    descricao: 'O <strong>mel</strong> é um dos hidratantes naturais mais completos: rico em açúcares naturais (frutose e glicose), aminoácidos e enzimas, ele atua como umectante, retendo a umidade na pele e evitando o ressecamento. Suas propriedades antibacterianas e cicatrizantes auxiliam no tratamento de pequenas irritações e deixam a pele com uma maciez incomparável. O <strong>aloe vera</strong> (babosa) é conhecido por sua ação calmante e regeneradora: seu gel é repleto de vitaminas (A, C, E e B12), minerais e polissacarídeos que hidratam as camadas mais profundas da pele, reduzem inflamações e aceleram a recuperação de peles irritadas ou ressecadas, sendo especialmente indicado para peles sensíveis. O <strong>capim-limão</strong> traz leveza e frescor à fórmula: com propriedades antibacterianas e antifúngicas naturais, purifica a pele ao mesmo tempo em que confere um perfume cítrico suave e revigorante que persiste após o banho. A união dos três ingredientes resulta em um sabonete equilibrado, capaz de hidratar com profundidade sem pesar — ideal para o uso diário de toda a família.'
  }
];

const modalOverlay  = document.getElementById('produtoModal');
const modalClose    = document.getElementById('modalClose');
const modalFecharBtn = document.getElementById('modalFecharBtn');
const modalImg      = document.getElementById('modalImg');
const modalBadge    = document.getElementById('modalBadge');
const modalNome     = document.getElementById('modalNome');
const modalResumo   = document.getElementById('modalResumo');
const modalTags     = document.getElementById('modalTags');
const modalDescricao = document.getElementById('modalDescricao');

function abrirModal(index) {
  const p = produtosData[index];
  if (!p) return;

  // Preenche conteúdo
  modalImg.src = p.imagem;
  modalImg.alt = p.nome;
  modalNome.textContent = p.nome;
  modalResumo.textContent = p.resumo;
  modalDescricao.innerHTML = p.descricao;

  // Badge
  if (p.badge) {
    modalBadge.textContent = p.badge;
    modalBadge.classList.add('visible');
  } else {
    modalBadge.textContent = '';
    modalBadge.classList.remove('visible');
  }

  // Tags de ingredientes com animação escalonada
  modalTags.innerHTML = '';
  p.ingredientes.forEach((ing, i) => {
    const tag = document.createElement('span');
    tag.className = 'modal-tag';
    tag.style.animationDelay = `${0.15 + i * 0.1}s`;
    tag.innerHTML = `<span class="modal-tag-icone" aria-hidden="true">${ing.icone}</span>${ing.nome}`;
    modalTags.appendChild(tag);
  });

  // Abre a modal
  document.body.style.overflow = 'hidden';
  modalOverlay.classList.add('active');
  modalOverlay.querySelector('.modal-container').scrollTop = 0;

  // Foca no botão fechar (acessibilidade)
  setTimeout(() => modalClose.focus(), 400);
}

function fecharModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Abrir ao clicar no card
document.querySelectorAll('.produto-card[data-produto]').forEach(card => {
  card.addEventListener('click', () => {
    abrirModal(Number(card.dataset.produto));
  });
  // Acessibilidade: abrir com Enter ou Espaço
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      abrirModal(Number(card.dataset.produto));
    }
  });
});

// Fechar
modalClose.addEventListener('click', fecharModal);
modalFecharBtn.addEventListener('click', fecharModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) fecharModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) fecharModal();
});

// ===== HINT CLIQUE NOS CARDS =====
(function () {
  const secao = document.getElementById('produtos');
  if (!secao) return;

  // Mão SVG: branca com contorno verde, semi-transparente
  const SVG_MAO = `<svg class="hint-mao" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="54" height="72" aria-hidden="true">
    <path d="M9.5 1C8.1 1 7 2.1 7 3.5v10.8C6.4 13.8 5.7 13.5 5 13.5c-1.7 0-3 1.3-3 3V21c0 5.5 4.5 10 10 10h1c5.5 0 10-4.5 10-10v-7.5c0-1.7-1.3-3-3-3-.6 0-1.1.2-1.6.5-.5-.8-1.4-1.5-2.4-1.5-.6 0-1.1.2-1.5.5-.5-.8-1.4-1.5-2.5-1.5V3.5C11 2.1 9.9 1 8.5 1h-1z"
      fill="white" stroke="#5a7247" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`;

  const hint = document.createElement('div');
  hint.className = 'hint-clique';
  hint.setAttribute('aria-hidden', 'true');
  hint.innerHTML = SVG_MAO + '<span class="hint-texto">Clique para mais detalhes</span>';
  document.body.appendChild(hint);

  const DURACAO = 3500;
  const FOLHAS  = ['🍃', '🌿', '🍂', '☘️'];

  let hintAtivo  = false;
  let pendentes  = [];
  let rafId      = null;
  let cardAlvo   = null;

  function explodir(x, y) {
    const count = 16;
    for (let i = 0; i < count; i++) {
      const leaf = document.createElement('span');
      leaf.className = 'leaf-particle';
      leaf.textContent = FOLHAS[Math.floor(Math.random() * FOLHAS.length)];
      const angle = (i / count) * 360 + Math.random() * 22 - 11;
      const dist  = 90 + Math.random() * 90;
      leaf.style.left = x + 'px';
      leaf.style.top  = y + 'px';
      leaf.style.animationDelay = (Math.random() * 60) + 'ms';
      leaf.style.setProperty('--dx', (Math.cos(angle * Math.PI / 180) * dist) + 'px');
      leaf.style.setProperty('--dy', (Math.sin(angle * Math.PI / 180) * dist) + 'px');
      leaf.style.setProperty('--rot', (Math.random() * 900 - 450) + 'deg');
      document.body.appendChild(leaf);
      leaf.addEventListener('animationend', () => leaf.remove(), { once: true });
    }
  }

  function encontrarCardAlvo() {
    const cards = Array.from(document.querySelectorAll('.produto-card'));
    let alvo = cards[0], maxVisivel = 0;
    cards.forEach(card => {
      const r = card.getBoundingClientRect();
      const visivel = Math.max(0, Math.min(r.right, window.innerWidth) - Math.max(r.left, 0));
      if (visivel > maxVisivel) { maxVisivel = visivel; alvo = card; }
    });
    return alvo;
  }

  function posicionarHint() {
    if (!cardAlvo) return;
    const r = cardAlvo.getBoundingClientRect();
    hint.style.left = (r.left + r.width  / 2) + 'px';
    hint.style.top  = (r.top  + r.height / 2) + 'px';
  }

  function iniciarRastreio() {
    if (rafId) return;
    function loop() {
      posicionarHint();
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
  }

  function pararRastreio() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  function cancelarPendentes() {
    pendentes.forEach(id => clearTimeout(id));
    pendentes = [];
  }

  function mostrarHint() {
    if (hintAtivo) return;
    cardAlvo = encontrarCardAlvo();
    if (!cardAlvo) return;
    posicionarHint();
    iniciarRastreio();
    hintAtivo = true;
    hint.classList.remove('ativo');
    void hint.offsetWidth;
    hint.classList.add('ativo');

    // Folhas sincronizadas com cada pressão da mãozinha
    // Posição calculada dinamicamente no momento de cada explosão
    [0, 0.75, 1.5].forEach(offset => {
      pendentes.push(setTimeout(() => {
        const r = hint.getBoundingClientRect();
        explodir(r.left + r.width / 2, r.top + r.height / 2);
      }, 500 + offset * 750 + 350));
    });

    pendentes.push(setTimeout(() => {
      hint.classList.remove('ativo');
      pararRastreio();
      hintAtivo = false;
    }, DURACAO));
  }

  function cancelarHint() {
    cancelarPendentes();
    pararRastreio();
    hint.classList.remove('ativo');
    hintAtivo = false;
  }

  // Toda vez que a seção entra na tela: toca uma vez. Quando sai: reseta.
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        pendentes.push(setTimeout(mostrarHint, 700));
      } else {
        cancelarHint();
      }
    });
  }, { threshold: 0.3 }).observe(secao);
})();


// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Fecha todos os outros
    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.classList.remove('open');
      }
    });

    // Abre ou fecha o clicado
    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.classList.toggle('open', !isOpen);
  });
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
