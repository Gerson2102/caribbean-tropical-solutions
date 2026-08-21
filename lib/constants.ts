// ============================================================
// Caribbean Tropical Solutions S.A. — Central Data & Constants
// ============================================================

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
    altText: "Productos y herramientas para mantenimiento industrial",
    comingSoon: true,
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

// Catálogo vaciado a petición del cliente — pendiente el nuevo set de productos.
// products.generated.json se conserva en disco; para restaurar, reimportarlo aquí.
export const PRODUCTS: Product[] = [];

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
