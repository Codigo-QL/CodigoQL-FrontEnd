
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';

export function ensureSqlLanguageIsRegistered() {
  if (!hljs.getLanguage('sql')) {
    hljs.registerLanguage('sql', sql);
  }
}

export default hljs;
