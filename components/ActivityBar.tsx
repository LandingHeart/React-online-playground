import { FilesActivityIcon, SearchActivityIcon } from "./icons/icons";

interface ActivityBarProp {
  activeView: string;
  onFileSelect: (string: string) => void;
}

const ActivityBar: React.FC<ActivityBarProp> = ({
  activeView,
  onFileSelect
}) => {
  return (
    <div className="bg-[#333333] text-gray-300 flex flex-col items-center py-2 space-y-4 w-12">
      <button
        onClick={() => onFileSelect("files")}
        className={`p-2 rounded ${
          activeView === "files"
            ? "text-white bg-gray-600/50"
            : "hover:bg-gray-500/50"
        }`}
      >
        <FilesActivityIcon className="h-8 w-6" />
      </button>
      <button
        onClick={() => onFileSelect("search")}
        className={`p-2 rounded ${
          activeView === "search"
            ? "text-white bg-gray-600/50"
            : "hover:bg-gray-500/50"
        }`}
      >
        <SearchActivityIcon className="h-8 w-6" />
      </button>
    </div>
  );
};

export default ActivityBar;
