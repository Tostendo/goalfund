import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import { RWebShare } from "react-web-share";
import { useAuth } from "../../hooks/useAuth";

import {
  getPlayerById,
  getPlayerBySlugWithDonations,
  getAllPlayerSlugs,
  updatePlayer,
} from "../../api/players";
import { Player } from "../../models/player";
import PledgeButton from "../../components/pledgeButton";
import EditInput from "../../components/editInput";
import Stats from "../../components/stats";
import Link from "next/link";
import Icon from "../../components/icon";
import { trackPlayerShare } from "../../api/share";
import { getMetaDescription } from "../../helpers/seo";
import ConnectButton from "../../components/connectButton";

type PlayerProfileProps = {
  player: Player;
};

export default function PlayersProfilPage({ player }: PlayerProfileProps) {
  const auth = useAuth();
  const [update, setUpdate] = useState(player);
  useEffect(() => {
    if (auth.user?.playerId == update.id) {
      getPlayerById(player.id).then((player) => {
        setUpdate({
          ...update,
          ...player,
        });
      });
    }
  }, [auth.user]);
  const title = `${update.name} | ${update.team?.name}`;
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="ogtitle" />
        <meta
          property="og:description"
          content={getMetaDescription(update.name)}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={
            update.image && update.image.length
              ? update.image[0].url
              : "/public/logo.png"
          }
          key="ogimage"
        />
      </Head>
      <div className="shadow-lg bg-white my-8 mx-4 py-8 px-4">
        <div className="flex justify-between md:justify-end gap-x-2">
          <PledgeButton pledgeForId={update.id} />
          <ConnectButton playerId={update.id} />
          <RWebShare
            data={{
              text: `Donate to ${update.name}!`,
              title: "Share player profile",
              url: typeof window !== "undefined" ? window.location.href : "",
            }}
            onClick={(data) => {
              trackPlayerShare(update);
            }}
          >
            <div className="p-2 cursor-pointer flex bg-primary text-white font-bold rounded-lg">
              <div className="pr-2">Share</div>
              <div className="h-6 w-6">
                <Icon type="share" />
              </div>
            </div>
          </RWebShare>
        </div>
        <div className="grid grid-cols-2 gap-8 items-center justify-center">
          <div className="col-span-2 md:col-span-1 py-8 md:py-0 relative justify-center md:justify-end flex">
            <img
              src={
                update.image.length ? update.image[0].url : "/img/avatar.png"
              }
              alt="placeholder"
              className="inline-block h-64 w-auto rounded-3xl md:rounded-none"
            ></img>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col">
            <div className="p-2">
              <label className="text-xs">Name</label>
              <div>{`${update.name}`}</div>
            </div>
            <div className="p-2">
              <label className="text-xs">Team</label>
              {update.team ? (
                <Link href={`/teams/${update.team.slug}`}>
                  <div>
                    <a>{`${update.team.name}`}</a>
                  </div>
                </Link>
              ) : (
                "-"
              )}
            </div>
            <div className="p-2">
              <label className="text-xs">Position</label>
              <EditInput
                type="text"
                value={update.position || "-"}
                editable={auth.user?.playerId == update.id}
                onSave={(value: string) =>
                  updatePlayer(update.id, { position: value }).then((player) =>
                    setUpdate({
                      ...update,
                      ...player,
                    })
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
                    setUpdate({
                      ...update,
                      ...player,
                    })
                  )
                }
              ></EditInput>
            </div>
          </div>
        </div>
        <div className="my-8 flex flex-col items-center">
          <h2 className="my-4">My season stats</h2>
          <Stats player={update} />
        </div>
        <div className="my-8 md:hidden text-center">
          <PledgeButton pledgeForId={update.id} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  try {
    const player = await getPlayerBySlugWithDonations(params.slug);
    return {
      props: {
        player,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const allSlugs = await getAllPlayerSlugs();
  const paths = allSlugs.map((slugData: string) => {
    return {
      params: {
        slug: slugData,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
