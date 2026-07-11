import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[var(--primary)]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[var(--accent)]/10 blur-[100px]" />

      <div className="relative w-full max-w-[400px]">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Code2 size={22} strokeWidth={2.4} className="text-[var(--primary)]" />
          <span className="text-[17px] tracking-tight">
            <span className="font-semibold text-[var(--text)]">Snip</span>
            <span className="font-bold text-[var(--primary)]">Box</span>
          </span>
        </Link>

        <div
          className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80
                     backdrop-blur-xl p-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
        >
          <h1 className="text-[20px] font-semibold text-center tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-[13.5px] text-[var(--text-muted)] text-center mt-1.5 mb-6">
              {subtitle}
            </p>
          )}
          {!subtitle && <div className="mb-6" />}
          {children}
        </div>
      </div>
    </div>
  );
}