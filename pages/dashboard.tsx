import { useRequireAuth } from "../hooks/useRequireAuth";
import Layout from "../components/layout/layout";
import Spinner from "../components/spinner/spinner";

const DashboardPage = () => {
  const auth = useRequireAuth();
  console.info("auth user: ", auth.user);
  return (
    <Layout>
      {!auth.user?.emailVerified ? (
        <div className="warning">
          <div className="center justify-between">
            <div>Please verfiy your email</div>
            <div>
              <button onClick={() => auth.sendVerificationMail()}>
                Send mail again
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="card">
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
