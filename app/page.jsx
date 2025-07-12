"use client";
import { useState, useEffect, useRef } from "react";
import CodeEditor from "@/components/CodeEditor";
import CodePreviewCanvas from "@/components/CodePreviewCanvas";
import FileExplorer from "@/components/FileExplorer";
import {
  WebContainerProvider,
  useWebContainer
} from "@/components/WebContainerContext";
import { initialFiles } from "./utils/initialFiles";
import ActivityBar from "@/components/ActivityBar";
import SearchSidebar from "@/components/SearchSidebar";
import Navbar from "@/components/Navbar";

// getFileContent and updateFileContent functions remain the same...
const getFileContent = (files, path) => {
  if (!path) return undefined;
  const parts = path.substring(1).split("/");
  let node = files;
  for (const part of parts) {
    if (!node) return undefined;
    node = node.directory ? node.directory[part] : node[part];
  }
  if (node && node.file) {
    return node.file.contents;
  }
  return undefined;
};

const updateFileContent = (files, path, newContent) => {
  const newFiles = JSON.parse(JSON.stringify(files));
  const parts = path.substring(1).split("/");
  const fileName = parts.pop();
  if (!fileName) return newFiles;

  let parentDir = newFiles;
  for (const part of parts) {
    parentDir = parentDir.directory
      ? parentDir.directory[part]
      : parentDir[part];
  }

  const targetDir = parentDir.directory ? parentDir.directory : parentDir;

  if (targetDir && targetDir[fileName] && targetDir[fileName].file) {
    targetDir[fileName].file.contents = newContent;
  } else {
    console.error("Could not find file to update at path:", path);
  }
  return newFiles;
};

const Playground = () => {
  const [files, setFiles] = useState(initialFiles);
  const [activeFilePath, setActiveFilePath] = useState("/src/App.jsx");
  const { webcontainerInstance, isReady } = useWebContainer();
  const [isWritingFile, setIsWritingFile] = useState(false);
  const [activeView, setActiveView] = useState("files");

  // State and refs for resizing
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [editorWidth, setEditorWidth] = useState(700); // Start with a reasonable fixed width
  const isResizingSidebar = useRef(false);
  const isResizingEditor = useRef(false);

  const isFileSwitch = useRef(false);
  const activeCode = getFileContent(files, activeFilePath) || "";

  useEffect(() => {
    if (isFileSwitch.current) {
      isFileSwitch.current = false;
      return;
    }
    if (!isReady || !webcontainerInstance) return;
    const debounceTimeout = setTimeout(async () => {
      setIsWritingFile(true);
      if (activeFilePath)
        await webcontainerInstance.fs.writeFile(activeFilePath, activeCode);
      console.log(`${activeFilePath} updated in WebContainer.`);
      setIsWritingFile(false);
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [activeCode, webcontainerInstance, isReady, activeFilePath]);

  const handleCodeChange = (newCode) => {
    const updatedFiles = updateFileContent(files, activeFilePath, newCode);
    setFiles(updatedFiles);
  };

  const handleFileSelect = (newPath) => {
    isFileSwitch.current = true;
    setActiveFilePath(newPath);
  };

  const handleMouseDownSidebar = (e) => {
    e.preventDefault();
    isResizingSidebar.current = true;
  };

  const handleMouseDownEditor = (e) => {
    e.preventDefault();
    isResizingEditor.current = true;
  };

  // Effect to add and remove global event listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      // --- Sidebar and Editor Resizing Logic ---
      if (isResizingSidebar.current) {
        setSidebarWidth((prevSidebarWidth) => {
          const newSidebarWidth = prevSidebarWidth + e.movementX;
          const clampedSidebarWidth = Math.max(
            150,
            Math.min(newSidebarWidth, 500)
          );
          const actualChange = clampedSidebarWidth - prevSidebarWidth;

          // Adjust editor width by the inverse of the sidebar's actual change
          if (actualChange !== 0) {
            setEditorWidth((prevEditorWidth) =>
              Math.max(200, prevEditorWidth - actualChange)
            );
          }
          return clampedSidebarWidth;
        });
      }
      // --- Editor and Preview Resizing Logic ---
      else if (isResizingEditor.current) {
        setEditorWidth((prevEditorWidth) => {
          const newEditorWidth = prevEditorWidth + e.movementX;
          return Math.max(200, newEditorWidth);
        });
      }
    };

    const handleMouseUp = () => {
      isResizingSidebar.current = false;
      isResizingEditor.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []); // Empty dependency array ensures this runs only once

  // Optional: Adjust layout on window resize to be more responsive
  useEffect(() => {
    const handleResize = () => {
      // Simple logic: give editor a portion of the available space
      const remainingWidth = window.innerWidth - sidebarWidth;
      setEditorWidth(Math.max(200, remainingWidth * 0.6));
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on mount
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarWidth]);

  return (
    <div className="h-screen w-screen bg-[#1e1e1e] flex flex-col items-stretch overflow-hidden font-sans">
      <Navbar />
      <div className="flex flex-row flex-1 min-h-0">
        <ActivityBar activeView={activeView} onFileSelect={setActiveView} />

        {/* Sidebar Panel */}
        <div
          className="flex-shrink-0 bg-[#252526]"
          style={{ width: `${sidebarWidth}px` }}
        >
          {activeView === "files" && (
            <FileExplorer
              files={files}
              activeFile={activeFilePath}
              onFileSelect={handleFileSelect}
            />
          )}
          {activeView === "search" && <SearchSidebar />}
        </div>

        {/* Sidebar Resizer */}
        <div
          onMouseDown={handleMouseDownSidebar}
          className="cursor-col-resize w-2 flex-shrink-0 bg-gray-600 hover:bg-gray-500 transition-colors"
        />

        {/* Editor Panel */}
        <div
          className="flex-shrink-0 flex min-w-0"
          style={{ width: `${editorWidth}px` }}
        >
          <CodeEditor
            code={activeCode}
            setCode={handleCodeChange}
            activeFilePath={activeFilePath}
          />
        </div>

        {/* Editor Resizer */}
        <div
          onMouseDown={handleMouseDownEditor}
          className="cursor-col-resize w-2 flex-shrink-0 bg-gray-600 hover:bg-gray-500 transition-colors"
        />

        {/* Preview Panel */}
        <div className="flex-1 min-w-0">
          <CodePreviewCanvas />
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <WebContainerProvider initialFiles={initialFiles}>
      <Playground />
    </WebContainerProvider>
  );
};

export default Page;
