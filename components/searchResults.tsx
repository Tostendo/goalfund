import { useEffect } from "react";
import SearchItem from "../components/searchItem";
import SearchInput from "../components/searchInput";

import { usePlayers } from "../hooks/usePlayers";
import Spinner from "./spinner";

type SearchResultProps = {
  onConnect?: Function;
  onDonate?: Function;
};

const SearchResults = ({ onConnect, onDonate }: SearchResultProps) => {
  const players = usePlayers();
  useEffect(() => {
    players.search(null);
  }, []);

  const renderContent = () => {
    if (players.loading) {
      return <Spinner />;
    }
    if (players.error) {
      return <div> Something went wrong.</div>;
    }
    if (players.players.length === 0) {
      return <div> No matching results found.</div>;
    }
    return (
      <div className="shadow bg-white w-full rounded overflow-y-auto">
        <div className="flex flex-col w-full">
          {players.players.map((player: any) => (
            <SearchItem
              key={player.id}
              player={player}
              onDonate={onDonate}
              onConnect={onConnect}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      <SearchInput onSearch={players.search} />
      {renderContent()}
    </div>
  );
};

export default SearchResults;
