const SearchSidebar = () => {
  return (
    <div className="bg-[#252526] text-white p-2 w-64 flex-shrink-0 flex flex-col h-full">
      <h2 className="text-sm font-bold mb-2 p-2 uppercase tracking-wider text-gray-400">
        Search
      </h2>
      <div className="px-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-[#3c3c3c] border border-gray-500 rounded px-2 py-1 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchSidebar;
