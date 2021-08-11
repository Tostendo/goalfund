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
    return "bg-green-400  hover:bg-green-600 text-white";
  } else if (type == "primary") {
    return "bg-green-400  hover:bg-green-600 text-white";
  } else if (type == "secondary") {
    return "bg-yellow-400  hover:bg-yellow-600 text-black";
  } else if (type == "error") {
    return "border-none text-red-400 hover:text-red-600";
  }
}

const CustomButton = ({ handleClick, type, label, icon }: ButtonProps) => (
  <button
    onClick={(e) => clickHandler(e, handleClick)}
    className={`text-md border rounded-lg py-2 px-2 focus:outline-none appearance-none ${getButtonStyle(
      type
    )}`}
  >
    <div className="flex gap-1">
      {label && <span>{label}</span>}
      {icon && (
        <div className="h-6 w-6">
          <Icon type={icon} />
        </div>
      )}
    </div>
  </button>
);

export default CustomButton;
