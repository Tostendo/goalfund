import React from "react";

import EditInput from "./editInput";

type BasicInfoData = {
  data: object;
  onUpdate: Function;
};

const translations = {
  username: "Username",
  email: "E-Mail",
};

const BasicInfo = ({ data, onUpdate }: BasicInfoData) => (
  <div className="py-3 w-full md:w-2/3">
    {Array.from(new Map(Object.entries(data))).map(
      ([key, value]: [string, string]) => {
        return (
          <div
            key={key}
            className="p-2 border-b hover:bg-gray-100 grid grid-cols-3 md:gap-2 items-center"
          >
            <div className="col-span-3 md:col-span-1 text-xs md:text-base">
              {translations[key]}
            </div>
            <div className="col-span-3 md:col-span-2">
              <EditInput
                editable={key !== "email"}
                type="text"
                value={value}
                onSave={(value: string) => onUpdate({ [key]: value })}
              />
            </div>
          </div>
        );
      }
    )}
  </div>
);

export default BasicInfo;
