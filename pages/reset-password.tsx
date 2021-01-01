import { useState } from "react";
import Router from "next/router";

import Layout from "../components/layout";
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
    <Layout>
      <div>
        <div className="grid grid-cols-2 gap-16 items-center mt-8 sm:mt-20">
          <div className="col-span-2 sm:col-span-1">
            <img
              src="/img/goalfund_full_logo.png"
              className="w-full sm:w-auto h-auto sm:h-64"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  className="w-full"
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
