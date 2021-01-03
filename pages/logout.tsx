import { useEffect, useState } from "react";
import Router from "next/router";

import { useAuth } from "../hooks/useAuth";

import Layout from "../components/layout";

const LoginPage = () => {
  const auth = useAuth();
  const [error, setError] = useState(null);
  useEffect(() => {
    const asyncLogout = async () => {
      auth
        .signOut()
        .then(() => Router.push("/"))
        .catch((e: any) => {
          console.error(e);
          setError(e);
        });
    };
    asyncLogout();
  }, [auth.user]);
  return (
    <Layout>
      <div className="mt-8 sm:mt-20 text-center">Logging out...</div>
      {error && <p>{error}</p>}
    </Layout>
  );
};
export default LoginPage;
