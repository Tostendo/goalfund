import React from "react";
import CustomButton from "./customButton";
import Router from "next/router";
import { useAuth } from "../hooks/useAuth";

type Props = {
  pledgeForId: string;
};

const PledgeButton = ({ pledgeForId }: Props) => {
  const auth = useAuth();
  return (
    <CustomButton
      type="primary"
      label="Pledge"
      handleClick={() =>
        auth.user && auth.user.uid
          ? Router.push({
              pathname: "/pledge/add",
              query: {
                pledgeFor: pledgeForId,
              },
            })
          : Router.push({
              pathname: "/login",
              query: {
                redirectUrl: "/pledge/add?pledgeFor=" + pledgeForId,
              },
            })
      }
    />
  );
};

export default PledgeButton;
