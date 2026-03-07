// ============================================================
// Caribbean Tropical Solutions S.A. — Central Data & Constants
// ============================================================

// === CONTACT ===
export const WHATSAPP_NUMBER = "50671035467";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_URL_WITH_MESSAGE = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, me gustaría obtener más información sobre sus productos.")}`;
export const EMAIL = "ventas@3dcaribbean.com";
export const PHONE = "7103-5467";
export const ADDRESS = "San Luis de Guácimo, Limón, Costa Rica";
export const INSTAGRAM_URL = "https://www.instagram.com/caribbean_troprical_solutions/";
export const FACEBOOK_URL = "https://www.facebook.com/people/Caribbean-Tropical-Solutions-SA/61561018101440/";

// === NAVIGATION ===
export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#categorias" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Nosotros", href: "#por-que-elegirnos" },
  { label: "Contacto", href: "#contacto" },
] as const;

// === BRANDS ===
export const BRANDS = [
  "DeWalt",
  "Elmerc",
  "EVACOL",
  "Try Me",
  "Senior+Plus",
  "IONICS",
  "Carpi",
] as const;

// === CATEGORIES ===
export type CategorySlug = "epp" | "limpieza" | "fumigacion" | "ferreteria" | "cuidado-personal";

export interface Category {
  slug: CategorySlug;
  name: string;
  subtitle: string;
  image: string;
  altText: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "epp",
    name: "Equipo de Protección Personal",
    subtitle: "Botas, zapatos, cascos y mascarillas de seguridad industrial",
    image: "/images/categories/epp.webp",
    altText: "Trabajador con casco y chaleco de seguridad en obra",
  },
  {
    slug: "limpieza",
    name: "Limpieza y Desinfección",
    subtitle: "Productos de limpieza profesional e industrial IONICS",
    image: "/images/categories/limpieza.webp",
    altText: "Productos de limpieza profesional en estante",
  },
  {
    slug: "fumigacion",
    name: "Fumigación y Control",
    subtitle: "Equipos de fumigación, repelentes y selladores profesionales",
    image: "/images/categories/fumigacion.webp",
    altText: "Profesional en traje protector realizando fumigación",
  },
  {
    slug: "ferreteria",
    name: "Ferretería Especializada",
    subtitle: "Detectores de tormentas, bombas y herramientas Carpi",
    image: "/images/categories/ferreteria.webp",
    altText: "Herramientas profesionales organizadas en superficie de trabajo",
  },
  {
    slug: "cuidado-personal",
    name: "Cuidado Personal y Bienestar",
    subtitle: "Tratamientos capilares Try Me y cuidado Senior+Plus",
    image: "/images/categories/cuidado-personal.webp",
    altText: "Productos de cuidado personal y bienestar",
  },
];

// === FILTER TABS ===
export const FILTER_TABS = [
  { slug: "todos" as const, label: "Todos" },
  { slug: "epp" as const, label: "EPP" },
  { slug: "limpieza" as const, label: "Limpieza" },
  { slug: "fumigacion" as const, label: "Fumigación" },
  { slug: "ferreteria" as const, label: "Ferretería" },
  { slug: "cuidado-personal" as const, label: "Cuidado Personal" },
];

export type FilterSlug = CategorySlug | "todos";

// === PRODUCTS ===
export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  brand: string;
  image: string;
  altText: string;
  price?: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // --- EPP: Botas ---
  { id: "bota-1", name: "Bota PVC Industrial Titus", category: "epp", brand: "Carpi", image: "/images/botas/bota1.webp", altText: "Bota PVC de seguridad industrial Carpi modelo Titus" },
  { id: "bota-2", name: "Bota de Seguridad Reforzada", category: "epp", brand: "Carpi", image: "/images/botas/bota2.webp", altText: "Bota de seguridad industrial reforzada Carpi" },
  { id: "bota-3", name: "Bota Industrial Resistente", category: "epp", brand: "Carpi", image: "/images/botas/bota3.webp", altText: "Bota industrial resistente a químicos Carpi" },

  // --- EPP: Zapatos DeWalt ---
  { id: "zapato-1", name: "DeWalt Kirksville", category: "epp", brand: "DeWalt", image: "/images/zapatos/zapatos1.webp", altText: "Zapato de seguridad DeWalt Kirksville con puntera de aluminio", featured: true },
  { id: "zapato-2", name: "DeWalt Shelton", category: "epp", brand: "DeWalt", image: "/images/zapatos/zapatos2.webp", altText: "Zapato de seguridad DeWalt Shelton resistente al agua" },
  { id: "zapato-3", name: "DeWalt Hadley", category: "epp", brand: "DeWalt", image: "/images/zapatos/zapatos3.webp", altText: "Zapato de seguridad DeWalt Hadley con suela antideslizante" },
  { id: "zapato-4", name: "DeWalt Manvel", category: "epp", brand: "DeWalt", image: "/images/zapatos/zapatos4.webp", altText: "Zapato de seguridad DeWalt Manvel con puntera compuesta" },
  { id: "zapato-5", name: "DeWalt Corinth", category: "epp", brand: "DeWalt", image: "/images/zapatos/zapatos5.webp", altText: "Zapato de seguridad DeWalt Corinth tipo bota" },
  { id: "zapato-6", name: "DeWalt Clemente", category: "epp", brand: "DeWalt", image: "/images/zapatos/zapatos6.webp", altText: "Zapato de seguridad DeWalt Clemente liviano" },
  { id: "zapato-7", name: "DeWalt Pro Series", category: "epp", brand: "DeWalt", image: "/images/zapatos/zapatos7.webp", altText: "Zapato de seguridad DeWalt serie profesional" },

  // --- EPP: Seguridad ---
  { id: "casco-1", name: "Casco de Seguridad ANSI", category: "epp", brand: "CTS", image: "/images/seguridad/casco-seguridad.webp", altText: "Casco de seguridad industrial con visera y certificación ANSI" },
  { id: "mascara-1", name: "Máscara de Protección Respiratoria", category: "epp", brand: "CTS", image: "/images/seguridad/mascara.webp", altText: "Máscara de protección respiratoria industrial con filtros" },

  // --- EPP: EVACOL ---
  { id: "evacol-1", name: "Zueco EVACOL 080", category: "epp", brand: "EVACOL", image: "/images/evacol/evacol1.webp", altText: "Zueco antideslizante EVACOL 080 para cocina industrial" },
  { id: "evacol-2", name: "Zueco EVACOL Cerrado", category: "epp", brand: "EVACOL", image: "/images/evacol/evacol2.webp", altText: "Zueco cerrado EVACOL antideslizante para hospitales" },
  { id: "evacol-3", name: "Zueco EVACOL Sport", category: "epp", brand: "EVACOL", image: "/images/evacol/evacol3.webp", altText: "Zueco EVACOL línea Sport ergonómico" },
  { id: "evacol-4", name: "Zueco EVACOL Pro", category: "epp", brand: "EVACOL", image: "/images/evacol/evacol4.webp", altText: "Zueco profesional EVACOL con suela antideslizante certificada" },
  { id: "evacol-5", name: "Zueco EVACOL Classic", category: "epp", brand: "EVACOL", image: "/images/evacol/evacol5.webp", altText: "Zueco EVACOL línea clásica para uso diario" },
  { id: "evacol-6", name: "Zueco EVACOL Comfort", category: "epp", brand: "EVACOL", image: "/images/evacol/evacol6.webp", altText: "Zueco EVACOL Comfort con plantilla ergonómica" },
  { id: "evacol-7", name: "Zueco EVACOL Industrial", category: "epp", brand: "EVACOL", image: "/images/evacol/evacol7.webp", altText: "Zueco EVACOL para uso industrial y laboratorio" },
  { id: "evacol-8", name: "Zueco EVACOL Kitchen", category: "epp", brand: "EVACOL", image: "/images/evacol/evacol8.webp", altText: "Zueco EVACOL especial para cocinas profesionales" },

  // --- Limpieza ---
  { id: "cleaner-1", name: "Neutral Cleaner IONICS", category: "limpieza", brand: "IONICS", image: "/images/cleaners/cleaner1.webp", altText: "Espuma limpiadora multiuso Neutral Cleaner IONICS biodegradable" },
  { id: "cleaner-2", name: "Desinfectante Industrial IONICS", category: "limpieza", brand: "IONICS", image: "/images/cleaners/cleaner2.webp", altText: "Desinfectante industrial concentrado IONICS" },
  { id: "cleaner-3", name: "Limpiador de Pisos IONICS", category: "limpieza", brand: "IONICS", image: "/images/cleaners/cleaner3.webp", altText: "Limpiador profesional de pisos IONICS alto rendimiento" },
  { id: "cleaner-4", name: "Desengrasante Industrial IONICS", category: "limpieza", brand: "IONICS", image: "/images/cleaners/cleaner4.webp", altText: "Desengrasante industrial IONICS para cocinas y talleres" },
  { id: "cleaner-5", name: "Sanitizante IONICS", category: "limpieza", brand: "IONICS", image: "/images/cleaners/cleaner5.webp", altText: "Sanitizante de superficies IONICS grado hospitalario" },
  { id: "cleaner-6", name: "Limpiador Multiusos IONICS", category: "limpieza", brand: "IONICS", image: "/images/cleaners/cleaner6.webp", altText: "Limpiador multiusos concentrado IONICS profesional" },

  // --- Cuidado Personal ---
  { id: "crema-1", name: "Crema Antioxidante Senior+Plus", category: "cuidado-personal", brand: "Senior+Plus", image: "/images/cremas/crema1.webp", altText: "Crema corporal antioxidante Senior+Plus para adultos mayores", price: "₡7,065", featured: true },
  { id: "crema-2", name: "Aceite en Gel Senior+Plus", category: "cuidado-personal", brand: "Senior+Plus", image: "/images/cremas/crema2.webp", altText: "Aceite en gel hidratante Senior+Plus para piel madura", price: "₡4,485", featured: true },
  { id: "crema-3", name: "Kératine Lisos Try Me", category: "cuidado-personal", brand: "Try Me", image: "/images/cremas/crema3.webp", altText: "Tratamiento capilar Kératine Lisos Try Me para cabello liso", price: "₡3,720", featured: true },
  { id: "crema-4", name: "Kératine Rizos Try Me", category: "cuidado-personal", brand: "Try Me", image: "/images/cremas/crema4.webp", altText: "Tratamiento capilar Kératine Rizos Try Me para cabello rizado", price: "₡3,720" },
  { id: "crema-5", name: "Colesterol Repair Try Me", category: "cuidado-personal", brand: "Try Me", image: "/images/cremas/crema5.webp", altText: "Mascarilla capilar Colesterol Intensive Repair Try Me", price: "₡2,330" },
  { id: "pronto-crema", name: "Colesterol Capilar Try Me", category: "cuidado-personal", brand: "Try Me", image: "/images/cremas/pronto-crema.webp", altText: "Colesterol capilar restaurador Try Me acción rápida", price: "₡2,330" },

  // --- Ferretería ---
  { id: "detector-1", name: "Detector de Tormentas SkyScan", category: "ferreteria", brand: "IONICS", image: "/images/detectores/detector1.webp", altText: "Detector de tormentas y rayos SkyScan Storm Pro con pantalla LCD", featured: true },
  { id: "detector-2", name: "Detector Portátil de Rayos", category: "ferreteria", brand: "IONICS", image: "/images/detectores/detector2.webp", altText: "Detector portátil de rayos y tormentas eléctricas" },
  { id: "detector-3", name: "Detector de Tormentas Pro", category: "ferreteria", brand: "IONICS", image: "/images/detectores/detector3.webp", altText: "Detector profesional de tormentas con alerta temprana" },

  // --- Fumigación ---
  { id: "bomba-18l", name: "Bomba Fumigadora 18L", category: "fumigacion", brand: "CTS", image: "/images/fumigacion/bombaveneno18litros.webp", altText: "Bomba fumigadora tipo espalda de 18 litros profesional" },
  { id: "repelente-flix", name: "Repelente FLIX Elmerc", category: "fumigacion", brand: "Elmerc", image: "/images/fumigacion/repelente.webp", altText: "Repelente de insectos profesional FLIX de Elmerc", featured: true },
  { id: "silicone-pro", name: "Silicone Sellador Pro", category: "fumigacion", brand: "CTS", image: "/images/fumigacion/silicone.webp", altText: "Sellador de silicona profesional para uso industrial" },
];

// === HERO SLIDES ===
export interface HeroSlide {
  image: string;
  altText: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  { image: "/images/hero/1.webp", altText: "Aceite en Gel Senior+Plus para adultos mayores" },
  { image: "/images/hero/2.webp", altText: "Crema preventiva Senior+Plus para pañalitis" },
  { image: "/images/hero/3.webp", altText: "Colesterol Tratamiento Capilar Try Me" },
  { image: "/images/hero/4.webp", altText: "Colesterol Intensive Repair Mask Try Me" },
  { image: "/images/hero/5.webp", altText: "Kératine Rizos Tratamiento Capilar Try Me" },
  { image: "/images/hero/6.webp", altText: "Kératine Lisos Tratamiento Capilar Try Me" },
];

// === VALUE PROPOSITIONS ===
export interface ValueProp {
  number: string;
  title: string;
  description: string;
  icon: "headset" | "shield" | "truck" | "tag";
}

export const VALUE_PROPS: ValueProp[] = [
  {
    number: "01",
    title: "Asesoría Técnica Especializada",
    description: "Te ayudamos a elegir los productos correctos para tu operación.",
    icon: "headset",
  },
  {
    number: "02",
    title: "Marcas de Confianza Mundial",
    description: "DeWalt, Elmerc, EVACOL, IONICS y más. Solo lo mejor.",
    icon: "shield",
  },
  {
    number: "03",
    title: "Corazón Caribeño, Alcance Nacional",
    description: "Desde Guácimo para todo Costa Rica. Entregas puntuales.",
    icon: "truck",
  },
  {
    number: "04",
    title: "Atención Rápida y Directa",
    description: "Respuesta por WhatsApp en minutos. Sin intermediarios.",
    icon: "tag",
  },
];
