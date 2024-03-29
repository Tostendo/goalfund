import Link from "next/link";
import React from "react";
import { Player } from "../models/player";
import Icon from "./icon";
import PledgeButton from "./pledgeButton";
import { MONEY_FORMAT } from "../helpers/formatter";
import ConnectButton from "./connectButton";

type SearchItemProps = {
  player: Player;
};

const SearchItem = ({ player }: SearchItemProps) => {
  return (
    <Link href={`/player/${player.slug}`}>
      <div className="flex items-center justify-between cursor-pointer w-full border-gray-300 rounded-t border-b hover:bg-gray-300">
        <div className="flex w-full items-center p-2">
          <div className="flex-col items-center">
            <div className="flex bg-orange-500 justify-center items-center m-2 w-8 h-8 rounded-full">
              <img
                className="rounded-full"
                alt="A"
                src={
                  player.image.length ? player.image[0].url : "/img/avatar.png"
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="mx-4">
              <Link href={`/player/${player.slug}`}>{`${player.name}`}</Link>
              <div className="mb-2 gap-2 flex items-center text-xs truncate w-full">
                <div className="gap-1 flex items-center">
                  <div className="h-4 w-4 text-yellow-500">
                    <Icon type="goal" />
                  </div>
                  <div>{player.goals || 0}</div>
                </div>
                <div className="gap-1 items-center hidden sm:inline-flex">
                  <div className="h-4 w-4 text-green-500">
                    <Icon type="showUp" />
                  </div>
                  <div>{player.appearances || 0}</div>
                </div>
                <div className="gap-1 items-center hidden sm:inline-flex">
                  <div className="h-4 w-4">
                    <Icon type="clock" />
                  </div>
                  <div>{player.minutesPlayed || 0}</div>
                </div>
              </div>
              {player.teamName && (
                <div className="text-xs truncate w-full -mt-1 text-gray-500">
                  {player.teamName}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-2 flex flex-col md:flex-row">
          <PledgeButton pledgeForId={player.id} />
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
