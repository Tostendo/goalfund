import Link from "next/link";

import Layout from "../components/layout/layout";
import SignInSignUpForm from "../components/login_form/login_form";
const SignUpPage = () => {
  return (
    <Layout>
      <div>
        <div className="row">
          <div className="offset-by-one four columns">
            <img src="/img/goalfund_full_logo.png" width="100%" />
          </div>
          <div className="offset-by-one five columns">
            <SignInSignUpForm register />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default SignUpPage;
