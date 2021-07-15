import PlayerDonations from "./playerDonations";
import PlayerName from "./playerName";
import Link from "next/link";

type PlayerInfoData = {
  playerId: string;
};

const PlayerInfo = ({ playerId }: PlayerInfoData) => {
  return (
    <div>
      <div>
        <h2>Me</h2>

        <div className="my-4">
          <PlayerName playerId={playerId} asLink />
        </div>
      </div>
      <div className="py-3 w-full">
        <h2>Donations from ...</h2>
        <PlayerDonations playerId={playerId} />
      </div>
    </div>
  );
};

export default PlayerInfo;
