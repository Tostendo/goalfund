import { db } from "../config/firebase";
import { getPlayerById } from "../api/players";
import moment from "moment";
export type DonationData = {
  id?: string;
  created: string;
  paid?: string;
  deleted: string | null;
  donorId: string;
  amountPerGoal: number;
  playerId: string;
  goalsStart?: number;
  goalsEnd?: number;
};

export const getDonation = async (id: string) => {
  return db
    .collection("donations")
    .doc(id)
    .get()
    .then((donationData) => {
      if (donationData.data()) {
        return donationData.data() as DonationData;
      }
    });
};

export const createDonation = async (data: DonationData) => {
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
    console.log("No matching documents.");
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
    console.log("No matching documents.");
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
