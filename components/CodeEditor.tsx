"use client";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language?: string;
  theme?: string;
  fontSize?: number;
  activeFilePath?: string;
}

const defineDraculaTheme = (monaco: any) => {
  monaco.editor.defineTheme("dracula", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6272a4" },
      { token: "string", foreground: "f1fa8c" },
      { token: "number", foreground: "bd93f9" },
      { token: "keyword", foreground: "ff79c6" },
      { token: "operator", foreground: "ff79c6" },
      { token: "delimiter", foreground: "f8f8f2" },
      { token: "tag", foreground: "ff79c6" },
      { token: "attribute.name", foreground: "50fa7b" },
      { token: "attribute.value", foreground: "f1fa8c" },
      { token: "type", foreground: "8be9fd" },
      { token: "identifier", foreground: "50fa7b" },
      { token: "function", foreground: "50fa7b" }
    ],
    colors: {
      "editor.background": "#282a36",
      "editor.foreground": "#f8f8f2",
      "editorCursor.foreground": "#f8f8f0",
      "editor.lineHighlightBackground": "#44475a",
      "editor.selectionBackground": "#44475a",
      "editor.inactiveSelectionBackground": "#44475a55"
    }
  });
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  setCode,
  activeFilePath
}) => {
  const handleEditorMount = (editor: any, monaco: any) => {
    defineDraculaTheme(monaco);
    monaco.editor.setTheme("dracula");
  };

  const handleChange = (newCode: any) => {
    setCode(newCode || "");
  };

  const getLanguage = (filePath: any) => {
    if (!filePath) return "javascript";
    const extension = filePath.split(".").pop();
    switch (extension) {
      case "js":
      case "jsx":
        return "javascript";
      case "css":
        return "css";
      case "json":
        return "json";
      case "html":
        return "html";
      default:
        return "plaintext";
    }
  };

  return (
    <div className="h-full w-full flex-3 flex flex-col bg-[#282a36]">
      <div className="flex-shrink-0 bg-[#333544] px-4 py-2 text-white">
        <p className="truncate">{activeFilePath}</p>
      </div>
      <div className="flex-grow h-0">
        <Editor
          height="100%"
          width="100%"
          language={getLanguage(activeFilePath)}
          value={code}
          theme="dracula"
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: {
              top: 10
            }
          }}
          onChange={handleChange}
          onMount={handleEditorMount}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
