import React, { useState } from "react";
import Layout from "../../components/layout";
import { useAuth } from "../../hooks/useAuth";

import {
  getPlayerById,
  getAllPlayerIds,
  Player,
  updatePlayer,
} from "../../api/players";
import DonateButton from "../../components/donateButton";
import EditInput from "../../components/editInput";
import Stats from "../../components/stats";

type PlayerProfileProps = {
  player: Player;
};

export default function PlayersProfilPage({ player }: PlayerProfileProps) {
  const auth = useAuth();
  const [update, setUpdate] = useState(player);
  return (
    <Layout>
      <div className="shadow-lg bg-white my-8 mx-4 py-8 px-4">
        <div className="grid grid-cols-2 items-center justify-center">
          <div className="col-span-2 md:col-span-1 relative h-64 w-full md:w-64">
            <img
              src={
                update.image.length ? update.image[0].url : "/img/avatar.png"
              }
              alt="placeholder"
              className="h-full rounded-full block"
            ></img>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col">
            <div className="p-2">
              <label className="text-xs">Name</label>
              <div>{`${update.name}`}</div>
            </div>
            <div className="p-2">
              <label className="text-xs">Team</label>
              <div>{update.team ? `${update.team.name}` : "-"}</div>
            </div>
            <div className="p-2">
              <label className="text-xs">Position</label>
              <EditInput
                type="text"
                value={update.position || "-"}
                editable={auth.user?.playerId == update.id}
                onSave={(value: string) =>
                  updatePlayer(update.id, { position: value }).then((player) =>
                    setUpdate(player)
                  )
                }
              ></EditInput>
            </div>
            <div className="p-2">
              <label className="text-xs">Strong leg</label>
              <EditInput
                type="text"
                value={update.strongLeg || "-"}
                editable={auth.user?.playerId == update.id}
                onSave={(value: string) =>
                  updatePlayer(update.id, { strongLeg: value }).then((player) =>
                    setUpdate(player)
                  )
                }
              ></EditInput>
            </div>
          </div>
        </div>
        <div className="my-8">
          <h2 className="my-4">About me</h2>
          <EditInput
            type="textarea"
            value={update.description || "-"}
            editable={auth.user?.playerId == update.id}
            onSave={(value: string) =>
              updatePlayer(update.id, { description: value }).then((player) =>
                setUpdate(player)
              )
            }
          ></EditInput>
        </div>
        <div className="my-8">
          <h2 className="my-4">My season stats</h2>
          <Stats stats={update.stats} type="big" />
        </div>
        <div className="my-8">
          <DonateButton donateForId={update.id} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const player = await getPlayerById(params.id);
  return {
    props: {
      player,
    },
  };
}

export async function getStaticPaths() {
  const paths = (await getAllPlayerIds()).map((id: string) => {
    return {
      params: {
        id: id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
