import React from "react";

const SearchBar = ({ input, setInput, onSearch }) => {
  return (
    <div className="mb-6 max-w-lg flex items-center justify-center gap-2 mx-auto w-full">
      <div className="relative w-full">
   
       {/*search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <svg
            className="w-5 h-5 text-white opacity-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>

        <input
          type="text"
          placeholder="Enter city name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onSearch}
          className="w-full pl-12 pr-5 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 
                     focus:outline-none focus:ring-2 focus:ring-blue-300 backdrop-blur-md"
        />
      </div>
      <button
        className="rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 px-6 py-3 
                   text-white font-semibold hover:opacity-90 transition-all shadow-md"
        onClick={() => onSearch()}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
