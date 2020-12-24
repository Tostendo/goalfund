import { useRequireAuth } from "../hooks/useRequireAuth";
import Layout from "../components/layout";
import Spinner from "../components/spinner";

const testdata = {
  username: "Master",
  fullName: "Peter Pan",
  email: "test@test.de",
};

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
        <div className="flex flex-col items-center">
          <div className="relative h-48 w-48">
            <img
              src="https://picsum.photos/200"
              alt="placeholder"
              className="rounded-full"
            ></img>
            <div className="absolute w-48 h-48 rounded-full bg-black text-center top-0 opacity-0 hover:opacity-25">
              <button className="opacity-100 text-white mt-12">Edit</button>
            </div>
          </div>
          <h2>
            {auth.user?.username ? (
              `Welcome, ${auth.user.username}!`
            ) : (
              <Spinner />
            )}
          </h2>
        </div>
        <div className="profile-tab-navigation my-4">
          <ul className="list-reset flex border-b">
            <li className="-mb-px mr-1">
              <a
                className="inline-block border-l border-t border-r rounded-t py-2 px-4"
                href="#"
              >
                Basic Info
              </a>
            </li>
            <li className="mr-1">
              <a className="bg-white inline-block py-2 px-4" href="#">
                Donations
              </a>
            </li>
            <li className="mr-1">
              <a className="bg-white inline-block py-2 px-4" href="#">
                Player's Info
              </a>
            </li>
          </ul>
        </div>
        <div className="my-4 data-table">
          <div className="px-3 py-4 flex justify-center">
            <table className="w-full rounded mb-4">
              <tbody>
                {Array.from(new Map(Object.entries(testdata))).map(
                  ([key, value]) => {
                    return (
                      <tr className="border-b hover:bg-gray-100">
                        <td className="py-3">{key}</td>
                        <td className="py-3">{value}</td>
                        <td className="py-3">
                          <button className="rounded border px-4 border-primary font-body">
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
