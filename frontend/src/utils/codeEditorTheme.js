import { createTheme } from "@uiw/codemirror-themes";
import { tags as t } from "@lezer/highlight";

export const snipboxDark = createTheme({
  theme: "dark",

  settings: {
    background: "var(--surface)",
    foreground: "var(--text)",
    caret: "var(--primary)",
    selection: "rgba(20, 184, 166, 0.18)",
    selectionMatch: "rgba(20, 184, 166, 0.10)",
    lineHighlight: "rgba(255,255,255,0.03)",
    gutterBackground: "var(--surface)",
    gutterForeground: "var(--text-muted)",
    gutterBorder: "transparent",
    fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
    fontSize: "14px",
  },

  styles: [
    // Comments
    {
      tag: t.comment,
      color: "var(--text-muted)",
      fontStyle: "italic",
    },

    // Keywords
    {
      tag: [t.keyword, t.controlKeyword, t.operatorKeyword],
      color: "var(--primary)",
      fontWeight: "600",
    },

    // Strings
    {
      tag: [t.string, t.special(t.string)],
      color: "#8FD19E",
    },

    // Numbers / Booleans
    {
      tag: [t.number, t.bool, t.null],
      color: "var(--accent)",
    },

    // Functions
    {
      tag: [t.function(t.variableName), t.function(t.propertyName)],
      color: "#7BB8E8",
    },

    // Classes / Types
    {
      tag: [t.className, t.typeName],
      color: "#E8B86D",
      fontWeight: "600",
    },

    // Operators
    {
      tag: t.operator,
      color: "#F97316",
    },

    // Variables
    {
      tag: [t.variableName, t.propertyName],
      color: "var(--text)",
    },

    // Brackets & punctuation
    {
      tag: [t.punctuation, t.paren, t.squareBracket, t.brace],
      color: "rgba(148,163,184,.75)",
    },
  ],
});

export const snipboxLight = createTheme({
  theme: "light",
  settings: {
    background: "var(--surface)",
    foreground: "var(--text)",
    caret: "var(--primary)",
    selection: "rgba(15,118,110,.14)",
    selectionMatch: "rgba(15,118,110,.08)",
    lineHighlight: "rgba(0,0,0,.035)",
    gutterBackground: "var(--surface)",
    gutterForeground: "var(--text-muted)",
    gutterBorder: "transparent",
    fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
    fontSize: "14px",
  },

  styles: [
    // Comments
    {
      tag: t.comment,
      color: "var(--text-muted)",
      fontStyle: "italic",
    },

    // Keywords
    {
      tag: [t.keyword, t.controlKeyword, t.operatorKeyword],
      color: "var(--primary)",
      fontWeight: "600",
    },

    // Strings
    {
      tag: [t.string, t.special(t.string)],
      color: "#1E7A46",
    },

    // Numbers
    {
      tag: [t.number, t.bool, t.null],
      color: "var(--accent)",
    },

    // Functions
    {
      tag: [t.function(t.variableName), t.function(t.propertyName)],
      color: "#1D6FA8",
    },

    // Classes
    {
      tag: [t.className, t.typeName],
      color: "#A5690E",
      fontWeight: "600",
    },

    // Operators
    {
      tag: t.operator,
      color: "#EA580C",
    },

    // Variables
    {
      tag: [t.variableName, t.propertyName],
      color: "var(--text)",
    },

    // Brackets & punctuation
    {
      tag: [t.punctuation, t.paren, t.squareBracket, t.brace],
      color: "rgba(100,116,139,.75)",
    },
  ],
});
