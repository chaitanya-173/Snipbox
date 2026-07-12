import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ShortcutsProvider } from "./context/ShortcutsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ShortcutsProvider>
          <App />
        </ShortcutsProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);