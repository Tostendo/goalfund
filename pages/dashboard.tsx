import { useState, useEffect } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout";
import Spinner from "../components/spinner";
import BasicInfo from "../components/basicInfo";
import PlayerInfo from "../components/playerInfo";
import { PlayersProvider } from "../hooks/usePlayers";
import UserPledgesInfo from "../components/userPledgesInfo";

const Dashboard = () => {
  const router = useRouter();
  const auth = useRequireAuth();
  const [tab, setTab] = useState("general");
  const unselectedCss = "inline-block py-2 px-4";
  const selectedCss =
    "inline-block font-bold py-2 px-4 border-b-4 border-primary";

  useEffect(() => {
    const profileTab = router.query.profile_tab as string;
    if (profileTab) {
      setTab(profileTab);
    }
  });

  const handleSelect = (tab: string) => {
    setTab(tab);
    Router.push({
      query: {
        profile_tab: tab,
      },
    });
  };

  const renderTabContent = () => {
    switch (tab) {
      case "general":
        return (
          <BasicInfo
            data={{ username: auth.user.username, email: auth.user.email }}
            onUpdate={auth.update}
          />
        );
      case "pledges":
        return <UserPledgesInfo pledgerId={auth.user.uid} />;
      case "player":
        return <PlayerInfo playerId={auth.user.playerId} />;
    }
  };

  const renderTab = (tabName: string, tabValue: string) => {
    return (
      <li className="mr-1">
        <a
          className={tab === tabValue ? selectedCss : unselectedCss}
          onClick={() => handleSelect(tabValue)}
        >
          {tabName}
        </a>
      </li>
    );
  };

  return (
    <div>
      {auth.user && !auth.user.emailVerified ? (
        <div className="shadow-lg text-primary font-bold p-4 m-4 bg-warning">
          <div className="flex items-center justify-between">
            <div>Please verify your email</div>
            <div>
              <button onClick={() => auth.sendVerificationMail()}>
                Send mail again
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {auth.user ? (
        <div className="shadow-lg bg-white m-6 p-6">
          <div className="profile-tab-navigation my-4">
            <ul className="list-reset flex border-b">
              {renderTab("General", "general")}
              {renderTab("Pledges", "pledges")}
              {auth.user.playerId && renderTab("Player", "player")}
            </ul>
          </div>
          {renderTabContent()}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const DashboardPage = () => {
  return (
    <PlayersProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </PlayersProvider>
  );
};
export default DashboardPage;
