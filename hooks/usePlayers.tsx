import * as React from "react";
import { search as searchAllPlayers } from "../shared/searchIndex";

const playersContext = React.createContext({ players: [] });
const { Provider } = playersContext;

export function PlayersProvider(props: {
  children: React.ReactNode;
}): JSX.Element {
  const players = usePlayersProvider();
  return <Provider value={players} {...props} />;
}

export const usePlayers: any = () => {
  const context = React.useContext(playersContext);
  if (!context) {
    throw new Error(`usePlayers must be used within a PlayersProvider`);
  }
  return context;
};

function usePlayersProvider() {
  const [players, setPlayers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const search = async (searchTerm: string) => {
    setLoading(true);
    const result = searchAllPlayers({ query: searchTerm });
    setPlayers(result.data?.items || []);
    setLoading(false);
  };

  return {
    players,
    loading,
    search,
  };
}
