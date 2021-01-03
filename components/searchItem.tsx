import Link from "next/link";
import React from "react";
import { Player } from "../api/players";
import CustomButton from "./primaryButton";

type SearchItemProps = {
  player: Player;
  onConnect: Function;
  onDonate: Function;
};

const SearchItem = ({ player, onConnect, onDonate }: SearchItemProps) => (
  <Link href={`/playerProfile/${player.id}`}>
    <div className="flex items-center justify-between cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-gray-200">
      <div className="flex w-full items-center p-2">
        <div className="flex-col items-center">
          <div className="flex bg-orange-500 justify-center items-center m-2 w-8 h-8 rounded-full">
            <img className="rounded-full" alt="A" src={player.imageUrl} />
          </div>
        </div>
        <div className="w-full">
          <div className="mx-4">
            {`${player.firstName} ${player.lastName}`}
            <div className="text-xs truncate w-full normal-case font-body -mt-1 text-gray-500">
              {player.clubName}
            </div>
          </div>
        </div>
      </div>
      <div className="pr-2 flex">
        {onDonate && <CustomButton type="primary" label="Donate" />}
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

export default SearchItem;