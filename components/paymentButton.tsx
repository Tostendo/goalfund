import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
import { PAYPAL_CLIENT_ID } from "../config/paypal";
import { useAuth } from "../hooks/useAuth";
import { createPayment } from "../api/payments";
import _, { update } from "lodash";

type PaymentButtonProps = {
  amount: number;
  donationId: string;
  updateDonations: Function;
};

const PaymentButton = (props: PaymentButtonProps) => {
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const auth = useAuth();

  const createOrder = (_: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: props.amount,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID: string) => {
        return orderID;
      });
  };

  const getAmount = (details: any) => {
    return parseFloat(
      _.get(details, "purchase_units[0].amount.value", props.amount)
    );
  };

  const onApprove = (_: any, actions: any) => {
    return actions.order
      .get()
      .then(function (details: any) {
        console.info("details: ", details);
        const amount = getAmount(details);
        return createPayment({
          amount: amount,
          donationId: props.donationId,
          payerId: auth?.user?.uid,
          paid: details.create_time,
        });
      })
      .then(() => {
        console.info("successful payment");
      })
      .then(() => {
        props.updateDonations();
      })
      .catch((err: any) => {
        console.info(err);
        setPaypalErrorMessage("Something went wrong.");
      });
  };
  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID.clientId,
        currency: PAYPAL_CLIENT_ID.currency,
      }}
    >
      <div style={{ maxWidth: "80px", float: "right" }}>
        <PayPalButtons
          fundingSource={FUNDING.PAYPAL}
          style={{ height: 30 }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </div>
      {paypalErrorMessage && <div>{paypalErrorMessage}</div>}
    </PayPalScriptProvider>
  );
};

export default PaymentButton;
