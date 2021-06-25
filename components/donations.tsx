import React, { useState, useEffect } from "react";
import moment from "moment";
import { getDonations, deleteDonation } from "../api/donations";
import { Donation } from "../models/donation";
import PlayerName from "./playerName";
import CustomButton from "./customButton";
import Spinner from "./spinner";
import { MONEY_FORMAT } from "../helpers/formatter";
import PaymentButton from "./paymentButton";
type DonationsProps = {
  donorId: string;
};

const Donations = ({ donorId }: DonationsProps) => {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDonations = () => {
    setLoading(true);
    getDonations(donorId)
      .then((donations: Donation[]) => {
        setAllDonations(donations);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDonations();
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

  const renderHeadline = () => {
    return (
      <div className="grid grid-cols-5 lg:grid-cols-6 items-center md:gap-2 my-2 py-4 border-b">
        <div className="col-span-1 lg:col-span-2 font-bold text-xl">
          <div>Player Name</div>
        </div>
        <div className="col-span-1 text-center font-bold text-xl">
          <div>Created at</div>
        </div>
        <div className="col-span-1 text-center font-bold text-xl">
          <div>Pledge per goal</div>
        </div>
        <div className="col-span-1 text-center font-bold text-xl">
          <div>Open pledge</div>
        </div>
      </div>
    );
  };

  const renderAction = (donation: Donation) => {
    if (donation.openAmount && donation.openAmount > 0) {
      return (
        <PaymentButton
          amount={donation.openAmount}
          donationId={donation.id}
          updateDonations={fetchDonations}
        />
      );
    }
    if (
      !donation.deleted &&
      (!donation.openAmount || donation.openAmount === 0)
    ) {
      return (
        <CustomButton
          icon="delete"
          type="error"
          handleClick={() => handleDelete(donation.id)}
        />
      );
    }
    return <div></div>;
  };

  if (loading) {
    return <Spinner />;
  }

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
              className="grid grid-cols-5 lg:grid-cols-6 items-center md:gap-2 my-2 py-2 border-b"
            >
              <div className="col-span-1 lg:col-span-2">
                <PlayerName playerId={donation.playerId} />
              </div>
              <div className="col-span-1 text-center">
                {moment(donation.created).format("DD.MM.YYYY")}
              </div>
              <div className="col-span-1 text-center font-bold">
                <span>{MONEY_FORMAT.format(donation.amountPerGoal)}</span>
              </div>
              <div className="col-span-1 text-center font-bold flex items-center gap-2 justify-center">
                <span>{MONEY_FORMAT.format(donation.openAmount)}</span>
              </div>
              <div className="col-span-1 text-right">
                {renderAction(donation)}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Donations;
