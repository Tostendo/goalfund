import React, { useState, useEffect } from "react";
import { getDonations, DonationData, deleteDonation } from "../api/donations";
import PlayerName from "./playerName";
import CustomButton from "./primaryButton";
import Spinner from "./spinner";

type DonationInfoProps = {
  donorId: string;
};

const DonationInfo = ({ donorId }: DonationInfoProps) => {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDonations(donorId)
      .then((donations: DonationData[]) => {
        setAllDonations(donations);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [donorId]);

  const handleDelete = async (id: string) => {
    await deleteDonation(id)
      .then(() => {
        return getDonations(donorId);
      })
      .then((donations: DonationData[]) => {
        setAllDonations(donations);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-3 w-full md:w-1/2">
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
              <div className="col-span-1">
                <PlayerName playerId={donation.playerId} />
              </div>
              <div className="col-span-1">
                <span>{`${donation.amountPerGoal}€`}</span>
                <span className="hidden lg:inline-block lg:pl-2">{`per goal`}</span>
              </div>
              <div className="col-span-1">
                <CustomButton
                  label="Delete"
                  type="secondary"
                  handleClick={() => handleDelete(donation.id)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DonationInfo;
