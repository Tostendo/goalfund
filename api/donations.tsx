import { db } from "../config/firebase";

export type DonationData = {
  id?: string;
  donorId: string;
  amountPerGoal: number;
  playerId: string;
};

export const createDonation = async (data: DonationData) => {
  return db
    .collection("donations")
    .doc()
    .set(data)
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
    donations.push({ id: doc.id, ...doc.data() });
  });
  return donations;
};

export const deleteDonation = async (id: string) => {
  return await db.collection("donations").doc(id).delete();
};
