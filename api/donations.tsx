import { db } from "../config/firebase";
import { getPlayerById } from "../api/players";
import { Donation } from "../models/donation";
import moment from "moment";
import { calculatePledge } from "../helpers/calculate";
import { getSumOfPaymentsByDonation } from "./payments";

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
  const player = await getPlayerById(data.playerId);
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

export const getDonations = async (donorId: string) => {
  const snapshot = await db
    .collection("donations")
    .where("donorId", "==", donorId)
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
      const player = await getPlayerById(data.playerId);
      const payments = await getSumOfPaymentsByDonation(snapshot.docs[i].id);

      donations.push({
        id: snapshot.docs[i].id,
        openAmount: calculatePledge(player.goals, data, payments),
        ...data,
      });
    }
  }
  return donations;
};

export const getPlayerDonations = async (playerId: string) => {
  const snapshot = await db
    .collection("donations")
    .where("playerId", "==", playerId)
    .get();
  if (snapshot.empty) {
    return [];
  }
  var donations = [];
  snapshot.forEach((doc) => {
    donations.push({ id: doc.id, ...doc.data() });
  });
  return donations;
};

export const deleteDonation = async (id: string) => {
  const donation = await getDonation(id);
  const player = await getPlayerById(donation.playerId);
  return await db
    .collection("donations")
    .doc(id)
    .update({
      deleted: moment.utc().toISOString(),
      goalsEnd: player.goals || 0,
    });
};
