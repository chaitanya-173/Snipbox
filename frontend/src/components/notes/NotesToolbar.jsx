import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Link2Off,
  Undo2,
  Redo2,
  ChevronDown,
  Palette,
  Highlighter,
  RemoveFormatting,
  Check,
} from "lucide-react";
import Tooltip from "../Tooltip";

const HEADING_OPTIONS = [
  { label: "Normal text", level: 0 },
  { label: "Heading 1", level: 1 },
  { label: "Heading 2", level: 2 },
  { label: "Heading 3", level: 3 },
];

const FONT_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Sans", value: "Inter, ui-sans-serif, system-ui" },
  { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  { label: "Mono", value: "'JetBrains Mono', ui-monospace, monospace" },
  { label: "Comic", value: "'Comic Sans MS', 'Comic Sans', cursive" },
  { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
];

const SIZE_OPTIONS = [
  { label: "Small", value: "12px" },
  { label: "Normal", value: "" },
  { label: "Medium", value: "18px" },
  { label: "Large", value: "22px" },
  { label: "X-Large", value: "28px" },
  { label: "Huge", value: "34px" },
];

const TEXT_COLORS = [
  { label: "Default", value: "" },
  { label: "Slate", value: "#475569" },
  { label: "Red", value: "#DC2626" },
  { label: "Orange", value: "#F97316" },
  { label: "Amber", value: "#D97706" },
  { label: "Green", value: "#16A34A" },
  { label: "Teal", value: "#0F766E" },
  { label: "Blue", value: "#2563EB" },
  { label: "Purple", value: "#7C3AED" },
  { label: "Pink", value: "#DB2777" },
];

const HIGHLIGHT_COLORS = [
  { label: "None", value: "" },
  { label: "Yellow", value: "#FEF08A" },
  { label: "Green", value: "#BBF7D0" },
  { label: "Teal", value: "#99F6E4" },
  { label: "Blue", value: "#BFDBFE" },
  { label: "Purple", value: "#E9D5FF" },
  { label: "Pink", value: "#FBCFE8" },
  { label: "Orange", value: "#FED7AA" },
];

function useOutsideClose(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onClose]);
  return ref;
}

function ToolbarButton({ label, icon: Icon, active, disabled, onClick }) {
  return (
    <Tooltip label={label}>
      <button
        type="button"
        disabled={disabled}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
        aria-label={label}
        aria-pressed={active}
        className={`p-1.5 rounded-lg transition-all duration-150 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed
                   ${
                     active
                       ? "bg-[var(--primary)]/15 text-[var(--primary)]"
                       : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
                   }`}
      >
        <Icon size={15} />
      </button>
    </Tooltip>
  );
}

function Divider() {
  return <span className="w-px h-5 bg-[var(--border)] mx-1 shrink-0" />;
}

function Dropdown({ label, trigger, panelClassName = "p-1.5 min-w-[9rem]", children }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose(() => setOpen(false));

  return (
    <div ref={ref} className="relative shrink-0">
      <Tooltip label={label}>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="true"
          aria-expanded={open}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[12.5px] font-medium
                     text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]
                     transition-all duration-150 active:scale-95 whitespace-nowrap"
        >
          {trigger}
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </Tooltip>

      {open && (
        <div
          className={`absolute z-30 mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface)]
                     shadow-[0_12px_32px_-8px_rgba(0,0,0,0.35)] ${panelClassName}`}
          onClick={(e) => {
            // Let a swatch/menu-item click close the panel, but a stray
            // click on the panel's own padding shouldn't dismiss it.
            if (e.target === e.currentTarget) return;
            setOpen(false);
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function MenuItem({ label, active, onClick, style }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      style={style}
      className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg
                 text-[13px] text-left whitespace-nowrap transition-colors duration-150
                 hover:bg-[var(--surface-2)] ${active ? "text-[var(--primary)]" : "text-[var(--text)]"}`}
    >
      {label}
      {active && <Check size={13} />}
    </button>
  );
}

function Swatch({ color, active, onClick, label }) {
  return (
    <Tooltip label={label}>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
        aria-label={label}
        className={`shrink-0 w-7 h-7 rounded-full border transition-transform duration-150 active:scale-90
                   ${active ? "ring-2 ring-offset-2 ring-[var(--primary)] ring-offset-[var(--surface)]" : "border-[var(--border)]"}`}
        style={{
          background: color || "transparent",
          backgroundImage: color
            ? undefined
            : "linear-gradient(45deg, transparent 45%, var(--danger) 45%, var(--danger) 55%, transparent 55%)",
        }}
      />
    </Tooltip>
  );
}

export default function NotesToolbar({ editor }) {
  if (!editor) return null;

  const activeHeading =
    HEADING_OPTIONS.find(
      (h) => h.level > 0 && editor.isActive("heading", { level: h.level }),
    ) ?? HEADING_OPTIONS[0];

  const activeFont =
    FONT_OPTIONS.find((f) => f.value && editor.isActive("textStyle", { fontFamily: f.value })) ??
    FONT_OPTIONS[0];

  const activeSize =
    SIZE_OPTIONS.find((s) => s.value && editor.isActive("textStyle", { fontSize: s.value })) ??
    SIZE_OPTIONS[1];

  const setHeading = (level) => {
    if (level === 0) editor.chain().focus().setParagraph().run();
    else editor.chain().focus().toggleHeading({ level }).run();
  };

  const setLink = () => {
    const previous = editor.getAttributes("link").href;
    const url = window.prompt("Link URL", previous || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div
      className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-[var(--border)]
                 bg-[var(--surface-2)]/50 rounded-t-xl"
    >
      {/* History */}
      <ToolbarButton
        label="Undo"
        icon={Undo2}
        disabled={!editor.can().undo()}
        onClick={() => editor.chain().focus().undo().run()}
      />
      <ToolbarButton
        label="Redo"
        icon={Redo2}
        disabled={!editor.can().redo()}
        onClick={() => editor.chain().focus().redo().run()}
      />

      <Divider />

      {/* Paragraph / heading */}
      <Dropdown label="Text style" trigger={activeHeading.label}>
        {HEADING_OPTIONS.map((h) => (
          <MenuItem
            key={h.level}
            label={h.label}
            active={h.level === activeHeading.level}
            onClick={() => setHeading(h.level)}
          />
        ))}
      </Dropdown>

      {/* Font family */}
      <Dropdown label="Font" trigger={activeFont.label}>
        {FONT_OPTIONS.map((f) => (
          <MenuItem
            key={f.label}
            label={f.label}
            style={f.value ? { fontFamily: f.value } : undefined}
            active={f.value === activeFont.value}
            onClick={() =>
              f.value
                ? editor.chain().focus().setFontFamily(f.value).run()
                : editor.chain().focus().unsetFontFamily().run()
            }
          />
        ))}
      </Dropdown>

      {/* Font size */}
      <Dropdown label="Font size" trigger={activeSize.label}>
        {SIZE_OPTIONS.map((s) => (
          <MenuItem
            key={s.label}
            label={s.label}
            active={s.value === activeSize.value}
            onClick={() =>
              s.value ? editor.chain().focus().setFontSize(s.value).run() : editor.chain().focus().unsetFontSize().run()
            }
          />
        ))}
      </Dropdown>

      <Divider />

      {/* Basic marks */}
      <ToolbarButton
        label="Bold"
        icon={Bold}
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        label="Italic"
        icon={Italic}
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        label="Underline"
        icon={UnderlineIcon}
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      />
      <ToolbarButton
        label="Strikethrough"
        icon={Strikethrough}
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />

      <Divider />

      {/* Case transform (Google-Docs-style capitalization) */}
      <Dropdown label="Capitalization" trigger="Aa">
        <MenuItem label="UPPERCASE" onClick={() => editor.chain().focus().setUppercase().run()} />
        <MenuItem label="lowercase" onClick={() => editor.chain().focus().setLowercase().run()} />
        <MenuItem label="Title Case" onClick={() => editor.chain().focus().setTitleCase().run()} />
      </Dropdown>

      {/* Text color */}
      <Dropdown
        label="Text color"
        trigger={<Palette size={15} />}
        panelClassName="p-3 w-56"
      >
        <p className="px-0.5 pb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          Text color
        </p>
        <div className="flex flex-wrap gap-2.5">
          {TEXT_COLORS.map((c) => (
            <Swatch
              key={c.label}
              color={c.value}
              label={c.label}
              active={c.value ? editor.isActive("textStyle", { color: c.value }) : !editor.getAttributes("textStyle").color}
              onClick={() =>
                c.value ? editor.chain().focus().setColor(c.value).run() : editor.chain().focus().unsetColor().run()
              }
            />
          ))}
        </div>
      </Dropdown>

      {/* Highlight */}
      <Dropdown
        label="Highlight"
        trigger={<Highlighter size={15} />}
        panelClassName="p-3 w-52"
      >
        <p className="px-0.5 pb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          Highlight
        </p>
        <div className="flex flex-wrap gap-2.5">
          {HIGHLIGHT_COLORS.map((c) => (
            <Swatch
              key={c.label}
              color={c.value}
              label={c.label}
              active={c.value ? editor.isActive("highlight", { color: c.value }) : !editor.isActive("highlight")}
              onClick={() =>
                c.value
                  ? editor.chain().focus().toggleHighlight({ color: c.value }).run()
                  : editor.chain().focus().unsetHighlight().run()
              }
            />
          ))}
        </div>
      </Dropdown>

      <Divider />

      {/* Alignment */}
      <ToolbarButton
        label="Align left"
        icon={AlignLeft}
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      />
      <ToolbarButton
        label="Align center"
        icon={AlignCenter}
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      />
      <ToolbarButton
        label="Align right"
        icon={AlignRight}
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      />
      <ToolbarButton
        label="Justify"
        icon={AlignJustify}
        active={editor.isActive({ textAlign: "justify" })}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      />

      <Divider />

      {/* Lists + quote */}
      <ToolbarButton
        label="Bullet list"
        icon={List}
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        label="Numbered list"
        icon={ListOrdered}
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolbarButton
        label="Quote"
        icon={Quote}
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />

      <Divider />

      {/* Link + clear formatting */}
      <ToolbarButton label="Add link" icon={Link2} active={editor.isActive("link")} onClick={setLink} />
      <ToolbarButton
        label="Remove link"
        icon={Link2Off}
        disabled={!editor.isActive("link")}
        onClick={() => editor.chain().focus().unsetLink().run()}
      />
      <ToolbarButton
        label="Clear formatting"
        icon={RemoveFormatting}
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
      />
    </div>
  );
}