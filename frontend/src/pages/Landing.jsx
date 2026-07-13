import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Code2,
  Sun,
  Moon,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  FileCode2,
  Highlighter,
  FileDown,
  Keyboard,
  Palette,
  Search,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useShortcutsContext } from "../context/ShortcutsContext";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";
import ThemeSwapImage from "../components/ThemeSwapImage";
import SegmentedToggle from "../components/SegmentedToggle";

const FEATURES = [
  {
    icon: FileCode2,
    title: "Code + Notes, one toggle",
    desc: "Switch the entire app between snippet mode and lightweight note mode with a single sliding control.",
  },
  {
    icon: Highlighter,
    title: "Syntax highlighting",
    desc: "PrismJS-powered previews across 8 languages, themed to match SnipBox's own colors — not a generic theme.",
  },
  {
    icon: FileDown,
    title: "Export to PDF",
    desc: "One click renders a clean, dark, line-numbered layout via your browser's native print dialog.",
  },
  {
    icon: Keyboard,
    title: "Keyboard-first",
    desc: "Save, search, navigate, and switch themes without ever reaching for the mouse.",
  },
  {
    icon: Palette,
    title: "Dark & light themes",
    desc: "CSS-variable driven, persisted across sessions, with no flash on load.",
  },
  {
    icon: Search,
    title: "Search & sort",
    desc: "Live search by title or content, sorted by newest, oldest, or name — instantly.",
  },
];

export default function Landing() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { setHelpOpen } = useShortcutsContext();
  const navigate = useNavigate();
  const [demoType, setDemoType] = useState("code");

  // Already logged in? Skip the marketing page, go straight to the app.
  useEffect(() => {
    if (user) navigate("/create", { replace: true });
  }, [user, navigate]);

  return (
    <div style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-[var(--border)] bg-[var(--bg)]/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Code2
              size={22}
              strokeWidth={2.4}
              className="text-[var(--primary)]"
            />
            <span className="text-[17px] tracking-tight">
              <span className="font-semibold text-[var(--text)]">Snip</span>
              <span className="font-bold text-[var(--primary)]">Box</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text)]
                         hover:bg-[var(--surface-2)] transition-all duration-200 active:scale-90"
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <Link
              to="/login"
              className="hidden sm:inline-block px-4 py-2 rounded-full text-[13.5px] font-medium
                         text-[var(--text)] hover:bg-[var(--surface-2)] transition-all duration-200"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-medium
                         bg-[var(--primary)] text-white hover:opacity-90
                         transition-all duration-200 active:scale-95"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-20 pb-16">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--primary)]/15 blur-[120px]" />
        <div className="pointer-events-none absolute top-40 right-0 w-96 h-96 rounded-full bg-[var(--accent)]/10 blur-[100px]" />

        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium
                         border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] mb-6"
            >
              <Sparkles size={12} className="text-[var(--primary)]" />
              Open source · Built for developers
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-[40px] sm:text-[56px] font-bold tracking-tight leading-[1.05]">
              Your code snippets deserve
              <br />
              <span className="text-[var(--primary)]">a beautiful home.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-[16px] sm:text-[17px] text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto">
              Save, search, and export your code and notes — with real syntax
              highlighting, a full keyboard-shortcut system, and a UI that feels
              like a real developer tool.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-[14.5px] font-medium
                           bg-[var(--primary)] text-white hover:opacity-90
                           transition-all duration-200 active:scale-[0.98]
                           shadow-[0_4px_14px_-6px_var(--primary)]"
              >
                Get Started Free
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://github.com/chaitanya-173/Snipbox"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-[14.5px] font-medium
                           border border-[var(--border)] text-[var(--text)]
                           hover:bg-[var(--surface-2)] transition-all duration-200"
              >
                <Github size={16} />
                View on GitHub
              </a>
            </div>
          </Reveal>
        </div>

        {/* Product preview */}
        <Reveal delay={320} className="relative mt-16 max-w-5xl mx-auto">
          <TiltCard>
            <div
              className="rounded-2xl border border-[var(--border)] overflow-hidden
                         shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]"
            >
              <ThemeSwapImage
                darkSrc="/landing/home-dark.png"
                lightSrc="/landing/home-light.png"
                alt="SnipBox editor"
                className="aspect-[2750/1575]"
              />
            </div>
          </TiltCard>
        </Reveal>
      </section>

      {/* Features grid */}
      <section className="px-4 sm:px-6 py-20 max-w-6xl mx-auto">
        <Reveal className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-[28px] sm:text-[34px] font-bold tracking-tight">
            {"Everything you need. Nothing you don't."}
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)]">
            No feature was added without a reason — just a focused tool that
            does the job well.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 60}>
              <div
                className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)]
                           p-6 transition-all duration-300 hover:-translate-y-1
                           hover:border-[var(--primary)]/40
                           hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.3)]"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-[15.5px] font-semibold text-[var(--text)]">
                  {title}
                </h3>
                <p className="mt-1.5 text-[13.5px] text-[var(--text-muted)] leading-relaxed">
                  {desc}
                </p>

                {/* A genuinely live, clickable demo inside the first card */}
                {title === "Code + Notes, one toggle" && (
                  <div className="mt-4">
                    <SegmentedToggle
                      options={[
                        { value: "code", label: "Code" },
                        { value: "notes", label: "Notes" },
                      ]}
                      value={demoType}
                      onChange={setDemoType}
                    />
                  </div>
                )}

                {/* Small decorative PDF export preview */}
                {title === "Export to PDF" && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-[var(--border)] rotate-1">
                    <img
                      src="/landing/pdf-export.png"
                      alt="PDF export preview"
                      className="w-full h-24 object-cover object-top"
                    />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Keyboard shortcuts spotlight */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[var(--primary)]">
              Keyboard-first
            </span>
            <h2 className="mt-3 text-[28px] sm:text-[34px] font-bold tracking-tight leading-tight">
              Navigate without touching your mouse.
            </h2>
            <p className="mt-4 text-[15px] text-[var(--text-muted)] leading-relaxed">
              Every shortcut is route-aware and safe while typing — press{" "}
              <kbd className="px-1.5 py-0.5 rounded-md text-[12px] bg-[var(--surface-2)] border border-[var(--border)]">
                ?
              </kbd>{" "}
              anywhere in the app for the full list.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {[
                ["Save", "⌘S"],
                ["Focus search", "⌘K"],
                ["Go to Create", "G then H"],
                ["Go to My Snippets", "G then S"],
              ].map(([label, keys]) => (
                <div
                  key={label}
                  className="flex items-center justify-between max-w-xs"
                >
                  <span className="text-[13.5px] text-[var(--text)]">
                    {label}
                  </span>
                  <kbd className="px-2 py-1 rounded-md text-[11.5px] font-mono bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]">
                    {keys}
                  </kbd>
                </div>
              ))}
            </div>

            <button
              onClick={() => setHelpOpen(true)}
              className="mt-7 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-medium
                         border border-[var(--border)] text-[var(--text)]
                         hover:bg-[var(--surface-2)] transition-all duration-200 active:scale-95"
            >
              <Keyboard size={15} />
              Try it — press{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[11px]">
                ?
              </kbd>
            </button>
          </Reveal>

          <Reveal delay={150}>
            <TiltCard>
              <div
                className="rounded-2xl border border-[var(--border)] overflow-hidden
                           shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)]"
              >
                <ThemeSwapImage
                  darkSrc="/landing/shortcuts-dark.png"
                  lightSrc="/landing/shortcuts-light.png"
                  alt="Keyboard shortcuts modal"
                  className="aspect-[952/922]"
                />
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* My Snippets preview */}
      <section className="px-4 sm:px-6 py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal className="order-2 lg:order-1">
            <TiltCard>
              <div
                className="rounded-2xl border border-[var(--border)] overflow-hidden
                           shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)]"
              >
                <ThemeSwapImage
                  darkSrc="/landing/snippets-dark.png"
                  lightSrc="/landing/snippets-light.png"
                  alt="My Snippets grid"
                  className="aspect-[2750/1400]"
                />
              </div>
            </TiltCard>
          </Reveal>

          <Reveal delay={150} className="order-1 lg:order-2">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-[var(--primary)]">
              My Snippets
            </span>
            <h2 className="mt-3 text-[28px] sm:text-[34px] font-bold tracking-tight leading-tight">
              Every snippet, beautifully organized.
            </h2>
            <p className="mt-4 text-[15px] text-[var(--text-muted)] leading-relaxed">
              {
                "A live search that matches as you type, sort by newest, oldest, or name, and syntax-highlighted previews right on the card — no need to open a snippet just to remember what's in it."
              }
            </p>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-4 sm:px-6 py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-[var(--primary)]/15 blur-[120px]" />
        </div>
        <Reveal className="relative max-w-xl mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight">
            Start organizing your code today.
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)]">
            Free to use. No credit card required.
          </p>
          <Link
            to="/register"
            className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-medium
                       bg-[var(--primary)] text-white hover:opacity-90
                       transition-all duration-200 active:scale-[0.98]
                       shadow-[0_4px_14px_-6px_var(--primary)]"
          >
            Get Started Free
            <ArrowRight size={17} />
          </Link>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-4 sm:px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2
              size={18}
              strokeWidth={2.4}
              className="text-[var(--primary)]"
            />
            <span className="text-[14px] tracking-tight">
              <span className="font-semibold text-[var(--text)]">Snip</span>
              <span className="font-bold text-[var(--primary)]">Box</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/chaitanya-173/Snipbox"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-all duration-200"
            >
              <Github size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/chaitanya-chaudhary-675343360"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-all duration-200"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="mailto:chaitanyachaudhary73@gmail.com"
              aria-label="Email"
              className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] transition-all duration-200"
            >
              <Mail size={17} />
            </a>
          </div>

          <p className="text-[12.5px] text-[var(--text-muted)]">
            © {new Date().getFullYear()} SnipBox. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
