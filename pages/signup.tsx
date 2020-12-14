import { useAuth } from "../hooks/useAuth";

import Layout from "../components/layout/layout";
import SignInSignUpForm from "../components/login_form/login_form";
const SignUpPage = () => {
  const auth = useAuth();
  return (
    <Layout center>
      <div>
        <div className="row">
          <div className="offset-by-one four columns">
            <img src="/img/goalfund_full_logo.png" width="100%" />
          </div>
          <div className="offset-by-one five columns">
            <SignInSignUpForm
              register
              label="Register"
              onSubmit={auth.signUp}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default SignUpPage;
