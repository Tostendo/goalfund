import { useState, useEffect } from "react";
import Link from "next/link";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout";
import Spinner from "../components/spinner";
import BasicInfo from "../components/basicInfo";
import FileUpload from "../components/fileUpload";
import PlayerName from "../components/playerName";
import { PlayersProvider } from "../hooks/usePlayers";
import Donations from "../components/userPledges";
import {
  deleteDonation,
  getUserDonations,
  getPlayerDonations,
} from "../api/donations";
import Icon from "../components/icon";
import {
  getCachedPlayerById,
  getPlayerById,
  updatePlayer,
} from "../api/players";
import { Player } from "../models/player";

const Dashboard = () => {
  const router = useRouter();
  const auth = useRequireAuth();
  const playerId = auth.user && auth.user.playerId;
  const [tab, setTab] = useState("to");
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const profileTab = router.query.profile_tab as string;
    if (profileTab) {
      setTab(profileTab);
    }
  });

  useEffect(() => {
    if (playerId) {
      getCachedPlayerById(playerId)
        .then((data) => {
          setPlayer(data);
        })
        .then(() => getPlayerById(playerId))
        .then((liveData) => {
          setPlayer(liveData);
        });
    }
  }, [auth.user]);

  const handleSelect = (tab: string) => {
    setTab(tab);
    Router.push({
      query: {
        profile_tab: tab,
      },
    });
  };

  const renderTab = (tabName: string, tabValue: string) => {
    return (
      <div
        className={`w-1/2 md:w-20 rounded-full mr-1 py-2 px-4 border-2 border-grey10 text-sm text-center text-grey100 cursor-pointer ${
          tab === tabValue ? "bg-white" : "bg-grey10"
        }`}
        onClick={() => handleSelect(tabValue)}
      >
        {tabName}
      </div>
    );
  };

  const renderPlayerInfo = (playerId: string) => {
    return (
      <div className="flex justify-between items-end">
        <div>
          <PlayerName playerId={playerId} />
        </div>
        <div className="h-4 w-4">
          <Icon type="chevronRight" />
        </div>
      </div>
    );
  };

  const renderVerificationReminder = () => {
    return (
      <div className="shadow-lg text-white font-bold p-4 bg-red-600">
        <div className="flex items-center justify-between">
          <div>Please verify your email</div>
          <div>
            <button onClick={() => auth.sendVerificationMail()}>
              Send mail again
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderFileUpload = (thePlayer: Player) => {
    return (
      <FileUpload
        editable={auth.user?.playerId == thePlayer.id}
        imageUrl={
          thePlayer.image.length ? thePlayer.image[0].url : "/img/avatar.png"
        }
        onSuccess={(value: string) =>
          updatePlayer(thePlayer.id, { image: value }).then((newPlayer) =>
            setPlayer({
              ...thePlayer,
              ...newPlayer,
            })
          )
        }
        imageClassName="h-32 w-auto inline-block rounded-full"
      />
    );
  };

  return (
    <div className="py-8">
      {auth.user && !auth.user.emailVerified
        ? renderVerificationReminder()
        : null}
      {auth.user ? (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 p-4 md:px-0 m-4">
          <div className="shadow-lg flex flex-col gap-0 w-full sm:w-96 md:w-64">
            <div className="bg-accent h-32 relative">
              {playerId && player && (
                <div className="absolute mt-10 left-0 right-0 mx-auto text-center rounded-full">
                  {renderFileUpload(player)}
                </div>
              )}
            </div>
            <div className="pt-8">
              <BasicInfo
                data={{
                  username: auth.user.username,
                  email: auth.user.email,
                }}
                onUpdate={auth.update}
              />
            </div>
            {playerId && (
              <div className="p-4">
                <label className="text-xs text-grey100">
                  My player profile
                </label>
                {player ? (
                  <Link href={`/player/${player.slug}`}>
                    <div className="cursor-pointer">
                      {renderPlayerInfo(auth.user.playerId)}
                    </div>
                  </Link>
                ) : (
                  renderPlayerInfo(auth.user.playerId)
                )}
              </div>
            )}
          </div>
          <div className="w-full">
            <h2 className="text-primary">Pledges</h2>
            {playerId && (
              <div className="flex pt-2 w-min-full">
                {renderTab("From", "from")}
                {renderTab("To", "to")}
              </div>
            )}
            {tab === "to" && (
              <div className="py-4">
                <Donations
                  fetchId={auth.user.uid}
                  type="to"
                  handleFetch={getUserDonations}
                  handleDelete={deleteDonation}
                />
              </div>
            )}
            {tab === "from" && (
              <div className="py-4">
                <Donations
                  fetchId={auth.user.playerId}
                  type="from"
                  handleFetch={getPlayerDonations}
                />
              </div>
            )}
          </div>
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
