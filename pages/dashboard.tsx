import { useRequireAuth } from "../hooks/useRequireAuth";
import Layout from "../components/layout";
import Spinner from "../components/spinner";

const DashboardPage = () => {
  const auth = useRequireAuth();
  return (
    <Layout>
      {!auth?.user?.emailVerified ? (
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
      <div className="shadow-lg my-8 mx-4 py-8 px-4">
        <h2>
          {auth.user?.username ? (
            `Welcome, ${auth.user.username}!`
          ) : (
            <Spinner />
          )}
        </h2>
      </div>
    </Layout>
  );
};

export default DashboardPage;
