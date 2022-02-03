import React from "react";
import Icon from "./icon";

type ButtonProps = {
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: string;
  label?: string;
  icon?: string;
};

function clickHandler(
  e: React.SyntheticEvent<EventTarget>,
  handleClick?: Function
) {
  e.stopPropagation();
  if (handleClick) {
    handleClick(e);
  }
}

function getButtonStyle(type: string) {
  if (!type) {
    return "bg-accent hover:bg-accent75 border-accent text-white";
  } else if (type == "primary") {
    return "bg-accent  hover:bg-accent75 border-accent text-white";
  } else if (type == "secondary") {
    return "bg-secondary hover:bg-secondary75 text-white";
  } else if (type == "accent") {
    return "bg-white hover:bg-primary hover:text-white border-primary text-primary";
  } else if (type == "error") {
    return "border-none text-red-400 hover:text-red-600";
  }
}

const CustomButton = ({ handleClick, type, label, icon }: ButtonProps) => (
  <button
    onClick={(e) => clickHandler(e, handleClick)}
    className={`text-md border rounded-lg py-3 px-6 focus:outline-none appearance-none ${getButtonStyle(
      type
    )}`}
  >
    <div className="flex items-center gap-1">
      {label && <span className="font-bold">{label}</span>}
      {icon && (
        <div className="h-6 w-6">
          <Icon type={icon} />
        </div>
      )}
    </div>
  </button>
);

export default CustomButton;
