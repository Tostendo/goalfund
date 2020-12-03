import Link from "next/link";

import Layout from "../components/layout/layout";
const SignUpPage = () => {
  return (
    <Layout>
      <div>
        <h2>Sign up</h2>
        <p>
          already have an account?{" "}
          <Link href="/login">
            <a href="/">Log in</a>
          </Link>
        </p>
        <div>Todo: Create Sign up form component and add here</div>
      </div>
    </Layout>
  );
};
export default SignUpPage;
