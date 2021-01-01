import SearchItem from "../components/searchItem";
import SearchInput from "../components/searchInput";

import { usePlayers } from "../hooks/usePlayers";

type SearchResultProps = {
  onConnect?: Function;
  onDonate?: Function;
};

const SearchResults = ({ onConnect, onDonate }: SearchResultProps) => {
  const players = usePlayers();

  return (
    <div className="w-full flex flex-col items-center">
      <SearchInput onSearch={players.search} />
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
    </div>
  );
};

export default SearchResults;
