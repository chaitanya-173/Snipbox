import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";

// Single source of truth for every language SnipBox supports.
// Add a new language here and it shows up in the dropdown automatically.
export const LANGUAGES = [
  { value: "javascript", label: "JavaScript", extension: javascript() },
  { value: "typescript", label: "TypeScript", extension: javascript({ typescript: true }) },
  { value: "python", label: "Python", extension: python() },
  { value: "java", label: "Java", extension: java() },
  { value: "cpp", label: "C++", extension: cpp() },
  { value: "c", label: "C", extension: cpp() },
  { value: "rust", label: "Rust", extension: rust() },
  { value: "go", label: "Go", extension: StreamLanguage.define(go) },
];

export function getLanguageExtension(value) {
  return LANGUAGES.find((lang) => lang.value === value)?.extension ?? javascript();
}