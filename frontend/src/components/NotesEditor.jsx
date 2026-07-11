import { useRef } from "react";

// Plain writing surface for Notes mode — same background/padding as the
// CodeMirror card so switching Code <-> Notes feels like one seamless card,
// but normal typing (no syntax highlighting, no monospace, no line numbers).
export default function NotesEditor({ value, onChange }) {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    onChange(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder="Start writing your note..."
      className="w-full min-h-[550px] px-5 py-4 bg-[var(--surface)] text-[var(--text)]
                 text-[15px] leading-relaxed resize-none outline-none
                 placeholder:text-[var(--text-muted)]"
    />
  );
}