import { db } from "../config/firebase";
import firebase from "firebase";

type UserData = {
  uid: string;
  username: string;
  email: string;
  emailVerified: boolean;
};

type UpdateData = {
  username?: string;
  playerId?: string;
};

export const createUser = async (user: UserData) => {
  return db
    .collection("users")
    .doc(user.uid)
    .set(user)
    .then(() => {
      return user;
    })
    .catch((error) => {
      return { error };
    });
};

export const updateUser = async (
  user: firebase.User,
  updateData: UpdateData
) => {
  return db
    .collection("users")
    .doc(user.uid)
    .update(updateData)
    .catch((error) => {
      return { error };
    });
};

export const getUser = async (user: firebase.User) => {
  return db
    .collection("users")
    .doc(user.uid)
    .get()
    .then((userData) => {
      if (userData.data()) {
        return { ...userData.data(), emailVerified: user.emailVerified };
      }
    });
};

export const getUserForPlayer = async (playerId: string) => {
  const snapshot = await db
    .collection("users")
    .where("playerId", "==", playerId)
    .get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return [];
  }
  var connnectedProfiles = [];
  snapshot.forEach((doc) => {
    connnectedProfiles.push({ id: doc.id, ...doc.data() });
  });
  return connnectedProfiles;
};
