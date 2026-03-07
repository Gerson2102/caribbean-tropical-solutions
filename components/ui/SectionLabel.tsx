export default function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
      {children}
    </span>
  );
}
