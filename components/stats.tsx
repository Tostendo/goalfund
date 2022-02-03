import React from "react";
import { Player } from "../models/player";
import { MONEY_FORMAT } from "../helpers/formatter";
import StatsItem from "./statsItem";

type StatsProps = {
  player: Player;
};

const Stats = ({ player }: StatsProps) => {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <StatsItem
        data={MONEY_FORMAT.format(player.money)}
        label="Money raised"
        icon="euro"
      />
      <StatsItem data={player.goals} label="Goals" icon="goal" />
      <StatsItem data={player.appearances} label="Appearances" icon="showUp" />
      <StatsItem
        data={player.minutesPlayed}
        label="Minutes played"
        icon="clock"
      />
    </div>
  );
};

export default Stats;
