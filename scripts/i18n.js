/* ============================================================
   i18n — TRANSLATIONS  (EN / ES)
   Must be loaded BEFORE main.js
   ============================================================ */

const translations = {
  en: {
    nav: {
      tours:    "Tours",
      aboutUs:  "About Us",
      bookNow:  "Book Now"
    },

    hero: {
      title:             "Adventure Awaits in Paradise",
      searchPlaceholder: "Search tours…",
      searchBtn:         "Search",
      guestsDefault:     "Guests"
    },

    categories: {
      sectionLabel: "Explore by type",
      sectionTitle: "Find Your Adventure",
      catamarans:   "Catamarans",
      catDesc:      "Sail the turquoise waters in style and luxury.",
      buggies:      "Buggies",
      bugDesc:      "Off-road adventures through tropical landscapes.",
      safaris:      "Safaris",
      safDesc:      "Discover the local culture and hidden natural gems.",
      explore:      "Explore"
    },

    featured: {
      sectionLabel: "Handpicked for you",
      sectionTitle: "Top Rated Tours",
      viewAll:      "View All Tours",
      from:         "From",
      details:      "Details"
    },

    featuredTours: [
      {
        id:          1,
        name:        "Saona Island Paradise",
        description: "Full day excursion to the most beautiful island in the Caribbean with lunch included.",
        duration:    "8 hours",
        meta:        "Up to 15",
        badge:       "Bestseller"
      },
      {
        id:          2,
        name:        "Jungle Buggy Adventure",
        description: "Experience the thrill of off-roading through local villages and muddy trails.",
        duration:    "4 hours",
        meta:        "Beginner",
        badge:       null
      },
      {
        id:          3,
        name:        "Snorkeling Reef Tour",
        description: "Dive into the clear waters of the Atlantic and discover vibrant coral reefs.",
        duration:    "3 hours",
        meta:        "Equip. incl.",
        badge:       null
      }
    ],

    whyUs: {
      sectionLabel:  "Why choose us",
      sectionTitle:  "Local Experts, World-Class Experience",
      intro:         "We are a team of passionate locals who know every corner of Punta Cana. Our goal is to give you authentic, safe, and unforgettable experiences.",
      feature1Title: "Local Expertise",
      feature1Desc:  "Our guides know the hidden spots that tourists would love to see.",
      feature2Title: "Safety First",
      feature2Desc:  "Maximum safety standards on all tours, with certified equipment and trained guides.",
      feature3Title: "Best Price Guarantee",
      feature3Desc:  "Competitive local prices, no hidden fees. If you find it cheaper, we'll match it."
    },

    cta: {
      sectionLabel:  "Stay in the loop",
      title:         "Get Exclusive Deals & Travel Tips",
      subtitle:      "Join 5,000+ travelers who receive early access to new tours, seasonal discounts, and insider Punta Cana guides.",
      emailPlaceholder: "your@email.com",
      subscribeBtn:  "Subscribe Free",
      privacyNote:   "No spam, ever. Unsubscribe in one click.",
      successMsg:    "🎉 You're in! Check your inbox."
    },

    footer: {
      tagline:      "Your local guide to the best tours, excursions, and adventures in Punta Cana, Dominican Republic.",
      discoverTitle: "Discover",
      supportTitle:  "Support",
      link_tours:    "Tours",
      link_about:    "About Us",
      link_sitemap:  "Sitemap",
      link_privacy:  "Privacy Policy",
      link_terms:    "Terms of Service",
      link_contact:  "Contact Us",
      copyright:     "© 2025 iTour Punta Cana. All rights reserved.",
      madeWith:      "Made with ♥ in Punta Cana, Dominican Republic"
    },

    toursHeader: {
      breadcrumbHome:    "Home",
      breadcrumbCurrent: "All Tours",
      pageTitle:         "Caribbean Adventures",
      pageSubtitle:      "Discover hand-picked excursions from local experts. From turquoise waters to hidden jungles, your paradise awaits."
    },

    filters: {
      title:         "Filters",
      clearAll:      "Clear All",
      showFilters:   "Show Filters",
      hideFilters:   "Hide Filters",
      categoryLabel: "Category",
      cat1:          "Water Sports",
      cat2:          "Private Charters",
      cat3:          "Cultural Tours",
      cat4:          "Nature & Wildlife",
      priceLabel:    "Max Price",
      durationLabel: "Duration",
      dur1:          "Half Day",
      dur2:          "Full Day",
      dur3:          "Multi-Day",
      dur4:          "Night Tour",
      applyBtn:      "Apply Filters"
    },

    toursGrid: {
      sortLabel:      "Sort by:",
      sortPopular:    "Most Popular",
      sortPriceLow:   "Price: Low to High",
      sortPriceHigh:  "Price: High to Low",
      sortRating:     "Top Rated",
      perPerson:      "/ person",
      quickView:      "Quick View",
      bookNow:        "Book Now",
      badgeBestseller: "BESTSELLER",
      badgeLimited:   "LIMITED SPOTS",
      noToursTitle:   "No tours found",
      noToursDesc:    "Try adjusting your filters or search terms.",
      clearFilters:   "Clear Filters",
      showing:        "Showing",
      tours:          "tour"
    },

    toursData: [
      {
        id: 1,
        name: "Saona Island Luxury Cruise",
        description: "Escape to paradise on our flagship catamaran tour. Sail to the stunning Saona Island with crystal-clear waters and white sand beaches.",
        highlight: "Snorkeling Included"
      },
      {
        id: 2,
        name: "Jungle Buggy & Mud Adventure",
        description: "Get off the beaten path and explore the rugged terrain of Punta Cana's interior jungles on powerful off-road buggies.",
        highlight: "Lunch Included"
      },
      {
        id: 3,
        name: "Private Yacht Explorer",
        description: "A fully customized experience on your private luxury yacht. Choose your destinations, itinerary, and dining preferences.",
        highlight: "Private Group"
      },
      {
        id: 4,
        name: "Reef Snorkeling Discovery",
        description: "Explore the world's most vibrant coral reefs. Perfect for beginners and experienced snorkelers alike.",
        highlight: "Equipment Provided"
      },
      {
        id: 5,
        name: "Hoyo Azul Cave Adventure",
        description: "Descend into the mystical Hoyo Azul cenote, a stunning natural pool of crystal-blue water hidden in the jungle.",
        highlight: "Guide Included"
      },
      {
        id: 6,
        name: "Catamaran Sunset Cruise",
        description: "Sail into the golden sunset on a luxurious catamaran with open bar and live Caribbean music.",
        highlight: "Drinks Included"
      },
      {
        id: 7,
        name: "ATV Beach Excursion",
        description: "Ride powerful ATVs through scenic coastal trails, jungle paths, and stunning beach overlooks.",
        highlight: "Beginner Friendly"
      },
      {
        id: 8,
        name: "Cultural Santo Domingo Tour",
        description: "Discover the rich history of the Caribbean's oldest city. Visit UNESCO colonial monuments, museums, and local markets.",
        highlight: "Lunch Included"
      }
    ],

    modal: {
      highlights: "Highlights",
      bookNow:    "Book Now",
      from:       "From",
      perPerson:  "per person",
      reviews:    "reviews"
    }
  },

  /* ========================  ESPAÑOL  ======================== */

  es: {
    nav: {
      tours:    "Tours",
      aboutUs:  "Nosotros",
      bookNow:  "Reservar Ahora"
    },

    hero: {
      title:             "La Aventura te Espera en el Paraíso",
      searchPlaceholder: "Buscar tours…",
      searchBtn:         "Buscar",
      guestsDefault:     "Viajeros"
    },

    categories: {
      sectionLabel: "Explora por tipo",
      sectionTitle: "Encuentra tu Aventura",
      catamarans:   "Catamaranes",
      catDesc:      "Navega las aguas turquesa con estilo y lujo.",
      buggies:      "Buggies",
      bugDesc:      "Aventuras todoterreno por paisajes tropicales.",
      safaris:      "Safaris",
      safDesc:      "Descubre la cultura local y las joyas naturales escondidas.",
      explore:      "Explorar"
    },

    featured: {
      sectionLabel: "Seleccionados para ti",
      sectionTitle: "Tours Mejor Valorados",
      viewAll:      "Ver Todos los Tours",
      from:         "Desde",
      details:      "Ver más"
    },

    featuredTours: [
      {
        id:          1,
        name:        "Paraíso en Isla Saona",
        description: "Excursión de día completo a la isla más hermosa del Caribe con almuerzo incluido.",
        duration:    "8 horas",
        meta:        "Hasta 15",
        badge:       "Más Vendido"
      },
      {
        id:          2,
        name:        "Aventura Buggy en la Jungla",
        description: "Siente la adrenalina del todoterreno atravesando aldeas locales y senderos fangosos.",
        duration:    "4 horas",
        meta:        "Principiante",
        badge:       null
      },
      {
        id:          3,
        name:        "Tour de Snorkel en el Arrecife",
        description: "Sumérgete en las cristalinas aguas del Atlántico y descubre la vibrante vida marina.",
        duration:    "3 horas",
        meta:        "Equipo incl.",
        badge:       null
      }
    ],

    whyUs: {
      sectionLabel:  "Por qué elegirnos",
      sectionTitle:  "Expertos Locales, Experiencia de Clase Mundial",
      intro:         "Somos un equipo de locales apasionados que conocen cada rincón de Punta Cana. Nuestro objetivo es brindarte experiencias auténticas, seguras e inolvidables.",
      feature1Title: "Experiencia Local",
      feature1Desc:  "Nuestros guías conocen los rincones secretos que los turistas adoran descubrir.",
      feature2Title: "Seguridad Primero",
      feature2Desc:  "Estándares máximos de seguridad en todos los tours, con equipo certificado y guías entrenados.",
      feature3Title: "Mejor Precio Garantizado",
      feature3Desc:  "Precios locales competitivos, sin cargos ocultos. Si encuentras más barato, te igualamos."
    },

    cta: {
      sectionLabel:     "Mantente informado",
      title:            "Ofertas Exclusivas y Consejos de Viaje",
      subtitle:         "Únete a más de 5,000 viajeros que reciben acceso anticipado a nuevos tours, descuentos de temporada y guías exclusivos de Punta Cana.",
      emailPlaceholder: "tu@correo.com",
      subscribeBtn:     "Suscribirme Gratis",
      privacyNote:      "Sin spam, nunca. Cancela con un clic.",
      successMsg:       "🎉 ¡Ya eres parte de la aventura! Revisa tu bandeja de entrada."
    },

    footer: {
      tagline:       "Tu guía local para los mejores tours, excursiones y aventuras en Punta Cana, República Dominicana.",
      discoverTitle: "Descubrir",
      supportTitle:  "Soporte",
      link_tours:    "Tours",
      link_about:    "Nosotros",
      link_sitemap:  "Mapa del Sitio",
      link_privacy:  "Política de Privacidad",
      link_terms:    "Términos de Servicio",
      link_contact:  "Contáctanos",
      copyright:     "© 2025 iTour Punta Cana. Todos los derechos reservados.",
      madeWith:      "Hecho con ♥ en Punta Cana, República Dominicana"
    },

    toursHeader: {
      breadcrumbHome:    "Inicio",
      breadcrumbCurrent: "Todos los Tours",
      pageTitle:         "Aventuras Caribeñas",
      pageSubtitle:      "Descubre excursiones seleccionadas por expertos locales. Desde aguas turquesa hasta selvas escondidas, tu paraíso te espera."
    },

    filters: {
      title:         "Filtros",
      clearAll:      "Limpiar todo",
      showFilters:   "Mostrar Filtros",
      hideFilters:   "Ocultar Filtros",
      categoryLabel: "Categoría",
      cat1:          "Deportes Acuáticos",
      cat2:          "Cháters Privados",
      cat3:          "Tours Culturales",
      cat4:          "Naturaleza y Fauna",
      priceLabel:    "Precio Máximo",
      durationLabel: "Duración",
      dur1:          "Medio Día",
      dur2:          "Día Completo",
      dur3:          "Varios Días",
      dur4:          "Tour Nocturno",
      applyBtn:      "Aplicar Filtros"
    },

    toursGrid: {
      sortLabel:      "Ordenar por:",
      sortPopular:    "Más Popular",
      sortPriceLow:   "Precio: Menor a Mayor",
      sortPriceHigh:  "Precio: Mayor a Menor",
      sortRating:     "Mejor Valorados",
      perPerson:      "/ persona",
      quickView:      "Vista Rápida",
      bookNow:        "Reservar Ahora",
      badgeBestseller: "MÁS VENDIDO",
      badgeLimited:   "CUPOS LIMITADOS",
      noToursTitle:   "No se encontraron tours",
      noToursDesc:    "Intenta ajustar tus filtros o términos de búsqueda.",
      clearFilters:   "Limpiar Filtros",
      showing:        "Mostrando",
      tours:          "tour"
    },

    toursData: [
      {
        id: 1,
        name: "Crucero de Lujo a Isla Saona",
        description: "Escápate al paraíso en nuestro catamarán insignia. Aguas cristalinas, playas de arena blanca y una experiencia inolvidable de día completo.",
        highlight: "Snorkel Incluido"
      },
      {
        id: 2,
        name: "Aventura Buggy y Barro en la Jungla",
        description: "Sal de los caminos habituales y explora el terreno selvático de Punta Cana en un potente buggy todoterreno.",
        highlight: "Almuerzo Incluido"
      },
      {
        id: 3,
        name: "Explorador en Yate Privado",
        description: "Una experiencia completamente personalizada en tu yate privado. Tú eliges la ruta, el ritmo y tu paraíso.",
        highlight: "Grupo Privado"
      },
      {
        id: 4,
        name: "Descubrimiento en el Arrecife",
        description: "Explora los arrecifes de coral más vibrantes del mundo. Perfecto tanto para principiantes como para snorkeleros con experiencia.",
        highlight: "Equipo Incluido"
      },
      {
        id: 5,
        name: "Aventura en la Cueva Hoyo Azul",
        description: "Descubre un cenote escondido en lo profundo de la selva. Nada en la piscina natural de aguas azul cristal rodeada de vegetación exuberante.",
        highlight: "Guía Incluido"
      },
      {
        id: 6,
        name: "Crucero al Atardecer en Catamarán",
        description: "Termina tu día en el paraíso con un impresionante crucero al atardecer. Barra libre, música en vivo y magia caribeña.",
        highlight: "Bebidas Incluidas"
      },
      {
        id: 7,
        name: "Excursión en ATV por la Playa",
        description: "Recorre la playa y los senderos de la jungla en un potente ATV. Sin experiencia necesaria — adrenalina pura garantizada.",
        highlight: "Apto para Principiantes"
      },
      {
        id: 8,
        name: "Tour Cultural a Santo Domingo",
        description: "Viaja en el tiempo y explora la ciudad europea más antigua de América. Historia rica, arquitectura colonial y cultura dominicana auténtica.",
        highlight: "Almuerzo Incluido"
      }
    ],

    modal: {
      highlights: "Incluye",
      bookNow:    "Reservar Ahora",
      from:       "Desde",
      perPerson:  "por persona",
      reviews:    "reseñas"
    }
  }
};
