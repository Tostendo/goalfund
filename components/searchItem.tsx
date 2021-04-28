import Link from "next/link";
import React from "react";
import { Player } from "../models/player";
import Icon from "./icon";
import CustomButton from "./customButton";
import DonateButton from "./donateButton";
import { MONEY_FORMAT } from "../helpers/formatter";

type SearchItemProps = {
  player: Player;
  onConnect: Function;
  onDonate: Function;
};

const SearchItem = ({ player, onConnect, onDonate }: SearchItemProps) => {
  return (
    <Link href={`/playerProfile/${player.slug}`}>
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
              <Link
                href={`/playerProfile/${player.slug}`}
              >{`${player.name}`}</Link>
              {player.stats && (
                <div className="mb-2 gap-2 flex items-center text-xs truncate w-full">
                  <div className="gap-1 flex items-center">
                    <div className="h-4 w-4">
                      <Icon type="euro" />
                    </div>
                    <div>{MONEY_FORMAT.format(player.money || 0)}</div>
                  </div>
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
              )}
              {player.team && (
                <div className="text-xs truncate w-full -mt-1 text-gray-500">
                  {player.team.name}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pr-2 flex">
          {onDonate && <DonateButton donateForId={player.id} />}
          {onConnect && (
            <CustomButton
              type="secondary"
              label="Connect"
              handleClick={() => onConnect(player.id)}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
