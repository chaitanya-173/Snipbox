import { NavLink } from "react-router-dom";
import { Code2, Sun, Moon, LogIn } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { to: "/", label: "Create" },
  { to: "/snippets", label: "My Snippets" },
];

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl">
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
        <div className="flex items-center gap-0.5 p-1 rounded-full bg-[var(--surface-2)]/70">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-3 sm:px-4 py-1.5 rounded-full text-[13px] font-medium
                 whitespace-nowrap transition-all duration-200
                 ${
                   isActive
                     ? "bg-[var(--primary)] text-white shadow-sm"
                     : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
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
