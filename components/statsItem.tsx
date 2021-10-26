import React from "react";
import Icon from "./icon";

type StatsItemProps = {
  data: number | string;
  label: string;
  icon: string;
};

const StatsItem = ({ data, label, icon }: StatsItemProps) => {
  return (
    <div className="min-w-0 w-full rounded-lg overflow-hidden bg-white border-2 border-primary">
      <div className="p-3 flex items-start">
        <div className="p-2 rounded-full text-primary bg-primary30  mr-4">
          <div className="h-6 w-6">
            <Icon type={icon} />
          </div>
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-primary">{label}</p>
          <p className="text-lg font-semibold text-primary">{data || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsItem;
