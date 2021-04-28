import React, { useState, useEffect } from "react";
import { getPlayerDonations } from "../api/donations";
import { Donation } from "../models/donation";
import Spinner from "./spinner";
import { MONEY_FORMAT } from "../helpers/formatter";

type PlayerDonationsProps = {
  playerId: string;
};

const PlayerDonations = ({ playerId }: PlayerDonationsProps) => {
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

  return (
    <div>
      {allDonations.length == 0 && (
        <div className="py-3">No donations so far.</div>
      )}
      {allDonations.length > 0 &&
        allDonations.map((donation: Donation) => {
          return (
            <div
              key={donation.id}
              className="grid grid-cols-2 items-center md:gap-2 my-4 border-b py-2"
            >
              <div className="col-span-1 font-bold">Anonym</div>
              <div className="col-span-1 text-right font-bold">
                <span>{MONEY_FORMAT.format(donation.amountPerGoal)}</span>
                <span className="hidden lg:inline-block lg:pl-2">{`per goal`}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PlayerDonations;
