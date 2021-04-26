import _ from "lodash";
import { DonationData } from "../api/donations";

export const calculatePledge = (
  currentGoals: number,
  donation: DonationData
) => {
  if (currentGoals == donation.goalsStart) {
    return 0;
  }
  if (donation.deleted) {
    return (donation.goalsEnd - donation.goalsStart) * donation.amountPerGoal;
  }
  return (currentGoals - donation.goalsStart) * donation.amountPerGoal;
};

export const calculateSumOfPledges = (
  currentGoals: number,
  donations: DonationData[]
) => {
  const pledges = donations.map((donation) =>
    calculatePledge(currentGoals, donation)
  );
  return _.sum(pledges);
};
