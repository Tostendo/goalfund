import { useState } from "react";
import Router from "next/router";

import Layout from "../components/layout/layout";
import { useAuth } from "../hooks/useAuth";

const ResetPassword = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    return auth.sendPasswordResetEmail({ email }).then(() => {
      Router.push("/login");
    });
  };

  return (
    <Layout center>
      <div>
        <div className="row">
          <div className="offset-by-one four columns">
            <img src="/img/goalfund_full_logo.png" width="100%" />
          </div>
          <div className="offset-by-one five columns">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  className="u-full-width"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
