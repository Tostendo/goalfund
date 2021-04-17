import React from "react";
import Layout from "../components/layout";
import { Player, searchPlayers } from "../api/players";
import Ranking from "../components/ranking";

type TopListsProps = {
  topGoals: Player[];
  minutesPlayed: Player[];
  appearances: Player[];
};

type HeadlineProps = {
  headline: string;
};

const Headline = ({ headline }: HeadlineProps) => (
  <div className="text-2xl text-center text-primary mb-8 mt-16">{headline}</div>
);

const TopLists = ({ topGoals, minutesPlayed, appearances }: TopListsProps) => {
  return (
    <Layout>
      <Headline headline="Most goals" />
      <Ranking type="mostGoals" entries={topGoals} />
      <Headline headline="Most minutes played" />
      <Ranking type="mostMinutesPlayed" entries={minutesPlayed} />
      <Headline headline="Most appearances" />
      <Ranking type="mostAppearances" entries={appearances} />
    </Layout>
  );
};

export default TopLists;

export async function getStaticProps() {
  const topGoals = await searchPlayers({ sortBy: "goals:DESC", limit: 5 });
  const minutesPlayed = await searchPlayers({
    sortBy: "minutesPlayed:DESC",
    limit: 5,
  });
  const appearances = await searchPlayers({
    sortBy: "appearances:DESC",
    limit: 5,
  });
  return {
    props: {
      topGoals,
      minutesPlayed,
      appearances,
    },
  };
}
