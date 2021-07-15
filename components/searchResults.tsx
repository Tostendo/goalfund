import { useEffect } from "react";
import { useRouter } from "next/router";
import SearchItem from "../components/searchItem";
import SearchInput from "../components/searchInput";

import { usePlayers } from "../hooks/usePlayers";
import Spinner from "./spinner";

type SearchResultProps = {
  onConnect?: Function;
};

const SearchResults = ({ onConnect }: SearchResultProps) => {
  const players = usePlayers();
  const router = useRouter();
  useEffect(() => {
    const { s } = router.query;
    players.search(s ?? null);
  }, [router.query]);

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
            <SearchItem key={player.id} player={player} onConnect={onConnect} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="my-4 w-full flex flex-col items-center">
      {renderContent()}
    </div>
  );
};

export default SearchResults;
