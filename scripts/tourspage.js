/* ============================================================
   TOURS PAGE — Filters, Rendering, Modal, Pagination
   ============================================================ */

const allTours = [
  {
    id: 1,
    name: "Saona Island Luxury Cruise",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80",
    price: 89,
    duration: "4 Hours",
    durationCategory: "half-day",
    highlight: "Snorkeling Included",
    category: "water-sports",
    badge: "BESTSELLER",
    badgeColor: "orange",
    rating: 4.8,
    description: "Escape to paradise on our flagship catamaran tour. Sail to the stunning Saona Island with crystal-clear waters and white sand beaches.",
    highlights: ["Open bar", "Lunch buffet", "Snorkeling gear", "Hotel pickup"]
  },
  {
    id: 2,
    name: "Jungle Buggy & Mud Adventure",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    price: 125,
    duration: "6 Hours",
    durationCategory: "full-day",
    highlight: "Lunch Included",
    category: "nature-wildlife",
    badge: "LIMITED SPOTS",
    badgeColor: "red",
    rating: 4.7,
    description: "Get off the beaten path and explore the rugged terrain of Punta Cana's interior jungles on powerful off-road buggies.",
    highlights: ["Professional guide", "Lunch at local ranch", "Cenote swim", "GoPro rental available"]
  },
  {
    id: 3,
    name: "Private Yacht Explorer",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80",
    price: 210,
    duration: "Full Day",
    durationCategory: "full-day",
    highlight: "Private Group",
    category: "private-charters",
    badge: null,
    badgeColor: null,
    rating: 4.9,
    description: "A fully customized experience on your private luxury yacht. Choose your destinations, itinerary, and dining preferences.",
    highlights: ["Private crew", "Custom itinerary", "Gourmet lunch", "Fishing gear optional"]
  },
  {
    id: 4,
    name: "Reef Snorkeling Discovery",
    image: "https://images.unsplash.com/photo-1498623116890-37e912163d5d?w=600&q=80",
    price: 65,
    duration: "2 Hours",
    durationCategory: "half-day",
    highlight: "Equipment Provided",
    category: "water-sports",
    badge: null,
    badgeColor: null,
    rating: 4.6,
    description: "Explore the world's most vibrant coral reefs. Perfect for beginners and experienced snorkelers alike.",
    highlights: ["Snorkeling gear", "Underwater guide", "Photos included", "All skill levels"]
  },
  {
    id: 5,
    name: "Hoyo Azul Cave Adventure",
    image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=600&q=80",
    price: 75,
    duration: "3 Hours",
    durationCategory: "half-day",
    highlight: "Guide Included",
    category: "nature-wildlife",
    badge: null,
    badgeColor: null,
    rating: 4.5,
    description: "Descend into the mystical Hoyo Azul cenote, a stunning natural pool of crystal-blue water hidden in the jungle.",
    highlights: ["Expert guide", "Swimming included", "Rope descent", "Nature walk"]
  },
  {
    id: 6,
    name: "Catamaran Sunset Cruise",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&q=80",
    price: 95,
    duration: "3 Hours",
    durationCategory: "night-tour",
    highlight: "Drinks Included",
    category: "water-sports",
    badge: null,
    badgeColor: null,
    rating: 4.8,
    description: "Sail into the golden sunset on a luxurious catamaran with open bar and live Caribbean music.",
    highlights: ["Open bar", "Live music", "Sunset views", "Snacks included"]
  },
  {
    id: 7,
    name: "ATV Beach Excursion",
    image: "https://images.unsplash.com/photo-1601933975851-3d7e52ac2e42?w=600&q=80",
    price: 110,
    duration: "5 Hours",
    durationCategory: "full-day",
    highlight: "Beginner Friendly",
    category: "nature-wildlife",
    badge: null,
    badgeColor: null,
    rating: 4.4,
    description: "Ride powerful ATVs through scenic coastal trails, jungle paths, and stunning beach overlooks.",
    highlights: ["Safety briefing", "Helmet & gear", "Beach stop", "Local village visit"]
  },
  {
    id: 8,
    name: "Cultural Santo Domingo Tour",
    image: "https://images.unsplash.com/photo-1513735492246-483525079686?w=600&q=80",
    price: 85,
    duration: "Full Day",
    durationCategory: "full-day",
    highlight: "Lunch Included",
    category: "cultural-tours",
    badge: null,
    badgeColor: null,
    rating: 4.6,
    description: "Discover the rich history of the Caribbean's oldest city. Visit UNESCO colonial monuments, museums, and local markets.",
    highlights: ["Colonial Zone tour", "Local lunch", "Museum entry", "Guided walking tour"]
  }
];

/* ============================================================
   FILTER STATE
   ============================================================ */
const filterState = {
  categories: [],
  maxPrice: 250,
  durations: [],
  sortBy: 'popular',
  searchQuery: '',
  currentPage: 1,
  toursPerPage: 6
};

/* ============================================================
   FILTERING & SORTING
   ============================================================ */
function applyFilters() {
  let filtered = allTours.filter(tour => {
    const categoryMatch = filterState.categories.length === 0 ||
      filterState.categories.includes(tour.category);
    const priceMatch = tour.price <= filterState.maxPrice;
    const durationMatch = filterState.durations.length === 0 ||
      filterState.durations.includes(tour.durationCategory);
    const searchMatch = !filterState.searchQuery ||
      tour.name.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(filterState.searchQuery.toLowerCase());
    return categoryMatch && priceMatch && durationMatch && searchMatch;
  });

  if (filterState.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filterState.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (filterState.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  filterState.currentPage = 1;
  renderTours(filtered);
  renderPagination(filtered);
  updateResultsCount(filtered.length);
}

/* ============================================================
   RENDER TOURS
   ============================================================ */
function generateTourCard(tour) {
  const badgeHtml = tour.badge
    ? `<span class="tour-badge tour-badge--${tour.badgeColor}">${tour.badge}</span>`
    : '';

  return `
    <article class="tour-card-full" data-tour-id="${tour.id}">
      <div class="tour-card-image-wrap">
        <img src="${tour.image}" alt="${tour.name}" loading="lazy">
        <span class="price-badge">$${tour.price}<small>/ person</small></span>
        ${badgeHtml}
      </div>
      <div class="tour-card-content">
        <div class="tour-meta-top">
          <span>⏱ ${tour.duration}</span>
          <span>·</span>
          <span>🎯 ${tour.highlight}</span>
        </div>
        <div class="tour-card-rating">
          ⭐ ${tour.rating} <span style="font-weight:400;color:var(--color-outline);">(${Math.floor(tour.rating * 20 + 10)} reviews)</span>
        </div>
        <h3>${tour.name}</h3>
        <p class="tour-desc-clamp">${tour.description}</p>
        <hr class="tour-divider">
        <div class="tour-card-actions">
          <button class="btn-quick-view" data-id="${tour.id}">Quick View</button>
          <button class="btn btn-primary btn-sm" data-id="${tour.id}" data-action="book">Book Now</button>
        </div>
      </div>
    </article>
  `;
}

function renderTours(tours) {
  const grid = document.getElementById('toursGrid');
  if (!grid) return;

  const start = (filterState.currentPage - 1) * filterState.toursPerPage;
  const paginated = tours.slice(start, start + filterState.toursPerPage);

  if (paginated.length === 0) {
    grid.innerHTML = `
      <div class="tours-empty">
        <h3>No tours found</h3>
        <p>Try adjusting your filters or search terms.</p>
        <button class="btn btn-primary" onclick="clearAllFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = paginated.map(tour => generateTourCard(tour)).join('');

  // Attach event listeners
  grid.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', () => openQuickView(parseInt(btn.dataset.id)));
  });

  grid.querySelectorAll('[data-action="book"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tour = allTours.find(t => t.id === parseInt(btn.dataset.id));
      if (tour) alert(`Booking "${tour.name}" — $${tour.price}/person\n\nThis would open the booking flow.`);
    });
  });
}

/* ============================================================
   RESULTS COUNT
   ============================================================ */
function updateResultsCount(total) {
  const el = document.getElementById('resultsCount');
  if (el) {
    el.innerHTML = `Showing <strong>${total}</strong> tour${total !== 1 ? 's' : ''}`;
  }
}

/* ============================================================
   PAGINATION
   ============================================================ */
function renderPagination(tours) {
  const container = document.getElementById('pagination');
  if (!container) return;

  const totalPages = Math.ceil(tours.length / filterState.toursPerPage);
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = '';

  // Prev button
  html += `<button class="page-btn" ${filterState.currentPage === 1 ? 'disabled' : ''} data-page="${filterState.currentPage - 1}" aria-label="Previous page">‹</button>`;

  // Page buttons
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === filterState.currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}" ${i === filterState.currentPage ? 'aria-current="page"' : ''}>${i}</button>`;
  }

  // Next button
  html += `<button class="page-btn" ${filterState.currentPage === totalPages ? 'disabled' : ''} data-page="${filterState.currentPage + 1}" aria-label="Next page">›</button>`;

  container.innerHTML = html;

  // Attach listeners
  container.querySelectorAll('.page-btn:not(:disabled)').forEach(btn => {
    btn.addEventListener('click', () => {
      filterState.currentPage = parseInt(btn.dataset.page);
      // Re-apply filters to get the current filtered set
      applyFiltersFromState(true);
      window.scrollTo({ top: document.querySelector('.tours-layout').offsetTop - 100, behavior: 'smooth' });
    });
  });
}

// Re-runs filters without resetting the page
function applyFiltersFromState(keepPage = false) {
  let filtered = allTours.filter(tour => {
    const categoryMatch = filterState.categories.length === 0 ||
      filterState.categories.includes(tour.category);
    const priceMatch = tour.price <= filterState.maxPrice;
    const durationMatch = filterState.durations.length === 0 ||
      filterState.durations.includes(tour.durationCategory);
    const searchMatch = !filterState.searchQuery ||
      tour.name.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(filterState.searchQuery.toLowerCase());
    return categoryMatch && priceMatch && durationMatch && searchMatch;
  });

  if (filterState.sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (filterState.sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (filterState.sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  if (!keepPage) filterState.currentPage = 1;

  renderTours(filtered);
  renderPagination(filtered);
  updateResultsCount(filtered.length);
}

/* ============================================================
   QUICK VIEW MODAL
   ============================================================ */
function openQuickView(tourId) {
  const tour = allTours.find(t => t.id === tourId);
  if (!tour) return;

  document.getElementById('modalImage').src = tour.image;
  document.getElementById('modalImage').alt = tour.name;
  document.getElementById('modalName').textContent = tour.name;
  document.getElementById('modalDesc').textContent = tour.description;
  document.getElementById('modalPrice').innerHTML = `<strong>From $${tour.price}</strong> <small>per person</small>`;
  document.getElementById('modalRating').innerHTML = `⭐ ${tour.rating} — ${Math.floor(tour.rating * 20 + 10)} reviews`;
  document.getElementById('modalMeta').innerHTML = `
    <span>⏱ ${tour.duration}</span>
    <span>·</span>
    <span>🎯 ${tour.highlight}</span>
  `;
  document.getElementById('modalHighlights').innerHTML =
    tour.highlights.map(h => `<li>✓ ${h}</li>`).join('');

  const badgeWrap = document.getElementById('modalBadgeWrap');
  badgeWrap.innerHTML = tour.badge
    ? `<span class="tour-badge tour-badge--${tour.badgeColor}">${tour.badge}</span>`
    : '';

  const modal = document.getElementById('quickViewModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Move focus to modal
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
  filterState.categories = [];
  filterState.maxPrice = 250;
  filterState.durations = [];
  filterState.sortBy = 'popular';
  filterState.searchQuery = '';
  filterState.currentPage = 1;

  // Reset UI
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
   SETUP EVENT LISTENERS
   ============================================================ */
function initFilters() {
  // Category checkboxes
  document.querySelectorAll('.category-filter').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) {
        filterState.categories.push(cb.value);
      } else {
        filterState.categories = filterState.categories.filter(c => c !== cb.value);
      }
    });
  });

  // Price range
  const priceRange = document.getElementById('priceRange');
  const priceRangeValue = document.getElementById('priceRangeValue');
  if (priceRange && priceRangeValue) {
    priceRange.addEventListener('input', () => {
      filterState.maxPrice = parseInt(priceRange.value);
      priceRangeValue.textContent = `$${priceRange.value}`;
    });
  }

  // Duration buttons
  document.querySelectorAll('.duration-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const duration = btn.dataset.duration;
      if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        filterState.durations = filterState.durations.filter(d => d !== duration);
      } else {
        btn.classList.add('active');
        filterState.durations.push(duration);
      }
    });
  });

  // Apply filters button
  const applyBtn = document.getElementById('applyFiltersBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', applyFilters);
  }

  // Clear filters button
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAllFilters);
  }

  // Sort select
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      filterState.sortBy = sortSelect.value;
      applyFilters();
    });
  }

  // Mobile filters toggle
  const filtersToggle = document.getElementById('filtersToggle');
  const filtersBody = document.getElementById('filtersBody');
  if (filtersToggle && filtersBody) {
    filtersToggle.addEventListener('click', () => {
      const isOpen = filtersBody.classList.toggle('open');
      filtersToggle.setAttribute('aria-expanded', isOpen);
      filtersToggle.textContent = '';
      filtersToggle.innerHTML = `${isOpen ? 'Hide' : 'Show'} Filters
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path d="M6 9l6 6 6-6"/>
        </svg>`;
    });
  }

  // Modal close button
  const closeBtn = document.getElementById('closeModal');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Modal overlay click to close
  const modalOverlay = document.getElementById('quickViewModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Modal book button
  const modalBook = document.getElementById('modalBook');
  if (modalBook) {
    modalBook.addEventListener('click', () => {
      const tourName = document.getElementById('modalName').textContent;
      const price = document.getElementById('modalPrice').querySelector('strong')?.textContent ?? '';
      alert(`Booking "${tourName}" — ${price}/person\n\nThis would open the booking flow.`);
    });
  }
}

/* ============================================================
   READ URL PARAMS (from homepage search)
   ============================================================ */
function readUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');
  const category = params.get('category');

  if (search) {
    filterState.searchQuery = search;
  }

  if (category) {
    filterState.categories = [category];
    const checkbox = document.querySelector(`.category-filter[value="${category}"]`);
    if (checkbox) checkbox.checked = true;
  }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  readUrlParams();
  applyFilters();
});
