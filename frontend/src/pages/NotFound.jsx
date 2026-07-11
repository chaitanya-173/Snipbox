import { Link } from "react-router-dom";
import { Code2, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--primary)]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--accent)]/10 blur-[100px]" />

      <div className="relative w-full max-w-[420px] text-center">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Code2 size={22} strokeWidth={2.4} className="text-[var(--primary)]" />
          <span className="text-[17px] tracking-tight">
            <span className="font-semibold text-[var(--text)]">Snip</span>
            <span className="font-bold text-[var(--primary)]">Box</span>
          </span>
        </Link>

        <div
          className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80
                     backdrop-blur-xl p-10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
        >
          <p className="text-[56px] font-bold tracking-tight text-[var(--primary)] leading-none">
            404
          </p>
          <h1 className="text-[19px] font-semibold mt-3">Page not found</h1>
          <p className="text-[13.5px] text-[var(--text-muted)] mt-2 leading-relaxed">
            {"The page you're looking for doesn't exist or may have been moved."}
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                       text-[13.5px] font-medium bg-[var(--primary)] text-white
                       hover:opacity-90 transition-all duration-200 active:scale-[0.98]"
          >
            <ArrowLeft size={15} />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}