import React, { useState } from "react";
import Icon from "./icon";

type EditInputProps = {
  type: string;
  value: string;
  onSave: Function;
  editable: boolean;
};

const EditInput = ({ type, value, onSave, editable }: EditInputProps) => {
  const [newValue, setNewValue] = useState(value);
  const [edit, setEdit] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    onSave(newValue);
    setEdit(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setEdit(false);
    }
  };

  function getEditBlock(type: string) {
    if (type === "text") {
      return (
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type={type}
            value={newValue}
            onKeyDown={handleKeyPress}
            className="rounded-l-lg m-0 border-t border-b border-l h-10 text-primary border-gray-200 bg-white outline-none focus:border-gray-300"
            onChange={(e) => {
              setNewValue(e.target.value);
            }}
          ></input>
          <button
            onClick={handleSubmit}
            className="h-10 px-4 rounded-r-lg -ml-1 bg-green-300 text-white uppercase border-t border-b border-r"
          >
            <div className="h-6 w-6 text-white">
              <Icon type="checkmark" />
            </div>
          </button>
        </form>
      );
    } else if (type === "textarea") {
      return (
        <div>
          <textarea
            rows={5}
            value={newValue}
            className="p-2 w-full rounded-lg m-0 border text-primary border-gray-200 bg-white outline-none focus:border-gray-300"
            onChange={(e) => {
              setNewValue(e.target.value);
            }}
          ></textarea>
          <button
            onClick={handleSubmit}
            className="h-10 px-4 rounded-lg -ml-1 bg-green-300 text-white uppercase border-t border-b border-r"
          >
            <div className="h-6 w-6 text-white">
              <Icon type="checkmark" />
            </div>
          </button>
        </div>
      );
    }
  }

  return (
    <div className="m-0">
      {edit && editable && getEditBlock(type)}
      {!edit && (
        <div className="h-10 flex justify-start items-center">
          <div>{value}</div>
          {editable && (
            <a
              className="h-8 w-8 pl-4 inline-block"
              onClick={() => setEdit(true)}
            >
              <div className="h-6 w-6">
                <Icon type="pencil" />
              </div>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default EditInput;
