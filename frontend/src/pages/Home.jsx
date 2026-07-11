import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import toast from "react-hot-toast";
import { Save, RefreshCcw, Copy } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LanguageSelect from "../components/LanguageSelect";
import SegmentedToggle from "../components/SegmentedToggle";
import NotesEditor from "../components/NotesEditor";
import { LANGUAGES, getLanguageExtension } from "../utils/languages";
import { snipboxDark, snipboxLight } from "../utils/codeEditorTheme";
// import { githubDark as snipboxDark, githubLight as snipboxLight } from "@uiw/codemirror-theme-github";
import { createSnippet, updateSnippet } from "../services/snippetService";

const CONTENT_TYPES = [
  { value: "code", label: "Code" },
  { value: "notes", label: "Notes" },
];

const editorFontTheme = EditorView.theme({
  "&": { fontSize: "14.5px" },
  ".cm-content": {
    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    paddingTop: "12px",
    paddingBottom: "12px",
  },
  ".cm-gutters": { fontSize: "14px" },
  ".cm-activeLineGutter": { color: "var(--primary)", fontWeight: "600" },
  ".cm-cursor": { borderLeftWidth: "2px" },
});

export default function Home() {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // If we arrived here via navigate("/", { state: { snippet } }) from an
  // "Edit" button, we're in edit mode. Otherwise it's a fresh snippet.
  const editingSnippet = location.state?.snippet ?? null;
  const isEditMode = Boolean(editingSnippet);

  const initialType =
    editingSnippet?.type ?? (editingSnippet?.language === "notes" ? "notes" : "code");

  const [type, setType] = useState(initialType);
  const [title, setTitle] = useState(editingSnippet?.title ?? "");
  const [language, setLanguage] = useState(
    editingSnippet?.language ?? "javascript",
  );
  const [code, setCode] = useState(editingSnippet?.code ?? "");
  const [saving, setSaving] = useState(false);

  const isNotes = type === "notes";
  const headerLabel = isNotes
    ? "Notes"
    : (LANGUAGES.find((l) => l.value === language)?.label ?? language);

  const languageSelectProps = isNotes
    ? {
        options: [{ value: "notes", label: "Notes" }],
        value: "notes",
        onChange: () => {},
        disabled: true,
      }
    : { options: LANGUAGES, value: language, onChange: setLanguage, disabled: false };

  const extensions = useMemo(
    () => [getLanguageExtension(language), editorFontTheme],
    [language],
  );

  const handleSave = async () => {
    if (!title.trim())
      return toast.error(
        type === "code" ? "Give your snippet a title" : "Give your note a title",
      );
    if (!code.trim())
      return toast.error(type === "code" ? "Snippet can't be empty" : "Note can't be empty");

    setSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (isEditMode) {
        const updated = updateSnippet(editingSnippet.id, {
          title,
          language: isNotes ? "notes" : language,
          code,
          type,
        });
        toast.success(type === "code" ? "Snippet updated" : "Note updated");
        navigate(`/snippet/${updated.id}`);
      } else {
        createSnippet({ title, language: isNotes ? "notes" : language, code, type });
        toast.success(type === "code" ? "Snippet saved" : "Note saved");
        setTitle("");
        setCode("");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    if (!code.trim()) return toast.error("Nothing to copy yet");
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Copied!");
    } catch {
      toast.error("Couldn't copy");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Type toggle + title + language row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SegmentedToggle options={CONTENT_TYPES} value={type} onChange={setType} />

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={type === "code" ? "Snippet title" : "Note title"}
          className="flex-1 px-5 py-2 rounded-xl border border-[var(--border)]
                     bg-[var(--surface)] text-[15px] text-[var(--text)]
                     placeholder:text-[var(--text-muted)]
                     focus:outline-none focus:border-[var(--primary)]/60
                     focus:ring-4 focus:ring-[var(--primary)]/10
                     transition-all duration-200"
        />
        <LanguageSelect {...languageSelectProps} />
      </div>

      <div
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)]
                   overflow-hidden shadow-[0_8px_32px_-12px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center justify-between px-5 py-2 border-b border-[var(--border)] bg-[var(--surface-2)]/50">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />
            <span className="text-[13px] font-medium text-[var(--text-muted)]">
              {headerLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              aria-label="Copy code"
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)]
                         hover:bg-[var(--surface)] transition-all duration-200 active:scale-90"
            >
              <Copy size={14} />
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[13px] font-medium
                         bg-[var(--primary)] text-white hover:opacity-90
                         disabled:opacity-60 transition-all duration-200 active:scale-95"
            >
              {saving ? (
                <RefreshCcw size={13} className="animate-spin" />
              ) : (
                <Save size={13} />
              )}
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>
        </div>

        {isNotes ? (
          <NotesEditor value={code} onChange={setCode} />
        ) : (
          <CodeMirror
            value={code}
            height="auto"
            minHeight="550px"
            theme={isDarkMode ? snipboxDark : snipboxLight}
            extensions={extensions}
            onChange={(value) => setCode(value)}
            basicSetup={{ foldGutter: true, dropCursor: true }}
          />
        )}
      </div>
    </div>
  );
}