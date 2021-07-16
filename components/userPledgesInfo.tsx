import React from "react";
import Donations from "./userPledges";

type UserPledgesProps = {
  pledgerId: string;
};

const UserPledgesInfo = ({ pledgerId }: UserPledgesProps) => {
  return (
    <div className="py-3 w-full">
      <h2>Pledges to ...</h2>
      <Donations pledgerId={pledgerId} />
    </div>
  );
};

export default UserPledgesInfo;
