import React from "react";
import Layout from "../components/layout";
import { searchPlayers } from "../api/players";
import { Player } from "../models/player";
import {
  getTopPlayersByMoneyRaised,
  getTopPlayersByPledges,
} from "../api/adminDonations";
import Ranking from "../components/ranking";

type TopListsProps = {
  topGoals: Player[];
  topPlayersByPledges: (Player & { count: number; money: number })[];
  topPlayersByMoneyRaised: (Player & { count: number; money: number })[];
};

type HeadlineProps = {
  headline: string;
};

const Headline = ({ headline }: HeadlineProps) => (
  <div className="text-2xl text-center text-primary mb-8 mt-16">{headline}</div>
);

const TopLists = ({
  topGoals,
  topPlayersByPledges,
  topPlayersByMoneyRaised,
}: TopListsProps) => {
  return (
    <Layout>
      <Headline headline="Most money raised" />
      <Ranking type="mostMoneyRaised" entries={topPlayersByMoneyRaised} />
      <Headline headline="Most pledges" />
      <Ranking type="mostPledges" entries={topPlayersByPledges} />
      <Headline headline="Most goals" />
      <Ranking type="mostGoals" entries={topGoals} />
    </Layout>
  );
};

export default TopLists;

export async function getStaticProps() {
  const numberOfEntries = 10;
  const topGoals = await searchPlayers({
    sortBy: "goals:DESC",
    limit: numberOfEntries,
  });
  const topPlayersByPledges = await getTopPlayersByPledges(numberOfEntries);
  const topPlayersByMoneyRaised = await getTopPlayersByMoneyRaised(
    numberOfEntries
  );
  return {
    props: {
      topGoals,
      topPlayersByPledges,
      topPlayersByMoneyRaised,
    },
  };
}
