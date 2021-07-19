import { useState } from "react";
import Router from "next/router";
import { useAuth } from "../hooks/useAuth";
import CustomButton from "./customButton";
import Modal from "./modal";

type ConnectButtonProps = {
  playerId: string;
};

const ConnectButton = ({ playerId }: ConnectButtonProps) => {
  const [showErrorModal, setShowErrorModal] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState(null);
  const auth = useAuth();
  if (!auth.user || (auth.user && auth.user.playerId)) {
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
        handleClick={() => setShowConfirmModal(!showConfirmModal)}
      />
      {showConfirmModal && (
        <Modal
          headline={"Are you sure?"}
          show={showConfirmModal}
          toggle={setShowConfirmModal}
          message={
            "You are about to connect to a player profile. This cannot be easily undone."
          }
          confirm={() => handleConnect(playerId)}
        />
      )}
      {error && (
        <Modal
          headline={"An error occured."}
          show={showErrorModal}
          toggle={setShowErrorModal}
          errorMessage={error.message}
        />
      )}
    </>
  );
};

export default ConnectButton;
