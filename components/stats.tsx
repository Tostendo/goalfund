import React from "react";
import { Player } from "../models/player";
import { MONEY_FORMAT } from "../helpers/formatter";
import Icon from "./icon";

type StatsProps = {
  player: Player;
};

const Stats = ({ player }: StatsProps) => {
  function getStat(data: number | string, label: string, icon: string) {
    return (
      <div className="min-w-0 rounded-lg overflow-hidden bg-white border-2 border-primary">
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
  }

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {getStat(MONEY_FORMAT.format(player.money), "Money raised", "euro")}
      {getStat(player.goals, "Scored goals", "goal")}
      {getStat(player.appearances, "Appearances", "showUp")}
      {getStat(player.minutesPlayed, "Minutes played", "clock")}
    </div>
  );
};

export default Stats;
