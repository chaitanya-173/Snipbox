import Prism from "prismjs";
// Import order matters — some grammars extend others.
import "prismjs/components/prism-clike";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";

export function highlightCode(code, language) {
  const grammar = Prism.languages[language] ?? Prism.languages.clike;
  try {
    return Prism.highlight(code, grammar, language);
  } catch {
    return code;
  }
}