import React, { useState, useEffect } from "react";
import moment from "moment";
import { getDonations, deleteDonation } from "../api/donations";
import { Donation } from "../models/donation";
import PlayerName from "./playerName";
import CustomButton from "./customButton";
import Spinner from "./spinner";
import { MONEY_FORMAT } from "../helpers/formatter";
import PaymentButton from "./paymentButton";
import Icon from "./icon";
import InfoPopoverButton from "./infoPopoverButton";
import Confirm from "./confirm";
type UserPledgesProps = {
  pledgerId: string;
};

const UserPledges = ({ pledgerId }: UserPledgesProps) => {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDonations = () => {
    setLoading(true);
    getDonations(pledgerId)
      .then((donations: Donation[]) => {
        setAllDonations(donations);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDonations();
  }, [pledgerId]);

  const handleDelete = async (id: string) => {
    await deleteDonation(id)
      .then(() => {
        return getDonations(pledgerId);
      })
      .then((donations: Donation[]) => {
        setAllDonations(donations);
      });
  };

  const renderHeadline = () => {
    return (
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 items-center md:gap-2 my-2 py-4 border-b">
        <div className="col-span-1 lg:col-span-2 font-bold md:text-xl">
          <div>Player Name</div>
        </div>
        <div className="col-span-1 text-center hidden md:inline-block font-bold md:text-xl">
          <div>Created at</div>
        </div>
        <div className="col-span-1 text-center font-bold md:text-xl">
          <div>Pledge per goal</div>
        </div>
        <div className="col-span-1 text-center font-bold md:text-xl">
          <div>Payable pledge</div>
        </div>
      </div>
    );
  };

  const renderAction = (donation: Donation) => {
    if (donation.openAmount) {
      if (donation.openAmount >= 5) {
        return (
          <PaymentButton
            amount={donation.openAmount}
            donationId={donation.id}
            updateDonations={fetchDonations}
          />
        );
      } else {
        return (
          <InfoPopoverButton message="We'll prepare the payment. Once that is ready, a PayPal button will appear here." />
        );
      }
    }
    if (
      !donation.deleted &&
      (!donation.openAmount || donation.openAmount === 0)
    ) {
      return (
        <Confirm
          buttonIcon="delete"
          buttonType="error"
          handleConfirm={() => handleDelete(donation.id)}
          modalHeadline="Are you sure?"
          modalText="This deletes the pledge. If you want to pledge again, you can create a new pledge at any time."
          modalButtonConfirmText="Delete"
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
              className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 items-center md:gap-2 my-2 py-2 border-b"
            >
              <div className="col-span-1 lg:col-span-2">
                <PlayerName playerId={donation.playerId} />
              </div>
              <div className="col-span-1 hidden md:inline-block text-center">
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

export default UserPledges;
