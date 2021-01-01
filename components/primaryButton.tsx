import React from "react";

type ButtonProps = {
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: string;
  label: string;
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
  }
}

const CustomButton = ({ handleClick, type, label }: ButtonProps) => (
  <button
    onClick={(e) => clickHandler(e, handleClick)}
    className={`${getButtonStyle(type)}`}
  >
    {label}
  </button>
);

export default CustomButton;
