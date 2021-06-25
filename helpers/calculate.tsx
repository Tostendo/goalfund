import _ from "lodash";
import { Donation } from "../models/donation";

export const calculatePledge = (
  currentGoals: number,
  donation: Donation,
  alreadyPaid: number
) => {
  if (donation.deleted) {
    return (
      (donation.goalsEnd - donation.goalsStart) * donation.amountPerGoal -
      alreadyPaid
    );
  }
  return (
    (currentGoals - donation.goalsStart) * donation.amountPerGoal - alreadyPaid
  );
};

export const calculateSumOfPledges = (
  currentGoals: number,
  donations: Donation[]
) => {
  const pledges = donations.map((donation) =>
    calculatePledge(currentGoals, donation, 0)
  );
  return _.sum(pledges);
};
