import Link from "next/link";
import React from "react";
import { Player } from "../hooks/usePlayers";

type SearchItemProps = {
  player: Player;
};

const SearchItem = ({ player }: SearchItemProps) => (
  <Link href={`/player/${player.id}`}>
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
      <div className="pr-2">
        <button className="text-md border rounded-lg p-2 focus:outline-none appearance-none  hover:bg-primary hover:text-white">
          Support
        </button>
      </div>
    </div>
  </Link>
);

export default SearchItem;
