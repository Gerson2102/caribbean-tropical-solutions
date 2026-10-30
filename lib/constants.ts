// ============================================================
// Caribbean Tropical Solutions S.A. — Central Data & Constants
// ============================================================

import productsData from "./products.generated.json";
// Site-wide contact & social info — editable from the CMS ("Configuración del sitio").
import siteSettings from "../content/settings.json";
// FAQ and product line pages — editable from the CMS.
import faqData from "../content/faq.json";
import limpiezaLine from "../content/lineas/limpieza.json";
import saludLine from "../content/lineas/salud-ocupacional.json";

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

// Opening hours from the CMS: a days preset plus 24-hour open/close times.
// Feed the FAQ ({horario}), the Contact section and the Store JSON-LD.
const HOURS_PRESETS: Record<string, { label: string; days: string[] }> = {
  "lunes-viernes": { label: "de lunes a viernes", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
  "lunes-sabado": { label: "de lunes a sábado", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
  todos: { label: "todos los días", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
};
const hoursPreset = HOURS_PRESETS[siteSettings.hoursDays] ?? HOURS_PRESETS["lunes-sabado"];

/** "17:00" → "5:00 p.m." */
function to12h(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "a.m." : "p.m."}`;
}

export const OPENING_HOURS = `${hoursPreset.label}, de ${to12h(siteSettings.hoursOpen)} a ${to12h(siteSettings.hoursClose)}`;
export const OPENING_HOURS_SCHEMA = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: hoursPreset.days,
  opens: siteSettings.hoursOpen,
  closes: siteSettings.hoursClose,
};

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

// === FAQ & PRODUCT LINE PAGES (edited in the CMS) ===
// content/faq.json holds the home FAQ; content/lineas/<slug>.json one product
// line page each. AI assistants quote these answers verbatim, so they should
// only state confirmed facts.
export interface Faq {
  question: string;
  answer: string;
}

// CMS text can say {telefono}, {correo}, {direccion} or {horario}; they're
// filled from "Configuración del sitio", so an edited phone never goes stale here.
const FACTS: Record<string, string> = {
  telefono: PHONE,
  correo: EMAIL,
  direccion: ADDRESS,
  horario: OPENING_HOURS,
};
const fillFacts = (text: string) => text.replace(/\{(\w+)\}/g, (tag, key: string) => FACTS[key] ?? tag);
const fillFaqs = (faqs: Faq[]) => faqs.map((f) => ({ question: f.question, answer: fillFacts(f.answer) }));

export const FAQS: Faq[] = fillFaqs(faqData.items);

// A line gets its own page (/productos/[slug]) only once it has real content to
// carry it. To add Mantenimiento or Oficina: create content/lineas/<slug>.json,
// import it above, add it below and to public/admin/config.yml.
// Product types come from SUBCATEGORY_ORDER and products from the CMS catalog.
export interface CategoryPage {
  title: string; // before " | Caribbean Tropical"; full title ≤ 60 chars
  description: string; // ≤ 155 chars
  heading: string; // the page's h1
  intro: string;
  brands: string[];
  quoteMessage: string; // prefilled WhatsApp message
  faqs: Faq[];
}

const linePage = (page: CategoryPage): CategoryPage => ({ ...page, intro: fillFacts(page.intro), faqs: fillFaqs(page.faqs) });

export const CATEGORY_PAGES: Partial<Record<CategorySlug, CategoryPage>> = {
  limpieza: linePage(limpiezaLine),
  "salud-ocupacional": linePage(saludLine),
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
