import { useAuth } from "../hooks/useAuth";

import Layout from "../components/layout";
import SignInSignUpForm from "../components/login_form";

const LoginPage = () => {
  const auth = useAuth();
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-16 mt-8 sm:mt-20">
        <div className="col-span-2 sm:col-span-1">
          <img
            src="/img/goalfund_full_logo.png"
            className="w-full h-auto sm:h-64 sm:w-auto"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <SignInSignUpForm label="Login" onSubmit={auth.signIn} />
        </div>
      </div>
    </Layout>
  );
};
export default LoginPage;
