import { useState } from "react";
import CustomButton from "./customButton";
import Modal from "./modal";

type ConfirmProps = {
  buttonType?: string;
  buttonLabel?: string;
  handleConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  buttonIcon?: string;
  modalHeadline: string;
  modalText: string;
  modalButtonConfirmText?: string;
};

const Confirm = (props: ConfirmProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  return (
    <>
      <CustomButton
        type={props.buttonType || "primary"}
        label={props.buttonLabel}
        icon={props.buttonIcon}
        handleClick={() => {
          setShowConfirmModal(!showConfirmModal);
        }}
      />
      {showConfirmModal && (
        <Modal
          headline={props.modalHeadline}
          show={showConfirmModal}
          toggle={setShowConfirmModal}
          message={props.modalText}
          confirm={props.handleConfirm}
          buttonConfirmText={props.modalButtonConfirmText}
        />
      )}
    </>
  );
};

export default Confirm;
