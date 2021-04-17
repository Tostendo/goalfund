import React from "react";
import CustomButton from "./customButton";
import Router from "next/router";
import { useAuth } from "../hooks/useAuth";

type Props = {
  donateForId: string;
};

const DonateButton = ({ donateForId }: Props) => {
  const auth = useAuth();
  return (
    <CustomButton
      type="primary"
      label="Donate"
      handleClick={() =>
        auth.user && auth.user.uid
          ? Router.push({
              pathname: "/donation/add",
              query: {
                donateFor: donateForId,
              },
            })
          : Router.push({
              pathname: "/login",
              query: {
                redirectUrl: "/donation/add?donateFor=" + donateForId,
              },
            })
      }
    />
  );
};

export default DonateButton;
