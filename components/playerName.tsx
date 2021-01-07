import React, { useEffect, useState } from "react";
import { getPlayer } from "../api/players";

const PlayerName = ({ playerId }) => {
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    setLoading(true);
    const asyncFetchPlayer = async (id: string) => {
      if (id) {
        const player = await getPlayer(id);
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
          <div>{`${player.firstName} ${player.lastName}`}</div>
          <div className="text-xs">{player.clubName}</div>
        </div>
      )}
    </div>
  );
};

export default PlayerName;
