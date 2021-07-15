import { db } from "../config/firebase";
import { Player } from "../models/player";
import moment from "moment";

export const trackPlayerShare = async (player: Player) => {
  return db
    .collection("shares")
    .doc()
    .set({
      playerId: player.id,
      created: moment().toISOString(),
    })
    .catch((error) => {
      console.info(error);
      return { error };
    });
};
