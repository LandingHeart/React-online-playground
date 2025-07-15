// src/components/WebContainerContext.jsx

"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import { WebContainer } from "@webcontainer/api";

const WebContainerContext = createContext(null);

export const WebContainerProvider = ({ children }) => {
  const [webcontainerInstance, setWebcontainerInstance] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(
    "Booting Environment..."
  );
  const iframeRef = useRef(null);

  useEffect(() => {
    const bootWebContainer = async () => {
      try {
        const wcInstance = await WebContainer.boot();
        setWebcontainerInstance(wcInstance);
      } catch (err) {
        console.error("Failed to boot WebContainer:", err);
        setError("Failed to boot WebContainer.");
        setIsLoading(false);
      }
    };
    bootWebContainer();
  }, []);

  const mountFilesAndRun = useCallback(
    async (filesToMount) => {
      if (!webcontainerInstance) {
        setError("WebContainer not available.");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        setLogs([]);
        setPreviewUrl("");

        setLoadingMessage("Mounting project files...");
        await webcontainerInstance.mount(filesToMount);

        setLoadingMessage("Installing dependencies...");
        setLogs((prev) => [...prev, "Installing dependencies with pnpm..."]);
        const installProcess = await webcontainerInstance.spawn("pnpm", [
          "install"
        ]);
        installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              setLogs((prev) => [...prev, data]);
            }
          })
        );
        if ((await installProcess.exit) !== 0) {
          throw new Error("Installation failed. Check console for details.");
        }
        setLogs((prev) => [...prev, "✅ Dependencies installed."]);

        webcontainerInstance.on("server-ready", (port, url) => {
          console.log(`Server ready at: ${url}`);
          setPreviewUrl(url);
          setIsLoading(false);
        });

        webcontainerInstance.on("error", (err) => {
          console.error("WebContainer Runtime Error:", err.message);
          setError(err.message);
          setIsLoading(false);
        });

        setLoadingMessage("Starting dev server...");
        setLogs((prev) => [...prev, "Starting dev server..."]);

        webcontainerInstance.spawn("pnpm", ["run", "dev"]);
      } catch (err) {
        // <<< SYNTAX FIX IS HERE
        console.error("An error occurred during setup:", err);
        setError(err.message);
        setIsLoading(false);
      }
    },
    [webcontainerInstance]
  );

  useEffect(() => {
    if (iframeRef.current && previewUrl) {
      iframeRef.current.src = previewUrl;
    }
  }, [previewUrl]);

  const isReady = !isLoading && !!previewUrl;

  const value = {
    webcontainerInstance,
    previewUrl,
    isLoading,
    isReady,
    error,
    logs,
    loadingMessage,
    iframeRef,
    mountFilesAndRun
  };

  return (
    <WebContainerContext.Provider value={value}>
      {children}
    </WebContainerContext.Provider>
  );
};

export const useWebContainer = () => {
  const context = useContext(WebContainerContext);
  if (!context) {
    throw new Error(
      "useWebContainer must be used within a WebContainerProvider"
    );
  }
  return context;
};
