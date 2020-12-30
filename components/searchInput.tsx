import React, { useState } from "react";

type SearchInputProps = {
  onSearch: Function;
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    if (value == "" || !value) {
      onSearch(value);
    }
    setSearchTerm(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(searchTerm);
    }
  };
  return (
    <div className="w-full">
      <div className="my-4 p-4 bg-white flex border border-gray-200 rounded">
        <input
          type="search"
          placeholder="Search by name"
          className="my-1 p-2 border-gray-200 focus:border-gray-400 appearance-none outline-none w-full text-primary"
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SearchInput;
