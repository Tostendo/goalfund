import React from "react";
import Donations from "./donations";

type DonationInfoProps = {
  donorId: string;
};

const DonationInfo = ({ donorId }: DonationInfoProps) => {
  return (
    <div className="py-3 w-full">
      <h2>Donations to ...</h2>
      <Donations donorId={donorId} />
    </div>
  );
};

export default DonationInfo;
