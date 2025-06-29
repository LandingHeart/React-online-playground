import { ProjectIcon } from "./icons/icons";

const Navbar = () => {
  return (
    <div className="w-full h-12 bg-[#3c3c3c] flex items-center justify-between px-4 text-white flex-shrink-0">
      <div className="flex items-center">
        <ProjectIcon />
        <span className="font-semibold text-gray-300">
          Online React Playground
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button className="px-3 py-1 text-sm bg-gray-600/50 rounded hover:bg-gray-500/50">
          Share
        </button>
        <button className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-500">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
