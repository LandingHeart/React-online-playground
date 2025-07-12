"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";
import { WebContainer } from "@webcontainer/api";

const WebContainerContext = createContext(null);

export const WebContainerProvider = ({ children, initialFiles }) => {
  const [webcontainerInstance, setWebcontainerInstance] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef(null);
  const bootAttempted = useRef(false);

  useEffect(() => {
    let wcInstance = null; // Define wcInstance here to be accessible in the cleanup function

    async function bootAndSetupWebContainer() {
      if (bootAttempted.current) return;
      bootAttempted.current = true;

      try {
        console.log("Attempting to boot WebContainer...");
        wcInstance = await WebContainer.boot();
        setWebcontainerInstance(wcInstance);

        console.log("Mounting files...");
        await wcInstance.mount(initialFiles);

        console.log("Installing dependencies...");
        const installProcess = await wcInstance.spawn("npm", ["install"]);
        installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log("install:", data);
            }
          })
        );
        const installExitCode = await installProcess.exit;
        if (installExitCode !== 0) {
          throw new Error("npm install failed");
        }
        console.log("Dependencies installed.");

        wcInstance.on("server-ready", (port, url) => {
          console.log(`Server ready at: ${url}`);
          setPreviewUrl(url);
          setIsReady(true);
        });

        console.log("Starting dev server...");
        const devServerProcess = await wcInstance.spawn("npm", ["run", "dev"]);

        // Pipe the output to the console without blocking
        devServerProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              console.log("dev server:", data);
            }
          })
        );
      } catch (error) {
        console.error("Failed to boot or setup WebContainer:", error);
        setIsReady(false);
        bootAttempted.current = false;
      }
    }

    bootAndSetupWebContainer();

    return () => {
      if (wcInstance && typeof wcInstance.teardown === "function") {
        console.log("Tearing down WebContainer...");
        wcInstance.teardown();
      }
    };
  }, [initialFiles]); // Added initialFiles to dependency array as it's used inside

  // This effect waits for the previewUrl and updates the iframe
  useEffect(() => {
    if (iframeRef.current && previewUrl) {
      iframeRef.current.src = previewUrl;
      console.log("Iframe src successfully set to:", previewUrl);
    }
  }, [previewUrl]);

  return (
    <WebContainerContext.Provider
      value={{ webcontainerInstance, previewUrl, isReady, iframeRef }}
    >
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
