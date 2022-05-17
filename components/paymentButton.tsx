import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { PAYPAL_CLIENT_ID } from "../config/paypal";
import { useAuth } from "../hooks/useAuth";
import { createPayment } from "../api/payments";
import _ from "lodash";

type PaymentButtonProps = {
  amount: number;
  donationId: string;
  updateDonations: Function;
};

const PaymentButton = (props: PaymentButtonProps) => {
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const auth = useAuth();

  const getAmount = (details: any) => {
    return parseFloat(
      _.get(details, "purchase_units[0].amount.value", props.amount)
    );
  };

  const onSuccess = (details: any, data: any) => {
    const amount = getAmount(details);
    return createPayment({
      amount: amount,
      donationId: props.donationId,
      payerId: auth?.user?.uid,
      paid: details.create_time,
    })
      .then(() => {
        console.info("successful payment");
      })
      .then(() => {
        props.updateDonations();
      })
      .catch((err: any) => {
        console.error(err);
        setPaypalErrorMessage("Something went wrong.");
      });
  };

  return (
    <div className="w-12 float-right mr-6">
      <PayPalButton
        amount={props.amount}
        currency={PAYPAL_CLIENT_ID.currency}
        shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={onSuccess}
        style={{
          layout: "horizontal",
          shape: "pill",
          height: 30,
        }}
        options={{
          clientId: PAYPAL_CLIENT_ID.clientId,
          currency: PAYPAL_CLIENT_ID.currency,
        }}
      />
      {paypalErrorMessage && <div>{paypalErrorMessage}</div>}
    </div>
  );
};

export default PaymentButton;
