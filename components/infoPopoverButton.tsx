import { useState } from "react";
import Icon from "./icon";

type InfoPopoverButtonProps = {
  message: string;
};

const InfoPopoverButton = (props: InfoPopoverButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="inline-block cursor-pointer rounded-lg p-1 h-10 w-10 text-primary"
        onClick={() => setOpen(!open)}
      >
        <Icon type="info" />
      </div>
      {open && (
        <div className="absolute bg-secondary border mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
          <div>
            <div className="text-white p-3">{props.message}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPopoverButton;
