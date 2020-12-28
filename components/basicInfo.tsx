import React from "react";
import firebase from "firebase";

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
  <div className="my-4 data-table">
    <div className="px-3 py-4 flex justify-start">
      <table className="md:w-2/3 table-fixed rounded mb-4">
        <tbody>
          {Array.from(new Map(Object.entries(data))).map(
            ([key, value]: [string, string]) => {
              return (
                <tr className="px-4 border-b hover:bg-gray-100">
                  <td className="w-1/3 py-3">{translations[key]}</td>
                  <td className="w-2/3 py-3">
                    <EditInput
                      editable
                      type="text"
                      value={value}
                      onSave={(value: string) => onUpdate({ [key]: value })}
                    />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default BasicInfo;
