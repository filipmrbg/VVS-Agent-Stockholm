/**
 * CENTRALIZED IMAGE CONFIGURATION
 *
 * All images used across the template are defined here.
 * To customize for a new company: replace the URLs below.
 *
 * Recommended dimensions per slot:
 *   hero.background       — 1400×800+ (wide, dark works best with overlay text)
 *   services.*            — 900×600 (landscape, subject-focused)
 *   gallery[]             — 800×800 (square crop)
 *   cta.banner            — 600×420 (portrait/square, shown in right column)
 *   cta.midSection        — 1400×600 (wide, used as background with dark overlay)
 *   about.hero            — 600×750 (portrait, team or company)
 *   about.teamMember      — 300×300 (square, headshot)
 *   whyChooseUs           — 600×auto (portrait or landscape, detail shot)
 *   ideaToResult          — 600×auto (landscape, process/progress shot)
 *   portfolio[]           — 800×600 (landscape, finished project photos)
 *   servicePages.*        — see individual slots below
 */

export interface ImageSlot {
  url: string;
  alt: string;
}

export interface SiteImages {
  logo: ImageSlot;
  logoDark?: ImageSlot;
  hero: {
    background: ImageSlot;
  };
  services: {
    varmepumpar?: ImageSlot;
    badrumKok?: ImageSlot;
    rorservice?: ImageSlot;
    golvvarme?: ImageSlot;
    [key: string]: ImageSlot | undefined;
  };
  gallery: ImageSlot[];
  cta: {
    banner: ImageSlot;
    midSection: ImageSlot;
  };
  about: {
    hero: ImageSlot;
    teamMember: ImageSlot;
  };
  whyChooseUs: ImageSlot;
  ideaToResult: ImageSlot;
  portfolio: {
    image: ImageSlot;
    title: string;
    category: string;
  }[];
  servicePages: {
    varmepumpar: {
      hero: ImageSlot;
      section1: ImageSlot;
      section2: ImageSlot;
    };
    badrumKok: {
      hero: ImageSlot;
      section1: ImageSlot;
      section2: ImageSlot;
    };
    rorservice: {
      hero: ImageSlot;
      section1: ImageSlot;
      section2: ImageSlot;
    };
    golvvarme: {
      hero: ImageSlot;
      section1: ImageSlot;
      section2: ImageSlot;
    };
  };
}

const images: SiteImages = {
  logo: {
    url: '/logo-white.png',
    alt: 'VVS AGENT STOCKHOLM AB',
  },
  logoDark: {
    url: '/logo-dark.png',
    alt: 'VVS AGENT STOCKHOLM AB',
  },

  hero: {
    background: {
      url: '/hero-main.webp',
      alt: 'VVS AGENT STOCKHOLM AB - Specialister inom VVS & Fastighetsservice',
    },
  },

  services: {
    varmepumpar: {
      url: '/images/service_varmepumpar.jpg',
      alt: 'Värmepumpsinstallation och värmesystem i Stockholm',
    },
    badrumKok: {
      url: 'https://i.imgur.com/YSkjklc.png',
      alt: 'Fackmannamässig VVS-installation i badrum och kök',
    },
    rorservice: {
      url: '/images/service_reparation.jpg',
      alt: 'Reparation, underhåll och akut rörservice',
    },
    golvvarme: {
      url: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/779816003_915756511602777_7830897370362718145_n.png?_nc_cat=101&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=NVA4ZvkVGcgQ7kNvwEe-yxT&_nc_oc=Adp5n6Ru4KPnGPni7QAgBYsxtgRH5R9RDqeJpV2KS3SWYs0bW8VAStQb8q5j56t_tm4&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_ss=7b6a8&oh=03_Q7cD6AGen2Ycgb5rvsQHM2UHImy32FgrWcrIbMqP-6HxINzloA&oe=6AAD2507',
      alt: 'Rådgivning och fastighetsservice',
    },
  },

  gallery: [
    { url: '/gallery-1.jpg', alt: 'Kopparrörsdragning och VVS-montage i badrum' },
    { url: '/gallery-4.jpg', alt: 'Färdigställt badrumsprojekt med dolda rör' },
    { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800', alt: 'Värmesystem och injustering' },
    { url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800', alt: 'Rörservice och ventilbyte' },
  ],

  cta: {
    banner: {
      url: '/images/service_varmepumpar.jpg',
      alt: 'VVS Agent Stockholm - Offertförfrågan',
    },
    midSection: {
      url: 'https://i.imgur.com/YSkjklc.png',
      alt: 'Fackmannamässig VVS-service',
    },
  },

  about: {
    hero: {
      url: '/logo-dark.png',
      alt: 'VVS Agent Stockholm AB Logotyp',
    },
    teamMember: {
      url: '/logo-white.png',
      alt: 'Farid Alizadeh - VVS Agent Stockholm AB',
    },
  },

  whyChooseUs: {
    url: '/why-choose-us.webp',
    alt: 'Noggrant hantverk i detalj',
  },

  ideaToResult: {
    url: '/idea-to-result.webp',
    alt: 'Från idé till färdigt resultat',
  },

  portfolio: [
    {
      image: { url: '/images/service_varmepumpar.jpg', alt: 'Installation av värmepump och värmesystem' },
      title: 'Värmesystem & Värmepumpar',
      category: 'Värme',
    },
    {
      image: { url: '/gallery-1.jpg', alt: 'Badrumsrenovering och rördragning' },
      title: 'Kök & Badrums-VVS',
      category: 'Badrum & Kök',
    },
    {
      image: { url: '/gallery-4.jpg', alt: 'Reparation & VVS-underhåll' },
      title: 'Reparation & Rörservice',
      category: 'Service',
    },
    {
      image: { url: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/779816003_915756511602777_7830897370362718145_n.png?_nc_cat=101&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=NVA4ZvkVGcgQ7kNvwEe-yxT&_nc_oc=Adp5n6Ru4KPnGPni7QAgBYsxtgRH5R9RDqeJpV2KS3SWYs0bW8VAStQb8q5j56t_tm4&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_ss=7b6a8&oh=03_Q7cD6AGen2Ycgb5rvsQHM2UHImy32FgrWcrIbMqP-6HxINzloA&oe=6AAD2507', alt: 'Rådgivning & Fastighetsservice' },
      title: 'Fastighetsservice & Rådgivning',
      category: 'Fastighetsservice',
    },
  ],

  servicePages: {
    varmepumpar: {
      hero: {
        url: '/images/service_varmepumpar.jpg',
        alt: 'Installation av värmepump',
      },
      section1: {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900',
        alt: 'Bergvärme och luft-vatten',
      },
      section2: {
        url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=900',
        alt: 'Värmesystem i drift',
      },
    },
    badrumKok: {
      hero: {
        url: 'https://i.imgur.com/YSkjklc.png',
        alt: 'VVS i badrum och kök',
      },
      section1: {
        url: '/gallery-1.jpg',
        alt: 'Montering av sanitetsporslin och rördragning',
      },
      section2: {
        url: '/gallery-4.jpg',
        alt: 'Rördragning badrum',
      },
    },
    rorservice: {
      hero: {
        url: '/images/service_reparation.jpg',
        alt: 'Rörservice och felsökning',
      },
      section1: {
        url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=900',
        alt: 'Akut reparation av läckor',
      },
      section2: {
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900',
        alt: 'Varmvattenberedare byte',
      },
    },
    golvvarme: {
      hero: {
        url: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/779816003_915756511602777_7830897370362718145_n.png?_nc_cat=101&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=NVA4ZvkVGcgQ7kNvwEe-yxT&_nc_oc=Adp5n6Ru4KPnGPni7QAgBYsxtgRH5R9RDqeJpV2KS3SWYs0bW8VAStQb8q5j56t_tm4&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_ss=7b6a8&oh=03_Q7cD6AGen2Ycgb5rvsQHM2UHImy32FgrWcrIbMqP-6HxINzloA&oe=6AAD2507',
        alt: 'Rådgivning och fastighetsservice',
      },
      section1: {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900',
        alt: 'Rörförläggning och fastighetsservice',
      },
      section2: {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=900',
        alt: 'Fastighetsservice i Stockholm',
      },
    },
  },
};

export default images;
