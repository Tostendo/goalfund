import React from "react";
import Layout from "../components/layout";
import { Player, searchPlayers, getPlayersByIds } from "../api/players";
import { getTopPlayersByDonation } from "../api/adminDonations";
import Ranking from "../components/ranking";

type TopListsProps = {
  topGoals: Player[];
  topDonations: (Player & { numberOfDonations: number })[];
};

type HeadlineProps = {
  headline: string;
};

const Headline = ({ headline }: HeadlineProps) => (
  <div className="text-2xl text-center text-primary mb-8 mt-16">{headline}</div>
);

const TopLists = ({ topGoals, topDonations }: TopListsProps) => {
  return (
    <Layout>
      <Headline headline="Most goals" />
      <Ranking type="mostGoals" entries={topGoals} />
      <Headline headline="Most donors" />
      <Ranking type="mostDonations" entries={topDonations} />
    </Layout>
  );
};

export default TopLists;

export async function getStaticProps() {
  const topGoals = await searchPlayers({ sortBy: "goals:DESC", limit: 5 });
  const top5Donations = await getTopPlayersByDonation();
  const players = await getPlayersByIds(
    top5Donations.map((player) => player.playerId)
  );
  const topDonations = players.map((player: Player, index: string | number) => {
    return {
      ...player,
      numberOfDonations:
        (top5Donations[index] && top5Donations[index].count) || 0,
    };
  });
  return {
    props: {
      topGoals,
      topDonations,
    },
  };
}
