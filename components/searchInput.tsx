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
    <input
      type="search"
      placeholder="Search for player...  "
      className="m-1 p-2 focus:border-gray-500 appearance-none outline-none w-full text-primary"
      onChange={(e) => handleSearch(e.target.value)}
      onKeyDown={handleKeyPress}
    />
  );
};

export default SearchInput;
