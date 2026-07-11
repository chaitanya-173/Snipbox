import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileCode2, StickyNote } from "lucide-react";
import toast from "react-hot-toast";
import SegmentedToggle from "../components/SegmentedToggle";
import SnippetCard from "../components/SnippetCard";
import ConfirmDialog from "../components/ConfirmDialog";
import LanguageSelect from "../components/LanguageSelect";
import { getSnippets, deleteSnippet } from "../services/snippetService";
import { usePrint } from "../context/PrintContext";

const CONTENT_TYPES = [
  { value: "code", label: "Code" },
  { value: "notes", label: "Notes" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
];

export default function Snippets() {
  const navigate = useNavigate();
  const { requestPrint } = usePrint();

  const [snippets, setSnippets] = useState([]);
  const [type, setType] = useState("code");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    setSnippets(getSnippets());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = snippets
      .filter((s) => s.type === type)
      .filter((s) => {
        if (!q) return true;
        return s.title.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
      });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "newest":
        default:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });
  }, [snippets, type, query, sortBy]);

  const handleEdit = (snippet) => {
    navigate("/", { state: { snippet } });
  };

  const handleCopy = async (snippet) => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      toast.success("Copied!");
    } catch {
      toast.error("Couldn't copy");
    }
  };

  const handleConvert = (snippet) => {
    requestPrint(snippet);
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteSnippet(pendingDelete.id);
    setSnippets((prev) => prev.filter((s) => s.id !== pendingDelete.id));
    toast.success(pendingDelete.type === "notes" ? "Note deleted" : "Snippet deleted");
    setPendingDelete(null);
  };

  const isNotesView = type === "notes";

  return (
    <div className="max-w-6xl mx-auto">
      {/* Toggle + search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-7">
        <SegmentedToggle options={CONTENT_TYPES} value={type} onChange={setType} />

        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isNotesView ? "Search notes..." : "Search snippets..."}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[var(--border)]
                       bg-[var(--surface)] text-[14px] text-[var(--text)]
                       placeholder:text-[var(--text-muted)]
                       focus:outline-none focus:border-[var(--primary)]/60
                       focus:ring-4 focus:ring-[var(--primary)]/10
                       transition-all duration-200"
          />
        </div>

        <LanguageSelect
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by"
          widthClassName="w-full sm:w-44"
        />
      </div>

      {/* Grid / Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-xl border border-dashed border-[var(--border)]">
          {isNotesView ? (
            <StickyNote size={32} className="text-[var(--text-muted)] mb-3" />
          ) : (
            <FileCode2 size={32} className="text-[var(--text-muted)] mb-3" />
          )}
          <h3 className="text-[16px] font-semibold text-[var(--text)]">
            {query
              ? "No matches found"
              : isNotesView
                ? "No notes yet"
                : "No snippets yet"}
          </h3>
          <p className="text-[13.5px] text-[var(--text-muted)] mt-1 max-w-xs">
            {query
              ? "Try a different search term."
              : isNotesView
                ? "Notes you save will show up here."
                : "Snippets you save will show up here."}
          </p>
          {!query && (
            <button
              onClick={() => navigate("/")}
              className="mt-5 px-5 py-2.5 rounded-xl text-[13.5px] font-medium
                         bg-[var(--primary)] text-white hover:opacity-90
                         transition-all duration-200 active:scale-95"
            >
              {isNotesView ? "Write a note" : "Create a snippet"}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onEdit={handleEdit}
              onDelete={setPendingDelete}
              onCopy={handleCopy}
              onConvert={handleConvert}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={pendingDelete?.type === "notes" ? "Delete this note?" : "Delete this snippet?"}
        description={`"${pendingDelete?.title}" will be permanently deleted. This can't be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}