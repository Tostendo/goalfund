import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchResults from "./searchResults";
import { getPlayerById } from "../api/players";
import Spinner from "./spinner";
import ErrorModal from "./errorModal";
import PlayerDonations from "./playerDonations";

type PlayerInfoData = {
  playerId: string;
  onUpdate: Function;
};

const PlayerInfo = ({ playerId, onUpdate }: PlayerInfoData) => {
  const [isPlayer, setIsPlayer] = useState(playerId != null);

  const [playerInfo, setPlayerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (playerId) {
      setLoading(true);
      getPlayerById(playerId)
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
      onUpdate(null);
    }
  };

  const handleConnect = async (id: string) => {
    return onUpdate(id)
      .then(() => setError(null))
      .catch((e: any) => {
        setShowModal(true);
        setError(e);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-3 w-full">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="m-0 p-0 h-4 w-4 text-green-600"
          checked={isPlayer}
          onChange={() => handleCheck(isPlayer)}
        />
        <span className="ml-2">I am a player</span>
      </label>
      {isPlayer && !playerId && <SearchResults onConnect={handleConnect} />}
      {playerInfo && (
        <div>
          <div className="py-3">
            <div>
              <Link href={`/player/${playerInfo.slug}`}>
                <div>
                  <a>{`${playerInfo.name}`}</a>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <h2>Donations from ...</h2>
            <PlayerDonations playerId={playerId} />
          </div>
        </div>
      )}
      {error && (
        <ErrorModal
          show={showModal}
          toggle={setShowModal}
          message={error.message}
        />
      )}
    </div>
  );
};

export default PlayerInfo;
