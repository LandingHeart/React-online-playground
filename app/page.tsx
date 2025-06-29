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

  const isFileSwitch = useRef(false);

  const activeCode = getFileContent(files, activeFilePath) || "";

  useEffect(() => {
    if (isFileSwitch.current) {
      isFileSwitch.current = false;
      return;
    }

    if (!isReady || !webcontainerInstance) return;
    console.log("activeFilePath ", activeCode);
    const debounceTimeout = setTimeout(async () => {
      setIsWritingFile(true);
      if (activeFilePath !== "")
        await webcontainerInstance.fs.writeFile(activeFilePath, activeCode);
      console.log(`${activeFilePath} updated in WebContainer.`);
      setIsWritingFile(false);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [activeCode, webcontainerInstance, isReady]);

  const handleCodeChange = (newCode) => {
    const updatedFiles = updateFileContent(files, activeFilePath, newCode);
    setFiles(updatedFiles);
  };

  const handleFileSelect = (newPath) => {
    isFileSwitch.current = true;
    setActiveFilePath(newPath);
  };

  return (
    <div className="h-screen w-screen bg-[#1e1e1e] flex flex-col items-stretch overflow-hidden font-sans">
      <Navbar />
      <div className="flex flex-row flex-1 min-h-0">
        <ActivityBar activeView={activeView} onFileSelect={setActiveView} />

        <div className="flex-shrink-0">
          {activeView === "files" && (
            <FileExplorer
              files={files}
              activeFile={activeFilePath}
              onFileSelect={handleFileSelect}
            />
          )}
          {activeView === "search" && <SearchSidebar />}
        </div>
        <CodeEditor
          code={activeCode}
          setCode={handleCodeChange}
          activeFilePath={activeFilePath}
        />
        <CodePreviewCanvas />
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
