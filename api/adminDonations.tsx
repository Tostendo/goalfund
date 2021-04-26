import { adminDb } from "../config/firebaseAdmin";
import _ from "lodash";
import { getPlayerById } from "./players";
import { calculateSumOfPledges } from "../helpers/calculate";

export const getDonationsPerPlayer = async () => {
  const snapshot = await adminDb.collection("donations").get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return [];
  }
  var donations = {};
  snapshot.forEach((doc) => {
    const donation = { id: doc.id, ...doc.data() };
    donations[donation["playerId"]] =
      donations[donation["playerId"]] && donations[donation["playerId"]].length
        ? [...donations[donation["playerId"]], donation]
        : [donation];
  });
  const modified = Object.keys(donations).map(async (key) => {
    const player = await getPlayerById(key);
    return {
      ...player,
      count: donations[key].length,
      money: calculateSumOfPledges(player.goals, donations[key]),
    };
  });
  return Promise.all(modified);
};

export const getTopPlayersByPledges = async (numberOfEntries: number) => {
  const donationsPerPlayer = await getDonationsPerPlayer();
  const sorted = _.orderBy(donationsPerPlayer, "count", "desc");
  return sorted.length < numberOfEntries
    ? sorted
    : sorted.slice(0, numberOfEntries);
};

export const getTopPlayersByMoneyRaised = async (numberOfEntries: number) => {
  const donationsPerPlayer = await getDonationsPerPlayer();
  const sorted = _.orderBy(donationsPerPlayer, "money", "desc");
  return sorted.length < numberOfEntries
    ? sorted
    : sorted.slice(0, numberOfEntries);
};
