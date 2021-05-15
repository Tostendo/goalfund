import React from "react";
import Layout from "../../components/layout";
import { useAuth } from "../../hooks/useAuth";

import { getAllTeamSlugs, getTeamBySlug } from "../../api/teams";
import { ITeam } from "../../models/team";

type TeamProfileProps = {
  team: ITeam;
};

export default function TeamsProfilePage({ team }: TeamProfileProps) {
  return (
    <Layout>
      <div className="shadow-lg bg-white my-8 mx-4 py-8 px-4">
        <div className="grid grid-cols-2 items-center justify-center">
          <div className="col-span-2 md:col-span-1 relative h-64 w-full md:w-64">
            <img
              src={team.images.length ? team.images[0].url : "/img/avatar.png"}
              alt="placeholder"
              className="h-full rounded-full block"
            ></img>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col">
            <div className="p-2">
              <label className="text-xs">Name</label>
              <div>{`${team.name}`}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  try {
    const team = await getTeamBySlug(params.slug);
    return {
      props: {
        team,
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
  const allSlugs = await getAllTeamSlugs();
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
