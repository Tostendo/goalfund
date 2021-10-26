import { useEffect, useState } from "react";
import { MONEY_FORMAT } from "../helpers/formatter";
import { getDonationStatistics, PledgeStats } from "../api/donations";
import StatsItem from "./statsItem";
import Spinner from "./spinner";

type StatsOverviewProps = {
  donorId: string;
  playerId: string;
};

const StatsOverview = (props: StatsOverviewProps) => {
  const [stats, setStats] = useState<PledgeStats>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDonationStatistics(props.donorId, props.playerId)
      .then((response: PledgeStats) => setStats(response))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="text-primary">Overview</h2>
      {loading && <Spinner />}
      {stats && stats.numberOfPledges && (
        <div className="w-full">
          <h4 className="font-bold mb-2">Donor stats</h4>
          <div className="flex flex-col lg:flex-row lg:grid-cols-3 gap-4">
            <StatsItem
              data={stats.numberOfPledges}
              label="Pledges"
              icon="people"
            />
            <StatsItem
              data={MONEY_FORMAT.format(stats.donorOpenPledges)}
              label="Total open pledges"
              icon="money"
            />
            <StatsItem
              data={MONEY_FORMAT.format(stats.donorPaidPledges)}
              label="Already paid"
              icon="card"
            />
          </div>
        </div>
      )}
      {stats && stats.numberOfPledgers && (
        <div>
          <h4 className="font-bold mb-2">Player stats</h4>
          <div className="grid flex-col lg:flex-row lg:grid-cols-3 gap-4">
            <StatsItem
              data={stats.numberOfPledgers}
              label="Pledges on me"
              icon="people"
            />
            <StatsItem
              data={MONEY_FORMAT.format(stats.playerPledgePerGoal)}
              label="Money per goal"
              icon="money"
            />
            <StatsItem
              data={MONEY_FORMAT.format(stats.playerOpenPledges)}
              label="Money raised"
              icon="card"
            />
            <StatsItem
              data={MONEY_FORMAT.format(stats.playerPaidPledges)}
              label="Already collected"
              icon="card"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsOverview;
