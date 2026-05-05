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

// === FOUNDER ===
export const FOUNDER = {
  name: "Kendall Ramírez Leitón",
  role: "Cofundador · Asesor en Contratación Pública",
  image: "/images/team/kendall-ramirez.webp",
  altText: "Kendall Ramírez Leitón, cofundador de Caribbean Tropical Solutions",
  bio: [
    "Soy cofundador de una empresa con capital 100% del Caribe, comprometida con el desarrollo empresarial y la generación de valor sostenible. Me especializo en materia de contratación pública, desempeñándome como asesor y consultor en procesos relacionados con la gestión, análisis y participación en el ámbito de las compras públicas.",
    "Como joven comerciante con visión empresarial, promuevo una gestión basada en principios de gobernanza, sostenibilidad y transparencia, donde los valores y la ética empresarial constituyen la base para el crecimiento responsable y la construcción de relaciones de confianza con el sector público y privado.",
    "Mi enfoque profesional se orienta a impulsar proyectos y oportunidades que contribuyan al desarrollo económico, fortaleciendo prácticas empresariales sólidas, responsables y alineadas con los más altos estándares de integridad.",
  ],
} as const;

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
  "IONICS",
  "Carpi",
  "Portwest",
  "Suministros de Limpieza",
  "Salud Ocupacional",
  "Kimberly-Clark",
  "Limpieza Profesional",
  "Grupo Irex",
  "Tramontina",
  "Yulcer",
] as const;

// === CATEGORIES ===
export type CategorySlug = "limpieza" | "salud-ocupacional" | "oficina";

export interface Category {
  slug: CategorySlug;
  name: string;
  subtitle: string;
  image: string;
  altText: string;
  comingSoon?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    slug: "limpieza",
    name: "Limpieza y Desinfección",
    subtitle: "Productos profesionales de limpieza, sanitización y fumigación",
    image: "/images/categories/limpieza.webp",
    altText: "Productos de limpieza profesional en estante",
  },
  {
    slug: "salud-ocupacional",
    name: "Salud Ocupacional",
    subtitle: "EPP, calzado, ropa de trabajo, detectores y suministros de seguridad",
    image: "/images/categories/salud-ocupacional.webp",
    altText: "Equipos de salud ocupacional y protección laboral",
  },
  {
    slug: "oficina",
    name: "Oficina",
    subtitle: "Suministros y artículos de oficina",
    image: "/images/categories/oficina.webp",
    altText: "Suministros y artículos de oficina",
    comingSoon: true,
  },
];

// === FILTER TABS ===
export const FILTER_TABS = [
  { slug: "todos" as const, label: "Todos" },
  { slug: "limpieza" as const, label: "Limpieza" },
  { slug: "salud-ocupacional" as const, label: "Salud Ocupacional" },
  { slug: "oficina" as const, label: "Oficina" },
];

export type FilterSlug = CategorySlug | "todos";

// === SUBCATEGORY ORDER ===
export const SUBCATEGORY_ORDER: Record<CategorySlug, string[]> = {
  limpieza: ["Limpiadores IONICS", "Línea Industrial IONICS", "Papel y Sanitización", "Aerosoles y Lubricantes", "Detergentes y Jabones", "Equipos de Fumigación", "Suministros y Herramientas"],
  "salud-ocupacional": ["Calzado de Seguridad", "Guantes de Protección", "Ropa de Trabajo", "Protección Visual y Facial", "Protección Cabeza, Respiratoria y Auditiva", "Detectores y Alertas", "Accesorios y Botiquines"],
  oficina: [],
};

// === PRODUCTS ===
export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  brand: string;
  image: string;
  images?: string[];
  altText: string;
  price?: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  // --- Salud Ocupacional: Calzado (Carpi) ---
  { id: "bota-1", name: "Bota PVC Industrial Titus", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "Carpi", image: "/images/botas/bota1.webp", altText: "Bota PVC de seguridad industrial Carpi modelo Titus" },
  { id: "bota-2", name: "Bota de Seguridad Reforzada", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "Carpi", image: "/images/botas/bota2.webp", altText: "Bota de seguridad industrial reforzada Carpi" },
  { id: "bota-3", name: "Bota Industrial Resistente", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "Carpi", image: "/images/botas/bota3.webp", altText: "Bota industrial resistente a químicos Carpi" },

  // --- Salud Ocupacional: Calzado (DeWalt) ---
  { id: "zapato-1", name: "DeWalt Kirksville", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "DeWalt", image: "/images/zapatos/zapatos1.webp", altText: "Zapato de seguridad DeWalt Kirksville con puntera de aluminio", featured: true },
  { id: "zapato-2", name: "DeWalt Shelton", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "DeWalt", image: "/images/zapatos/zapatos2.webp", altText: "Zapato de seguridad DeWalt Shelton resistente al agua" },
  { id: "zapato-3", name: "DeWalt Hadley", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "DeWalt", image: "/images/zapatos/zapatos3.webp", altText: "Zapato de seguridad DeWalt Hadley con suela antideslizante" },
  { id: "zapato-4", name: "DeWalt Manvel", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "DeWalt", image: "/images/zapatos/zapatos4.webp", altText: "Zapato de seguridad DeWalt Manvel con puntera compuesta" },
  { id: "zapato-5", name: "DeWalt Corinth", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "DeWalt", image: "/images/zapatos/zapatos5.webp", altText: "Zapato de seguridad DeWalt Corinth tipo bota" },
  { id: "zapato-6", name: "DeWalt Clemente", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "DeWalt", image: "/images/zapatos/zapatos6.webp", altText: "Zapato de seguridad DeWalt Clemente liviano" },
  { id: "zapato-7", name: "DeWalt Pro Series", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "DeWalt", image: "/images/zapatos/zapatos7.webp", altText: "Zapato de seguridad DeWalt serie profesional" },

  // --- Salud Ocupacional: Cabeza y Respiratoria ---
  { id: "casco-1", name: "Casco de Seguridad ANSI", category: "salud-ocupacional", subcategory: "Protección Cabeza, Respiratoria y Auditiva", brand: "CTS", image: "/images/seguridad/casco-seguridad.webp", altText: "Casco de seguridad industrial con visera y certificación ANSI" },
  { id: "mascara-1", name: "Máscara de Protección Respiratoria", category: "salud-ocupacional", subcategory: "Protección Cabeza, Respiratoria y Auditiva", brand: "CTS", image: "/images/seguridad/mascara.webp", altText: "Máscara de protección respiratoria industrial con filtros" },

  // --- Salud Ocupacional: Calzado (EVACOL) ---
  { id: "evacol-1", name: "Zueco EVACOL 080", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "EVACOL", image: "/images/evacol/evacol1.webp", altText: "Zueco antideslizante EVACOL 080 para cocina industrial" },
  { id: "evacol-2", name: "Zueco EVACOL Cerrado", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "EVACOL", image: "/images/evacol/evacol2.webp", altText: "Zueco cerrado EVACOL antideslizante para hospitales" },
  { id: "evacol-3", name: "Zueco EVACOL Sport", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "EVACOL", image: "/images/evacol/evacol3.webp", altText: "Zueco EVACOL línea Sport ergonómico" },
  { id: "evacol-4", name: "Zueco EVACOL Pro", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "EVACOL", image: "/images/evacol/evacol4.webp", altText: "Zueco profesional EVACOL con suela antideslizante certificada" },
  { id: "evacol-5", name: "Zueco EVACOL Classic", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "EVACOL", image: "/images/evacol/evacol5.webp", altText: "Zueco EVACOL línea clásica para uso diario" },
  { id: "evacol-6", name: "Zueco EVACOL Comfort", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "EVACOL", image: "/images/evacol/evacol6.webp", altText: "Zueco EVACOL Comfort con plantilla ergonómica" },
  { id: "evacol-7", name: "Zueco EVACOL Industrial", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "EVACOL", image: "/images/evacol/evacol7.webp", altText: "Zueco EVACOL para uso industrial y laboratorio" },
  { id: "evacol-8", name: "Zueco EVACOL Kitchen", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "EVACOL", image: "/images/evacol/evacol8.webp", altText: "Zueco EVACOL especial para cocinas profesionales" },

  // --- Limpieza ---
  { id: "cleaner-1", name: "Neutral Cleaner IONICS", category: "limpieza", subcategory: "Limpiadores IONICS", brand: "IONICS", image: "/images/cleaners/cleaner1.webp", altText: "Espuma limpiadora multiuso Neutral Cleaner IONICS biodegradable" },
  { id: "cleaner-2", name: "Desinfectante Industrial IONICS", category: "limpieza", subcategory: "Limpiadores IONICS", brand: "IONICS", image: "/images/cleaners/cleaner2.webp", altText: "Desinfectante industrial concentrado IONICS" },
  { id: "cleaner-3", name: "Limpiador de Pisos IONICS", category: "limpieza", subcategory: "Limpiadores IONICS", brand: "IONICS", image: "/images/cleaners/cleaner3.webp", altText: "Limpiador profesional de pisos IONICS alto rendimiento" },
  { id: "cleaner-4", name: "Desengrasante Industrial IONICS", category: "limpieza", subcategory: "Limpiadores IONICS", brand: "IONICS", image: "/images/cleaners/cleaner4.webp", altText: "Desengrasante industrial IONICS para cocinas y talleres" },
  { id: "cleaner-5", name: "Sanitizante IONICS", category: "limpieza", subcategory: "Limpiadores IONICS", brand: "IONICS", image: "/images/cleaners/cleaner5.webp", altText: "Sanitizante de superficies IONICS grado hospitalario" },
  { id: "cleaner-6", name: "Limpiador Multiusos IONICS", category: "limpieza", subcategory: "Limpiadores IONICS", brand: "IONICS", image: "/images/cleaners/cleaner6.webp", altText: "Limpiador multiusos concentrado IONICS profesional" },

  // --- Salud Ocupacional: Detectores ---
  { id: "detector-1", name: "Detector de Tormentas SkyScan", category: "salud-ocupacional", subcategory: "Detectores y Alertas", brand: "IONICS", image: "/images/detectores/detector1.webp", altText: "Detector de tormentas y rayos SkyScan Storm Pro con pantalla LCD", featured: true },
  { id: "detector-2", name: "Detector Portátil de Rayos", category: "salud-ocupacional", subcategory: "Detectores y Alertas", brand: "IONICS", image: "/images/detectores/detector2.webp", altText: "Detector portátil de rayos y tormentas eléctricas" },
  { id: "detector-3", name: "Detector de Tormentas Pro", category: "salud-ocupacional", subcategory: "Detectores y Alertas", brand: "IONICS", image: "/images/detectores/detector3.webp", altText: "Detector profesional de tormentas con alerta temprana" },

  // --- Limpieza: Equipos de Fumigación ---
  { id: "bomba-18l", name: "Bomba Fumigadora 18L", category: "limpieza", subcategory: "Equipos de Fumigación", brand: "CTS", image: "/images/fumigacion/bombaveneno18litros.webp", altText: "Bomba fumigadora tipo espalda de 18 litros profesional" },
  { id: "repelente-flix", name: "Repelente FLIX Elmerc", category: "limpieza", subcategory: "Equipos de Fumigación", brand: "Elmerc", image: "/images/fumigacion/repelente.webp", altText: "Repelente de insectos profesional FLIX de Elmerc", featured: true },
  { id: "silicone-pro", name: "Silicone Sellador Pro", category: "limpieza", subcategory: "Equipos de Fumigación", brand: "CTS", image: "/images/fumigacion/silicone.webp", altText: "Sellador de silicona profesional para uso industrial" },

  // --- Limpieza (Catálogo) ---
  { id: "ionics-p01", name: "IONICS Soluciones Químicas", category: "limpieza", subcategory: "Línea Industrial IONICS", brand: "IONICS", image: "/product_images/ionics/ionics_p01_img05.webp", altText: "Catálogo IONICS - soluciones químicas para mantenimiento industrial desde 1991" },
  { id: "ionics-p03", name: "IONICS Mantenimiento Industrial", category: "limpieza", subcategory: "Línea Industrial IONICS", brand: "IONICS", image: "/product_images/ionics/ionics_p03_img04.webp", altText: "Soluciones químicas IONICS para mantenimiento automotriz e industrial" },
  { id: "ionics-p05", name: "Línea Cómputo IONICS", category: "limpieza", subcategory: "Línea Industrial IONICS", brand: "IONICS", image: "/product_images/ionics/ionics_p05_img17.webp", altText: "Línea cómputo IONICS - Electro, KV 500, Duster NF y LCD Cleaner" },
  { id: "ionics-p06", name: "Línea Dieléctricos IONICS", category: "limpieza", subcategory: "Línea Industrial IONICS", brand: "IONICS", image: "/product_images/ionics/ionics_p06_img04.webp", altText: "Desengrasantes dieléctricos IONICS - KV 400, KV 300, KV 200, Electro Red y KV 600" },
  { id: "ionics-p07", name: "Grasas y Lubricantes IONICS", category: "limpieza", subcategory: "Línea Industrial IONICS", brand: "IONICS", image: "/product_images/ionics/ionics_p07_img14.webp", altText: "Grasas y lubricantes IONICS - Let Out, Lube Dry EP, Lube Dry Gear y silicona multiuso" },
  { id: "ionics-p08", name: "Lubricantes y Penetrantes IONICS", category: "limpieza", subcategory: "Línea Industrial IONICS", brand: "IONICS", image: "/product_images/ionics/ionics_p08_img13.webp", altText: "Lubricantes IONICS - Chain Lube, Free Grease, Grafilet Out y Ant Seize EP" },
  { id: "ionics-p11", name: "Limpiadores y Desengrasantes IONICS", category: "limpieza", subcategory: "Línea Industrial IONICS", brand: "IONICS", image: "/product_images/ionics/ionics_p11_img04.webp", altText: "Limpiadores industriales IONICS - Flash Cleaner, Power Degreaser, Motor Cleaner y Alumibrite", images: ["/product_images/ionics/ionics_p11_img04.webp", "/product_images/ionics/ionics_p11_img05.webp"] },
  { id: "ionics-p14", name: "Cremas y Jabones IONICS", category: "limpieza", subcategory: "Línea Industrial IONICS", brand: "IONICS", image: "/product_images/ionics/ionics_p14_img08.webp", altText: "Cremas y jabones IONICS - Citrus Pro, Kool Cream, Bacsoap, jabón líquido y alcohol gel" },
  { id: "ionics-p16", name: "Limpieza y Desinfección IONICS", category: "limpieza", subcategory: "Línea Industrial IONICS", brand: "IONICS", image: "/product_images/ionics/ionics_p16_img12.webp", altText: "Limpieza y desinfección IONICS - Floreska Plus, Elite, Enzypower, detergente y jabón en polvo" },
  { id: "ionics-p18", name: "Limpieza Hogar e Industria IONICS", category: "limpieza", subcategory: "Línea Industrial IONICS", brand: "IONICS", image: "/product_images/ionics/ionics_p18_img11.webp", altText: "Limpieza IONICS - limpiavidrios, lavaplatos, abrillantador de pisos y muebles" },
  { id: "limpieza-p03", name: "Papel y Sanitización Kimberly-Clark", category: "limpieza", subcategory: "Papel y Sanitización", brand: "Kimberly-Clark", image: "/product_images/limpieza/limpieza_p03_img04.webp", altText: "Servilletas y jabón antibacterial Scott - papel, lavado y sanitización de manos", images: ["/product_images/limpieza/limpieza_p03_img04.webp", "/product_images/limpieza/limpieza_p03_img10.webp"] },
  { id: "limpieza-p04", name: "Papel Higiénico y Toallas Profesionales", category: "limpieza", subcategory: "Papel y Sanitización", brand: "Limpieza Profesional", image: "/product_images/limpieza/limpieza_p04_img01.webp", altText: "Papel higiénico jumbo roll 400m y 500m, rollos de toalla para manos 240m - Limpieza Profesional", images: ["/product_images/limpieza/limpieza_p04_img01.webp", "/product_images/limpieza/limpieza_p04_img02.webp", "/product_images/limpieza/limpieza_p04_img03.webp", "/product_images/limpieza/limpieza_p04_img04.webp"] },
  { id: "limpieza-p05", name: "Paños WypAll X80 Plus", category: "limpieza", subcategory: "Papel y Sanitización", brand: "Kimberly-Clark", image: "/product_images/limpieza/limpieza_p05_img01.webp", altText: "Paños de limpieza industrial WypAll X80 Plus ultra absorbentes y resistentes" },
  { id: "limpieza-p06", name: "Accesorios de Limpieza Profesional", category: "limpieza", subcategory: "Suministros y Herramientas", brand: "Suministros de Limpieza", image: "/product_images/limpieza/limpieza_p06_img06.webp", altText: "Cepillo de baño con base y señal de precaución piso mojado", images: ["/product_images/limpieza/limpieza_p06_img06.webp", "/product_images/limpieza/limpieza_p06_img09.webp"] },
  { id: "limpieza-p08", name: "Basureros y Bolsas de Basura", category: "limpieza", subcategory: "Suministros y Herramientas", brand: "Suministros de Limpieza", image: "/product_images/limpieza/limpieza_p08_img06.webp", altText: "Basurero Trash Box rojo con tapa push y bolsas de basura Bolmax Jumbo 66 galones", images: ["/product_images/limpieza/limpieza_p08_img06.webp", "/product_images/limpieza/limpieza_p08_img07.webp"] },
  { id: "limpieza-p09", name: "Detergentes y Lavaplatos Irex y Orix", category: "limpieza", subcategory: "Detergentes y Jabones", brand: "Grupo Irex", image: "/product_images/limpieza/limpieza_p09_img03.webp", altText: "Jabón Irex Cera Cremosa, crema lavaplatos Orix Limón y Orange, detergente Fort 3 e Irex Evolution", images: ["/product_images/limpieza/limpieza_p09_img03.webp", "/product_images/limpieza/limpieza_p09_img04.webp", "/product_images/limpieza/limpieza_p09_img05.webp", "/product_images/limpieza/limpieza_p09_img07.webp", "/product_images/limpieza/limpieza_p09_img11.webp", "/product_images/limpieza/limpieza_p09_img12.webp"] },
  { id: "limpieza-p10", name: "Detergente Industrial y Línea Irex Solutions", category: "limpieza", subcategory: "Detergentes y Jabones", brand: "Grupo Irex", image: "/product_images/limpieza/limpieza_p10_img02.webp", altText: "Detergente industrial 15kg, suavizante Irex Frescura Primaveral y línea Irex Solutions DOC-15, DM-2, LB-5", images: ["/product_images/limpieza/limpieza_p10_img02.webp", "/product_images/limpieza/limpieza_p10_img03.webp", "/product_images/limpieza/limpieza_p10_img05.webp"] },
  { id: "limpieza-p11", name: "Desengrasantes y Limpiadores IONICS", category: "limpieza", subcategory: "Aerosoles y Lubricantes", brand: "IONICS", image: "/product_images/limpieza/limpieza_p11_img02.webp", altText: "Desengrasantes IONICS CA 1981, D402, Flash Cleaner, Power Degreaser, IonicSol y Sanitizing", images: ["/product_images/limpieza/limpieza_p11_img02.webp", "/product_images/limpieza/limpieza_p11_img03.webp", "/product_images/limpieza/limpieza_p11_img04.webp", "/product_images/limpieza/limpieza_p11_img05.webp", "/product_images/limpieza/limpieza_p11_img06.webp", "/product_images/limpieza/limpieza_p11_img07.webp"] },
  { id: "limpieza-p12", name: "Aerosoles Industriales IONICS", category: "limpieza", subcategory: "Aerosoles y Lubricantes", brand: "IONICS", image: "/product_images/limpieza/limpieza_p12_img03.webp", altText: "Aerosoles IONICS Fast Degreaser heavy duty, Let Out penetrante y lubricante, y LF Oil aceite grado alimenticio", images: ["/product_images/limpieza/limpieza_p12_img03.webp", "/product_images/limpieza/limpieza_p12_img05.webp", "/product_images/limpieza/limpieza_p12_img06.webp"] },
  { id: "limpieza-p13", name: "Aerosoles Especializados IONICS", category: "limpieza", subcategory: "Aerosoles y Lubricantes", brand: "IONICS", image: "/product_images/limpieza/limpieza_p13_img02.webp", altText: "Aerosoles IONICS Film Brite silicón multiuso, Duster aire comprimido y Electro Ionics desplazador de humedad", images: ["/product_images/limpieza/limpieza_p13_img02.webp", "/product_images/limpieza/limpieza_p13_img03.webp", "/product_images/limpieza/limpieza_p13_img05.webp"] },
  { id: "limpieza-p14", name: "Cuchillos y Chairas Tramontina", category: "limpieza", subcategory: "Suministros y Herramientas", brand: "Tramontina", image: "/product_images/limpieza/limpieza_p14_img03.webp", altText: "Chairas para afilar, cuchillo profesional de deshuesar y machetes Tramontina", images: ["/product_images/limpieza/limpieza_p14_img03.webp", "/product_images/limpieza/limpieza_p14_img05.webp", "/product_images/limpieza/limpieza_p14_img06.webp"] },
  { id: "limpieza-p15", name: "Kit para Derrames Profesional", category: "limpieza", subcategory: "Suministros y Herramientas", brand: "Suministros de Limpieza", image: "/product_images/limpieza/limpieza_p15_img01.webp", altText: "Kit universal para derrames y kit para derrames peligrosos con absorbentes profesionales", images: ["/product_images/limpieza/limpieza_p15_img01.webp", "/product_images/limpieza/limpieza_p15_img03.webp"] },
  { id: "limpieza-p16", name: "Línea de Limpieza General Yulcer", category: "limpieza", subcategory: "Detergentes y Jabones", brand: "Yulcer", image: "/product_images/limpieza/limpieza_p16_img02.webp", altText: "Productos Yulcer - suavizante para ropa, jabón de manos, abrillantador de superficies, limpiador de vidrios y desinfectante multiuso", images: ["/product_images/limpieza/limpieza_p16_img02.webp", "/product_images/limpieza/limpieza_p16_img03.webp", "/product_images/limpieza/limpieza_p16_img04.webp", "/product_images/limpieza/limpieza_p16_img06.webp", "/product_images/limpieza/limpieza_p16_img07.webp", "/product_images/limpieza/limpieza_p16_img08.webp"] },
  { id: "limpieza-p17", name: "Yulcer Suavizante y Detergente Industrial", category: "limpieza", subcategory: "Detergentes y Jabones", brand: "Yulcer", image: "/product_images/limpieza/limpieza_p17_img04.webp", altText: "Suavizante y detergente líquido Yulcer presentación industrial en estañón de 208 litros", images: ["/product_images/limpieza/limpieza_p17_img04.webp", "/product_images/limpieza/limpieza_p17_img07.webp"] },

  // --- Salud Ocupacional (Catálogo) ---
  { id: "portwest-p09", name: "Guantes Anti-corte", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p09_img02.webp", altText: "Guantes anti-corte Portwest A621, A625 y A631" },
  { id: "portwest-p10", name: "Guantes Anti-corte Sabre-Lite", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p10_img02.webp", altText: "Guantes anti-corte Portwest A655 Sabre-Lite, A729 térmico y CT67" },
  { id: "portwest-p11", name: "Guantes Anti-corte y ESD", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p11_img02.webp", altText: "Guantes anti-corte A721 Anti Impact Grip, A724 Safety Impact y guantes ESD A698" },
  { id: "portwest-p13", name: "Guantes de Piel", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p13_img02.webp", altText: "Guantes de piel Portwest A209 Canadian Rigger, A229 y A260 Oves Driver" },
  { id: "portwest-p14", name: "Guantes de Especialistas", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p14_img02.webp", altText: "Guantes de especialistas Portwest A710 Tradesman, A771 PW3 y A800 látex" },
  { id: "portwest-p15", name: "Guantes de Soldador", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p15_img02.webp", altText: "Guantes de soldador Portwest A511 Classic Welding, A521 TIG Ultra y A530 reforzado" },
  { id: "portwest-p16", name: "Guantes Protección Química", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p16_img02.webp", altText: "Guantes protección química Portwest A802 látex, A810 Nitrosafe y A813" },
  { id: "portwest-p17", name: "Guantes Protección Química Neopreno", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p17_img02.webp", altText: "Guantes protección química Portwest A820 neopreno, AC01 cota de malla y AP52 Dexti Cut" },
  { id: "portwest-p18", name: "Guantes Térmicos y Uso General", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p18_img02.webp", altText: "Guantes Portwest AP81 anti-corte Liquid Pre HR, A590 térmicos y A790 anti-vibración" },
  { id: "portwest-p19", name: "Guantes Uso General Grip", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p19_img03.webp", altText: "Guantes uso general Portwest A105 Grip Xtra XL, A109 Grip Xtra y A174 Flex Grip Látex" },
  { id: "portwest-p20", name: "Guantes Uso General Nitrilo", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p20_img02.webp", altText: "Guantes uso general Portwest A302 nitrilo, A310 Flexo Grip y A315 All-Flex Grip" },
  { id: "portwest-p21", name: "Guantes DermiFlex y PVC", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Portwest", image: "/product_images/portwest/portwest_p21_img03.webp", altText: "Guantes uso general Portwest A353 DermiFlex Ultra Plus, A354 Ultra Pro y A435 PVC" },
  { id: "portwest-p23", name: "Accesorios de Calzado", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "Portwest", image: "/product_images/portwest/portwest_p23_img03.webp", altText: "Accesorios de calzado Portwest B914 bolsa para botas, FC81 y FC90 plantillas gel" },
  { id: "portwest-p24", name: "Calzado de Seguridad", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "Portwest", image: "/product_images/portwest/portwest_p24_img01.webp", altText: "Calzado de seguridad Portwest B1217 zapato tennis, FC17 bota Montana y FT05 Dielectric Hiker" },
  { id: "portwest-p27", name: "Batas y Camisas", category: "salud-ocupacional", subcategory: "Ropa de Trabajo", brand: "Portwest", image: "/product_images/portwest/portwest_p27_img02.webp", altText: "Bata ESD AS10, camisa polo DX410 y camisa polo alta visibilidad DX412 Portwest" },
  { id: "portwest-p30", name: "Chalecos y Chaquetas", category: "salud-ocupacional", subcategory: "Ropa de Trabajo", brand: "Portwest", image: "/product_images/portwest/portwest_p30_img02.webp", altText: "Chaleco Iona Executive F476, chaleco reflectivo G456 y chaqueta lluvia F440 Portwest" },
  { id: "portwest-p31", name: "Chaquetas de Seguridad", category: "salud-ocupacional", subcategory: "Ropa de Trabajo", brand: "Portwest", image: "/product_images/portwest/portwest_p31_img04.webp", altText: "Chaquetas Portwest DX460 Winter, S760 alta visibilidad y B213 algodón ignífuga" },
  { id: "portwest-p32", name: "Capas de Lluvia", category: "salud-ocupacional", subcategory: "Ropa de Trabajo", brand: "Portwest", image: "/product_images/portwest/portwest_p32_img02.webp", altText: "Capas Portwest L440 Essentials, S491 Sealtex Ultra y L450 PVC Sealtex" },
  { id: "portwest-p33", name: "Pantalones de Seguridad", category: "salud-ocupacional", subcategory: "Ropa de Trabajo", brand: "Portwest", image: "/product_images/portwest/portwest_p33_img03.webp", altText: "Pantalones Portwest BZ31 cargo ignífugo Bizweld, F441 lluvia Iona Classic y S917 seguridad" },
  { id: "portwest-p34", name: "Trajes Desechables", category: "salud-ocupacional", subcategory: "Ropa de Trabajo", brand: "Portwest", image: "/product_images/portwest/portwest_p34_img03.webp", altText: "Trajes desechables Portwest ST30 BizTex SMS, ST41 Microporous y ST60 Microporous" },
  { id: "portwest-p36", name: "Accesorios de Protección Individual", category: "salud-ocupacional", subcategory: "Accesorios y Botiquines", brand: "Portwest", image: "/product_images/portwest/portwest_p36_img03.webp", altText: "Accesorios Portwest PA54 linterna táctica, PW90 kit PPE y TB02 bolsa Open Tool" },
  { id: "portwest-p39", name: "Protector Auditivo", category: "salud-ocupacional", subcategory: "Protección Cabeza, Respiratoria y Auditiva", brand: "Portwest", image: "/product_images/portwest/portwest_p39_img02.webp", altText: "Protectores auditivos Portwest EP08 tapones espuma, PS43 protector 36dB y PW48 diadema 28dB" },
  { id: "salud-ocupacional-p03", name: "Botiquines y Accesorios", category: "salud-ocupacional", subcategory: "Accesorios y Botiquines", brand: "Salud Ocupacional", image: "/product_images/salud_ocupacional/salud_ocupacional_p03_img02.webp", altText: "Botiquines y accesorios de primeros auxilios - suministros médicos", images: ["/product_images/salud_ocupacional/salud_ocupacional_p03_img02.webp", "/product_images/salud_ocupacional/salud_ocupacional_p03_img03.webp", "/product_images/salud_ocupacional/salud_ocupacional_p03_img04.webp", "/product_images/salud_ocupacional/salud_ocupacional_p03_img05.webp"] },
  { id: "salud-ocupacional-p04", name: "Guantes Descartables", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Salud Ocupacional", image: "/product_images/salud_ocupacional/salud_ocupacional_p04_img01.webp", altText: "Guantes descartables de nitrilo libre de polvo", images: ["/product_images/salud_ocupacional/salud_ocupacional_p04_img01.webp", "/product_images/salud_ocupacional/salud_ocupacional_p04_img02.webp", "/product_images/salud_ocupacional/salud_ocupacional_p04_img03.webp"] },
  { id: "salud-ocupacional-p05", name: "Protección de Cabeza", category: "salud-ocupacional", subcategory: "Protección Cabeza, Respiratoria y Auditiva", brand: "DeltaPlus", image: "/product_images/salud_ocupacional/salud_ocupacional_p05_img02.webp", altText: "Protección de cabeza DeltaPlus - careta de soldador y lentes de seguridad" },
  { id: "salud-ocupacional-p06", name: "Protección Brazos y Manos DeltaPlus", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "DeltaPlus", image: "/product_images/salud_ocupacional/salud_ocupacional_p06_img04.webp", altText: "Guantes de protección DeltaPlus - mangas, guantes de soldador, nitrilo y látex", images: ["/product_images/salud_ocupacional/salud_ocupacional_p06_img04.webp", "/product_images/salud_ocupacional/salud_ocupacional_p06_img06.webp"] },
  { id: "salud-ocupacional-p07", name: "Protección Brazos y Manos Pyramex", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Pyramex", image: "/product_images/salud_ocupacional/salud_ocupacional_p07_img03.webp", altText: "Guantes Pyramex GL401, GL601, GL610C, GL614 y GL617DP", images: ["/product_images/salud_ocupacional/salud_ocupacional_p07_img03.webp", "/product_images/salud_ocupacional/salud_ocupacional_p07_img05.webp", "/product_images/salud_ocupacional/salud_ocupacional_p07_img06.webp"] },
  { id: "salud-ocupacional-p08", name: "Guantes Pyramex Piel y Para-amid", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Pyramex", image: "/product_images/salud_ocupacional/salud_ocupacional_p08_img01.webp", altText: "Guantes Pyramex GL617, GL2001K, GL2004K, GL3009CKB y GL3010CK", images: ["/product_images/salud_ocupacional/salud_ocupacional_p08_img01.webp", "/product_images/salud_ocupacional/salud_ocupacional_p08_img02.webp", "/product_images/salud_ocupacional/salud_ocupacional_p08_img03.webp", "/product_images/salud_ocupacional/salud_ocupacional_p08_img04.webp", "/product_images/salud_ocupacional/salud_ocupacional_p08_img05.webp"] },
  { id: "salud-ocupacional-p09", name: "Guantes Pyramex Piel y Para-amid", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Pyramex", image: "/product_images/salud_ocupacional/salud_ocupacional_p09_img01.webp", altText: "Guantes Pyramex de nitrilo, piel de vaqueta y para-amid", images: ["/product_images/salud_ocupacional/salud_ocupacional_p09_img01.webp", "/product_images/salud_ocupacional/salud_ocupacional_p09_img03.webp", "/product_images/salud_ocupacional/salud_ocupacional_p09_img04.webp"] },
  { id: "salud-ocupacional-p10", name: "Guantes de Algodón", category: "salud-ocupacional", subcategory: "Guantes de Protección", brand: "Salud Ocupacional", image: "/product_images/salud_ocupacional/salud_ocupacional_p10_img01.webp", altText: "Guantes de algodón con puntos de PVC para protección de manos" },
  { id: "salud-ocupacional-p12", name: "Protección Cuerpo", category: "salud-ocupacional", subcategory: "Ropa de Trabajo", brand: "Salud Ocupacional", image: "/product_images/salud_ocupacional/salud_ocupacional_p12_img03.webp", altText: "Ropa de protección corporal - chaquetas y pantalones de lluvia reflectivos", images: ["/product_images/salud_ocupacional/salud_ocupacional_p12_img03.webp", "/product_images/salud_ocupacional/salud_ocupacional_p12_img05.webp"] },
  { id: "salud-ocupacional-p13", name: "Protección Anticaídas", category: "salud-ocupacional", subcategory: "Accesorios y Botiquines", brand: "Salud Ocupacional", image: "/product_images/salud_ocupacional/salud_ocupacional_p13_img06.webp", altText: "Chaleco de seguridad alta visibilidad para protección anticaídas" },
  { id: "salud-ocupacional-p14", name: "Protección Respiratoria", category: "salud-ocupacional", subcategory: "Protección Cabeza, Respiratoria y Auditiva", brand: "DeltaPlus", image: "/product_images/salud_ocupacional/salud_ocupacional_p14_img05.webp", altText: "Mascarilla respiratoria DeltaPlus Spider Mask con filtro" },
  { id: "salud-ocupacional-p15", name: "Calzado de Seguridad DeltaPlus", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "DeltaPlus", image: "/product_images/salud_ocupacional/salud_ocupacional_p15_img06.webp", altText: "Plantillas de seguridad DeltaPlus para calzado industrial" },
  { id: "salud-ocupacional-p16", name: "Zapatos de Cuero Ban Ver y Safety Jogger", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "Safety Jogger", image: "/product_images/salud_ocupacional/salud_ocupacional_p16_img02.webp", altText: "Botas de seguridad Ban Ver M-7 y Safety Jogger de cuero", images: ["/product_images/salud_ocupacional/salud_ocupacional_p16_img02.webp", "/product_images/salud_ocupacional/salud_ocupacional_p16_img03.webp", "/product_images/salud_ocupacional/salud_ocupacional_p16_img05.webp", "/product_images/salud_ocupacional/salud_ocupacional_p16_img06.webp"] },
  { id: "salud-ocupacional-p17", name: "Calzado Safety Jogger", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "Safety Jogger", image: "/product_images/salud_ocupacional/salud_ocupacional_p17_img02.webp", altText: "Calzado de seguridad Safety Jogger Dakar EH, Climber S3 y Bestboy2 S3", images: ["/product_images/salud_ocupacional/salud_ocupacional_p17_img02.webp", "/product_images/salud_ocupacional/salud_ocupacional_p17_img03.webp", "/product_images/salud_ocupacional/salud_ocupacional_p17_img04.webp"] },
  { id: "salud-ocupacional-p19", name: "Calzado Institucional EVACOL", category: "salud-ocupacional", subcategory: "Calzado de Seguridad", brand: "EVACOL", image: "/product_images/salud_ocupacional/salud_ocupacional_p19_img01.webp", altText: "Calzado institucional EVACOL - zuecos y zapatos antideslizantes ref. 219, 080 y 114", images: ["/product_images/salud_ocupacional/salud_ocupacional_p19_img01.webp", "/product_images/salud_ocupacional/salud_ocupacional_p19_img03.webp", "/product_images/salud_ocupacional/salud_ocupacional_p19_img04.webp", "/product_images/salud_ocupacional/salud_ocupacional_p19_img05.webp"] },
  { id: "salud-ocupacional-p20", name: "Lentes de Seguridad Pyramex", category: "salud-ocupacional", subcategory: "Protección Visual y Facial", brand: "Pyramex", image: "/product_images/salud_ocupacional/salud_ocupacional_p20_img01.webp", altText: "Lentes y gafas de seguridad Pyramex - goggles y protección ocular", images: ["/product_images/salud_ocupacional/salud_ocupacional_p20_img01.webp", "/product_images/salud_ocupacional/salud_ocupacional_p20_img02.webp", "/product_images/salud_ocupacional/salud_ocupacional_p20_img03.webp", "/product_images/salud_ocupacional/salud_ocupacional_p20_img04.webp", "/product_images/salud_ocupacional/salud_ocupacional_p20_img05.webp", "/product_images/salud_ocupacional/salud_ocupacional_p20_img07.webp"] },
  { id: "salud-ocupacional-p21", name: "Protección Ocular y Lentes", category: "salud-ocupacional", subcategory: "Protección Visual y Facial", brand: "Salud Ocupacional", image: "/product_images/salud_ocupacional/salud_ocupacional_p21_img07.webp", altText: "Lentes de seguridad de protección ocular" },
  { id: "salud-ocupacional-p22", name: "Protección Facial y Caretas", category: "salud-ocupacional", subcategory: "Protección Visual y Facial", brand: "Salud Ocupacional", image: "/product_images/salud_ocupacional/salud_ocupacional_p22_img04.webp", altText: "Caretas y visores de protección facial - malla y policarbonato", images: ["/product_images/salud_ocupacional/salud_ocupacional_p22_img04.webp", "/product_images/salud_ocupacional/salud_ocupacional_p22_img05.webp", "/product_images/salud_ocupacional/salud_ocupacional_p22_img06.webp"] },
  { id: "salud-ocupacional-p23", name: "Cascos, Conos y Accesorios", category: "salud-ocupacional", subcategory: "Protección Cabeza, Respiratoria y Auditiva", brand: "Salud Ocupacional", image: "/product_images/salud_ocupacional/salud_ocupacional_p23_img01.webp", altText: "Conos viales, cascos de seguridad, fajas lumbares y protectores de espinilla", images: ["/product_images/salud_ocupacional/salud_ocupacional_p23_img01.webp", "/product_images/salud_ocupacional/salud_ocupacional_p23_img06.webp", "/product_images/salud_ocupacional/salud_ocupacional_p23_img07.webp", "/product_images/salud_ocupacional/salud_ocupacional_p23_img08.webp", "/product_images/salud_ocupacional/salud_ocupacional_p23_img10.webp"] },
];

// === SUBCATEGORY HELPERS ===
export function groupProductsBySubcategory(
  products: Product[],
  category: CategorySlug
): { subcategory: string; products: Product[] }[] {
  const order = SUBCATEGORY_ORDER[category];
  const groups = new Map<string, Product[]>();

  order.forEach((sub) => groups.set(sub, []));

  products.forEach((p) => {
    const arr = groups.get(p.subcategory);
    if (arr) arr.push(p);
  });

  return order
    .filter((sub) => (groups.get(sub)?.length ?? 0) > 0)
    .map((sub) => ({ subcategory: sub, products: groups.get(sub)! }));
}

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
