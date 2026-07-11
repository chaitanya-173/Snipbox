import { createContext, useCallback, useContext, useState } from "react";
import PrintableSnippet from "../components/PrintableSnippet";

const PrintContext = createContext(null);

export function PrintProvider({ children }) {
  const [printData, setPrintData] = useState(null);

  // Any page can call requestPrint({ title, language, code, type, updatedAt })
  // to open the browser's native Print dialog with a beautifully formatted
  // one-page layout — no separate export page needed.
  const requestPrint = useCallback((data) => {
    setPrintData(data);
    // Wait a tick so the printable DOM updates before the dialog opens.
    setTimeout(() => window.print(), 50);
  }, []);

  return (
    <PrintContext.Provider value={{ requestPrint }}>
      {children}
      <PrintableSnippet data={printData} />
    </PrintContext.Provider>
  );
}

export function usePrint() {
  const ctx = useContext(PrintContext);
  if (!ctx) throw new Error("usePrint must be used inside <PrintProvider>");
  return ctx;
}