export const defineDraculaTheme = (monaco) => {
  monaco.editor.defineTheme("dracula", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6272a4", fontStyle: "italic" },
      { token: "keyword", foreground: "ff79c6", fontStyle: "bold" },
      { token: "variable", foreground: "f8f8f2" },
      { token: "string", foreground: "f1fa8c" },
      { token: "number", foreground: "bd93f9" },
      { token: "function", foreground: "50fa7b" },
      { token: "type", foreground: "ffb86c" },
      { token: "operator", foreground: "f8f8f2" },
      { token: "delimiter", foreground: "f8f8f2" },
    ],
    colors: {
      "editor.background": "#282a36",
      "editor.foreground": "#f8f8f2",
      "editorCursor.foreground": "#f8f8f2",
      "editor.lineHighlightBackground": "#44475a",
      "editor.selectionBackground": "#ff79c6",
      "editor.inactiveSelectionBackground": "#ff79c6",
      "editorWhitespace.foreground": "#6272a4",
    },
  });
};

// Define Material theme
export const defineMaterialTheme = (monaco) => {
  monaco.editor.defineTheme("material", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6a9955", fontStyle: "italic" },
      { token: "keyword", foreground: "569cd6", fontStyle: "bold" },
      { token: "variable", foreground: "9cdcfe" },
      { token: "string", foreground: "d69d85" },
      { token: "number", foreground: "b5cea8" },
      { token: "function", foreground: "dcdcaa" },
      { token: "type", foreground: "4ec9b0" },
      { token: "operator", foreground: "d4d4d4" },
      { token: "delimiter", foreground: "d4d4d4" },
    ],
    colors: {
      "editor.background": "#263238",
      "editor.foreground": "#e0e0e0",
      "editorCursor.foreground": "#e0e0e0",
      "editor.lineHighlightBackground": "#2c313c",
      "editor.selectionBackground": "#b3c2c9",
      "editor.inactiveSelectionBackground": "#b3c2c9",
      "editorWhitespace.foreground": "#4a4a4a",
    },
  });
};

// Define Material Darker theme
export const defineMaterialDarkerTheme = (monaco) => {
  monaco.editor.defineTheme("material-darker", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "616e7c", fontStyle: "italic" },
      { token: "keyword", foreground: "c792ea", fontStyle: "bold" },
      { token: "variable", foreground: "c5c8c6" },
      { token: "string", foreground: "f78c6c" },
      { token: "number", foreground: "f78c6c" },
      { token: "function", foreground: "c5c8c6" },
      { token: "type", foreground: "ff9d00" },
      { token: "operator", foreground: "c5c8c6" },
      { token: "delimiter", foreground: "c5c8c6" },
    ],
    colors: {
      "editor.background": "#212121",
      "editor.foreground": "#e0e0e0",
      "editorCursor.foreground": "#e0e0e0",
      "editor.lineHighlightBackground": "#424242",
      "editor.selectionBackground": "#d0a1a1",
      "editor.inactiveSelectionBackground": "#d0a1a1",
      "editorWhitespace.foreground": "#4a4a4a",
    },
  });
};

// Define Material Ocean theme
export const defineMaterialOceanTheme = (monaco) => {
  monaco.editor.defineTheme("material-ocean", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "7e8c89", fontStyle: "italic" },
      { token: "keyword", foreground: "82aaff", fontStyle: "bold" },
      { token: "variable", foreground: "d7d7d7" },
      { token: "string", foreground: "ffcc66" },
      { token: "number", foreground: "ff66cc" },
      { token: "function", foreground: "d7afaf" },
      { token: "type", foreground: "ffafaf" },
      { token: "operator", foreground: "d7d7d7" },
      { token: "delimiter", foreground: "d7d7d7" },
    ],
    colors: {
      "editor.background": "#1e1f29",
      "editor.foreground": "#d0d0d0",
      "editorCursor.foreground": "#d0d0d0",
      "editor.lineHighlightBackground": "#2e2e2e",
      "editor.selectionBackground": "#b0b0b0",
      "editor.inactiveSelectionBackground": "#b0b0b0",
      "editorWhitespace.foreground": "#4a4a4a",
    },
  });
};
