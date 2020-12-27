import { db } from "../config/firebase";
import firebase from "firebase";

type UserData = {
  uid: string;
  username: string;
  email: string;
  emailVerified: boolean;
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
