import { db } from "../config/firebase";
import { getCachedPlayerById } from "../api/players";
import { Donation } from "../models/donation";
import moment from "moment";
import { calculatePledge } from "../helpers/calculate";
import { getSumOfPaymentsByDonation } from "./payments";
import _ from "lodash";

export type PledgeStats = {
  numberOfPledges: number;
  donorOpenPledges: number;
  donorPaidPledges: number;
  numberOfPledgers?: number;
  playerOpenPledges?: number;
  playerPledgePerGoal?: number;
  playerPaidPledges?: number;
};

export const getDonation = async (id: string) => {
  return db
    .collection("donations")
    .doc(id)
    .get()
    .then((donationData) => {
      if (donationData.data()) {
        return donationData.data() as Donation;
      }
    });
};

export const createDonation = async (data: Donation) => {
  const player = await getCachedPlayerById(data.playerId);
  const withGoals = {
    ...data,
    goalsStart: player.goals || 0,
  };
  return db
    .collection("donations")
    .doc()
    .set(withGoals)
    .then(() => {
      return data;
    })
    .catch((error) => {
      return { error };
    });
};

export const getDonations = async (donorId: string, idType: string) => {
  const snapshot = await db
    .collection("donations")
    .where(idType, "==", donorId)
    .get();
  if (snapshot.empty) {
    return [];
  }
  var donations = [];
  for (let i = 0; i < snapshot.size; i++) {
    const data: Donation = snapshot.docs[i].data() as Donation;
    if (
      !data.deleted ||
      (data.deleted && data.goalsEnd && data.goalsEnd > data.goalsStart)
    ) {
      const player = await getCachedPlayerById(data.playerId);
      const payments = await getSumOfPaymentsByDonation(snapshot.docs[i].id);

      donations.push({
        id: snapshot.docs[i].id,
        openAmount: calculatePledge(player.goals, data, payments),
        totalAmount: calculatePledge(player.goals, data, 0),
        ...data,
      });
    }
  }
  return donations;
};

export const getUserDonations = async (donorId: string) => {
  return getDonations(donorId, "donorId");
};

export const getPlayerDonations = async (playerId: string) => {
  return getDonations(playerId, "playerId");
};

export const getDonationStatistics = async (
  donorId: string,
  playerId: string
) => {
  if (!donorId) {
    return null;
  }
  const donorData = await getUserDonations(donorId);
  const donorStats = {
    numberOfPledges: donorData.length,
    donorOpenPledges: _.sumBy(donorData, "totalAmount"),
    donorPaidPledges:
      _.sumBy(donorData, "totalAmount") - _.sumBy(donorData, "openAmount"),
  };
  if (!playerId) {
    return donorStats;
  }
  const playerData = await getPlayerDonations(playerId);
  const playerStats = {
    numberOfPledgers: playerData.length,
    playerOpenPledges: _.sumBy(playerData, "totalAmount"),
    playerPledgePerGoal: _.sumBy(playerData, "amountPerGoal"),
    playerPaidPledges:
      _.sumBy(playerData, "totalAmount") - _.sumBy(playerData, "openAmount"),
  };
  return {
    ...donorStats,
    ...playerStats,
  };
};

export const deleteDonation = async (id: string) => {
  const donation = await getDonation(id);
  const player = await getCachedPlayerById(donation.playerId);
  return db
    .collection("donations")
    .doc(id)
    .update({
      deleted: moment.utc().toISOString(),
      goalsEnd: player.goals || 0,
    });
};
