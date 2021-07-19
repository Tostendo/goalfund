import React, { useState, useEffect } from "react";
import { getPlayerDonations } from "../api/donations";
import { Donation } from "../models/donation";
import Spinner from "./spinner";
import { MONEY_FORMAT } from "../helpers/formatter";

type PlayerPledgesProps = {
  playerId: string;
};

const PlayerPledges = ({ playerId }: PlayerPledgesProps) => {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (playerId) {
      setLoading(true);
      getPlayerDonations(playerId)
        .then((donations: Donation[]) => {
          setAllDonations(donations);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [playerId]);

  if (loading) {
    return <Spinner />;
  }

  const renderHeadline = () => {
    return (
      <div className="hidden md:grid grid-cols-3 items-end md:items-center md:gap-2 my-2 py-4 border-b">
        <div className="col-span-1 font-bold md:text-xl">
          <div>Donor Name</div>
        </div>
        <div className="col-span-1 font-bold md:text-xl">
          <div>Message</div>
        </div>
        <div className="col-span-1 text-right font-bold md:text-xl">
          <div>Pledge per goal</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderHeadline()}
      {allDonations.length == 0 && (
        <div className="py-3">No donations so far.</div>
      )}
      {allDonations.length > 0 &&
        allDonations.map((donation: Donation) => {
          return (
            <div
              key={donation.id}
              className="grid grid-cols-2 md:grid-cols-3 items-center md:gap-2 my-4 border-b py-2"
            >
              <div className="col-span-1 font-bold truncate">
                {donation.donorName || "Anonymous"}
              </div>
              <div className="py-2 md:p-0 col-span-2 md:col-span-1 order-last md:order-none md:truncate">
                {donation.message}
              </div>
              <div className="col-span-1 text-right font-bold">
                <span>{MONEY_FORMAT.format(donation.amountPerGoal)}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PlayerPledges;
