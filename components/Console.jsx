// src/components/Console.jsx

"use client";
import { useEffect, useRef } from "react";

const Console = ({ logs }) => {
  const consoleEndRef = useRef(null);

  // Auto-scroll to the bottom when new logs arrive
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="h-full w-full bg-[#1e1e1e] text-white font-mono text-sm flex flex-col">
      <div className="flex-shrink-0 bg-[#333544] px-4 py-2 border-b border-gray-600">
        <p>Console</p>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index} className="whitespace-pre-wrap">
            <span className="text-gray-500 mr-2">&gt;</span>
            {log}
          </div>
        ))}
        <div ref={consoleEndRef} />
      </div>
    </div>
  );
};

export default Console;
