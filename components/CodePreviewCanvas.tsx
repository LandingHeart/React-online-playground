// CodePreviewCanvas.jsx
"use client";
import { useWebContainer } from "@/components/WebContainerContext";

const CodePreviewCanvas = () => {
  const { isReady, iframeRef } = useWebContainer();
  return (
    <div className="flex-1 bg-purple-300 flex flex-col h-full w-full overflow-hidden">
      <div
        className="relative h-full w-full"
        style={{
          height: "100vh",
          backgroundColor: "white",
          borderRadius: "10px"
        }}
      >
        {!isReady && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "sans-serif",
              color: "#60a5fa",
              zIndex: 10
            }}
          >
            <h1>Booting WebContainer...</h1>
          </div>
        )}
        <iframe
          id="output-iframe"
          title="Output Preview"
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
