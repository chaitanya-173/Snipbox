import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Code2, Sun, Moon, LogOut, Keyboard, MoreVertical } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useShortcutsContext } from "../context/ShortcutsContext";
import Tooltip from "./Tooltip";
import ConfirmDialog from "./ConfirmDialog";

const navLinks = [
  { to: "/", label: "Create", end: true },
  { to: "/snippets", label: "My Snippets", end: false },
];

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { setHelpOpen } = useShortcutsContext();
  const navigate = useNavigate();
  const location = useLocation();
  const trackRef = useRef(null);
  const linkRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    setConfirmingLogout(false);
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setMoreMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const active =
      navLinks.find(({ to, end }) =>
        end ? location.pathname === to : location.pathname.startsWith(to),
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
            size={22}
            strokeWidth={2.4}
            className="text-[var(--primary)]"
          />
          <span className="text-[17px] font-bold tracking-tight">
            <span className="text-[var(--text)]">Snip</span>
            <span className="text-[var(--primary)]">Box</span>
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

        {/* Right actions — desktop: all inline */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0 pr-0.5">
          <Tooltip label="Keyboard shortcuts (?)">
            <button
              onClick={() => setHelpOpen(true)}
              aria-label="Keyboard shortcuts"
              className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text)]
                         hover:bg-[var(--surface-2)] transition-all duration-200 active:scale-90"
            >
              <Keyboard size={16} />
            </button>
          </Tooltip>

          <Tooltip
            label={
              isDarkMode ? "Switch to light mode (⌘/)" : "Switch to dark mode (⌘/)"
            }
          >
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text)]
                         hover:bg-[var(--surface-2)] transition-all duration-200 active:scale-90"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </Tooltip>

          <Tooltip label={user?.email ?? "Log out"}>
            <button
              onClick={() => setConfirmingLogout(true)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-[13px] font-medium
                         bg-[var(--primary)] text-white hover:opacity-90
                         transition-all duration-200 active:scale-95"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </Tooltip>
        </div>

        {/* Right actions — mobile: collapsed into one overflow menu */}
        <div ref={moreMenuRef} className="relative sm:hidden shrink-0 pr-0.5">
          <button
            onClick={() => setMoreMenuOpen((o) => !o)}
            aria-label="More options"
            className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text)]
                       hover:bg-[var(--surface-2)] transition-all duration-200 active:scale-90"
          >
            <MoreVertical size={18} />
          </button>

          {moreMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-52 rounded-xl border border-[var(--border)]
                         bg-[var(--surface)] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)] p-1.5 z-20"
            >
              <button
                onClick={() => {
                  setHelpOpen(true);
                  setMoreMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px]
                           text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors duration-150"
              >
                <Keyboard size={15} />
                Keyboard shortcuts
              </button>

              <button
                onClick={() => {
                  toggleTheme();
                  setMoreMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px]
                           text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors duration-150"
              >
                {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
                {isDarkMode ? "Light mode" : "Dark mode"}
              </button>

              <div className="h-px bg-[var(--border)] my-1.5" />

              <button
                onClick={() => {
                  setMoreMenuOpen(false);
                  setConfirmingLogout(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px]
                           text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors duration-150"
              >
                <LogOut size={15} />
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>

      <ConfirmDialog
        open={confirmingLogout}
        title="Log out?"
        description="You'll need to log back in to access your snippets and notes."
        confirmLabel="Log out"
        variant="primary"
        onConfirm={handleLogout}
        onCancel={() => setConfirmingLogout(false)}
      />
    </header>
  );
}