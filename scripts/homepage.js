/* ============================================================
   HOMEPAGE — Featured Tours & Interactions
   ============================================================ */

// Non-translated data (images, ratings, original prices) keyed by tour id
const featuredToursBase = {
  1: { image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", rating: 4.3, originalPrice: 110, price: 89 },
  2: { image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", rating: 4.7, originalPrice: 85,  price: 65 },
  3: { image: "https://images.unsplash.com/photo-1498623116890-37e912163d5d?w=600&q=80", rating: 4.8, originalPrice: 70,  price: 50 }
};

function renderFeaturedTours() {
  const container = document.getElementById('featuredTours');
  if (!container) return;

  const tours = translations[i18n.currentLang].featuredTours;
  const from    = i18n.t('featured.from');
  const details = i18n.t('featured.details');

  container.innerHTML = tours.map(tour => {
    const base = featuredToursBase[tour.id];
    return `
      <article class="tour-card">
        <div class="tour-card-image">
          <img src="${base.image}" alt="${tour.name}" loading="lazy">
          ${tour.badge ? `<span class="tour-badge tour-badge--orange">${tour.badge}</span>` : ''}
        </div>
        <div class="tour-card-body">
          <div class="tour-card-header">
            <h3 class="tour-card-title">${tour.name}</h3>
            <span class="tour-rating">⭐ ${base.rating}</span>
          </div>
          <p class="tour-card-desc">${tour.description}</p>
          <div class="tour-card-meta">
            <span>⏱ ${tour.duration}</span>
            <span>👥 ${tour.meta}</span>
          </div>
          <div class="tour-card-footer">
            <div class="tour-price">
              <s>$${base.originalPrice}</s>
              <strong>${from} $${base.price}</strong>
            </div>
            <a href="tours.html" class="btn btn-ghost btn-sm">${details}</a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Re-render when language changes
document.addEventListener('langChanged', renderFeaturedTours);

// —— Hero search form ——
const heroSearch = document.getElementById('heroSearch');
if (heroSearch) {
  heroSearch.addEventListener('submit', e => {
    e.preventDefault();
    const search = document.getElementById('searchInput')?.value ?? '';
    const date   = document.getElementById('dateInput')?.value ?? '';
    const guests = document.getElementById('guestsInput')?.value ?? '';
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (date)   params.set('date', date);
    if (guests) params.set('guests', guests);
    window.location.href = `tours.html${params.toString() ? '?' + params.toString() : ''}`;
  });
}

// —— Newsletter form ——
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('emailInput');
    if (!emailInput?.value) return;
    newsletterForm.innerHTML = `<p class="newsletter-success">${i18n.t('cta.successMsg')}</p>`;
  });
}

renderFeaturedTours();
