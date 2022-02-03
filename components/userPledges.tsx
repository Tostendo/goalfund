import React, { useState, useEffect } from "react";
import moment from "moment";
import { Donation } from "../models/donation";
import PlayerName from "./playerName";
import Spinner from "./spinner";
import { MONEY_FORMAT } from "../helpers/formatter";
import PaymentButton from "./paymentButton";
import InfoPopoverButton from "./infoPopoverButton";
import Confirm from "./confirm";
type PledgesProps = {
  fetchId: string;
  type: string;
  handleFetch: Function;
  handleDelete?: Function;
};

const Pledges = ({
  fetchId,
  type,
  handleFetch,
  handleDelete,
}: PledgesProps) => {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDonations = () => {
    setLoading(true);
    handleFetch(fetchId)
      .then((donations: Donation[]) => {
        setAllDonations(donations);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDonations();
  }, [fetchId]);

  const deleteDonation = async (id: string) => {
    await handleDelete(id)
      .then(() => {
        return handleFetch(fetchId);
      })
      .then((donations: Donation[]) => {
        setAllDonations(donations);
      });
  };

  const renderHeadline = () => {
    return (
      <div className="bg-grey10 grid grid-cols-4 md:grid-cols-7 items-center p-4 text-sm text-grey100 text-center rounded-full">
        <div className="col-span-1 text-left">
          <div>Name</div>
        </div>
        <div className="col-span-1 hidden md:inline-block">
          <div>Created</div>
        </div>
        <div className="col-span-1 hidden md:inline-block md:col-span-2 text-left">
          <div>Message</div>
        </div>
        <div className="col-span-1">
          <div>Pledge per goal</div>
        </div>
        <div className="col-span-1">
          <div>Open</div>
        </div>
        {type === "to" && (
          <div className="col-span-1 text-right">
            <div>Action</div>
          </div>
        )}
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
          handleConfirm={() => deleteDonation(donation.id)}
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
        <div className="py-4 text-sm text-grey100">No donations so far.</div>
      )}
      {allDonations.length > 0 &&
        allDonations.map((donation: Donation) => {
          return (
            <div
              key={donation.id}
              className="grid grid-cols-4 md:grid-cols-7 items-center md:gap-2 my-2 p-4 text-sm text-grey100 text-center"
            >
              {type === "to" && (
                <div className="col-span-1 text-left">
                  <PlayerName playerId={donation.playerId} />
                </div>
              )}
              {type === "from" && (
                <div className="col-span-1 text-left">
                  {donation.donorName || "Anonymous"}
                </div>
              )}
              <div className="col-span-1 hidden md:inline-block">
                {moment(donation.created).format("DD.MM.YYYY")}
              </div>
              <div className="col-span-4 border-2 border-grey100 rounded-xl md:border-none mt-2 md:mt-0 p-3 md:p-0 md:col-span-2 order-last md:order-none text-left">
                {donation.message}
              </div>
              <div className="col-span-1">
                <span>{MONEY_FORMAT.format(donation.amountPerGoal)}</span>
              </div>
              <div className="col-span-1 items-center font-bold">
                <span>{MONEY_FORMAT.format(donation.openAmount)}</span>
              </div>
              {type === "to" && (
                <div className="col-span-1 text-right">
                  {renderAction(donation)}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Pledges;
