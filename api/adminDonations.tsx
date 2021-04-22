import { adminDb } from "../config/firebaseAdmin";
import _ from "lodash";

export const getTopPlayersByDonation = async () => {
  const snapshot = await adminDb.collection("donations").get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return [];
  }
  var donations = {};
  snapshot.forEach((doc) => {
    const donation = { id: doc.id, ...doc.data() };
    donations[donation["playerId"]] = ++donations[donation["playerId"]] || 1;
  });
  const modified = Object.keys(donations).map((key) => {
    return {
      playerId: key,
      count: donations[key],
    };
  });
  const sorted = _.orderBy(modified, "count", "desc");
  return sorted.length < 5 ? sorted : sorted.slice(0, 5);
};
