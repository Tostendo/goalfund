import { db } from "../config/firebase";
import { getPlayerById } from "../api/players";
import { Donation } from "../models/donation";
import moment from "moment";

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
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (!data.deleted) {
      donations.push({ id: doc.id, ...data });
    }
  });
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
