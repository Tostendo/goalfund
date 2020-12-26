import React from "react";

import EditInput from "./editInput";

const BasicInfo = ({ data }) => (
  <div className="my-4 data-table">
    <div className="px-3 py-4 flex justify-start">
      <table className="md:w-2/3 table-fixed rounded mb-4">
        <tbody>
          {Array.from(new Map(Object.entries(data))).map(
            ([key, value]: [string, string]) => {
              return (
                <tr className="px-4 border-b hover:bg-gray-100">
                  <td className="w-1/3 py-3">{key}</td>
                  <td className="w-2/3 py-3">
                    <EditInput
                      editable
                      type="text"
                      value={value}
                      onSave={(value: string) => console.log(value)}
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
