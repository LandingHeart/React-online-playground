"use client";
import React from "react";
import { useWebContainer } from "@/components/WebContainerContext";

const CodePreviewCanvas = () => {
  // Get all the necessary states from the context
  const { iframeRef, isLoading, error, loadingMessage, isReady } =
    useWebContainer();

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#1e1e1e]">
      {/* Show loading message when the container is booting or setting up */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#1e1e1e] font-sans text-white">
          🚀 {loadingMessage || "Preparing environment..."}
        </div>
      )}

      {/* Show error message if something goes wrong */}
      {error && !isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#1e1e1e] p-4 font-sans text-red-400">
          <div className="text-lg font-bold">❌ An Error Occurred</div>
          <p className="mt-2 text-center text-sm">{error}</p>
        </div>
      )}

      {/* The iframe for the live preview */}
      <iframe
        ref={iframeRef}
        title="Code Preview"
        className="h-full w-full bg-white"
        // Use the isReady flag to control visibility, ensuring a smooth transition
        style={{
          visibility: isReady ? "visible" : "hidden"
        }}
      />
    </div>
  );
};

export default CodePreviewCanvas;
