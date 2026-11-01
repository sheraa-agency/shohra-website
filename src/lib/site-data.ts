/* ------------------------------------------------------------------
   SHOHRA Marketing Agency — verified content layer
   Every fact below was extracted from the client's official sources:
   - shohrah.com (official website)
   - linktr.ee/shohramarketing1
   - booming-feels-o49oc.ship.place (partner stores portfolio)
   - upbeat-decade-j5di9.ship.place (sales dashboards)
   - plaid-subway-otr91.ship.place + Google Sites feedbacks (reviews)
   Nothing here is invented. Sources are marked per item.
------------------------------------------------------------------- */

export const CONTACT = {
  whatsappNumber: "966554927428",
  whatsappDisplay: "+966 55 492 7428",
  email: "info@shohrah.com",
  website: "https://www.shohrah.com",
  linktree: "https://linktr.ee/shohramarketing1",
  maps: "https://maps.app.goo.gl/9LCFvdVdtqspzmQJ8",
  city: { ar: "جدة، المملكة العربية السعودية", en: "Jeddah, Saudi Arabia" },
  hours: { ar: "السبت – الخميس · 9 صباحاً – 6 مساءً", en: "Sat – Thu · 9 AM – 6 PM" },
} as const;

/* ------------------------------------------------------------------
   Official credentials — verified from the agency's official documents:
   - Ministry of Commerce CR certificate (شهادة السجل التجاري):
     legal name "مؤسسة شهرة المستقبل للتسويق الرقمي", issued 07/04/2023,
     entity type مؤسسة, status نشط.
   The PDF is served verbatim from /assets/docs/; the certificate image
   and Ministry of Commerce logo are cropped verbatim from the official
   certificate.
------------------------------------------------------------------- */
export const CREDENTIALS = {
  legalName: { ar: "مؤسسة شهرة المستقبل للتسويق الرقمي", en: "Shohra Al-Mustaqbal Digital Marketing Est." },
  crNumber: "4030507737",
  issueDate: "07/04/2023",
  status: { ar: "نشط", en: "Active" },
  crPdf: "/assets/docs/cr-certificate.pdf",
  crImage: "/assets/docs/cr-certificate.webp",
  crImageW: 1117,
  crImageH: 790,
  mcLogo: "/assets/docs/mc-logo.png",
} as const;

export const waLink = (text: string) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;

/* Pre-filled WhatsApp messages — same ones used on the client's live pages */
export const WA_MESSAGES = {
  consult: {
    ar: "السلام عليكم، أرغب في استشارة تسويقية لمتجري",
    en: "Hello, I would like a free marketing consultation for my store",
  },
  growth: {
    ar: "السلام عليكم، أرغب في مضاعفة مبيعات متجري مع مؤسسة شهرة",
    en: "Hello, I want to multiply my store's sales with SHOHRA",
  },
  portfolio: {
    ar: "السلام عليكم، تواصلت معكم بعد الاطلاع على معرض أعمال مؤسسة شهرة التسويقية، وأرغب في خدماتكم لمتجري",
    en: "Hello, I contacted you after viewing SHOHRA's portfolio and I'm interested in your services for my store",
  },
};

/* ---------------- Statistics (client-supplied figures) ---------------- */
export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: { ar: string; en: string };
  note: { ar: string; en: string };
  countUp: boolean;
}

export const STATS: StatItem[] = [
  {
    value: 1.5,
    prefix: "+",
    suffix: "M",
    decimals: 1,
    label: { ar: "متابع", en: "Followers" },
    note: { ar: "عبر شبكات شركائنا", en: "across our partners' networks" },
    countUp: true,
  },
  {
    value: 2,
    label: { ar: "سنتين شراكة", en: "2-year partnerships" },
    note: { ar: "شراكات ممتدة ومستمرة", en: "extended ongoing partnerships" },
    countUp: false,
  },
  {
    value: 720,
    label: { ar: "عميل متعاقد", en: "contracted clients" },
    note: { ar: "إجمالي العملاء المتعاقدين معنا", en: "total contracted clients" },
    countUp: true,
  },
];

/* ---------------- Services (official website) ---------------- */
export interface Service {
  id: string;
  icon: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
}

export const SERVICES: Service[] = [
  {
    id: "seo",
    icon: "Search",
    title: { ar: "تحسين محركات البحث", en: "SEO & Search Visibility" },
    desc: {
      ar: "نرفع ظهور متجرك في نتائج بحث جوجل ليصل عملاؤك إليك أولًا — تحليل كلمات، تحسين تقني، ومحتوى يقود نموًا عضويًا مستدامًا.",
      en: "We raise your store's visibility on Google so customers find you first — keyword analysis, technical optimization and content that drives sustainable organic growth.",
    },
  },
  {
    id: "ads",
    icon: "Target",
    title: { ar: "إدارة الحملات الإعلانية", en: "Performance Marketing" },
    desc: {
      ar: "حملات ممولة مبنية على البيانات عبر تيك توك وسناب شات وجوجل، مع تحسين مستمر للميزانية لتحقيق أعلى عائد استثمار ممكن.",
      en: "Data-driven paid campaigns across TikTok, Snapchat and Google with continuous budget optimization for the highest possible return.",
    },
  },
  {
    id: "store",
    icon: "ShoppingBag",
    title: { ar: "إنشاء وتطوير المتاجر", en: "E-commerce Development" },
    desc: {
      ar: "تصميم وبناء متاجر احترافية على سلة وزد بواجهات سريعة وسهلة، مُهيّأة للتحويل ومن صقل تجربة الشراء حتى آخر تفصيلة.",
      en: "Designing and building professional stores on Salla and Zid — fast, conversion-ready interfaces refined down to the last checkout detail.",
    },
  },
  {
    id: "uiux",
    icon: "PenTool",
    title: { ar: "تصميم واجهات وتجربة المستخدم", en: "UI/UX Design" },
    desc: {
      ar: "واجهات عصرية أنيقة مبنية على فهم سلوك العميل السعودي، تحوّل الزيارة إلى تجربة شراء سلسة لا تُنسى.",
      en: "Modern, elegant interfaces built on a deep understanding of Saudi customer behavior — turning visits into seamless, memorable purchase journeys.",
    },
  },
  {
    id: "social",
    icon: "Share2",
    title: { ar: "إدارة التواصل الاجتماعي", en: "Social Media Management" },
    desc: {
      ar: "إدارة كاملة لحساباتك: هوية بصرية متسقة، محتوى إبداعي، وخطة نشر تحوّل المتابعين إلى عملاء أوفياء.",
      en: "Full account management: consistent visual identity, creative content and a publishing plan that turns followers into loyal customers.",
    },
  },
  {
    id: "brand",
    icon: "Gem",
    title: { ar: "التصميم الإبداعي والهوية البصرية", en: "Creative Design & Branding" },
    desc: {
      ar: "من الشعار إلى دليل الهوية الكامل، نبني علامة تجارية مميزة تعكس طموحك وتثبت في ذاكرة السوق السعودي.",
      en: "From logo to full brand guidelines, we build a distinctive brand that reflects your ambition and stays in the Saudi market's memory.",
    },
  },
];

/* ---------------- Partner stores (verified portfolio source) ---------------- */
export type CategoryId =
  | "gold"
  | "food"
  | "fashion"
  | "coffee"
  | "fitness"
  | "gifts";

export const CATEGORIES: { id: CategoryId | "all"; label: { ar: string; en: string } }[] = [
  { id: "all", label: { ar: "جميع النماذج", en: "All projects" } },
  { id: "gold", label: { ar: "الذهب والمجوهرات", en: "Gold & Jewelry" } },
  { id: "food", label: { ar: "الأغذية والصحة", en: "Food & Health" } },
  { id: "fashion", label: { ar: "الأزياء والملابس", en: "Fashion & Apparel" } },
  { id: "coffee", label: { ar: "القهوة والبهارات", en: "Coffee & Spices" } },
  { id: "fitness", label: { ar: "الرياضة واللياقة", en: "Sports & Fitness" } },
  { id: "gifts", label: { ar: "الهدايا والمنتجات المتخصصة", en: "Gifts & Specialty" } },
];

export interface Store {
  id: string;
  name: { ar: string; en: string };
  latin: string;
  category: Exclude<CategoryId, "all">;
  tagline: { ar: string; en: string };
  desc: { ar: string; en: string };
  image: string;
  link: string;
  platform: { ar: string; en: string };
  verified?: boolean;
  badges: { ar: string; en: string }[];
  services: { ar: string; en: string }[];
  metrics: { label: { ar: string; en: string }; value: string }[];
  testimonial?: { ar: string; en: string };
}

export const STORES: Store[] = [
  {
    id: "taiba",
    name: { ar: "طيبة للذهب والمجوهرات", en: "Taiba Gold & Jewelry" },
    latin: "TAIBA",
    category: "gold",
    tagline: { ar: "ذٌقَي الذهب والرِّفاهية", en: "The taste of gold & luxury" },
    desc: {
      ar: "أكبر مصنع ومصمم للذهب والمجوهرات بالشرق الأوسط، بعِراقبة تمتد منذ عام 1989.",
      en: "The largest gold & jewelry manufacturer and designer in the Middle East, with heritage dating back to 1989.",
    },
    image: "/assets/stores/taiba.webp",
    link: "https://taiba.com/",
    platform: { ar: "منصة سلة", en: "Salla platform" },
    verified: true,
    badges: [
      { ar: "إرث منذ 1989", en: "Heritage since 1989" },
      { ar: "تغطية إقليمية ودولية", en: "Regional & international reach" },
    ],
    services: [
      { ar: "تصميم واجهة متجر VIP", en: "VIP storefront design" },
      { ar: "جلسات تصوير سينمائية", en: "Cinematic photoshoots" },
      { ar: "حملات إعلانية فاخرة", en: "Premium ad campaigns" },
    ],
    metrics: [
      { label: { ar: "المتابعون", en: "Followers" }, value: "+68.1K" },
      { label: { ar: "العراقة", en: "Heritage" }, value: "1989" },
      { label: { ar: "التغطية", en: "Reach" }, value: "Regional +" },
    ],
  },
  {
    id: "zaadana",
    name: { ar: "متجر زادنا", en: "Zaadana Store" },
    latin: "ZAADANA",
    category: "food",
    tagline: { ar: "كيتو وعضوي 100%", en: "100% keto & organic" },
    desc: {
      ar: "منتجات غذائية عضوية وصحية، كيتو وخالية من الجلوتين، مع شحن إقليمي يصل إلى 6 دول.",
      en: "Organic health foods — keto and gluten-free — with regional shipping to 6 countries.",
    },
    image: "/assets/stores/zaadana.webp",
    link: "https://zaadana.com/ar",
    platform: { ar: "منصة سلة", en: "Salla platform" },
    verified: true,
    badges: [
      { ar: "شحن إقليمي 6 دول", en: "Shipping to 6 countries" },
      { ar: "محتوى +2,900 منشور", en: "+2,900 posts" },
    ],
    services: [
      { ar: "واجهة أورجانيك عصرية", en: "Modern organic storefront" },
      { ar: "عروض شحن مجاني", en: "Free-shipping offers" },
      { ar: "حملات التوسع بالخليج", en: "GCC expansion campaigns" },
    ],
    metrics: [
      { label: { ar: "المتابعون", en: "Followers" }, value: "+33.5K" },
      { label: { ar: "الشحن", en: "Shipping" }, value: "6 دول" },
      { label: { ar: "المنشورات", en: "Posts" }, value: "+2,900" },
    ],
  },
  {
    id: "chocolate",
    name: { ar: "شوكلت تولز", en: "Chocolate Tools" },
    latin: "CHOCOLATE TOOLS",
    category: "food",
    tagline: { ar: "أدوات وقوالب الشوكولاتة", en: "Chocolate tools & molds" },
    desc: {
      ar: "ملتقى أدوات وقوالب الشوكولاتة الأكريليك ودورات التدريب — مجتمع يضم أكثر من 24 ألف شيف.",
      en: "The hub for acrylic chocolate tools & molds and training courses — a community of +24K chefs.",
    },
    image: "/assets/stores/chocolate.webp",
    link: "https://chocolate-tools1.com/ar/",
    platform: { ar: "منصة سلة", en: "Salla platform" },
    badges: [
      { ar: "مجتمع +24K شيف", en: "+24K chef community" },
      { ar: "B2B & أفراد", en: "B2B & consumers" },
    ],
    services: [
      { ar: "تصميم واجهة بلون الشوكولاتة", en: "Chocolate-toned storefront design" },
      { ar: "تسويق الدورات المعتمدة", en: "Certified courses marketing" },
      { ar: "طباعة الشعارات الخاصة", en: "Custom logo printing" },
    ],
    metrics: [
      { label: { ar: "المتابعون", en: "Followers" }, value: "+24.4K" },
      { label: { ar: "المنشورات", en: "Posts" }, value: "+1,190" },
      { label: { ar: "الجمهور", en: "Audience" }, value: "B2B & C" },
    ],
  },
  {
    id: "barakat",
    name: { ar: "مطاحن ومحامص البركات", en: "Al-Baarakat Mills & Roastery" },
    latin: "ALBAARAKAT",
    category: "coffee",
    tagline: { ar: "قهوة سعودية ملكية وبهارات طازجة", en: "Royal Saudi coffee & fresh spices" },
    desc: {
      ar: "بهارات طازجة، قهوة سعودية ملكية، وتمور فاخرة — خبرة تمتد لأكثر من 25 عامًا منذ 1999.",
      en: "Fresh spices, royal Saudi coffee and premium dates — over 25 years of expertise since 1999.",
    },
    image: "/assets/stores/barakat.webp",
    link: "https://albaarakat.com/en",
    platform: { ar: "منصة سلة", en: "Salla platform" },
    badges: [
      { ar: "تأسيس 1999", en: "Founded 1999" },
      { ar: "شحن لدول الخليج", en: "GCC shipping" },
    ],
    services: [
      { ar: "عروض المواسم والمناسبات", en: "Seasonal campaigns" },
      { ar: "حملات اليوم الوطني", en: "National Day campaigns" },
      { ar: "هوية بصرية تراثية", en: "Heritage visual identity" },
    ],
    metrics: [
      { label: { ar: "الخبرة", en: "Experience" }, value: "+25 عام" },
      { label: { ar: "الشحن", en: "Shipping" }, value: "الخليج" },
    ],
    testimonial: {
      ar: "الله يبشرك بالجنة.. وأدعي لكم بالرحمة على الشغل الجميل",
      en: "May God bless you.. I pray for you mercy for the beautiful work",
    },
  },
  {
    id: "hoodihead",
    name: { ar: "هودي هيد", en: "Hoodihead" },
    latin: "HOODIHEAD",
    category: "fitness",
    tagline: { ar: "مناشف جيم مبتكرة", en: "Innovative gym towels" },
    desc: {
      ar: "براند رياضي لمناشف الجيم بالهودي وحماية سماعات الرأس — امتصاص يعادل 10 أضعاف القطن.",
      en: "A sports brand for gym towels with hood & headphone protection — 10X cotton absorption.",
    },
    image: "/assets/stores/hoodihead.webp",
    link: "https://hoodihead.com/ar",
    platform: { ar: "منصة سلة", en: "Salla platform" },
    badges: [
      { ar: "ابتكار بتسجيل هودي", en: "Patented hood design" },
      { ar: "امتصاص 10X قطن", en: "10X cotton absorption" },
    ],
    services: [
      { ar: "باقات الجيم وبكجات التوفير", en: "Gym bundles & saving packs" },
      { ar: "استهداف نوادي اللياقة", en: "Fitness clubs targeting" },
      { ar: "هوية رياضية جريئة", en: "Bold sports identity" },
    ],
    metrics: [
      { label: { ar: "الابتكار", en: "Innovation" }, value: "Hooded towel" },
      { label: { ar: "الاستهداف", en: "Targeting" }, value: "Gyms" },
    ],
    testimonial: {
      ar: "عاجز عن شكري لما تقدمه.. دائماً تدخل في تفاصيل التفاصيل",
      en: "I can't thank you enough for what you deliver.. you always dive into the finest details",
    },
  },
  {
    id: "baloma",
    name: { ar: "بالوما", en: "BALOMA" },
    latin: "BALOMA",
    category: "fashion",
    tagline: { ar: "أول علامة شاملة للقبعات", en: "The first all-inclusive caps brand" },
    desc: {
      ar: "أول براند سعودي شامل ومتخصص في القبعات والستريت وير، بهوية شبكية إبداعية متجددة.",
      en: "The first comprehensive Saudi brand specialized in caps & streetwear, with a constantly renewed creative feed.",
    },
    image: "/assets/stores/baloma.webp",
    link: "https://baloma.sa/",
    platform: { ar: "منصة زد (Zid)", en: "Zid platform" },
    badges: [
      { ar: "هوية Streetwear", en: "Streetwear identity" },
      { ar: "تجديد تلقائي مستمر", en: "Continuous auto-renewal" },
    ],
    services: [
      { ar: "بناء هوية ستريت وير", en: "Streetwear identity building" },
      { ar: "شبكة بصرية إبداعية", en: "Creative visual feed" },
      { ar: "إدارة اشتراك التجديد", en: "Renewal subscription management" },
    ],
    metrics: [
      { label: { ar: "التخصص", en: "Specialty" }, value: "Caps" },
      { label: { ar: "المنصة", en: "Platform" }, value: "Zid" },
    ],
    testimonial: {
      ar: "من حبي لكم صرت أحسب الأيام وقبل الموعد أجدد تلقائي",
      en: "I love you so much that I count the days and renew automatically before the deadline",
    },
  },
  {
    id: "unique",
    name: { ar: "الأشياء الفريدة", en: "The Unique Things" },
    latin: "THE UNIQUE THINGS",
    category: "gifts",
    tagline: { ar: "شراشف صلاة وهدايا فريدة", en: "Unique prayer sheets & gifts" },
    desc: {
      ar: "جلالات وشراشف صلاة فريدة، سجادات، وعطور وبخور — مع حملات مؤثرين وتطبيقات على ذا شيفز.",
      en: "Unique prayer sheets and rugs, perfumes and incense — with influencer campaigns and The Chefs app presence.",
    },
    image: "/assets/stores/unique.webp",
    link: "https://theuniquethingsstore.com/",
    platform: { ar: "سلة & ذا شيفز", en: "Salla & The Chefs" },
    badges: [
      { ar: "حملات مؤثرين", en: "Influencer campaigns" },
      { ar: "شراكة ممتدة", en: "Extended partnership" },
    ],
    services: [
      { ar: "إدارة حملات المؤثرين", en: "Influencer campaign management" },
      { ar: "تصميم واجهة المتجر", en: "Storefront design" },
      { ar: "محتوى هدايا موسمي", en: "Seasonal gifts content" },
    ],
    metrics: [
      { label: { ar: "المتابعون", en: "Followers" }, value: "4,900" },
      { label: { ar: "التطبيقات", en: "Apps" }, value: "The Chefs" },
    ],
    testimonial: {
      ar: "ما يحتاج عقود خلاص الراحة وصلت وشغلكم جداً ممتاز",
      en: "No contracts needed — peace of mind has arrived, and your work is excellent",
    },
  },
];

/* ---------------- Sales dashboards (verified source: 15 real screenshots) ---------------- */
export const DASHBOARDS = Array.from({ length: 15 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `sale-${n}`,
    src: `/assets/dashboards/sale-${n}.webp`,
    title: { ar: `تقرير مبيعات موثق ${i + 1}`, en: `Verified sales report ${i + 1}` },
  };
});

/* ---------------- Client reviews (26 genuine WhatsApp screenshots) ----------------
   w/h are the real pixel dimensions of each webp so next/image renders
   every screenshot uncropped at its natural aspect ratio. */
export const REVIEW_DIMS: [number, number][] = [
  [1080, 252], [774, 245], [949, 300], [1080, 342], [1080, 606], [1080, 377],
  [1004, 240], [1280, 720], [1280, 724], [1080, 323], [1078, 341], [1080, 400],
  [1080, 1080], [1080, 519], [1080, 416], [1080, 240], [1080, 300], [1080, 606],
  [667, 151], [922, 310], [1193, 334], [1109, 229], [560, 177], [784, 138],
  [1080, 721], [1080, 747],
];
export const REVIEWS = Array.from({ length: 26 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const [w, h] = REVIEW_DIMS[i];
  return {
    id: `fb-${n}`,
    src: `/assets/reviews/fb-${n}.webp`,
    w,
    h,
    alt: { ar: `رأي عميل حقيقي ${i + 1} — لقطة واتساب أصلية`, en: `Real client review ${i + 1} — original WhatsApp screenshot` },
  };
});

/* Featured written quotes — verbatim from verified sources */
export const FEATURED_QUOTES = [
  {
    quote: {
      ar: "الله يبشرك بالجنة.. وأدعي لكم بالرحمة على الشغل الجميل",
      en: "May God bless you.. I pray for you mercy for the beautiful work",
    },
    author: { ar: "مطاحن ومحامص البركات", en: "Al-Baarakat Mills & Roastery" },
    source: { ar: "شهادة شريك معتمدة", en: "Verified partner testimonial" },
  },
  {
    quote: {
      ar: "عاجز عن شكري لما تقدمه.. دائماً تدخل في تفاصيل التفاصيل",
      en: "I can't thank you enough for what you deliver.. you always dive into the finest details",
    },
    author: { ar: "هودي هيد", en: "Hoodihead" },
    source: { ar: "شهادة شريك معتمدة", en: "Verified partner testimonial" },
  },
  {
    quote: {
      ar: "من حبي لكم صرت أحسب الأيام وقبل الموعد أجدد تلقائي",
      en: "I love you so much that I count the days and renew automatically before the deadline",
    },
    author: { ar: "بالوما", en: "BALOMA" },
    source: { ar: "شهادة شريك معتمدة", en: "Verified partner testimonial" },
  },
  {
    quote: {
      ar: "الموقع مرة جميل ومرتّب وسهل الاستخدام، والتعامل مع الشركة كان سهل ومريح، والانستقرام مرتّب جدًا.",
      en: "The website is beautiful, organized and easy to use, dealing with the company was easy and comfortable, and the Instagram is very organized.",
    },
    author: { ar: "عميل من الموقع الرسمي", en: "Client via official website" },
    source: { ar: "shohrah.com", en: "shohrah.com" },
  },
];

/* ---------------- UI copy dictionary ---------------- */
export const T = {
  nav: {
    home: { ar: "الرئيسية", en: "Home" },
    about: { ar: "من نحن", en: "About" },
    services: { ar: "خدماتنا", en: "Services" },
    work: { ar: "أعمالنا", en: "Work" },
    results: { ar: "النتائج", en: "Results" },
    testimonials: { ar: "آراء العملاء", en: "Testimonials" },
    contact: { ar: "تواصل معنا", en: "Contact" },
    menu: { ar: "القائمة", en: "Menu" },
    close: { ar: "إغلاق", en: "Close" },
  },
  hero: {
    kicker: { ar: "وكالة نمو رقمي · جدة — المملكة والخليج", en: "Digital Growth Agency · Jeddah — KSA & GCC" },
    h1a: { ar: "نصنع حضوراً رقمياً", en: "We craft a digital presence" },
    h1b: { ar: "يليق بطموح علامتك التجارية.", en: "worthy of your brand's ambition." },
    sub: {
      ar: "من بناء الهوية الرقمية وتصميم المتاجر، إلى إدارة الحملات الإعلانية وتحسين محركات البحث، نمنح علامتك التجارية كل ما تحتاجه للنمو.",
      en: "From digital identity and store design to paid campaigns and SEO — we give your brand everything it needs to grow.",
    },
    cta1: { ar: "اكتشف أعمالنا", en: "Explore our work" },
    cta2: { ar: "احجز استشارتك المجانية", en: "Book your free consultation" },
    scroll: { ar: "مرّر للأسفل", en: "Scroll down" },
    trusted: { ar: "شركاء نمو لأكثر من 150 متجراً في المملكة والخليج", en: "Growth partners to +150 stores across KSA & the GCC" },
  },
  stats: {
    kicker: { ar: "الثقة والأداء", en: "Trust & Performance" },
    title: { ar: "أرقام تُبنى على شراكات حقيقية", en: "Numbers built on real partnerships" },
    sub: {
      ar: "مؤشرات موثقة من معرض شركائنا ومتاجرنا — شراكات ممتدة نقيس نتائجها معاً.",
      en: "Verified indicators from our partner stores — extended partnerships with results we measure together.",
    },
  },
  about: {
    kicker: { ar: "من نحن", en: "About SHOHRA" },
    title: { ar: "نحن لا ندير التسويق فقط، نحن نبني منظومة نمو متكاملة.", en: "We don't just run marketing — we build a complete growth system." },
    p1: {
      ar: "«شُهرة» مؤسسة تسويقية سعودية من جدة، نحوّل رؤيتك إلى واقعٍ رقمي مبدع تحت سقفٍ واحد. نبتكر حلولاً تسويقية ذكية، ونحوّل حضور علامتك التجارية الرقمي إلى تجربة متكاملة تقود للنمو.",
      en: "SHOHRA is a Saudi marketing agency from Jeddah that turns your vision into creative digital reality under one roof. We craft smart marketing solutions and turn your brand's digital presence into an integrated experience that drives growth.",
    },
    p2: {
      ar: "فريقٌ سعوديٌّ واحد يُدير تسويقك بالكامل — من قلب السوق السعودي، نواكب رؤية 2030، ونبني مع كل شريك علاقة طويلة الأمد تُقاس نتائجها بالأرقام.",
      en: "One Saudi team manages your entire marketing — from the heart of the Saudi market, aligned with Vision 2030, building long-term partnerships whose results are measured in numbers.",
    },
    pillars: [
      { title: { ar: "فريق واحد يكفيك", en: "One team is enough" }, desc: { ar: "كل ما يحتاجه تسويقك تحت سقفٍ واحد — بدون تشتت أو وسيط.", en: "Everything your marketing needs under one roof — no middlemen, no scatter." } },
      { title: { ar: "سعوديون نفهم سوقك", en: "Saudis who know your market" }, desc: { ar: "فهم عميق لسلوك المستهلك السعودي والخليجي وثقافة الشراء.", en: "Deep understanding of Saudi & Gulf consumer behavior and buying culture." } },
      { title: { ar: "نتائج نقدر نقيسها", en: "Results we can measure" }, desc: { ar: "قرارات مبنية على البيانات وتقارير دورية واضحة.", en: "Data-driven decisions with clear periodic reporting." } },
      { title: { ar: "شراكات طويلة الأمد", en: "Long-term partnerships" }, desc: { ar: "شراكات ممتدة من سنة إلى سنتين مع شركاء نستمر معهم.", en: "One-to-two-year extended partnerships with continuing partners." } },
    ],
    align: { ar: "من قلب السوق السعودي، نواكب رؤية 2030", en: "From the heart of the Saudi market, aligned with Vision 2030" },
  },
  services: {
    kicker: { ar: "خدماتنا", en: "Our Services" },
    title: { ar: "كل ما يحتاجه نموك، تحت سقفٍ واحد", en: "Everything your growth needs, under one roof" },
    sub: {
      ar: "ست خدمات متكاملة يعمل عليها فريق واحد — لتتحرك علامتك باتجاه واحد: النمو.",
      en: "Six integrated services delivered by one team — so your brand moves in one direction: growth.",
    },
  },
  portfolio: {
    kicker: { ar: "أعمالنا", en: "Our Work" },
    title: { ar: "نماذج من متاجر شركائنا", en: "Selected partner stores" },
    sub: {
      ar: "عينة مختارة من شركاء النجاح المستمرين معنا بشراكات ممتدة — اضغط على أي متجر لاستعراض تفاصيله.",
      en: "A selected sample of ongoing success partners with extended partnerships — click any store to view its details.",
    },
    visit: { ar: "زيارة المتجر الحي", en: "Visit live store" },
    delivered: { ar: "الخدمات المنفذة", en: "Services delivered" },
    testimonial: { ar: "شهادة الشريك", en: "Partner testimonial" },
    platform: { ar: "المنصة", en: "Platform" },
    verified: { ar: "موثق", en: "Verified" },
    viewDetails: { ar: "استعراض التفاصيل", en: "View details" },
    close: { ar: "إغلاق", en: "Close" },
  },
  results: {
    kicker: { ar: "إثباتات المبيعات", en: "Sales Proof" },
    title: { ar: "الأرقام تتحدث عن النتائج.", en: "The numbers speak for the results." },
    sub: {
      ar: "لقطات حقيقية من لوحات تحكم متاجر شركائنا تعرض أداء المبيعات والطلبات والزيارات — اضغط على أي تقرير لتكبيره.",
      en: "Real screenshots from our partners' store dashboards showing sales, orders and traffic performance — click any report to enlarge.",
    },
    enlarge: { ar: "اضغط للتكبير", en: "Click to enlarge" },
    caption: { ar: "تقرير مبيعات موثق من لوحة تحكم متجر شريك", en: "Verified sales report from a partner store dashboard" },
    source: { ar: "المصدر: لوحات تحكم المتاجر", en: "Source: store dashboards" },
  },
  testimonials: {
    kicker: { ar: "آراء العملاء", en: "Client Testimonials" },
    title: { ar: "ثقة عملائنا هي أكبر إنجازاتنا.", en: "Our clients' trust is our greatest achievement." },
    sub: {
      ar: "كل تقييم هنا شهادة حقيقية من عميل فعلي — محفوظة بنصها الأصلي كما وصلتنا.",
      en: "Every review here is a real testimony from an actual client — preserved exactly as we received it.",
    },
    prev: { ar: "السابق", en: "Previous" },
    next: { ar: "التالي", en: "Next" },
    chipCount: { ar: "+26 رأي عميل موثق", en: "+26 verified client reviews" },
    chipOriginal: { ar: "لقطات واتساب أصلية — بدون أي تعديل", en: "Original WhatsApp screenshots — untouched" },
    chipWritten: { ar: "شهادات مكتوبة من شركاء فعليين", en: "Written testimonials from real partners" },
    wallTitle: { ar: "سجلّ الآراء الكامل", en: "The full reviews wall" },
    wallSub: { ar: "اضغط على أي لقطة لعرضها بالحجم الكامل وتنقّل بينها", en: "Click any screenshot to view it full-size and browse through" },
    viewFull: { ar: "عرض بالحجم الكامل", en: "View full size" },
    sourceNote: {
      ar: "المصدر: محادثات واتساب حقيقية مع عملاء شُهرة — تُعرض كما وصلت دون تعديل.",
      en: "Source: real WhatsApp conversations with SHOHRA clients — shown exactly as received, unedited.",
    },
    caption: { ar: "رأي عميل حقيقي — محفوظ بنصه الأصلي كما وصلنا عبر واتساب.", en: "A real client review — preserved verbatim as received via WhatsApp." },
  },
  process: {
    kicker: { ar: "منهجية العمل", en: "Our Process" },
    title: { ar: "رحلة نجاح من الفكرة إلى الإطلاق", en: "A success journey from idea to launch" },
    steps: [
      {
        n: "01",
        title: { ar: "الاكتشاف والتحليل", en: "Discovery & Analysis" },
        desc: { ar: "نستمع لطموحك، نحلل سوقك ومنافسيك وجمهورك، ونحدد الفرص الحقيقية للنمو.", en: "We listen to your ambition, analyze your market, competitors and audience, and identify real growth opportunities." },
      },
      {
        n: "02",
        title: { ar: "التخطيط الاستراتيجي", en: "Strategic Planning" },
        desc: { ar: "نبني خطة تسويقية واضحة الأهداف والمؤشرات — قنوات، ميزانيات، وجدول زمني قابل للقياس.", en: "We build a clear plan with defined goals and KPIs — channels, budgets and a measurable timeline." },
      },
      {
        n: "03",
        title: { ar: "التنفيذ الإبداعي", en: "Creative Execution" },
        desc: { ar: "يبدأ الفريق التنفيذ: الهوية، الواجهات، المحتوى والحملات — بجودة تنفيذ تفاصيلها لا تُغفل.", en: "The team executes: identity, interfaces, content and campaigns — with uncompromising attention to detail." },
      },
      {
        n: "04",
        title: { ar: "الإطلاق والمتابعة والتحسين", en: "Launch & Optimization" },
        desc: { ar: "نطلق، نقيس، ونحسّن باستمرار — تقارير دورية وتحسين مستمر حتى نبلغ الهدف ونتجاوزه.", en: "We launch, measure and keep optimizing — periodic reports and continuous improvement until we hit and exceed the target." },
      },
    ],
  },
  why: {
    kicker: { ar: "لماذا شُهرة؟", en: "Why SHOHRA?" },
    title: { ar: "شريك نمو، لا مجرد مورّد خدمات", en: "A growth partner, not just a service vendor" },
    items: [
      { title: { ar: "حلول رقمية متكاملة", en: "Integrated digital solutions" }, desc: { ar: "ست خدمات تعمل معاً بتناغم واحد تحت إدارة فريق واحد.", en: "Six services working in harmony under one team's management." } },
      { title: { ar: "تنفيذ متخصص", en: "Specialized execution" }, desc: { ar: "مختصون في التجارة الإلكترونية ومنصات سلة وزد.", en: "Specialists in e-commerce and the Salla & Zid platforms." } },
      { title: { ar: "فهم السوق السعودي", en: "Saudi market understanding" }, desc: { ar: "من جدة إلى بقية المملكة والخليج — نعرف جمهورك ونفهم ثقافته.", en: "From Jeddah across KSA and the GCC — we know your audience and its culture." } },
      { title: { ar: "تسويق مبني على البيانات", en: "Data-driven marketing" }, desc: { ar: "كل قرار إعلاني أو محتوى مبني على أرقام ومؤشرات أداء.", en: "Every ad and content decision is backed by numbers and KPIs." } },
      { title: { ar: "تميّز إبداعي", en: "Creative excellence" }, desc: { ar: "هويات وتصاميم تنافس مستوى الوكالات العالمية.", en: "Identities and designs competing at international agency level." } },
      { title: { ar: "شراكات طويلة الأمد", en: "Long-term partnerships" }, desc: { ar: "شركاؤنا يجددون معنا سنة بعد سنة — والدليل قائمة متاجرهم.", en: "Our partners renew year after year — their store list is the proof." } },
    ],
  },
  cta: {
    title: { ar: "هل علامتك التجارية مستعدة لمرحلة جديدة من النمو؟", en: "Is your brand ready for a new phase of growth?" },
    sub: {
      ar: "دعنا نتعرف على مشروعك ونكتشف معاً كيف يمكن لحلول شُهرة التسويقية أن تصنع فارقاً حقيقياً.",
      en: "Let's get to know your project and discover together how SHOHRA's solutions can make a real difference.",
    },
    button: { ar: "احجز استشارتك المجانية الآن", en: "Book your free consultation now" },
    note: { ar: "استشارة مجانية · بدون التزام · رد سريع عبر واتساب", en: "Free consultation · no commitment · fast WhatsApp reply" },
  },
  footer: {
    desc: {
      ar: "مؤسسة شُهرة التسويقية — وكالة تسويق رقمي سعودية من جدة، نبتكر حلولاً تسويقية ذكية تضمن نمو علامتك التجارية وتضاعف مبيعاتك.",
      en: "SHOHRA Marketing Agency — a Saudi digital agency from Jeddah crafting smart marketing solutions that grow your brand and multiply your sales.",
    },
    servicesTitle: { ar: "الخدمات", en: "Services" },
    workTitle: { ar: "الأعمال", en: "Work" },
    contactTitle: { ar: "تواصل", en: "Contact" },
    follow: { ar: "تابعنا", en: "Follow us" },
    officialSite: { ar: "الموقع الرسمي", en: "Official website" },
    rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
    builtWith: { ar: "صُنع بشغف في جدة", en: "Crafted with passion in Jeddah" },
    credentialsTitle: { ar: "الوثائق الرسمية", en: "Official credentials" },
    crBadge: { ar: "سجل تجاري موثق", en: "Verified commercial registration" },
    crNumberLabel: { ar: "رقم السجل التجاري", en: "CR number" },
    unifiedLabel: { ar: "الرقم الوطني الموحد", en: "Unified national number" },
    ecomBadge: { ar: "توثيق التجارة الإلكترونية", en: "E-commerce authentication" },
    ecomBy: { ar: "المركز السعودي للأعمال", en: "Saudi Business Center" },
    viewCertificate: { ar: "عرض الشهادة الرسمية", en: "View official certificate" },
    statusLabel: { ar: "الحالة", en: "Status" },
    legalNameLabel: { ar: "الاسم النظامي", en: "Legal name" },
    sources: { ar: "توثيق: سجل تجاري موثق وشهادة توثيق التجارة الإلكترونية متاحة عبر لينكتري.", en: "Credentials: commercial registration & e-commerce certification available via Linktree." },
  },
  lang: { switch: { ar: "EN", en: "عربي" } },
  lightbox: { close: { ar: "إغلاق", en: "Close" } },
} as const;

export type Lang = "ar" | "en";
export type Bi = { ar: string; en: string };
export const bi = (v: Bi, lang: Lang) => v[lang];
