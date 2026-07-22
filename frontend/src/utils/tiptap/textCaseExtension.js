import { Extension } from "@tiptap/core";

// Google Docs' Format > Text > Capitalization menu doesn't just apply a CSS
// text-transform (which would revert the second you paste it elsewhere) —
// it rewrites the actual characters. This does the same: it walks the text
// nodes inside the current selection and replaces each one's text in place,
// which lets ProseMirror's mark-inheritance keep bold/italic/etc. intact.
function transformSelectionText(transformFn) {
  return ({ state, tr, dispatch }) => {
    const { from, to, empty } = state.selection;
    if (empty) return false;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (!node.isText) return;
      const start = Math.max(pos, from);
      const end = Math.min(pos + node.nodeSize, to);
      if (start >= end) return;
      const original = node.text.slice(start - pos, end - pos);
      const next = transformFn(original);
      if (next !== original) {
        tr.insertText(next, start, end);
      }
    });

    if (dispatch) dispatch(tr);
    return true;
  };
}

function toTitleCase(text) {
  return text.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
}

export const TextCase = Extension.create({
  name: "textCase",

  addCommands() {
    return {
      setUppercase:
        () =>
        (props) =>
          transformSelectionText((t) => t.toUpperCase())(props),
      setLowercase:
        () =>
        (props) =>
          transformSelectionText((t) => t.toLowerCase())(props),
      setTitleCase:
        () =>
        (props) =>
          transformSelectionText(toTitleCase)(props),
    };
  },
});

export default TextCase;
