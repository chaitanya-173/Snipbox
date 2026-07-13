import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./layouts/Layout";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Snippets from "./pages/Snippets";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import GlobalShortcuts from "./components/GlobalShortcuts";
import ShortcutsHelpModal from "./components/ShortcutsHelpModal";
import "./styles/snipboxPrism.css";
import "./styles/print.css";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: "var(--surface)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          },
        }}
      />

      <GlobalShortcuts />
      <ShortcutsHelpModal />

      <Routes>
        {/* Public marketing page — redirects logged-in visitors to /create itself */}
        <Route path="/" element={<Landing />} />

        {/* Guest-only — logged-in users get bounced to /create */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected — requires a session, redirects to /login otherwise */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/create" element={<Home />} />
            <Route path="/snippets" element={<Snippets />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;