import Layout from "../components/layout";
import SearchItem from "../components/searchItem";
import SearchInput from "../components/searchInput";

import { PlayersProvider, usePlayers } from "../hooks/usePlayers";

function SearchResults() {
  const players = usePlayers();

  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        <SearchInput onSearch={players.search} />
        <div className="shadow bg-white w-full rounded overflow-y-auto">
          <div className="flex flex-col w-full">
            {players.players.map((player: any) => (
              <SearchItem key={player.id} player={player} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const SearchPage = () => {
  return (
    <PlayersProvider>
      <SearchResults />
    </PlayersProvider>
  );
};
export default SearchPage;
