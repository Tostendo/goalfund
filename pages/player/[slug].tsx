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
import FileUpload from "../../components/fileUpload";
import CustomButton from "../../components/customButton";

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
      <div className="shadow-lg max-w-4xl mx-auto bg-white my-8 mx-4 py-8 px-4">
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
            <div className="px-4 py-3 cursor-pointer flex bg-white text-primary border-primary border-2 hover:bg-primary hover:text-white font-bold rounded-lg">
              <div className="pr-2">Share</div>
              <div className="h-6 w-6">
                <Icon type="share" />
              </div>
            </div>
          </RWebShare>
        </div>
        <div className="grid grid-cols-2 gap-8 items-center justify-center">
          <div className="col-span-2 md:col-span-1 pt-16 md:py-0 flex justify-center md:justify-end">
            <FileUpload
              editable={auth.user?.playerId == update.id}
              imageUrl={
                update.image.length ? update.image[0].url : "/img/avatar.png"
              }
              onSuccess={(value: string) =>
                updatePlayer(update.id, { image: value }).then((player) =>
                  setUpdate({
                    ...update,
                    ...player,
                  })
                )
              }
              imageClassName="h-96 w-auto inline-block rounded-full md:rounded-none"
            />
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
            {update.charity && (
              <div className="p-2">
                <label className="text-xs">Charity</label>
                {update.charity.images.length > 0 && (
                  <Link href={"/charities"}>
                    <img
                      src={update.charity.images[0].url}
                      alt="charity logo"
                      className="h-20 w-auto cursor-pointer"
                    />
                  </Link>
                )}
                {update.charity.images.length === 0 && (
                  <Link href={"/charities"}>
                    <div>{update.charity.name}</div>
                  </Link>
                )}
              </div>
            )}
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
        <div className="mx-auto text-center  my-8 flex flex-col">
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
