import React from "react";

export default function ProjectsLayout() {
  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white">
      <div className="border-b border-gray-700 bg-gray-800 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">My Projects</h1>
          <a
            href="/projects/new"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-indigo-700"
          >
            New Project
          </a>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto"></div>
      </main>
    </div>
  );
}
