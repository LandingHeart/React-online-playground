// src/components/CodePreviewCanvas.jsx

"use client";
import { useWebContainer } from "@/components/WebContainerContext";

const CodePreviewCanvas = () => {
  // This now works because the context provides `isReady`
  const { isReady, iframeRef } = useWebContainer();

  return (
    <div className="flex-2 flex flex-col h-full w-full overflow-hidden bg-white">
      <div className="relative h-full w-full">
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center font-sans text-blue-400 z-10">
            {/* You can use isLoading and loadingMessage from the context for a more detailed message */}
            <h1>Booting WebContainer...</h1>
          </div>
        )}
        <iframe
          id="output-iframe"
          title="Output Preview"
          // FIX: No need to set `src` here; the useEffect in the context handles it
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            visibility: isReady ? "visible" : "hidden"
          }}
          ref={iframeRef}
        />
      </div>
    </div>
  );
};

export default CodePreviewCanvas;
