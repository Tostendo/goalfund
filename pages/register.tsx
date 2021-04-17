import Layout from "../components/layout";
import SignInSignUpForm from "../components/loginForm";
const SignUpPage = () => {
  return (
    <Layout>
      <div>
        <div className="p-8 grid grid-cols-2 gap-16 mt-8 sm:mt-20">
          <div className="col-span-2 sm:col-span-1">
            <img
              src="/img/goalfund_full_logo.png"
              className="w-full h-auto sm:h-64 sm:w-auto"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SignInSignUpForm register />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default SignUpPage;
