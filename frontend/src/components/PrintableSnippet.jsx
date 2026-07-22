import { highlightCode } from "../utils/highlightCode";
import { LANGUAGES } from "../utils/languages";

export default function PrintableSnippet({ data }) {
  if (!data) return null;

  const { title, language, code, type } = data;
  const isNotes = type === "notes";
  const languageLabel = isNotes
    ? "Notes"
    : (LANGUAGES.find((l) => l.value === language)?.label ?? language);

  const codeLines = code.split("\n");

  return (
    <div
      className="print-area"
      style={{
        background: "#141414",
        color: "#f5f5f5",
        padding: "36px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "#f5f5f5" }}>
          {title}
        </h1>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.03em",
            padding: "4px 12px",
            borderRadius: "999px",
            background: "rgba(20, 184, 166, 0.15)",
            color: "#14b8a6",
          }}
        >
          {languageLabel.toUpperCase()}
        </span>
      </div>

      {isNotes ? (
        <div
          className="print-note-content"
          style={{
            fontSize: "14px",
            lineHeight: 1.75,
            wordBreak: "break-word",
            color: "#f5f5f5",
          }}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      ) : (
        <pre
          className="print-code"
          style={{
            fontSize: "12px",
            lineHeight: 1.55,
            background: "#1d1d1d",
            borderRadius: "12px",
            padding: "16px 18px",
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            margin: 0,
            overflow: "hidden",
          }}
        >
          <code style={{ display: "table", width: "100%", borderCollapse: "collapse" }}>
            {codeLines.map((line, i) => (
              <div key={i} style={{ display: "table-row" }}>
                <span
                  style={{
                    display: "table-cell",
                    textAlign: "right",
                    paddingRight: "16px",
                    color: "#6b6b6b",
                    userSelect: "none",
                    width: "1%",
                    whiteSpace: "nowrap",
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    display: "table-cell",
                    paddingLeft: "16px",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(line, language) || "&nbsp;",
                  }}
                />
              </div>
            ))}
          </code>
        </pre>
      )}
    </div>
  );
}