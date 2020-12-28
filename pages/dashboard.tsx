import { useState } from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import Layout from "../components/layout";
import Spinner from "../components/spinner";
import BasicInfo from "../components/basicInfo";

const DashboardPage = () => {
  const auth = useRequireAuth();
  const [index, setIndex] = useState(0);
  const unselectedCss = "inline-block py-2 px-4";
  const selectedCss =
    "inline-block py-2 px-4 border-t border-l border-r rounded";
  return (
    <Layout>
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
        <div className="shadow-lg bg-white my-8 mx-4 py-8 px-4">
          <div className="flex flex-col items-center">
            <div className="relative h-48 w-48">
              <img
                src="https://picsum.photos/200"
                alt="placeholder"
                className="rounded-full block"
              ></img>
              <a className="absolute w-48 h-48 rounded-full flex justify-center items-center bg-black text-center top-0 opacity-0 hover:opacity-25"></a>
            </div>
            <h2>{`Welcome, ${auth.user.username}!`}</h2>
          </div>
          <div className="profile-tab-navigation my-4">
            <ul className="list-reset flex border-b">
              <li className="-mb-px mr-1">
                <a
                  className={index == 0 ? selectedCss : unselectedCss}
                  onClick={() => setIndex(0)}
                >
                  Basic Info
                </a>
              </li>
              <li className="mr-1">
                <a
                  className={index == 1 ? selectedCss : unselectedCss}
                  onClick={() => setIndex(1)}
                >
                  Donations
                </a>
              </li>
              <li className="mr-1">
                <a
                  className={index == 2 ? selectedCss : unselectedCss}
                  onClick={() => setIndex(2)}
                >
                  Player's Info
                </a>
              </li>
            </ul>
          </div>
          {index == 0 && (
            <BasicInfo
              data={{ username: auth.user.username, email: auth.user.email }}
              onUpdate={auth.update}
            />
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default DashboardPage;
