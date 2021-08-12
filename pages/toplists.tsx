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
  subheadline?: string;
};

const Headline = ({ headline, subheadline }: HeadlineProps) => (
  <div className="text-primary text-center mb-8 mt-16">
    <div className="text-3xl font-bold">{headline}</div>
    {subheadline && <div className="text-md">{subheadline}</div>}
  </div>
);

const TopLists = ({
  topGoals,
  topPlayersByPledges,
  topPlayersByMoneyRaised,
}: TopListsProps) => {
  return (
    <Layout>
      <Headline
        headline="Most money raised"
        subheadline="Sum of payable and already paid pledges"
      />
      <Ranking type="mostMoneyRaised" entries={topPlayersByMoneyRaised} />
      <Headline headline="Most open pledges" />
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
