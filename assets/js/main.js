// =========================================
// SIDDHARTH NISHTALA — SITE JS
// =========================================

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close on nav link click (mobile)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ---- Blog filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const postCards = document.querySelectorAll('.post-card');
const emptyState = document.getElementById('emptyState');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    let visible = 0;
    postCards.forEach(card => {
      const tags = card.dataset.tags || '';
      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (emptyState) {
      emptyState.style.display = visible === 0 ? 'block' : 'none';
    }
  });
});

// ---- Subtle scroll-reveal for cards ----
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.about-card, .pub-card, .post-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
    observer.observe(el);
  });
}

// ---- Konami code easter egg ----
const konamiCode = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
  if (e.keyCode === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      konamiIndex = 0;
      showEasterEgg();
    }
  } else {
    konamiIndex = 0;
  }
});

function showEasterEgg() {
  const el = document.createElement('div');
  el.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
    background: #141820; border: 1px solid #7eb8f7;
    border-radius: 8px; padding: 1rem 1.5rem;
    font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;
    color: #7ef7b8; max-width: 280px;
    animation: fadeUp 0.4s ease both;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  `;
  el.innerHTML = `
    <div style="color:#7eb8f7; margin-bottom:0.5rem;">// you found it</div>
    <div>↑↑↓↓←→←→BA — the classics never die.</div>
    <div style="color:#6b7385; margin-top:0.5rem; font-size:0.7rem;">press any key to dismiss</div>
  `;
  document.body.appendChild(el);
  const dismiss = () => { el.remove(); document.removeEventListener('keydown', dismiss); };
  setTimeout(() => document.addEventListener('keydown', dismiss), 500);
  setTimeout(() => el.remove(), 6000);
}
