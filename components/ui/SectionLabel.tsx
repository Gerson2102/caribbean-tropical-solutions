// `as="h2"` for sections where the label is the only heading (e.g. BrandMarquee);
// elsewhere the real h2 comes from ScrollTextReveal and the label stays a span.
export default function SectionLabel({
  children,
  as: Tag = "span",
}: {
  children: string;
  as?: "span" | "h2";
}) {
  return (
    <Tag className="inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.15em] text-primary-dark">
      {children}
    </Tag>
  );
}
