import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Code2, Sun, Moon, LogIn } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { to: "/", label: "Create", end: true },
  { to: "/snippets", label: "My Snippets", end: false },
];

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const trackRef = useRef(null);
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const active =
      navLinks.find(({ to, end }) =>
        end ? location.pathname === to : location.pathname.startsWith(to)
      ) ?? navLinks[0];

    const el = linkRefs.current[active.to];
    const track = trackRef.current;
    if (el && track) {
      const elRect = el.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      setIndicator({ left: elRect.left - trackRect.left, width: elRect.width });
    }
  }, [location.pathname]);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl">
      <nav
        className="flex items-center justify-between gap-3 px-3 py-2.5
                   rounded-2xl border border-[var(--border)]
                   bg-[var(--surface)]/70 backdrop-blur-xl
                   shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]
                   transition-colors duration-300"
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-1.5 shrink-0 pl-1">
          <Code2
            size={19}
            strokeWidth={2.25}
            className="text-[var(--primary)]"
          />
          <span className="font-semibold text-[14px] tracking-tight text-[var(--text)]">
            SnipBox
          </span>
        </NavLink>

        {/* Nav links */}
        <div
          ref={trackRef}
          className="relative flex items-center gap-0.5 p-1 rounded-full bg-[var(--surface-2)]/70"
        >
          <div
            className="absolute top-1 bottom-1 rounded-full bg-[var(--primary)] shadow-sm
                       transition-all duration-300 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              ref={(el) => (linkRefs.current[to] = el)}
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative z-10 px-3 sm:px-4 py-1.5 rounded-full text-[13px] font-medium
                 whitespace-nowrap transition-colors duration-200
                 ${
                   isActive
                     ? "text-white"
                     : "text-[var(--text-muted)] hover:text-[var(--text)]"
                 }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 shrink-0 pr-0.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text)]
                       hover:bg-[var(--surface-2)] transition-all duration-200 active:scale-90"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium
                       bg-[var(--primary)] text-white hover:opacity-90
                       transition-all duration-200 active:scale-95"
          >
            <LogIn size={13} />
            <span className="hidden xs:inline">Login</span>
          </button>
        </div>
      </nav>
    </header>
  );
}