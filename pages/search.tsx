import Layout from "../components/layout";
import SearchResults from "../components/searchResults";

import { PlayersProvider } from "../hooks/usePlayers";

const SearchPage = () => {
  return (
    <PlayersProvider>
      <Layout>
        <SearchResults onDonate={() => console.log("donate")} />
      </Layout>
    </PlayersProvider>
  );
};
export default SearchPage;
