import { db } from "../config/firebase";
import { Payment } from "../models/payment";
import _ from "lodash";

export const createPayment = async (data: Payment) => {
  return db
    .collection("payments")
    .doc()
    .set(data)
    .then(() => {
      return data;
    })
    .catch((error) => {
      return { error };
    });
};

export const getPayments = async (payerId: string) => {
  const snapshot = await db
    .collection("payments")
    .where("payerId", "==", payerId)
    .get();
  if (snapshot.empty) {
    return [];
  }
  var payments = [];
  snapshot.forEach((doc) => {
    payments.push({ id: doc.id, ...doc.data() });
  });
  return payments;
};

export const getSumOfPaymentsByDonation = async (donationId: string) => {
  const snapshot = await db
    .collection("payments")
    .where("donationId", "==", donationId)
    .get();
  if (snapshot.empty) {
    return 0;
  }
  var payments = [];
  snapshot.forEach((doc) => {
    payments.push({ id: doc.id, ...doc.data() });
  });
  return _.reduce(payments, (sum, n) => sum + n.amount, 0);
};
