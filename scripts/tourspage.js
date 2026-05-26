/* ============================================================
   TOURS PAGE — Filters, Rendering, Modal, Pagination
   ============================================================ */

// Structural data: filter keys, prices, ratings, images (stays language-agnostic)
const allTours = [
  {
    id: 1,
    images: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80",
      "https://images.unsplash.com/photo-1498623116890-37e912163d5d?w=800&q=80"
    ],
    price: 89,
    originalPrice: 110,
    duration: "4 Hours",
    durationCategory: "half-day",
    category: "water-sports",
    badge: "bestseller",
    badgeColor: "orange",
    rating: 4.8,
    reviewCount: 2450,
    groupSize: "Up to 15",
    difficulty: "Easy",
    tagline: "Top Rated Adventure",
    subtitle: "Escape to Paradise",
    description: "Experience the ultimate Caribbean dream on Isla Saona. This full-day excursion takes you away from the bustling resorts to the pristine shores of the East National Park. Whether you're relaxing on the sugar-white sands, swimming in the Natural Pool, or enjoying a traditional Dominican feast, every moment is designed for pure tropical bliss.",
    highlights: ["Open bar on catamaran", "Buffet lunch on the beach", "Snorkeling gear included", "Hotel pickup & drop-off", "Natural Pool stop"],
    itinerary: [
      { icon: "🚌", title: "Hotel Pickup", description: "Comfortable air-conditioned transport from all major Punta Cana resorts (7:00 AM - 8:30 AM)." },
      { icon: "⛵", title: "Catamaran & Speedboat Ride", description: "Sail through the azure waters with an open bar, music, and a stop at the famous Natural Pool to see starfish." },
      { icon: "🍽️", title: "Beachfront Buffet Lunch", description: "Savor authentic Dominican cuisine including BBQ chicken, fish, rice, and tropical fruits right on the sand." },
      { icon: "🤿", title: "Snorkeling & Relaxation", description: "Explore hidden reefs or simply lounge in a hammock under the swaying palm trees before heading back." }
    ],
    packingList: ["Biodegradable Sunscreen", "Swimwear & Change of Clothes", "Waterproof Camera / GoPro", "Hat & Sunglasses", "Cash for Tips & Souvenirs", "Beach Towel"],
    reviews: [
      { initials: "JS", name: "John Smith", date: "Reviewed June 2024", rating: 5, text: "The natural pool was absolutely incredible. We saw dozens of starfish and the water was crystal clear. The buffet lunch was surprisingly good for a beach one! Highly recommend." },
      { initials: "EM", name: "Elena Martinez", date: "Reviewed May 2024", rating: 5, text: "Perfect organization. Pickup was on time and the guide was very knowledgeable. Isla Saona is a true paradise, exactly like the photos. Must do when in Punta Cana!" },
      { initials: "DK", name: "David Kim", date: "Reviewed April 2024", rating: 4, text: "Amazing day trip. The catamaran ride was so much fun with the music and dancing. Saona is beautiful, only wish we could have stayed even longer!" }
    ],
    certified: true,
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 2,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1601933975851-3d7e52ac2e42?w=800&q=80",
      "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
    ],
    price: 125,
    originalPrice: 155,
    duration: "6 Hours",
    durationCategory: "full-day",
    category: "nature-wildlife",
    badge: "limited",
    badgeColor: "red",
    rating: 4.7,
    reviewCount: 1830,
    groupSize: "Up to 10",
    difficulty: "Moderate",
    tagline: "Thrill Seeker Favorite",
    subtitle: "Off-Road Jungle Escape",
    description: "Get off the beaten path and explore the rugged terrain of Punta Cana's interior jungles on powerful off-road buggies. Race through muddy trails, cross rivers, and discover hidden villages that most tourists never see. This is the adventure that gets your adrenaline pumping and leaves you with stories to tell.",
    highlights: ["Professional safety briefing", "Lunch at a local ranch", "River crossing & mud pits", "Village cultural stop", "GoPro rental available"],
    itinerary: [
      { icon: "🚌", title: "Hotel Pickup", description: "Pick up from your resort at 8:00 AM. Safety gear and briefing provided at base camp." },
      { icon: "🏎️", title: "Jungle Trail Ride", description: "Hop in your buggy and tear through tropical jungle trails, mud pits, and open fields." },
      { icon: "🏘️", title: "Local Village Visit", description: "Stop at an authentic Dominican village, meet the locals, and learn about their culture and traditions." },
      { icon: "🍖", title: "Ranch Lunch", description: "Enjoy a hearty Dominican lunch at a local ranch before heading back through the trails." }
    ],
    packingList: ["Old clothes you don't mind getting muddy", "Closed-toe shoes", "Sunscreen", "Change of clothes", "Camera / GoPro", "Small backpack"],
    reviews: [
      { initials: "MR", name: "Mike Reynolds", date: "Reviewed July 2024", rating: 5, text: "Best tour we did in Punta Cana! The mud pits were hilarious and the guides were amazing. Go early before it gets too hot." },
      { initials: "SL", name: "Sofia Lopez", date: "Reviewed June 2024", rating: 4, text: "So much fun! The village stop was unexpectedly moving. Lunch was delicious. Definitely wear clothes you can throw away after." },
      { initials: "TR", name: "Tom Richards", date: "Reviewed May 2024", rating: 5, text: "Pure adrenaline from start to finish. The guides know every hidden trail. Absolutely worth every penny." }
    ],
    certified: true,
    cancellationPolicy: "Free cancellation up to 48h before"
  },
  {
    id: 3,
    images: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
    ],
    price: 210,
    originalPrice: 260,
    duration: "Full Day",
    durationCategory: "full-day",
    category: "private-charters",
    badge: null,
    badgeColor: null,
    rating: 4.9,
    reviewCount: 640,
    groupSize: "Up to 8",
    difficulty: "Easy",
    tagline: "Premium Experience",
    subtitle: "Luxury on the Water",
    description: "A fully customized experience on your private luxury yacht. Choose your destinations, set your own pace, and enjoy a completely personalized itinerary. With a dedicated crew, gourmet dining, and crystal-clear Caribbean waters all to yourself, this is the ultimate indulgence.",
    highlights: ["Fully private — just your group", "Custom itinerary", "Gourmet lunch & open bar", "Snorkeling & fishing gear", "Professional crew"],
    itinerary: [
      { icon: "⚓", title: "Yacht Boarding", description: "Board your private yacht at the marina at 9:00 AM. Meet your captain and crew." },
      { icon: "🏝️", title: "Island Hopping", description: "Sail to your chosen destinations — secluded coves, sandbanks, and snorkeling spots." },
      { icon: "🍷", title: "Gourmet Lunch at Sea", description: "Enjoy a chef-prepared lunch on deck with fresh seafood, tropical fruits, and premium drinks." },
      { icon: "🌅", title: "Sunset Return", description: "Watch the Caribbean sunset as your captain sails you back to the marina." }
    ],
    packingList: ["Swimwear", "Sunscreen", "Sunglasses", "Light jacket for evening", "Camera", "Personal medications"],
    reviews: [
      { initials: "AC", name: "Amanda Chen", date: "Reviewed August 2024", rating: 5, text: "Absolutely magical. The crew was incredible, the food was gourmet quality, and having the whole yacht to ourselves was priceless." },
      { initials: "PW", name: "Peter Walsh", date: "Reviewed July 2024", rating: 5, text: "We booked this for our anniversary and it exceeded every expectation. Worth every dollar." },
      { initials: "NB", name: "Nina Becker", date: "Reviewed June 2024", rating: 5, text: "The most memorable day of our entire trip. Professional, luxurious, and totally personalized." }
    ],
    certified: true,
    cancellationPolicy: "Free cancellation up to 72h before"
  },
  {
    id: 4,
    images: [
      "https://images.unsplash.com/photo-1498623116890-37e912163d5d?w=1200&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
    ],
    price: 65,
    originalPrice: 80,
    duration: "2 Hours",
    durationCategory: "half-day",
    category: "water-sports",
    badge: null,
    badgeColor: null,
    rating: 4.6,
    reviewCount: 980,
    groupSize: "Up to 12",
    difficulty: "Easy",
    tagline: "Best Value",
    subtitle: "Discover the Underwater World",
    description: "Explore the world's most vibrant coral reefs just off the coast of Punta Cana. Perfect for beginners and experienced snorkelers alike, this guided underwater adventure reveals a stunning world of tropical fish, colorful corals, and Caribbean marine life.",
    highlights: ["All snorkeling gear included", "Certified underwater guide", "Underwater photos included", "All skill levels welcome", "Small group — max 12 people"],
    itinerary: [
      { icon: "🏖️", title: "Beach Meeting Point", description: "Meet your guide at Bavaro Beach at your chosen time slot (morning or afternoon)." },
      { icon: "🤿", title: "Gear Up & Safety Briefing", description: "Get fitted with your snorkeling gear and receive a quick safety and technique briefing." },
      { icon: "🐠", title: "Guided Reef Exploration", description: "Swim through coral gardens and encounter tropical fish, rays, and sea turtles if lucky." },
      { icon: "📸", title: "Underwater Photos", description: "Your guide takes photos throughout — you receive the album digitally after the tour." }
    ],
    packingList: ["Swimwear", "Towel", "Biodegradable sunscreen", "Water shoes (optional)", "Waterproof bag"],
    reviews: [
      { initials: "LG", name: "Laura Garcia", date: "Reviewed September 2024", rating: 5, text: "Such a magical experience! We saw three sea turtles and a spotted ray. The guide was patient and knowledgeable." },
      { initials: "BJ", name: "Ben Johnson", date: "Reviewed August 2024", rating: 4, text: "Great value for money. Clear water, plenty of fish. The underwater photos were a nice bonus." }
    ],
    certified: true,
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 5,
    images: [
      "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
    ],
    price: 75,
    originalPrice: 90,
    duration: "3 Hours",
    durationCategory: "half-day",
    category: "nature-wildlife",
    badge: null,
    badgeColor: null,
    rating: 4.5,
    reviewCount: 720,
    groupSize: "Up to 15",
    difficulty: "Moderate",
    tagline: "Hidden Gem",
    subtitle: "Into the Mystical Blue",
    description: "Descend into the mystical Hoyo Azul cenote, a stunning natural pool of crystal-blue water hidden deep in the jungle of Cap Cana. This geological wonder sits at the base of a 30-meter limestone cliff and offers one of the most unique swimming experiences in the Caribbean.",
    highlights: ["Expert naturalist guide", "Cenote swimming included", "Cliff viewing platform", "Nature walk through jungle", "Small group experience"],
    itinerary: [
      { icon: "🚌", title: "Hotel Pickup", description: "Pickup from Punta Cana and Cap Cana resorts at 9:00 AM." },
      { icon: "🌿", title: "Jungle Nature Walk", description: "Hike through lush tropical vegetation with your guide explaining the local flora and fauna." },
      { icon: "💧", title: "Cenote Swimming", description: "Swim in the stunning turquoise waters of Hoyo Azul beneath towering limestone cliffs." },
      { icon: "📸", title: "Cliff Viewpoint", description: "Climb to the viewpoint for panoramic photos of the cenote and surrounding jungle." }
    ],
    packingList: ["Swimwear", "Water shoes or sandals", "Insect repellent", "Sunscreen", "Change of clothes", "Small towel"],
    reviews: [
      { initials: "KM", name: "Karen Mills", date: "Reviewed July 2024", rating: 5, text: "Absolutely breathtaking. The color of the water is unreal — like something from a movie. The guide was fantastic." },
      { initials: "RP", name: "Roberto Perez", date: "Reviewed June 2024", rating: 4, text: "Really unique experience. The cenote is stunning. Walk is a bit strenuous but totally worth it." }
    ],
    certified: true,
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 6,
    images: [
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1200&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
    ],
    price: 95,
    originalPrice: 115,
    duration: "3 Hours",
    durationCategory: "night-tour",
    category: "water-sports",
    badge: null,
    badgeColor: null,
    rating: 4.8,
    reviewCount: 1560,
    groupSize: "Up to 20",
    difficulty: "Easy",
    tagline: "Most Romantic Tour",
    subtitle: "Golden Hour on the Caribbean",
    description: "Sail into the golden Caribbean sunset aboard a luxurious catamaran with an open bar and live music. Watch the sky transform into a canvas of orange and pink while you sip cocktails and dance on deck. The perfect way to end a day in paradise.",
    highlights: ["Open bar — rum, beer, cocktails", "Live Caribbean music", "Panoramic sunset views", "Light snacks served", "Romantic atmosphere"],
    itinerary: [
      { icon: "⛵", title: "Catamaran Boarding", description: "Board at Bavaro Marina at 4:30 PM. Welcome drink upon boarding." },
      { icon: "🎵", title: "Sail & Live Music", description: "Set sail as the live band plays Caribbean rhythms. Dance or relax as you cruise the coast." },
      { icon: "🌅", title: "Sunset Viewing", description: "Anchor at the best spot to watch the full Caribbean sunset with a cocktail in hand." },
      { icon: "🌙", title: "Return to Marina", description: "Sail back under the stars as the evening sky lights up. Return by 8:00 PM." }
    ],
    packingList: ["Light jacket or wrap", "Camera", "Comfortable shoes", "Sunglasses", "Cash for tips"],
    reviews: [
      { initials: "JL", name: "Jessica Lee", date: "Reviewed August 2024", rating: 5, text: "The most magical evening of our honeymoon. The sunset was stunning and the music was amazing. Perfect." },
      { initials: "MH", name: "Mark Harris", date: "Reviewed July 2024", rating: 5, text: "Incredible vibes, great drinks, unforgettable sunset. The crew made everyone feel so welcome." }
    ],
    certified: true,
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 7,
    images: [
      "https://images.unsplash.com/photo-1601933975851-3d7e52ac2e42?w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
    ],
    price: 110,
    originalPrice: 135,
    duration: "5 Hours",
    durationCategory: "full-day",
    category: "nature-wildlife",
    badge: null,
    badgeColor: null,
    rating: 4.4,
    reviewCount: 890,
    groupSize: "Up to 12",
    difficulty: "Easy",
    tagline: "Family Favorite",
    subtitle: "Ride the Coastline",
    description: "Ride powerful ATVs through scenic coastal trails, jungle paths, and stunning beach overlooks. This beginner-friendly adventure takes you through the best landscapes Punta Cana has to offer — from dense tropical jungle to open white-sand beaches — all at your own pace.",
    highlights: ["Full safety briefing & gear", "Helmet & protective equipment", "Coastal trail & beach stop", "Local village visit", "Refreshments included"],
    itinerary: [
      { icon: "🚌", title: "Hotel Pickup", description: "Pickup at 8:30 AM from major Punta Cana resorts." },
      { icon: "🪖", title: "Safety Briefing & Gear Up", description: "Full safety briefing and fitting for helmet, goggles, and gear at base camp." },
      { icon: "🌊", title: "Coastal Trail Ride", description: "Ride through jungle paths and emerge onto stunning beach overlooks and coastal scenery." },
      { icon: "🏡", title: "Village Stop & Refreshments", description: "Stop at a local village for cultural interaction and fresh tropical fruit refreshments." }
    ],
    packingList: ["Closed-toe shoes", "Long pants recommended", "Sunscreen", "Sunglasses", "Change of clothes", "GoPro or camera"],
    reviews: [
      { initials: "FD", name: "Frank Davis", date: "Reviewed August 2024", rating: 4, text: "Great fun for the whole family. Kids loved it and the beach views were spectacular. Guides were patient with beginners." },
      { initials: "AL", name: "Anna Lim", date: "Reviewed July 2024", rating: 5, text: "Such a blast! The coastal trail is gorgeous and the beach stop made it extra special." }
    ],
    certified: true,
    cancellationPolicy: "Free cancellation up to 24h before"
  },
  {
    id: 8,
    images: [
      "https://images.unsplash.com/photo-1513735492246-483525079686?w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
    ],
    price: 85,
    originalPrice: 105,
    duration: "Full Day",
    durationCategory: "full-day",
    category: "cultural-tours",
    badge: null,
    badgeColor: null,
    rating: 4.6,
    reviewCount: 1120,
    groupSize: "Up to 20",
    difficulty: "Easy",
    tagline: "UNESCO Heritage",
    subtitle: "The First City of the Americas",
    description: "Discover the rich history of the Caribbean's oldest city on this full-day cultural immersion. Walk through the UNESCO-listed Colonial Zone, visit the first cathedral built in the Americas, explore fascinating museums, and taste authentic Dominican street food at local markets.",
    highlights: ["UNESCO Colonial Zone walking tour", "Entry to 2 museums included", "Traditional Dominican lunch", "Local market visit", "Expert historian guide"],
    itinerary: [
      { icon: "🚐", title: "Early Departure", description: "Depart from Punta Cana at 7:00 AM for the scenic 2-hour drive to Santo Domingo." },
      { icon: "🏛️", title: "Colonial Zone Tour", description: "Walk the cobblestone streets of the UNESCO Colonial Zone with your expert guide." },
      { icon: "🍽️", title: "Dominican Lunch", description: "Enjoy a traditional lunch of sancocho, tostones, and fresh tropical juices at a local restaurant." },
      { icon: "🛒", title: "Market & Free Time", description: "Browse local markets for crafts, art, and souvenirs before the return journey." }
    ],
    packingList: ["Comfortable walking shoes", "Light clothing", "Sunscreen & hat", "Camera", "Cash for souvenirs", "Valid ID"],
    reviews: [
      { initials: "CW", name: "Claire Watson", date: "Reviewed September 2024", rating: 5, text: "A must-do for anyone interested in Caribbean history. Our guide was incredibly knowledgeable and passionate." },
      { initials: "RN", name: "Ryan Nguyen", date: "Reviewed August 2024", rating: 4, text: "Fascinating day. The Colonial Zone is stunning and the lunch was delicious. Long drive but totally worth it." }
    ],
    certified: true,
    cancellationPolicy: "Free cancellation up to 48h before"
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
        <img src="${tour.images[0]}" alt="${tour.name}" loading="lazy">
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
          <a href="tour-detail.html?id=${tour.id}" class="btn-quick-view">${i18n.t('toursGrid.quickView')}</a>
          <a href="tour-detail.html?id=${tour.id}" class="btn btn-primary btn-sm">${i18n.t('toursGrid.bookNow')}</a>
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

  document.getElementById('modalImage').src = tour.images[0];
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
