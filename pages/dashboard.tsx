import { useState } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Layout from "../components/layout";
import Spinner from "../components/spinner";
import BasicInfo from "../components/basicInfo";
import PlayerInfo from "../components/playerInfo";
import { PlayersProvider } from "../hooks/usePlayers";
import UserPledgesInfo from "../components/userPledgesInfo";

const Dashboard = () => {
  const auth = useRequireAuth();
  const [index, setIndex] = useState(0);
  const unselectedCss = "inline-block py-2 px-4";
  const selectedCss =
    "inline-block font-bold py-2 px-4 border-b-4 border-primary";
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
              <li className="-mb-px mr-1">
                <a
                  className={index == 0 ? selectedCss : unselectedCss}
                  onClick={() => setIndex(0)}
                >
                  General
                </a>
              </li>
              <li className="mr-1">
                <a
                  className={index == 1 ? selectedCss : unselectedCss}
                  onClick={() => setIndex(1)}
                >
                  Pledges
                </a>
              </li>
              {auth.user.playerId && (
                <li className="mr-1">
                  <a
                    className={index == 2 ? selectedCss : unselectedCss}
                    onClick={() => setIndex(2)}
                  >
                    Player
                  </a>
                </li>
              )}
            </ul>
          </div>
          {index == 0 && (
            <BasicInfo
              data={{ username: auth.user.username, email: auth.user.email }}
              onUpdate={auth.update}
            />
          )}
          {index == 1 && <UserPledgesInfo pledgerId={auth.user.uid} />}
          {index == 2 && auth.user.playerId && (
            <PlayerInfo playerId={auth.user.playerId} />
          )}
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
