import React, { useState, useEffect } from "react";
import moment from "moment";
import { getDonations, deleteDonation } from "../api/donations";
import { Donation } from "../models/donation";
import PlayerName from "./playerName";
import CustomButton from "./customButton";
import Spinner from "./spinner";

type DonationsProps = {
  donorId: string;
};

const Donations = ({ donorId }: DonationsProps) => {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDonations(donorId)
      .then((donations: Donation[]) => {
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
      .then((donations: Donation[]) => {
        setAllDonations(donations);
      });
  };

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
              className="grid grid-cols-4 lg:grid-cols-5 items-center md:gap-2 my-2 py-2 border-b"
            >
              <div className="col-span-1 lg:col-span-2">
                <PlayerName playerId={donation.playerId} />
              </div>
              <div className="col-span-1">
                {moment(donation.created).format("DD.MM.YYYY")}
              </div>
              <div className="col-span-1 text-right">
                <span>{`${donation.amountPerGoal}€`}</span>
                <span className="hidden lg:inline-block lg:pl-2">{`per goal`}</span>
              </div>
              <div className="col-span-1 text-right">
                <CustomButton
                  icon="delete"
                  type="error"
                  handleClick={() => handleDelete(donation.id)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Donations;
