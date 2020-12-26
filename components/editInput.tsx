import React, { useState } from "react";

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

  return (
    <div className="m-0 p-4">
      {edit && editable && (
        <form onSubmit={handleSubmit}>
          <input
            type={type}
            value={newValue}
            onKeyDown={handleKeyPress}
            className="rounded-l-lg m-0 border-t border-b border-l text-primary border-gray-200 bg-white"
            onChange={(e) => {
              setNewValue(e.target.value);
            }}
          ></input>
          <button
            onClick={handleSubmit}
            className="px-4 py-3 rounded-r-lg -ml-1 bg-primary text-white uppercase border-t border-b border-r"
          >
            save
          </button>
        </form>
      )}
      {!edit && (
        <div className="flex justify-start items-center">
          <div>{value}</div>
          {editable && (
            <a
              className="h-8 w-8 pl-4 inline-block"
              onClick={() => setEdit(true)}
            >
              <img src="/svg/pencil.svg" className="h-8 w-8" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default EditInput;
