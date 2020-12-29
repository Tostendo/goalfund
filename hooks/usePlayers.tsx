import * as React from "react";
import { searchPlayers, getPlayer } from "../api/players";

export type Player = {
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  id: number;
  clubName: string;
};

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
  const search = async (searchTerm: string) => {
    return searchPlayers({ searchTerm: searchTerm }).then((data: Player[]) =>
      setPlayers(data)
    );
  };

  const get = async (id: number) => {
    return getPlayer(id);
  };
  return {
    players,
    setPlayers,
    search,
    get,
  };
}
