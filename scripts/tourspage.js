/* ============================================================
   TOURS PAGE — Filters, Rendering, Modal, Pagination
   ============================================================ */

// Structural data: filter keys, prices, ratings, images, highlights (stays language-agnostic)
const allTours = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    price: 89,
    duration: "4 Hours",
    durationCategory: "half-day",
    category: "water-sports",
    badge: "bestseller",
    badgeColor: "orange",
    rating: 4.8,
    highlights: ["Open bar", "Lunch buffet", "Snorkeling gear", "Hotel pickup"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    price: 125,
    duration: "6 Hours",
    durationCategory: "full-day",
    category: "nature-wildlife",
    badge: "limited",
    badgeColor: "red",
    rating: 4.7,
    highlights: ["Professional guide", "Lunch at local ranch", "Cenote swim", "GoPro rental available"]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80",
    price: 210,
    duration: "Full Day",
    durationCategory: "full-day",
    category: "private-charters",
    badge: null,
    badgeColor: null,
    rating: 4.9,
    highlights: ["Private crew", "Custom itinerary", "Gourmet lunch", "Fishing gear optional"]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1498623116890-37e912163d5d?w=600&q=80",
    price: 65,
    duration: "2 Hours",
    durationCategory: "half-day",
    category: "water-sports",
    badge: null,
    badgeColor: null,
    rating: 4.6,
    highlights: ["Snorkeling gear", "Underwater guide", "Photos included", "All skill levels"]
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&q=80",
    price: 75,
    duration: "3 Hours",
    durationCategory: "half-day",
    category: "nature-wildlife",
    badge: null,
    badgeColor: null,
    rating: 4.5,
    highlights: ["Expert guide", "Swimming included", "Rope descent", "Nature walk"]
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&q=80",
    price: 95,
    duration: "3 Hours",
    durationCategory: "night-tour",
    category: "water-sports",
    badge: null,
    badgeColor: null,
    rating: 4.8,
    highlights: ["Open bar", "Live music", "Sunset views", "Snacks included"]
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1601933975851-3d7e52ac2e42?w=600&q=80",
    price: 110,
    duration: "5 Hours",
    durationCategory: "full-day",
    category: "nature-wildlife",
    badge: null,
    badgeColor: null,
    rating: 4.4,
    highlights: ["Safety briefing", "Helmet & gear", "Beach stop", "Local village visit"]
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1513735492246-483525079686?w=600&q=80",
    price: 85,
    duration: "Full Day",
    durationCategory: "full-day",
    category: "cultural-tours",
    badge: null,
    badgeColor: null,
    rating: 4.6,
    highlights: ["Colonial Zone tour", "Local lunch", "Museum entry", "Guided walking tour"]
  }
];

// Merge structural data with current-language display text
function getToursInCurrentLang() {
  const i18nData = translations[i18n.currentLang].toursData;
  return allTours.map(tour => {
    const translated = i18nData.find(t => t.id === tour.id) || {};
    return { ...tour, name: translated.name || '', description: translated.description || '', highlight: translated.highlight || '' };
  });
}

/* ============================================================
   FILTER STATE
   ============================================================ */
const filterState = {
  categories:   [],
  maxPrice:     250,
  durations:    [],
  sortBy:       'popular',
  searchQuery:  '',
  currentPage:  1,
  toursPerPage: 6
};

/* ============================================================
   FILTERING & SORTING
   ============================================================ */
function applyFilters() {
  const tours = getToursInCurrentLang();
  let filtered = tours.filter(tour => {
    const categoryMatch = filterState.categories.length === 0 || filterState.categories.includes(tour.category);
    const priceMatch    = tour.price <= filterState.maxPrice;
    const durationMatch = filterState.durations.length === 0 || filterState.durations.includes(tour.durationCategory);
    const searchMatch   = !filterState.searchQuery ||
      tour.name.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(filterState.searchQuery.toLowerCase());
    return categoryMatch && priceMatch && durationMatch && searchMatch;
  });

  filtered = sortTours(filtered);
  filterState.currentPage = 1;
  renderTours(filtered);
  renderPagination(filtered);
  updateResultsCount(filtered.length);
}

function applyFiltersFromState(keepPage = false) {
  const tours = getToursInCurrentLang();
  let filtered = tours.filter(tour => {
    const categoryMatch = filterState.categories.length === 0 || filterState.categories.includes(tour.category);
    const priceMatch    = tour.price <= filterState.maxPrice;
    const durationMatch = filterState.durations.length === 0 || filterState.durations.includes(tour.durationCategory);
    const searchMatch   = !filterState.searchQuery ||
      tour.name.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(filterState.searchQuery.toLowerCase());
    return categoryMatch && priceMatch && durationMatch && searchMatch;
  });

  filtered = sortTours(filtered);
  if (!keepPage) filterState.currentPage = 1;
  renderTours(filtered);
  renderPagination(filtered);
  updateResultsCount(filtered.length);
}

function sortTours(tours) {
  if (filterState.sortBy === 'price-asc')  return [...tours].sort((a, b) => a.price - b.price);
  if (filterState.sortBy === 'price-desc') return [...tours].sort((a, b) => b.price - a.price);
  if (filterState.sortBy === 'rating')     return [...tours].sort((a, b) => b.rating - a.rating);
  return tours;
}

/* ============================================================
   RENDER TOURS
   ============================================================ */
function generateTourCard(tour) {
  let badgeHtml = '';
  if (tour.badge === 'bestseller') {
    badgeHtml = `<span class="tour-badge tour-badge--orange">${i18n.t('toursGrid.badgeBestseller')}</span>`;
  } else if (tour.badge === 'limited') {
    badgeHtml = `<span class="tour-badge tour-badge--red">${i18n.t('toursGrid.badgeLimited')}</span>`;
  }

  return `
    <article class="tour-card-full" data-tour-id="${tour.id}">
      <div class="tour-card-image-wrap">
        <img src="${tour.image}" alt="${tour.name}" loading="lazy">
        <span class="price-badge">$${tour.price}<small>${i18n.t('toursGrid.perPerson')}</small></span>
        ${badgeHtml}
      </div>
      <div class="tour-card-content">
        <div class="tour-meta-top">
          <span>⏱ ${tour.duration}</span>
          <span>·</span>
          <span>🎯 ${tour.highlight}</span>
        </div>
        <div class="tour-card-rating">
          ⭐ ${tour.rating} <span style="font-weight:400;color:var(--color-outline);">(${Math.floor(tour.rating * 20 + 10)} ${i18n.t('modal.reviews')})</span>
        </div>
        <h3>${tour.name}</h3>
        <p class="tour-desc-clamp">${tour.description}</p>
        <hr class="tour-divider">
        <div class="tour-card-actions">
          <button class="btn-quick-view" data-id="${tour.id}">${i18n.t('toursGrid.quickView')}</button>
          <button class="btn btn-primary btn-sm" data-id="${tour.id}" data-action="book">${i18n.t('toursGrid.bookNow')}</button>
        </div>
      </div>
    </article>
  `;
}

function renderTours(tours) {
  const grid = document.getElementById('toursGrid');
  if (!grid) return;

  const start     = (filterState.currentPage - 1) * filterState.toursPerPage;
  const paginated = tours.slice(start, start + filterState.toursPerPage);

  if (paginated.length === 0) {
    grid.innerHTML = `
      <div class="tours-empty">
        <h3>${i18n.t('toursGrid.noToursTitle')}</h3>
        <p>${i18n.t('toursGrid.noToursDesc')}</p>
        <button class="btn btn-primary" onclick="clearAllFilters()">${i18n.t('toursGrid.clearFilters')}</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = paginated.map(tour => generateTourCard(tour)).join('');

  grid.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', () => openQuickView(parseInt(btn.dataset.id)));
  });

  grid.querySelectorAll('[data-action="book"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tour = getToursInCurrentLang().find(t => t.id === parseInt(btn.dataset.id));
      if (tour) alert(`Booking "${tour.name}" — $${tour.price}/person\n\nThis would open the booking flow.`);
    });
  });
}

/* ============================================================
   RESULTS COUNT
   ============================================================ */
function updateResultsCount(total) {
  const el = document.getElementById('resultsCount');
  if (!el) return;
  const label = i18n.t('toursGrid.showing');
  const noun  = i18n.t('toursGrid.tours') + (total !== 1 ? 's' : '');
  el.innerHTML = `${label} <strong>${total}</strong> ${noun}`;
}

/* ============================================================
   PAGINATION
   ============================================================ */
function renderPagination(tours) {
  const container = document.getElementById('pagination');
  if (!container) return;

  const totalPages = Math.ceil(tours.length / filterState.toursPerPage);
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = `<button class="page-btn" ${filterState.currentPage === 1 ? 'disabled' : ''} data-page="${filterState.currentPage - 1}" aria-label="Previous page">‹</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === filterState.currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}" ${i === filterState.currentPage ? 'aria-current="page"' : ''}>${i}</button>`;
  }

  html += `<button class="page-btn" ${filterState.currentPage === totalPages ? 'disabled' : ''} data-page="${filterState.currentPage + 1}" aria-label="Next page">›</button>`;

  container.innerHTML = html;

  container.querySelectorAll('.page-btn:not(:disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      filterState.currentPage = parseInt(btn.dataset.page);
      applyFiltersFromState(true);
      window.scrollTo({ top: document.querySelector('.tours-layout').offsetTop - 100, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   QUICK VIEW MODAL
   ============================================================ */
function openQuickView(tourId) {
  const tour = getToursInCurrentLang().find(t => t.id === tourId);
  if (!tour) return;

  document.getElementById('modalImage').src = tour.image;
  document.getElementById('modalImage').alt = tour.name;
  document.getElementById('modalName').textContent = tour.name;
  document.getElementById('modalDesc').textContent  = tour.description;
  document.getElementById('modalPrice').innerHTML   =
    `<strong>${i18n.t('modal.from')} $${tour.price}</strong> <small>${i18n.t('modal.perPerson')}</small>`;
  document.getElementById('modalRating').innerHTML  =
    `⭐ ${tour.rating} — ${Math.floor(tour.rating * 20 + 10)} ${i18n.t('modal.reviews')}`;
  document.getElementById('modalMeta').innerHTML    = `
    <span>⏱ ${tour.duration}</span>
    <span>·</span>
    <span>🎯 ${tour.highlight}</span>
  `;
  document.getElementById('modalHighlights').innerHTML =
    tour.highlights.map(h => `<li>✓ ${h}</li>`).join('');

  // Translate modal labels
  const highlightsLabel = document.getElementById('modalHighlightsLabel');
  if (highlightsLabel) highlightsLabel.textContent = i18n.t('modal.highlights');
  const modalBookBtn = document.getElementById('modalBook');
  if (modalBookBtn) modalBookBtn.textContent = i18n.t('modal.bookNow');

  const badgeWrap = document.getElementById('modalBadgeWrap');
  if (tour.badge === 'bestseller') {
    badgeWrap.innerHTML = `<span class="tour-badge tour-badge--orange">${i18n.t('toursGrid.badgeBestseller')}</span>`;
  } else if (tour.badge === 'limited') {
    badgeWrap.innerHTML = `<span class="tour-badge tour-badge--red">${i18n.t('toursGrid.badgeLimited')}</span>`;
  } else {
    badgeWrap.innerHTML = '';
  }

  const modal = document.getElementById('quickViewModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('closeModal').focus();
}

function closeModal() {
  const modal = document.getElementById('quickViewModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   CLEAR FILTERS
   ============================================================ */
function clearAllFilters() {
  filterState.categories  = [];
  filterState.maxPrice    = 250;
  filterState.durations   = [];
  filterState.sortBy      = 'popular';
  filterState.searchQuery = '';
  filterState.currentPage = 1;

  document.querySelectorAll('.category-filter').forEach(cb => { cb.checked = false; });
  const priceRange = document.getElementById('priceRange');
  if (priceRange) {
    priceRange.value = 250;
    document.getElementById('priceRangeValue').textContent = '$250';
  }
  document.querySelectorAll('.duration-btn').forEach(btn => btn.classList.remove('active'));
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'popular';

  applyFilters();
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
function initFilters() {
  document.querySelectorAll('.category-filter').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) filterState.categories.push(cb.value);
      else filterState.categories = filterState.categories.filter(c => c !== cb.value);
    });
  });

  const priceRange      = document.getElementById('priceRange');
  const priceRangeValue = document.getElementById('priceRangeValue');
  if (priceRange && priceRangeValue) {
    priceRange.addEventListener('input', () => {
      filterState.maxPrice = parseInt(priceRange.value);
      priceRangeValue.textContent = `$${priceRange.value}`;
    });
  }

  document.querySelectorAll('.duration-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dur = btn.dataset.duration;
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        filterState.durations = filterState.durations.filter(d => d !== dur);
      } else {
        btn.classList.add('active');
        filterState.durations.push(dur);
      }
    });
  });

  const applyBtn = document.getElementById('applyFiltersBtn');
  if (applyBtn) applyBtn.addEventListener('click', applyFilters);

  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) clearBtn.addEventListener('click', clearAllFilters);

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      filterState.sortBy = sortSelect.value;
      applyFilters();
    });
  }

  const filtersToggle = document.getElementById('filtersToggle');
  const filtersBody   = document.getElementById('filtersBody');
  if (filtersToggle && filtersBody) {
    filtersToggle.addEventListener('click', () => {
      const isOpen = filtersBody.classList.toggle('open');
      filtersToggle.setAttribute('aria-expanded', isOpen);
      const label = isOpen ? i18n.t('filters.hideFilters') : i18n.t('filters.showFilters');
      filtersToggle.innerHTML = `${label}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M6 9l6 6 6-6"/>
        </svg>`;
    });
  }

  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  const modalOverlay = document.getElementById('quickViewModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  }

  const modalBook = document.getElementById('modalBook');
  if (modalBook) {
    modalBook.addEventListener('click', () => {
      const tourName = document.getElementById('modalName').textContent;
      const price    = document.getElementById('modalPrice').querySelector('strong')?.textContent ?? '';
      alert(`Booking "${tourName}" — ${price}/person\n\nThis would open the booking flow.`);
    });
  }
}

/* ============================================================
   URL PARAMS (from homepage search)
   ============================================================ */
function readUrlParams() {
  const params   = new URLSearchParams(window.location.search);
  const search   = params.get('search');
  const category = params.get('category');

  if (search) filterState.searchQuery = search;

  if (category) {
    filterState.categories = [category];
    const checkbox = document.querySelector(`.category-filter[value="${category}"]`);
    if (checkbox) checkbox.checked = true;
  }
}

/* ============================================================
   LANGUAGE CHANGE — re-render with current filters
   ============================================================ */
document.addEventListener('langChanged', () => {
  applyFiltersFromState(true);
});

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  readUrlParams();
  applyFilters();
});
