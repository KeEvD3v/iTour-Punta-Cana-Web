/* ============================================================
   HOMEPAGE — Featured Tours & Interactions
   ============================================================ */

const featuredTours = [
  {
    id: 1,
    name: "Saona Island Paradise",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    rating: 4.3,
    duration: "8 horas",
    groupSize: "Hasta 15",
    originalPrice: 110,
    price: 89,
    badge: "Bestseller",
    description: "Excursión de día completo a la isla más bella del Caribe con almuerzo incluido."
  },
  {
    id: 2,
    name: "Jungle Buggy Adventure",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    rating: 4.7,
    duration: "4 horas",
    groupSize: "Principiante",
    originalPrice: 85,
    price: 65,
    badge: null,
    description: "Experimenta la emoción de conducir off-road por aldeas locales y senderos fangosos."
  },
  {
    id: 3,
    name: "Snorkeling Reef Tour",
    image: "https://images.unsplash.com/photo-1498623116890-37e912163d5d?w=600&q=80",
    rating: 4.8,
    duration: "3 horas",
    groupSize: "Equipo incl.",
    originalPrice: 70,
    price: 50,
    badge: null,
    description: "Sumérgete en las cristalinas aguas del Atlántico y descubre vibrantes arrecifes de coral."
  }
];

function renderFeaturedTours() {
  const container = document.getElementById('featuredTours');
  if (!container) return;

  container.innerHTML = featuredTours.map(tour => `
    <article class="tour-card">
      <div class="tour-card-image">
        <img src="${tour.image}" alt="${tour.name}" loading="lazy">
        ${tour.badge ? `<span class="tour-badge tour-badge--orange">${tour.badge}</span>` : ''}
      </div>
      <div class="tour-card-body">
        <div class="tour-card-header">
          <h3 class="tour-card-title">${tour.name}</h3>
          <span class="tour-rating">⭐ ${tour.rating}</span>
        </div>
        <p class="tour-card-desc">${tour.description}</p>
        <div class="tour-card-meta">
          <span>⏱ ${tour.duration}</span>
          <span>👥 ${tour.groupSize}</span>
        </div>
        <div class="tour-card-footer">
          <div class="tour-price">
            <s>$${tour.originalPrice}</s>
            <strong>Desde $${tour.price}</strong>
          </div>
          <a href="tours.html" class="btn btn-ghost btn-sm">Detalles</a>
        </div>
      </div>
    </article>
  `).join('');
}

// —— Hero search form ——
const heroSearch = document.getElementById('heroSearch');
if (heroSearch) {
  heroSearch.addEventListener('submit', e => {
    e.preventDefault();
    const search = document.getElementById('searchInput')?.value ?? '';
    const date = document.getElementById('dateInput')?.value ?? '';
    const guests = document.getElementById('guestsInput')?.value ?? '';
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (date) params.set('date', date);
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
    newsletterForm.innerHTML = `
      <p class="newsletter-success">🎉 ¡Ya eres parte de la aventura! Revisa tu bandeja de entrada.</p>
    `;
  });
}

renderFeaturedTours();
