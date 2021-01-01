import React, { useState, useEffect } from "react";
import SearchResults from "./searchResults";
import { getPlayer } from "../api/players";

type PlayerInfoData = {
  playerId: number;
  onUpdate: Function;
};

const PlayerInfo = ({ playerId, onUpdate }: PlayerInfoData) => {
  const [isPlayer, setIsPlayer] = useState(playerId != null);

  const [playerInfo, setPlayerInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (playerId) {
      setLoading(true);
      getPlayer(playerId)
        .then((player) => {
          setPlayerInfo(player);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [playerId]);

  const handleCheck = (old: boolean) => {
    setIsPlayer(!old);
    if (old) {
      setPlayerInfo(null);
      onUpdate({ playerId: null });
    }
  };

  return (
    <div className="py-3 w-full md:w-1/2">
      <label className="flex items-center">
        <input
          type="checkbox"
          className=" m-0 p-0 h-4 w-4 text-green-600"
          checked={isPlayer}
          onChange={() => handleCheck(isPlayer)}
        />
        <span className="ml-2">I am a player</span>
      </label>
      {isPlayer && !playerId && (
        <SearchResults onConnect={(id: number) => onUpdate({ playerId: id })} />
      )}
      {playerInfo && (
        <div className="py-3">
          <div>
            <label className="text-xs">Player name</label>
            <div>{`${playerInfo.firstName} ${playerInfo.lastName}`}</div>
          </div>
          <div>
            <label className="text-xs">Position</label>
            <div>Midfield</div>
          </div>
          <div>
            <label className="text-xs">Strong leg</label>
            <div>right</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerInfo;
