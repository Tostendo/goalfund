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
    return "text-md border rounded-lg p-2 focus:outline-none appearance-none bg-green-400  hover:bg-green-600 text-white";
  } else if (type == "primary") {
    return "text-md border rounded-lg p-2 focus:outline-none appearance-none bg-green-400  hover:bg-green-600 text-white";
  } else if (type == "secondary") {
    return "text-md border rounded-lg p-2 focus:outline-none appearance-none bg-yellow-400  hover:bg-yellow-600 text-black";
  } else if (type == "error") {
    return "text-md border border-red-400 hover:border-red-600 rounded-lg p-2 focus:outline-none appearance-none bg-red-400 hover:bg-red-600 text-white";
  }
}

const CustomButton = ({ handleClick, type, label, icon }: ButtonProps) => (
  <button
    onClick={(e) => clickHandler(e, handleClick)}
    className={`${getButtonStyle(type)}`}
  >
    {label && <span>{label}</span>}
    {icon && (
      <div className="h-6 w-6">
        <Icon type={icon} />
      </div>
    )}
  </button>
);

export default CustomButton;
