/* ============================================================
   TOUR DETAIL PAGE — Gallery, Booking Widget, Lightbox
   ============================================================ */

function getTourIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'));
}

function calcSavings(original, current) {
  return Math.round(((original - current) / original) * 100);
}

/* ============================================================
   GALLERY MOSAIC
   ============================================================ */
function renderGallery(tour) {
  const mosaic = document.getElementById('galleryMosaic');
  const imgs   = tour.images;

  const thumbsHtml = imgs.slice(1, 4).map((img, i) => `
    <img src="${img}" alt="${tour.name} photo ${i + 2}" loading="lazy"
         class="gallery-thumb" data-index="${i + 1}">
  `).join('');

  mosaic.innerHTML = `
    <div class="gallery-main">
      <img src="${imgs[0]}" alt="${tour.name}" loading="lazy" data-index="0">
    </div>
    <div class="gallery-grid">
      ${thumbsHtml}
      <div class="gallery-more-btn" id="viewAllPhotos" role="button" tabindex="0" aria-label="View all photos">
        <span>⊞ View All Photos</span>
      </div>
    </div>
  `;

  mosaic.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', () => openLightbox(tour, parseInt(img.dataset.index || 0)));
  });

  const viewAll = document.getElementById('viewAllPhotos');
  viewAll.addEventListener('click', () => openLightbox(tour, 0));
  viewAll.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(tour, 0); });
}

/* ============================================================
   ITINERARY
   ============================================================ */
function renderItinerary(steps) {
  const container = document.getElementById('itinerarySteps');
  container.innerHTML = steps.map((step, i) => `
    <div class="itinerary-step">
      <div class="step-indicator">
        <div class="step-icon-wrap">${step.icon}</div>
        ${i < steps.length - 1 ? '<div class="step-line"></div>' : ''}
      </div>
      <div class="step-content">
        <h4>${step.title}</h4>
        <p>${step.description}</p>
      </div>
    </div>
  `).join('');
}

/* ============================================================
   PACKING LIST
   ============================================================ */
function renderPackingList(items) {
  const grid = document.getElementById('packingGrid');
  grid.innerHTML = items.map(item => `
    <div class="packing-item">
      <span class="packing-check" aria-hidden="true">✓</span>
      <span>${item}</span>
    </div>
  `).join('');
}

/* ============================================================
   REVIEWS
   ============================================================ */
function renderReviews(reviews, rating, reviewCount) {
  const grid = document.getElementById('reviewsGrid');
  grid.innerHTML = reviews.map(review => `
    <article class="review-card">
      <div class="review-header">
        <div class="reviewer-avatar" aria-hidden="true">${review.initials}</div>
        <div class="reviewer-info">
          <strong class="reviewer-name">${review.name}</strong>
          <span class="review-date">${review.date}</span>
        </div>
        <div class="review-stars" aria-label="${review.rating} out of 5 stars">
          ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
        </div>
      </div>
      <p class="review-text">"${review.text}"</p>
    </article>
  `).join('');

  document.getElementById('aggregateScore').textContent = `${rating} / 5.0`;
  document.getElementById('aggregateCount').textContent = `Based on ${reviewCount.toLocaleString()} verified bookings`;
  document.getElementById('seeAllReviews').textContent  = `See all ${reviewCount.toLocaleString()} reviews`;
}

/* ============================================================
   BOOKING WIDGET
   ============================================================ */
let guestCount = 2;

function updateBookingTotal(price) {
  const total = guestCount * price;
  const label = `${guestCount} Traveler${guestCount > 1 ? 's' : ''}`;
  document.getElementById('guestCount').textContent    = label;
  document.getElementById('breakdownLabel').textContent = `${label} × $${price}`;
  document.getElementById('breakdownTotal').textContent = `$${total}`;
  document.getElementById('grandTotal').textContent     = `$${total}`;
}

function initBookingWidget(tour) {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('bookingDate').min = today;

  document.getElementById('bookingOriginalPrice').textContent = `From $${tour.originalPrice}`;
  document.getElementById('bookingPrice').textContent         = `$${tour.price}`;
  document.getElementById('savingsBadge').textContent         = `SAVE ${calcSavings(tour.originalPrice, tour.price)}%`;
  document.getElementById('cancellationNote').textContent     = `🟢 ${tour.cancellationPolicy}`;

  updateBookingTotal(tour.price);

  document.getElementById('increaseGuests').addEventListener('click', () => {
    if (guestCount < 20) { guestCount++; updateBookingTotal(tour.price); }
  });
  document.getElementById('decreaseGuests').addEventListener('click', () => {
    if (guestCount > 1)  { guestCount--; updateBookingTotal(tour.price); }
  });
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
let currentLightboxIndex = 0;
let currentTourImages    = [];

function openLightbox(tour, startIndex) {
  currentTourImages      = tour.images;
  currentLightboxIndex   = startIndex;
  renderLightboxThumbnails();
  renderLightboxImage();
  document.getElementById('lightboxOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose').focus();
}

function closeLightbox() {
  document.getElementById('lightboxOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function renderLightboxImage() {
  const img = document.getElementById('lightboxImg');
  img.src   = currentTourImages[currentLightboxIndex];
  img.alt   = `Tour photo ${currentLightboxIndex + 1}`;
  document.getElementById('lightboxCounter').textContent =
    `${currentLightboxIndex + 1} / ${currentTourImages.length}`;

  document.querySelectorAll('.lightbox-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === currentLightboxIndex);
  });
}

function renderLightboxThumbnails() {
  const container = document.getElementById('lightboxThumbnails');
  container.innerHTML = currentTourImages.map((img, i) => `
    <img src="${img}" alt="Photo ${i + 1}" class="lightbox-thumb${i === 0 ? ' active' : ''}"
         data-index="${i}" loading="lazy">
  `).join('');

  container.querySelectorAll('.lightbox-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      currentLightboxIndex = parseInt(thumb.dataset.index);
      renderLightboxImage();
    });
  });
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

document.getElementById('lightboxPrev').addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex - 1 + currentTourImages.length) % currentTourImages.length;
  renderLightboxImage();
});

document.getElementById('lightboxNext').addEventListener('click', () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % currentTourImages.length;
  renderLightboxImage();
});

document.getElementById('lightboxOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLightbox();
});

document.addEventListener('keydown', e => {
  const overlay = document.getElementById('lightboxOverlay');
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  document.getElementById('lightboxPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
});

/* ============================================================
   INIT
   ============================================================ */
function initTourDetail() {
  const id   = getTourIdFromURL();
  const tour = allTours.find(t => t.id === id);

  if (!tour) {
    document.getElementById('tourDetailMain').innerHTML = `
      <div class="container" style="padding: 80px 0; text-align: center;">
        <h2 style="margin-bottom: 12px;">Tour not found</h2>
        <p style="color: var(--color-on-surface-variant); margin-bottom: 24px;">The tour you're looking for doesn't exist.</p>
        <a href="tours.html" class="btn btn-primary">Back to Tours</a>
      </div>
    `;
    return;
  }

  document.title = `${tour.name} — iTour Punta Cana`;

  document.getElementById('breadcrumbCurrent').textContent = tour.name;
  document.getElementById('tourTitle').textContent         = tour.name;
  document.getElementById('tourTagline').textContent       = tour.tagline;
  document.getElementById('tourRating').textContent        = `${tour.rating} / 5.0`;
  document.getElementById('tourSubtitle').textContent      = tour.subtitle;
  document.getElementById('tourDescription').textContent   = tour.description;

  renderGallery(tour);
  renderItinerary(tour.itinerary);
  renderPackingList(tour.packingList);
  renderReviews(tour.reviews, tour.rating, tour.reviewCount);
  initBookingWidget(tour);
}

document.addEventListener('DOMContentLoaded', initTourDetail);
