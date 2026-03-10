export default function Loading() {
  return (
    <div className="noise-overlay flex min-h-screen items-center justify-center bg-deep-green">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
    </div>
  );
}
