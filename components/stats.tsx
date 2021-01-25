import React from "react";
import Icon from "./icon";

const Stats = ({ stats, type }) => {
  function getStat(data: number, label: string, icon: string) {
    return (
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
        <div className="py-4 flex items-center">
          <div className="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
            <div className="h-6 w-6">
              <Icon type={icon} />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {label}
            </p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              {data || 0}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
      {getStat(stats.goals, "Scored goals", "goal")}
      {getStat(stats.show_ups, "Appearances", "showUp")}
      {getStat(stats.minutes_played, "Minutes played", "clock")}
    </div>
  );
};

export default Stats;
