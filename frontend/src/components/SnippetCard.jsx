import { Pencil, Trash2, Copy, FileDown, Calendar } from "lucide-react";
import IconButton from "./IconButton";
import { highlightCode } from "../utils/highlightCode";
import { LANGUAGES } from "../utils/languages";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function SnippetCard({
  snippet,
  onEdit,
  onDelete,
  onCopy,
  onConvert,
}) {
  const isNotes = snippet.type === "notes";
  const previewSource = snippet.code.split("\n").slice(0, 4).join("\n");
  const languageLabel = isNotes
    ? "NOTES"
    : (
        LANGUAGES.find((l) => l.value === snippet.language)?.label ??
        snippet.language
      ).toUpperCase();

  return (
    <div
      className="group flex flex-col gap-4 rounded-xl border border-[var(--border)]
                 bg-[var(--surface)] p-5 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:scale-[1.015]
                 hover:border-[var(--primary)]/40
                 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]"
    >
      {/* Title + actions */}
      <div className="flex items-start justify-between gap-3">
        <h3
          title={snippet.title}
          className="flex-1 min-w-0 truncate text-[17px] font-semibold text-[var(--text)] leading-snug pt-1"
        >
          {snippet.title}
        </h3>

        <div className="flex items-center gap-1.5 shrink-0">
          <IconButton
            icon={Pencil}
            label="Edit"
            onClick={() => onEdit(snippet)}
          />
          <IconButton
            icon={Copy}
            label="Copy"
            onClick={() => onCopy(snippet)}
          />
          <IconButton
            icon={FileDown}
            label="Export PDF"
            onClick={() => onConvert(snippet)}
          />
          <IconButton
            icon={Trash2}
            label="Delete"
            onClick={() => onDelete(snippet)}
          />
        </div>
      </div>

      {/* Preview */}
      {isNotes ? (
        <p className="text-[13.5px] text-[var(--text-muted)] leading-relaxed line-clamp-3 min-h-[4.5rem]">
          {snippet.code.trim() || "Empty note"}
        </p>
      ) : (
        <pre className="snipbox-code text-[12.5px] leading-relaxed overflow-hidden max-h-[6.5rem] rounded-xl bg-[var(--surface-2)]/50 px-3.5 py-3 m-0">
          <code
            dangerouslySetInnerHTML={{
              __html:
                highlightCode(previewSource, snippet.language) ||
                "// empty snippet",
            }}
          />
        </pre>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-1.5 text-[12px] text-[var(--text-muted)]">
          <Calendar size={13} />
          {formatDate(snippet.updated_at)}
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide
                     ${
                       isNotes
                         ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                         : "bg-[var(--success)]/10 text-[var(--success)]"
                     }`}
        >
          {languageLabel}
        </span>
      </div>
    </div>
  );
}
