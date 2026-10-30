import { ADDRESS, CATEGORIES, EMAIL, FAQS, PHONE, WHATSAPP_URL } from "@/lib/constants";

const SITE = "https://www.caribbeantropicalsolutions.com";

// /llms.txt (llmstxt.org): plain-Markdown summary for AI assistants, built from
// the same constants as the page so CMS contact edits stay in sync.
export const dynamic = "force-static";

export function GET() {
  const body = `# Caribbean Tropical Solutions S.A.

> Distribuidora de productos industriales en ${ADDRESS}: limpieza y desinfección, equipo de protección personal (EPP), salud ocupacional, mantenimiento, ferretería y oficina. Envíos a todo Costa Rica. Pedidos y cotizaciones por WhatsApp.

## Contacto

- WhatsApp y teléfono: +506 ${PHONE} (${WHATSAPP_URL})
- Email: ${EMAIL}
- Ubicación: ${ADDRESS}
- Sitio web: ${SITE}

## Líneas de productos

${CATEGORIES.map((c) => `- ${c.name}: ${c.subtitle}`).join("\n")}

## Preguntas frecuentes

${FAQS.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}

## Enlaces

- [Líneas de productos](${SITE}/#categorias)
- [Cómo comprar](${SITE}/#como-comprar)
- [Preguntas frecuentes](${SITE}/#preguntas-frecuentes)
- [Contacto](${SITE}/#contacto)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
