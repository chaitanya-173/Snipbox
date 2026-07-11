import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { PrintProvider } from "../context/PrintContext";

export default function Layout() {
  return (
    <PrintProvider>
      <div
        className="min-h-screen flex flex-col transition-all duration-300"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <Navbar />

        <main className="flex-1 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-8">
            <Outlet />
          </div>
        </main>

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
      </div>
    </PrintProvider>
  );
}