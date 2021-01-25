import React, { useEffect, useState } from "react";
import { getPlayerById } from "../api/players";

const PlayerName = ({ playerId }) => {
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    setLoading(true);
    const asyncFetchPlayer = async (id: string) => {
      if (id) {
        const player = await getPlayerById(id);
        setPlayer(player);
      }
      setLoading(false);
    };
    asyncFetchPlayer(playerId);
  }, [playerId]);
  return (
    <div>
      {!loading && player && (
        <div>
          <div className="font-bold">{`${player.name}`}</div>
          {player.team && <div className="text-xs">{player.team.name}</div>}
        </div>
      )}
    </div>
  );
};

export default PlayerName;
