import React, { useState, useEffect } from "react";
import { getPlayerDonations, DonationData } from "../api/donations";
import Spinner from "./spinner";

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
        .then((donations: DonationData[]) => {
          console.info("donations: ", donations);
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
        allDonations.map((donation: DonationData) => {
          return (
            <div
              key={donation.id}
              className="grid grid-cols-3 items-center md:gap-2 my-4"
            >
              <div className="col-span-1">Anonym</div>
              <div className="col-span-1">
                <span>{`${donation.amountPerGoal}€`}</span>
                <span className="hidden lg:inline-block lg:pl-2">{`per goal`}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PlayerDonations;
