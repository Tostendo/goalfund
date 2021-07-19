import PlayerPledges from "./playerPledges";
import PlayerName from "./playerName";

type PlayerInfoData = {
  playerId: string;
};

const PlayerInfo = ({ playerId }: PlayerInfoData) => {
  return (
    <div>
      <div>
        <h2>My player profile</h2>
        <div className="my-4">
          <PlayerName playerId={playerId} asLink />
        </div>
      </div>
      <div className="py-3 w-full">
        <h2>Pledges from ...</h2>
        <PlayerPledges playerId={playerId} />
      </div>
    </div>
  );
};

export default PlayerInfo;
