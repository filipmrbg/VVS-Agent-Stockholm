export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  heroText: string;
  detailedDescription: string;
  heroImage: string;
  image: string;
  imagePosition?: string;
  homeImagePosition?: string;
  homeImageTransform?: string;
  href: string;
  tag?: string;
  badge?: string;
  highlights?: string[];
  sections?: Array<{
    heading?: string;
    text?: string;
    image?: string;
    bullets?: string[];
    subsections?: Array<{
      subheading: string;
      text: string;
    }>;
  }>;
  faq?: FAQItem[];
  iconName?: string;
  features?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export const services: ServiceItem[] = [
  {
    slug: 'varmepumpar',
    title: 'Värmepumpar & Värmesystem',
    shortDescription: 'Installation, service och felsökning av luft-vatten och bergvärmepumpar för ett effektivt och hållbart inomhusklimat.',
    heroText: 'Sänk dina energikostnader med en modern värmepump. Installation, utbyte och service av bergvärme och luft/vatten.',
    detailedDescription: `En modern värmepump är en av de mest lönsamma investeringarna du kan göra för din fastighet. Som certifierade värmepumpstekniker hjälper vi dig genom hela processen – från dimensionering och val av rätt anläggning till komplett installation, injustering och driftsättning.

Vi utför nyinstallationer, utbyten av äldre värmepumpar samt löpande service och felsökning på marknadsledande märken som NIBE, CTC, Bosch, Daikin och IVT. Med rätt dimensionerat värmesystem och fackmannamässigt montage säkerställer du maximal driftsäkerhet och lägsta möjliga uppvärmningskostnad.`,
    heroImage: '/images/service_varmepumpar.jpg',
    image: '/images/service_varmepumpar.jpg',
    href: '/tjanster#varmepumpar',
    tag: 'Värme & Energi',
    highlights: [
      'Installation och byte av bergvärme & luft/vatten',
      'Erfarna VVS- & värmepumpstekniker',
      'Service, optimering och felkodsläsning',
      '30% ROT-avdrag direkt på arbetskostnaden',
    ],
    sections: [
      {
        heading: 'Energieffektiv värme anpassad för ditt hem',
        text: 'Genom att byta ut en äldre el- eller oljepanna till en modern värmepump kan du minska uppvärmningskostnaderna med upp till 75-80%. Vi beräknar ditt effektbehov och rekommenderar den optimala lösningen för din fastighet.',
        bullets: [
          'Bergvärme: Högsta besparing och driftsäkerhet med bergvärmepump och borrhål',
          'Luft/Vatten: Perfekt alternativ som utvinner energi direkt ur uteluften',
          'Frånluftsvärmepump: Effektiv återvinning av ventilationsluft i moderna villor',
          'Injustering & Service: Regelbunden kontroll för att garantera optimal verkningsgrad',
        ],
      },
      {
        heading: 'Samarbete med ledande tillverkare',
        text: 'Vi arbetar uteslutande med beprövade kvalitetspumpar från NIBE, CTC, Bosch och Daikin. Alla installationer utförs med fullständiga fabriksgarantier och trygghetsförsäkringar.',
      },
    ],
    faq: [
      {
        question: 'Hur mycket kan jag spara på att byta värmepump?',
        answer: 'Besparingen beror på husets storlek och nuvarande uppvärmningssystem, men en modern värmepump kan ofta sänka energiförbrukningen med mellan 50% och 80%.',
      },
      {
        question: 'Hur lång tid tar en värmepumpsinstallation?',
        answer: 'Ett standardbyte av en befintlig värmepump tar vanligtvis 1 till 2 arbetsdagar. Vid nyinstallation av bergvärme tillkommer borrning som tar 1-2 dagar.',
      },
    ],
  },
  {
    slug: 'badrum-kok',
    title: 'Badrum & Kök',
    shortDescription: 'Montering och byte av blandare, toaletter, diskmaskiner och annan VVS-utrustning – både vid renovering och service.',
    heroText: 'Trygga VVS-installationer för badrum och kök. Professionellt utförande med garanti och fullt skydd.',
    detailedDescription: `Vid renovering eller nybyggnad av badrum och kök är fackmässigt VVS-arbete avgörande för att förhindra fukt- och vattenskador. Vi utför alla typer av VVS-arbeten – från installation av diskmaskin, tvättmaskin och blandarbyten till kompletta rördragningar, golvbrunnar och montering av sanitetsporslin.

Alla rördragningar och kopplingar utförs fackmannamässigt med godkända metoder och kvalitetsmaterial enligt gällande branschstandarder för maximal trygghet och hållbarhet.`,
    heroImage: 'https://i.imgur.com/YSkjklc.png',
    image: 'https://i.imgur.com/YSkjklc.png',
    imagePosition: '51% 100%',
    homeImagePosition: '47% 0%',
    homeImageTransform: 'scale(1) translate(-1px, -88px)',
    href: '/tjanster#badrum-kok',
    tag: 'Installation & Renovering',
    highlights: [
      'Fackmannamässig rördragning & montering',
      'Byte av tvättställs-, dusch- och köksblandare',
      'Montering av toaletter, kommoder och sanitetsporslin',
      'Inkoppling av diskmaskin, tvättmaskin och vattenfilter',
    ],
    sections: [
      {
        heading: 'Säkra vatteninstallationer utan kompromisser',
        text: 'Ett felaktigt kopplat rör kan snabbt leda till kostsamma fuktskador. Vi garanterar att alla installationer uppfyller gällande byggregler och branschstandarder.',
        bullets: [
          'Vatten och avlopp: Kompletta stam- och rördragningar vid renovering',
          'Sanitet: Montering av toalettstolar, duschväggar, badkar och kommoder',
          'Kök: Säker anslutning av diskmaskin, vattenansluten kyl/frys och blandare',
          'Vattenfelsbrytare: Installation av automatiska avstängningsventiler vid läckage',
        ],
      },
    ],
    faq: [
      {
        question: 'Får jag skriftlig garanti och dokumentation efter färdigställt badrum?',
        answer: 'Ja, vi utfärdar alltid fullständig dokumentation och garanti som styrker att installationen följer alla gällande branschregler och normer.',
      },
    ],
  },
  {
    slug: 'reparation-underhall',
    title: 'Reparation & Underhåll',
    shortDescription: 'Snabb hjälp vid läckor, stopp och andra akuta problem, med service och underhåll som säkerställer att dina VVS-system fungerar.',
    heroText: 'Snabb och pålitlig rörservice vid akuta läckor, avloppsstopp och underhåll av VVS-system.',
    detailedDescription: `När ett rör börjar läcka eller avloppet svämmar över är snabba åtgärder avgörande för att undvika kostsamma vattenskador. Vi erbjuder snabb och professionell rörservice för både akuta situationer och förebyggande underhåll i villor, flerbostadshus och kommersiella lokaler.

Våra servicebilar är fullt utrustade med moderna verktyg, packningar, rördelar och reservdelar för att kunna åtgärda de flesta problem direkt på plats vid första besöket.`,
    heroImage: '/images/service_reparation.jpg',
    image: '/images/service_reparation.jpg',
    href: '/tjanster#reparation-underhall',
    tag: 'Service & Jour',
    highlights: [
      'Snabb inställelse vid akuta vattenläckor',
      'Avloppsrensning och mekanisk rensning av rör',
      'Byte och reparation av varmvattenberedare',
      'Underhållsservice för fastigheter och bostadsrättsföreningar',
    ],
    sections: [
      {
        heading: 'Akut hjälp och förebyggande VVS-service',
        text: 'Vi hjälper dig med allt från droppande kranar och rinnande toaletter till akuta rörbrott och utbyten av läckande varmvattenberedare.',
        bullets: [
          'Läckagesökning: Snabb lokalisering och tätning av dolda eller synliga rörläckor',
          'Avlopp: Rensning och åtgärdande av akuta stopp i kök, badrum och stammar',
          'Varmvattenberedare: Felsökning, byte av offeranod, säkerhetsventiler eller komplett utbyte',
          'Ventiler: Byte av slitna huvudkranar, ballofixer och avstängningsventiler',
        ],
      },
    ],
    faq: [
      {
        question: 'Vad ska jag göra om jag upptäcker en akut vattenläcka?',
        answer: 'Stäng omedelbart av huvudvattenkranen (servisen) i fastigheten och kontakta oss direkt så kommer vi ut och åtgärdar skadan.',
      },
    ],
  },
  {
    slug: 'radgivning',
    title: 'Rådgivning',
    shortDescription: 'Personlig rådgivning och lösningar anpassade efter ditt hem eller företag, med fokus på långsiktig kvalitet och energieffektivitet.',
    heroText: 'Fackmässig rådgivning och långsiktig fastighetsservice för lägre energikostnader och optimal komfort.',
    detailedDescription: `Med rätt rådgivning och energioptimering kan du spara stora summor på din fastighets driftkostnader. Vi hjälper fastighetsägare, bostadsrättsföreningar och privatpersoner att se över sina värme- och VVS-system, identifiera energitjuvar och planera nödvändiga moderniseringar.

Vi erbjuder personliga hembesök, projektering inför ombyggnationer samt löpande tillsyn och serviceavtal för bostadsrättsföreningar och företag.`,
    heroImage: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/779816003_915756511602777_7830897370362718145_n.png?_nc_cat=101&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=NVA4ZvkVGcgQ7kNvwEe-yxT&_nc_oc=Adp5n6Ru4KPnGPni7QAgBYsxtgRH5R9RDqeJpV2KS3SWYs0bW8VAStQb8q5j56t_tm4&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_ss=7b6a8&oh=03_Q7cD6AGen2Ycgb5rvsQHM2UHImy32FgrWcrIbMqP-6HxINzloA&oe=6AAD2507',
    image: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/779816003_915756511602777_7830897370362718145_n.png?_nc_cat=101&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=NVA4ZvkVGcgQ7kNvwEe-yxT&_nc_oc=Adp5n6Ru4KPnGPni7QAgBYsxtgRH5R9RDqeJpV2KS3SWYs0bW8VAStQb8q5j56t_tm4&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_ss=7b6a8&oh=03_Q7cD6AGen2Ycgb5rvsQHM2UHImy32FgrWcrIbMqP-6HxINzloA&oe=6AAD2507',
    imagePosition: 'center 58%',
    href: '/tjanster#radgivning',
    tag: 'Rådgivning & Fastighet',
    highlights: [
      'Kostnadsfri rådgivning och behovsanalys',
      'Energioptimering och injustering av värmesystem',
      'Planering och projektering inför renoveringar',
      'Serviceavtal och tillsyn för fastighetsägare & BRF:er',
    ],
    sections: [
      {
        heading: 'Långsiktig kvalitet och personlig kontakt',
        text: 'Vi tror på långsiktiga kundrelationer där du alltid har en personlig rörmokare att vända dig till för alla typer av frågor och funderingar.',
        bullets: [
          'Energiöversyn: Kartläggning av befintlig uppvärmning och åtgärdsförslag',
          'Förstudie: Rådgivning inför byte av värmesystem eller stambyte',
          'Fastighetstillsyn: Regelbunden kontroll av pumpar, tryckkärl och ventiler',
          'Personlig kontakt: Tydliga offerter utan dolda påslag',
        ],
      },
    ],
    faq: [
      {
        question: 'Kostar ett rådgivningsbesök något?',
        answer: 'Nej, vi erbjuder alltid kostnadsfri rådgivning och offert inför planerade VVS- och värmepumpsarbeten.',
      },
    ],
  },
];

export default services;
