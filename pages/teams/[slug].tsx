import React, { useState } from "react";
import Layout from "../../components/layout";
import { MONEY_FORMAT } from "../../helpers/formatter";

import { getAllTeamSlugs, getTeamBySlug } from "../../api/teams";
import { ITeam } from "../../models/team";
import Link from "next/link";
import _ from "lodash";
import Icon from "../../components/icon";

type TeamProfileProps = {
  team: ITeam;
};

enum SortMethod {
  MONEY_DESC,
  MONEY_ASC,
  GOALS_DESC,
  GOALS_ASC,
}

export default function TeamsProfilePage({ team }: TeamProfileProps) {
  const [players, setPlayers] = useState(team.players);
  const [sort, setSort] = useState(SortMethod.MONEY_DESC);
  const getLogoUrl = () => {
    if (team.logo) {
      return team.logo.url;
    }
    if (team.externalLogoUrl) {
      return team.externalLogoUrl;
    }
    return "https://picsum.photos/200";
  };

  const sortPlayers = (criteria: SortMethod) => {
    setSort(criteria);
    switch (criteria) {
      case SortMethod.MONEY_DESC:
        setPlayers(_.orderBy(players, ["money"], ["desc"]));
        break;
      case SortMethod.MONEY_ASC:
        setPlayers(_.orderBy(players, ["money"], ["asc"]));
        break;
      case SortMethod.GOALS_DESC:
        setPlayers(_.orderBy(players, ["goals"], ["desc"]));
        break;
      case SortMethod.GOALS_ASC:
        setPlayers(_.orderBy(players, ["goals"], ["asc"]));
        break;
      default:
        setPlayers(_.orderBy(players, ["money"], ["desc"]));
    }
  };

  return (
    <Layout>
      <div className="shadow-lg bg-white my-8 mx-4 py-8 px-4">
        <div className="flex flex-col items-center">
          <div className="relative h-24 w-24">
            <img
              src={getLogoUrl()}
              alt="placeholder"
              className="rounded-full block h-full w-full"
            ></img>
          </div>
          <h2>{team.name}</h2>
        </div>
        <div className="mt-16 grid md:grid-cols-1 gap-4">
          <div>
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-secondary text-primary uppercase text-sm leading-normal">
                  <th className="hidden sm:inline-block py-3 px-2 text-left">
                    Rank
                  </th>
                  <th className="py-3 px-2 text-left">Name</th>
                  <th
                    onClick={() =>
                      sortPlayers(
                        sort === SortMethod.GOALS_DESC
                          ? SortMethod.GOALS_ASC
                          : SortMethod.GOALS_DESC
                      )
                    }
                    className="py-3 px-2 cursor-pointer"
                  >
                    <div className="flex justify-center">
                      <div>Goals</div>
                      {sort === SortMethod.GOALS_DESC ||
                      sort === SortMethod.GOALS_ASC ? (
                        <div className="h-5 w-5">
                          {sort === SortMethod.GOALS_DESC ? (
                            <Icon type="arrowUp" />
                          ) : (
                            <Icon type="arrowDown" />
                          )}
                        </div>
                      ) : (
                        <div className="h-5 w-5">
                          <Icon type="dots" />
                        </div>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() =>
                      sortPlayers(
                        sort === SortMethod.MONEY_DESC
                          ? SortMethod.MONEY_ASC
                          : SortMethod.MONEY_DESC
                      )
                    }
                    className="py-3 px-2 text-center cursor-pointer"
                  >
                    <div className="flex justify-center">
                      <div>Raised</div>
                      {sort === SortMethod.MONEY_DESC ||
                      sort === SortMethod.MONEY_ASC ? (
                        <div className="h-5 w-5">
                          {sort === SortMethod.MONEY_DESC ? (
                            <Icon type="arrowUp" />
                          ) : (
                            <Icon type="arrowDown" />
                          )}
                        </div>
                      ) : (
                        <div className="h-5 w-5">
                          <Icon type="dots" />
                        </div>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-primary text-sm font-light">
                {players.map((player, index) => {
                  return (
                    <tr
                      key={player.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="hidden sm:inline-block py-3 px-2 text-center">
                        <div>{index + 1}</div>
                      </td>
                      <td className="py-3 px-2 text-left">
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full hidden md:inline"
                              src={
                                player.image.length
                                  ? player.image[0].url
                                  : "/img/avatar.png"
                              }
                            />
                          </div>
                          <Link href={`/player/${player.slug}`}>
                            <a>{player.name}</a>
                          </Link>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div>{player.goals}</div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div>{MONEY_FORMAT.format(player.money)}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
