// ============================================================
// Caribbean Tropical Solutions S.A. — Central Data & Constants
// ============================================================

import productsData from "./products.generated.json";
// Site-wide contact & social info — editable from the CMS ("Configuración del sitio").
import siteSettings from "../content/settings.json";

// === CONTACT ===
export const WHATSAPP_NUMBER = siteSettings.whatsappNumber;
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_URL_WITH_MESSAGE = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, me gustaría obtener más información sobre sus productos.")}`;
export const EMAIL = siteSettings.email;
export const PHONE = siteSettings.phone;
export const ADDRESS = siteSettings.address;
export const INSTAGRAM_URL = siteSettings.instagramUrl;
export const FACEBOOK_URL = siteSettings.facebookUrl;

// === BUSINESS FACTS ===
// The sentence that defines the business, reused word for word (meta
// description, hero, JSON-LD, FAQ) so search engines and AI read one identity.
export const BUSINESS_SENTENCE =
  "Caribbean Tropical Solutions es una distribuidora de productos de limpieza, EPP y ferretería en Guácimo, Limón, Costa Rica.";
// Keep in sync with openingHoursSpecification in app/layout.tsx.
export const OPENING_HOURS = "de lunes a sábado, de 8:00 a.m. a 5:00 p.m.";

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
export type CategorySlug = "limpieza" | "salud-ocupacional" | "mantenimiento" | "oficina";

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
    slug: "mantenimiento",
    name: "Mantenimiento",
    subtitle: "Herramientas, lubricantes y suministros para el mantenimiento industrial",
    image: "/images/categories/mantenimiento.webp",
    altText: "Herramientas manuales para mantenimiento industrial sobre superficie de madera",
  },
  {
    slug: "oficina",
    name: "Oficina",
    subtitle: "Suministros y artículos de oficina",
    image: "/images/categories/oficina.webp",
    altText: "Bloc de notas, lápices, tijeras y sobre — suministros y artículos de oficina",
  },
];

// === FILTER TABS ===
export const FILTER_TABS = [
  { slug: "todos" as const, label: "Todos" },
  { slug: "limpieza" as const, label: "Limpieza" },
  { slug: "salud-ocupacional" as const, label: "Salud Ocupacional" },
  { slug: "mantenimiento" as const, label: "Mantenimiento" },
  { slug: "oficina" as const, label: "Oficina" },
];

export type FilterSlug = CategorySlug | "todos";

// === SUBCATEGORY ORDER ===
export const SUBCATEGORY_ORDER: Record<CategorySlug, string[]> = {
  limpieza: ["Limpiadores IONICS", "Línea Industrial IONICS", "Papel y Sanitización", "Aerosoles y Lubricantes", "Detergentes y Jabones", "Equipos de Fumigación", "Suministros y Herramientas"],
  "salud-ocupacional": ["Calzado de Seguridad", "Guantes de Protección", "Ropa de Trabajo", "Protección Visual y Facial", "Protección Cabeza, Respiratoria y Auditiva", "Detectores y Alertas", "Accesorios y Botiquines"],
  mantenimiento: [],
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
  order?: number;
}

export const PRODUCTS: Product[] = productsData as Product[];

// === SUBCATEGORY HELPERS ===
export function groupProductsBySubcategory(
  products: Product[],
  category: CategorySlug
): { subcategory: string; products: Product[] }[] {
  const order = SUBCATEGORY_ORDER[category];
  const groups = new Map<string, Product[]>();

  // Seed the curated subcategories first so they keep their defined order...
  order.forEach((sub) => groups.set(sub, []));

  // ...then bucket every product, creating a group for any subcategory not in
  // the curated list (e.g. one added later via the CMS) so it's never dropped.
  products.forEach((p) => {
    if (!groups.has(p.subcategory)) groups.set(p.subcategory, []);
    groups.get(p.subcategory)!.push(p);
  });

  return Array.from(groups.entries())
    .filter(([, items]) => items.length > 0)
    .map(([subcategory, items]) => ({ subcategory, products: items }));
}

// === FAQ ===
// Shown on the pages and emitted as FAQPage JSON-LD — AI assistants quote these
// answers verbatim, so only state confirmed facts.
export interface Faq {
  question: string;
  answer: string;
}

// Shared by the home FAQ and the product line pages.
const FAQ_SHIPPING: Faq = {
  question: "¿Hacen envíos a todo Costa Rica?",
  answer:
    "Sí. Preparamos tu pedido y lo enviamos a cualquier punto del Caribe y del resto de Costa Rica. Los detalles de la entrega se coordinan por WhatsApp al confirmar el pedido.",
};
const FAQ_PICKUP: Faq = {
  question: "¿Puedo retirar mi pedido en el local?",
  answer: `Sí. Podés retirar tu pedido en nuestro local en ${ADDRESS}, ${OPENING_HOURS}. Si preferís, te lo enviamos a cualquier punto de Costa Rica.`,
};

export const FAQS: Faq[] = [
  {
    question: "¿Qué es Caribbean Tropical Solutions?",
    answer: `${BUSINESS_SENTENCE} Vendemos productos de limpieza y desinfección, equipo de protección personal (EPP), artículos de salud ocupacional, herramientas y suministros de mantenimiento, ferretería y suministros de oficina a empresas y particulares de todo el país.`,
  },
  {
    question: "¿Dónde comprar EPP y productos de limpieza industrial en Limón?",
    answer: `En Caribbean Tropical Solutions, en ${ADDRESS}. Atendemos a empresas y particulares de toda la zona del Caribe —Guácimo, Guápiles, Siquirres, Limón, Matina y Talamanca— y enviamos al resto de Costa Rica. Cotizá por WhatsApp al +506 ${PHONE}.`,
  },
  {
    question: "¿Venden a particulares o solo a empresas?",
    answer:
      "A los dos: vendemos tanto a empresas como a particulares. Escribinos por WhatsApp con lo que necesitás y te cotizamos.",
  },
  FAQ_SHIPPING,
  FAQ_PICKUP,
  {
    question: "¿Cuál es el horario de atención?",
    answer: `Atendemos ${OPENING_HOURS} en ${ADDRESS}.`,
  },
  {
    question: "¿Cómo hago un pedido o pido una cotización?",
    answer: `Escribinos por WhatsApp al +506 ${PHONE} con los productos y cantidades que necesitás; respondemos en minutos. Te enviamos la cotización, confirmás cantidades y coordinamos el pago y la entrega. También podés escribirnos a ${EMAIL} o usar el formulario de contacto.`,
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer: "Aceptamos efectivo, tarjeta de crédito y transferencia bancaria.",
  },
  {
    question: "¿Dónde veo los precios?",
    answer:
      "Cotizamos cada pedido según el producto y la cantidad. Escribinos por WhatsApp con lo que necesitás y te pasamos los precios sin compromiso.",
  },
  {
    question: "¿Qué productos de limpieza y desinfección venden?",
    answer:
      "Limpiadores y desinfectantes IONICS (incluida su línea industrial), papel y productos de sanitización, aerosoles y lubricantes, detergentes y jabones, equipos de fumigación, y suministros y herramientas de limpieza.",
  },
  {
    question: "¿Qué equipo de protección personal (EPP) venden?",
    answer:
      "Calzado y botas de seguridad, guantes de protección, ropa de trabajo, protección visual y facial, cascos, protección respiratoria y auditiva, detectores y alertas, y botiquines y accesorios de seguridad.",
  },
  {
    question: "¿Qué marcas distribuyen?",
    answer:
      "Trabajamos con marcas como DeWalt, IONICS, EVACOL, Portwest, Kimberly-Clark, Tramontina, Elmerc, Carpi, Grupo Irex y Yulcer.",
  },
  {
    question: "¿Me ayudan a elegir los productos correctos?",
    answer:
      "Sí. Te damos asesoría técnica para elegir el EPP, los productos de limpieza o las herramientas adecuadas para tu operación. Escribinos por WhatsApp y te respondemos en minutos.",
  },
];

// === PRODUCT LINE PAGES (/productos/[slug]) ===
// A line gets its own page only once it has real content to carry it: add an
// entry when Mantenimiento or Oficina does. Product types come from
// SUBCATEGORY_ORDER and products from the CMS catalog.
export interface CategoryPage {
  title: string; // before " | Caribbean Tropical"; full title ≤ 60 chars
  description: string; // ≤ 155 chars
  heading: string; // the page's h1
  intro: string;
  brands: string[];
  quoteMessage: string; // prefilled WhatsApp message
  faqs: Faq[];
}

export const CATEGORY_PAGES: Partial<Record<CategorySlug, CategoryPage>> = {
  limpieza: {
    title: "Limpieza y Desinfección en Limón",
    description:
      "Limpiadores y desinfectantes IONICS, papel, detergentes, aerosoles y equipos de fumigación en Guácimo, Limón. Retiro en local y envíos a todo Costa Rica.",
    heading: "Productos de Limpieza y Desinfección",
    intro:
      "Distribuimos productos profesionales de limpieza, sanitización y fumigación desde Guácimo, Limón, para empresas y particulares. Retirá tu pedido en nuestro local o recibilo en cualquier punto de Costa Rica.",
    brands: ["IONICS", "Kimberly-Clark"],
    quoteMessage: "Hola, quiero cotizar productos de limpieza.",
    faqs: [
      {
        question: "¿Dónde comprar productos de limpieza industrial en Limón?",
        answer: `En Caribbean Tropical Solutions, en ${ADDRESS}. Distribuimos limpiadores y desinfectantes IONICS, papel y productos de sanitización, detergentes, aerosoles y equipos de fumigación para empresas y particulares. Cotizá por WhatsApp al +506 ${PHONE}.`,
      },
      {
        question: "¿Qué marcas de limpieza distribuyen?",
        answer: "IONICS, con sus limpiadores y su línea industrial, y Kimberly-Clark en papel y sanitización.",
      },
      {
        question: "¿Venden equipos de fumigación?",
        answer:
          "Sí. Tenemos equipos de fumigación junto con productos de limpieza y sanitización. Escribinos por WhatsApp y te ayudamos a elegir el equipo para tu trabajo.",
      },
      FAQ_PICKUP,
      FAQ_SHIPPING,
    ],
  },
  "salud-ocupacional": {
    title: "EPP y Salud Ocupacional en Limón",
    description:
      "Calzado de seguridad, guantes, ropa de trabajo, cascos y protección auditiva y respiratoria en Guácimo, Limón. Retiro en local y envíos a todo el país.",
    heading: "EPP y Salud Ocupacional",
    intro:
      "Distribuimos equipo de protección personal, calzado de seguridad y ropa de trabajo desde Guácimo, Limón, para empresas y particulares. Retirá tu pedido en nuestro local o recibilo en cualquier punto de Costa Rica.",
    brands: ["Portwest", "EVACOL"],
    quoteMessage: "Hola, quiero cotizar equipo de protección personal.",
    faqs: [
      {
        question: "¿Dónde comprar EPP en Limón?",
        answer: `En Caribbean Tropical Solutions, en ${ADDRESS}. Vendemos calzado de seguridad, guantes, ropa de trabajo, cascos y protección visual, auditiva y respiratoria a empresas y particulares. Cotizá por WhatsApp al +506 ${PHONE}.`,
      },
      {
        question: "¿Venden calzado de seguridad?",
        answer: "Sí. Tenemos calzado de seguridad y de trabajo, como el calzado antideslizante de EVACOL.",
      },
      {
        question: "¿Qué marcas de EPP distribuyen?",
        answer: "Portwest en ropa de trabajo y equipo de protección, y EVACOL en calzado de trabajo.",
      },
      {
        question: "¿Me ayudan a elegir el EPP correcto?",
        answer:
          "Sí. Te asesoramos para elegir el equipo de protección adecuado para tu trabajo. Escribinos por WhatsApp y te respondemos en minutos.",
      },
      FAQ_PICKUP,
      FAQ_SHIPPING,
    ],
  },
};

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
