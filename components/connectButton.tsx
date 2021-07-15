import { useState } from "react";
import Router from "next/router";
import { useAuth } from "../hooks/useAuth";
import CustomButton from "./customButton";
import ErrorModal from "./errorModal";

type ConnectButtonProps = {
  playerId: string;
};

const ConnectButton = ({ playerId }: ConnectButtonProps) => {
  const [showModal, setShowModal] = useState(true);
  const [error, setError] = useState(null);
  const auth = useAuth();
  if (auth.user && auth.user.playerId) {
    return null;
  }

  const handleConnect = (playerId: string) => {
    auth
      .connectPlayer(playerId)
      .then(() => {
        Router.push("/dashboard");
      })
      .catch((e) => {
        setError(e);
      });
  };
  return (
    <>
      <CustomButton
        type="secondary"
        label="Connect"
        handleClick={() => handleConnect(playerId)}
      />
      {error && (
        <ErrorModal
          show={showModal}
          toggle={setShowModal}
          message={error.message}
        />
      )}
    </>
  );
};

export default ConnectButton;
