import React from "react";

import EditInput from "./editInput";

type BasicInfoData = {
  data: object;
  onUpdate: Function;
};

const BasicInfo = ({ data, onUpdate }: BasicInfoData) => (
  <div className="p-6 w-full flex flex-col items-center">
    <EditInput
      classes="text-xl font-bold"
      editable
      type="text"
      value={data["username"]}
      onSave={(value: string) => onUpdate({ ["username"]: value })}
    />
    <div className="text-primary text-md">{data["email"]}</div>
  </div>
);

export default BasicInfo;
