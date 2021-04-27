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
      <div className="my-4 p-1 bg-secondary flex border border-none rounded">
        <input
          type="search"
          placeholder="Search by name"
          className="m-1 p-2 border-secondary focus:border-gray-500 appearance-none outline-none w-full text-primary"
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default SearchInput;
