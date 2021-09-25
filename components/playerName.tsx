import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCachedPlayerById } from "../api/players";

const PlayerName = ({ playerId, asLink = false }) => {
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    setLoading(true);
    const asyncFetchPlayer = async (id: string) => {
      if (id) {
        const player = await getCachedPlayerById(id);
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
          {asLink && (
            <div className="font-bold">
              <Link href={`/player/${player.slug}`}>{`${player.name}`}</Link>
            </div>
          )}
          {!asLink && <div className="font-bold">{`${player.name}`}</div>}
          {player.teamName && <div className="text-xs">{player.teamName}</div>}
        </div>
      )}
    </div>
  );
};

export default PlayerName;
