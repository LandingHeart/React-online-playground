// src/app/page.jsx

"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CodeEditor from "@/components/CodeEditor";
import CodePreviewCanvas from "@/components/CodePreviewCanvas";
import FileExplorer from "@/components/FileExplorer";
import ActivityBar from "@/components/ActivityBar";
import SearchSidebar from "@/components/SearchSidebar";
import Navbar from "@/components/Navbar";
import Console from "@/components/Console";
import {
  WebContainerProvider,
  useWebContainer
} from "@/components/WebContainerContext";
import { transformProjectDataToFS } from "./utils/transformProjectDataToFS";

const getFileContent = (files, path) => {
  if (!path) return undefined;
  const parts = path.startsWith("/")
    ? path.substring(1).split("/")
    : path.split("/");
  let node = files;
  for (const part of parts) {
    if (!node) return undefined;
    node = node.directory ? node.directory[part] : node[part];
  }
  return node?.file?.contents;
};

const updateFileContent = (files, path, newContent) => {
  const newFiles = JSON.parse(JSON.stringify(files));
  const parts = path.startsWith("/")
    ? path.substring(1).split("/")
    : path.split("/");
  const fileName = parts.pop();
  if (!fileName) return newFiles;
  let parentDir = newFiles;
  for (const part of parts) {
    parentDir = parentDir.directory
      ? parentDir.directory[part]
      : parentDir[part];
  }
  const targetDir = parentDir.directory || parentDir;
  if (targetDir?.[fileName]?.file) {
    targetDir[fileName].file.contents = newContent;
  }
  return newFiles;
};

const Playground = () => {
  const [files, setFiles] = useState({});
  const [activeFilePath, setActiveFilePath] = useState(null);
  const [activeView, setActiveView] = useState("files");

  const {
    webcontainerInstance,
    isLoading,
    error,
    loadingMessage,
    logs,
    mountFilesAndRun
  } = useWebContainer();

  const [sidebarWidth, setSidebarWidth] = useState(256);
  const isFileSwitch = useRef(false);

  const activeCode = activeFilePath
    ? getFileContent(files, activeFilePath) || ""
    : "";

  useEffect(() => {
    if (!webcontainerInstance) return;

    const fetchAndMountProject = async () => {
      try {
        const response = await axios.get("/projects/1");
        const transformedData = transformProjectDataToFS(response.data);
        setFiles(transformedData);
        console.log(transformedData);
        await mountFilesAndRun(transformedData);
        const initialPath = "src/App.jsx";
        if (initialPath) setActiveFilePath(`/${initialPath}`);
      } catch (err) {
        // Error is already handled and displayed from the context
        console.error("API Error:", err);
      }
    };
    fetchAndMountProject();
  }, [webcontainerInstance, mountFilesAndRun]);

  useEffect(() => {
    if (isFileSwitch.current) {
      isFileSwitch.current = false;
      return;
    }
    if (!webcontainerInstance || !activeFilePath) return;
    const debounceTimeout = setTimeout(async () => {
      await webcontainerInstance.fs.writeFile(activeFilePath, activeCode);
    }, 500);
    return () => clearTimeout(debounceTimeout);
  }, [activeCode, webcontainerInstance, activeFilePath]);

  const handleCodeChange = (newCode) => {
    if (activeFilePath) {
      setFiles((currentFiles) =>
        updateFileContent(currentFiles, activeFilePath, newCode)
      );
    }
  };

  const handleFileSelect = (newPath) => {
    isFileSwitch.current = true;
    setActiveFilePath(newPath);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#1e1e1e] font-sans text-white">
        🚀 {loadingMessage || "Preparing environment..."}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#1e1e1e] font-sans text-red-400">
        ❌ Error: {error}
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#1e1e1e] flex flex-col items-stretch overflow-hidden font-sans">
      <Navbar />
      <div className="flex flex-row flex-1 min-h-0">
        <ActivityBar activeView={activeView} onFileSelect={setActiveView} />
        <div
          className="flex-shrink-0 bg-[#252526]"
          style={{ width: `${sidebarWidth}px` }}
        >
          <FileExplorer
            files={files}
            activeFile={activeFilePath}
            onFileSelect={handleFileSelect}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 min-h-0">
            <CodeEditor
              code={activeCode}
              setCode={handleCodeChange}
              activeFilePath={activeFilePath}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 min-h-0">
            <CodePreviewCanvas />
          </div>
          <div className="h-48 flex-shrink-0 border-t-2 border-gray-600">
            <Console logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <WebContainerProvider>
      <Playground />
    </WebContainerProvider>
  );
};

export default Page;
