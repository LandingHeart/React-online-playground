"use client";
// Helper function to render the file tree recursively
const renderTree = (
  tree: any,
  onFileSelect: any,
  activeFile: any,
  path = ""
) => {
  return Object.entries(tree).map(([name, item]) => {
    const currentPath = path ? `${path}/${name}` : `/${name}`;

    if (item.directory) {
      // It's a directory
      return (
        <div key={currentPath} className="pl-4">
          <p className="text-gray-400 font-semibold">{name}</p>
          {renderTree(item.directory, onFileSelect, activeFile, currentPath)}
        </div>
      );
    } else {
      // It's a file
      const isActive = activeFile === currentPath;
      return (
        <div key={currentPath} className="pl-4">
          <button
            onClick={() => onFileSelect(currentPath)}
            className={`text-left w-full px-2 py-1 rounded ${
              isActive
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            <p className="text-sm">{name}</p>
          </button>
        </div>
      );
    }
  });
};

interface FileExplorerProps {
  files: string;
  onFileSelect: (currentPath: string) => void;
  activeFile: string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileSelect,
  activeFile
}) => {
  return (
    <div className="text-white p-2 w-64 flex-shrink-0 flex flex-col h-full">
      <h3 className="text-sm font-bold mb-4pb-2">{`Project name`}</h3>
      <div>{renderTree(files, onFileSelect, activeFile)}</div>
    </div>
  );
};

export default FileExplorer;
