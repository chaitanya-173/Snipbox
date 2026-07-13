import { useNavigate } from "react-router-dom";
import { useShortcut } from "../hooks/useShortcut";
import { useTheme } from "../context/ThemeContext";

// Renders nothing — just registers global, always-available shortcuts.
// Mounted once near the root, inside both the Router and ThemeProvider.
export default function GlobalShortcuts() {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  useShortcut("g h", () => navigate("/create"), {
    description: "Go to Create",
    scope: "Navigation",
  });

  useShortcut("g s", () => navigate("/snippets"), {
    description: "Go to My Snippets",
    scope: "Navigation",
  });

  useShortcut("mod+/", () => toggleTheme(), {
    description: "Toggle dark / light theme",
    scope: "General",
  });

  return null;
}