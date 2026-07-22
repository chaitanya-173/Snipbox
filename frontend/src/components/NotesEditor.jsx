import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";
import NotesToolbar from "./notes/NotesToolbar";
import { FontSize } from "../utils/tiptap/fontSizeExtension";
import { TextCase } from "../utils/tiptap/textCaseExtension";

// Google-Docs-style writing surface for Notes mode: a full formatting
// toolbar (headings, fonts, sizes, colors, alignment, lists, capitalization)
// on top of a plain-feeling page. Content is persisted as HTML in the same
// `code` field the plain textarea used to write plain text into.
export default function NotesEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextStyle,
      FontFamily,
      FontSize,
      TextCase,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "Start writing your note..." }),
      CharacterCount,
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "snipbox-notes-content focus:outline-none",
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
  });

  // Keep the editor in sync when `value` changes from outside (e.g. loading
  // a different note in edit mode, or restoring a saved draft) — but only
  // when it actually differs, so we don't fight the user mid-keystroke or
  // reset their cursor position on every render.
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const next = value || "";
    if (next !== current) {
      editor.commands.setContent(next, false);
    }
  }, [value, editor]);

  return (
    <div className="w-full">
      <NotesToolbar editor={editor} />
      <div className="max-h-[65vh] overflow-y-auto">
        <EditorContent
          editor={editor}
          className="w-full min-h-[500px] px-6 py-5 bg-[var(--surface)] text-[var(--text)]"
        />
      </div>
      {editor && (
        <div className="flex justify-end px-4 py-1.5 border-t border-[var(--border)] bg-[var(--surface-2)]/30 rounded-b-xl">
          <span className="text-[11px] text-[var(--text-muted)]">
            {editor.storage.characterCount.words()} words · {editor.storage.characterCount.characters()} characters
          </span>
        </div>
      )}
    </div>
  );
}
