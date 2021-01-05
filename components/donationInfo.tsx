import React from "react";
import Donations from "./donations";
import PlayerDonations from "./playerDonations";

type DonationInfoProps = {
  donorId: string;
  playerId: string;
};

const DonationInfo = ({ donorId, playerId }: DonationInfoProps) => {
  return (
    <div className="py-3 w-full md:w-1/2">
      <div>
        <h2>I donate for ...</h2>
        <Donations donorId={donorId} />
      </div>
      {playerId && (
        <div>
          <h2>I get donations from ...</h2>
          <PlayerDonations playerId={playerId} />
        </div>
      )}
    </div>
  );
};

export default DonationInfo;
