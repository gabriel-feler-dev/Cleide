# Carinho Natural | Sabonetes Artesanais

## Visão Geral

Site institucional e catálogo online para **Cleide**, artesã de sabonetes naturais, sob a marca **Carinho Natural**. Desenvolvido como uma **Single-Page Application (SPA)** com HTML5, CSS puro e JavaScript vanilla — sem frameworks, pronto para hospedar como arquivo estático.

O site apresenta a história da marca, o catálogo de produtos com detalhamento de ingredientes, o processo artesanal de fabricação, depoimentos de clientes e canal de contato direto via WhatsApp.

---

## Objetivo

Criar uma presença digital elegante e artesanal que transmita os valores da marca (naturalidade, cuidado, sustentabilidade) e converta visitantes em clientes, facilitando encomendas pelo WhatsApp.

---

## Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica da página |
| **CSS puro** (`style.css`) | Todo o design, animações e responsividade (~1.800 linhas) |
| **JavaScript Vanilla** (`script.js`) | Toda interatividade (~480 linhas, sem frameworks) |
| **Google Fonts** | Playfair Display, Lora, Dancing Script |
| **IntersectionObserver API** | Animações de scroll (fade-in) |
| **WhatsApp API** (`wa.me`) | Integração de contato e pedidos |

---

## Estrutura de Arquivos

```
Cleide/
├── index.html                          # Estrutura HTML da SPA
├── style.css                           # Estilos, animações e responsividade
├── script.js                           # Toda a lógica interativa
└── assets/
    ├── images/                         # Fotos dos produtos e logo
    │   ├── carinhonaturallogo.jpg
    │   ├── frutas_vermelhas_e_rosas.png
    │   ├── lavanda.jpeg
    │   ├── maca_verde_e_maracuja.jpeg
    │   ├── flor_de_laranjeira_e_rosas.jpeg
    │   ├── mel_aloe_vera_e capim_limão.png
    │   └── frame.png
    └── descriptions/
        └── soap_descriptions.md        # Referência de conteúdo dos produtos
```

---

## Seções da Página

### 1. Header / Navegação
Header fixo com dois estados visuais:
- **Topo da página**: fundo transparente, links e logo em branco
- **Após 60px de scroll**: fundo creme semitransparente (`rgba(250,246,241,0.96)`) com `backdrop-filter: blur(10px)` e sombra suave

Contém logo com ícone folha + "Carinho Natural / Sabonetes Artesanais" e links de navegação. No mobile, o hamburger se transforma em X com animação CSS e abre um painel lateral (280px, desliza da direita). Fecha ao clicar em um link ou fora do menu.

### 2. Hero
Seção de tela cheia com fundo verde escuro (`#2d3a28` → `#4a6340`) e três efeitos sobrepostos:
- **Padrão de folhas em CSS** (SVG inline em background-image) com animação `leafDrift` (deriva contínua a cada 40s)
- **5 folhas SVG flutuantes** (`.leaf-1` a `.leaf-5`) que caem da parte superior com durações e delays diferentes (18s a 25s)
- **Overlay de gradiente** em tons de verde escuro

Conteúdo: tag *"100% Natural • Feito à mão"* em Dancing Script, título principal **"Natureza em *suas mãos*"** (itálico dourado em Dancing Script), descrição e botão CTA "Conheça nossos produtos". Indicador de scroll animado (bouncing arrow) na base.

### 3. Sobre
Grade de 2 colunas (foto à esquerda, texto à direita). Apresenta a história de Cleide — receitas herdadas da mãe, paixão por plantas medicinais, ingredientes naturais sem químicos agressivos.

Três indicadores numéricos com destaque verde:
- **+500** Clientes satisfeitos
- **+2.000** Sabonetes produzidos
- **100%** Natural

### 4. Diferenciais
4 cards em grid horizontal com ícones emoji e descrição:
- 🌿 **Ingredientes Naturais** — óleos essenciais, manteigas vegetais, ervas e argilas
- ♥ **Feito à Mão** — cada peça única, atenção aos detalhes
- 🌱 **Sustentável** — embalagens eco-friendly
- 💚 **Pele Sensível** — sem químicos agressivos, para todos os tipos de pele

### 5. Produtos
Catálogo com **5 sabonetes artesanais**, cada um com foto, nome, descrição resumida e badge (quando aplicável). Ao clicar, abre um modal detalhado.

| Produto | Badge | Ingredientes Principais |
|---|---|---|
| Frutas Vermelhas e Rosas | Mais vendido | Frutas Vermelhas, Rosas Vermelhas, Corações Ocultos |
| Lavanda | — | Lavanda, Glicerina Vegetal, Óleo de Argan |
| Maçã Verde e Maracujá | — | Maçã Verde, Maracujá, Sementes de Maracujá |
| Flor de Laranjeira e Rosas | — | Flor de Laranjeira (Neroli), Rosas Vermelhas, Vitamina B |
| Mel, Aloe Vera e Capim-Limão | — | Mel, Aloe Vera, Capim-Limão |

**Layout no desktop**: grade flexível de 3 colunas.
**Layout no mobile**: modo carrossel (padrão, com scroll-snap) ou lista (alternável por botões toggle). Dots indicadores com animação: o dot ativo se expande para uma pílula (`width: 24px`).

### 6. Nosso Processo
4 etapas numeradas em grid horizontal:
1. **Seleção** — ingredientes naturais, fornecedores locais
2. **Preparação** — receitas testadas e aprimoradas
3. **Produção** — moldagem à mão
4. **Cura** — repouso de semanas até o ponto ideal

### 7. Depoimentos
3 cards com avaliação ★★★★★, texto em itálico e avatar com inicial:
- **Maria Fernanda** — cliente há 1 ano, favorito: Lavanda
- **Renata Oliveira** — comprou para presentear a mãe
- **Ana Paula** — pele sensível, usa o sabonete de calêndula

### 8. Contato
Grade de 2 colunas:
- **Coluna info**: texto de boas-vindas, WhatsApp (+55 41 99598-9755), localização (Curitiba, PR), ícones de Instagram e Facebook
- **Coluna formulário**: campos Nome e Mensagem → ao submeter, abre WhatsApp com a mensagem pré-formatada (`Olá, meu nome é X. [mensagem]`) e substitui o formulário por uma tela de sucesso ("Mensagem enviada!")

### 9. CTA WhatsApp
Banner de largura total em verde (`#5a7247`) com chamada para encomendas personalizadas e botão branco "Chamar no WhatsApp".

### 10. Footer
Centralizado: logo da marca, copyright 2026, links rápidos para todas as seções.

### Botão Flutuante WhatsApp
Círculo verde (`#25d366`) fixo no canto inferior direito, com sombra colorida e efeito `scale(1.1)` no hover.

---

## Modal de Produto

O modal é o elemento mais elaborado do projeto. Abre com uma animação **spring** (`cubic-bezier(0.34, 1.46, 0.64, 1)`) que faz o container entrar de baixo com leve sobressalto.

**No mobile**, o modal se comporta como um **bottom sheet**: desliza de baixo para cima e ocupa até 94% da altura da tela com bordas arredondadas apenas no topo.

**Conteúdo interno:**
- Foto do produto com **zoom lento** (scale 1→1.06 em 8s) e gradiente de fade para o conteúdo
- Badge "Mais vendido" com animação `badgePop` (spring de entrada)
- 3 folhas SVG flutuantes decorativas na imagem (`modalLeafFloat`)
- Ícone folha giratório como separador decorativo (`spinSlow`, 12s)
- Nome do produto em Playfair Display
- Bloco de resumo em itálico com borda esquerda verde
- Tags de ingredientes com emoji, animadas com entrada escalonada (`tagEntrada`, delays de 0.15s, 0.25s, 0.35s)
- Separador "Como age na sua pele" em Dancing Script
- Descrição técnica detalhada com ingredientes em `<strong>`
- Botões: **"Quero esse sabonete!"** (abre WhatsApp) e **"Fechar"**

**Fechamento**: clique no overlay, botão X, botão Fechar ou tecla ESC.
**Acessibilidade**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, foco automático no botão X ao abrir, suporte a Enter/Espaço nos cards.

---

## Hint de Clique (Animação de Engajamento)

Quando a seção de produtos entra na viewport (threshold 30%), o sistema exibe automaticamente um hint visual centralizado sobre o card mais visível:

- Ícone de mão (SVG branco com contorno verde)
- Label "Clique para mais detalhes"
- Animação de **3 pressões** do dedo (`mao-click`: escala 1 → 0.75 + deslocamento)
- A cada pressão: **explosão de 16 partículas folha** (🍃🌿🍂☘️) disparadas em ângulos aleatórios com rotação e distância variáveis (`leaf-fly`, 1.3s)
- O hint segue o card via `requestAnimationFrame` (rastreamento contínuo)
- Desaparece após 3.5 segundos

---

## Funcionalidades Técnicas

### Animações de Scroll
`IntersectionObserver` com threshold 0.15 e rootMargin `-40px`. Ao entrar na viewport, elementos recebem a classe `.visible` que dispara a transição `opacity 0 → 1` e `translateY(30px) → 0` (0.6s ease). Os cards de produtos são observados em bloco — todos aparecem juntos quando o wrapper entra na tela.

### Menu Mobile
Toggle de classe `.active` no nav e no botão. O botão hamburger transforma as 3 barras em X via CSS puro (rotate 45°, opacity 0 na barra do meio). Fecha ao clicar em link ou fora do menu.

### Carrossel Mobile
`scroll-snap-type: x mandatory` com cards em `flex: 0 0 68vw`. Indicadores (dots) atualizam via `scroll` event + `getBoundingClientRect` para encontrar o card mais centralizado. Clique no dot faz `scrollIntoView({ inline: 'center' })`.

### Formulário de Contato
Sem backend. Ao submeter, monta a string `https://wa.me/5541995989755?text=...` com nome e mensagem codificados e abre em nova aba. O wrapper do formulário é substituído por HTML de sucesso.

---

## Design System

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#faf6f1` | Fundo principal (creme quente) |
| `--color-bg-alt` | `#f3ebe0` | Fundo alternado de seções |
| `--color-bg-dark` | `#3b2f2f` | Footer |
| `--color-cream` | `#fff8ef` | Cards e formulários |
| `--color-text` | `#4a3728` | Texto principal (marrom escuro) |
| `--color-text-light` | `#7a6555` | Texto secundário |
| `--color-accent` | `#8b6f47` | Botões e destaques |
| `--color-accent-light` | `#c4a97d` | Títulos hero, depoimentos |
| `--color-green` | `#5a7247` | Verde natural (ícones, badge, CTAs) |
| `--color-border` | `#d9c9b5` | Bordas e divisores |
| **Playfair Display** | serif 400/700/italic | Títulos (`h1`, `h2`, `h3`) |
| **Lora** | serif 400/600 | Corpo de texto |
| **Dancing Script** | cursive 400/700 | Tags, subtítulos, subtextos |
| `--radius` | `12px` | Border radius principal |
| WhatsApp float | `#25d366` | Botão flutuante WhatsApp |

---

## Contato da Proprietária

- **WhatsApp**: +55 (41) 99598-9755
- **Localização**: Curitiba, PR — Brasil
- **Instagram/Facebook**: configurados no HTML (links `#` — a preencher)
