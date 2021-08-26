import { useState } from "react";
import Router, { useRouter } from "next/router";
import Spinner from "./spinner";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import CustomButton from "./customButton";

type Props = {
  register?: boolean;
};

const SignInSignUpForm = ({ register }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const redirectUrl = router.query.redirectUrl as string;

  const auth = useAuth();
  const onSubmit = register ? auth.signUp : auth.signIn;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    if (register && password !== confirm) {
      setIsLoading(false);
      setError({ message: "Passwords must be equal." });
      return;
    }
    const data = { email: email, username: username, password: password };
    return onSubmit(data).then((response: any) => {
      if (response.error) {
        setError(response.error);
        setIsLoading(false);
      } else {
        Router.push(redirectUrl ? redirectUrl : "/dashboard");
      }
    });
  };

  return (
    <form>
      {register && (
        <div>
          <label>Username</label>
          <input
            type="text"
            className="w-full"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
      )}
      <div>
        <label>Email</label>
        <input
          type="email"
          className="w-full"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          className="w-full"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      {register && (
        <div>
          <label>Confirm password</label>
          <input
            className="w-full"
            type="password"
            onChange={(e) => setConfirm(e.target.value)}
          ></input>
        </div>
      )}
      <div className="grid grid-cols-2 items-center">
        <div className="col-span-1">
          {!isLoading ? (
            <div>
              <CustomButton
                type="primary"
                label={register ? "Register" : "Login"}
                handleClick={handleSubmit}
              />
              {!register && (
                <span className="pl-2">
                  <Link
                    href={
                      redirectUrl
                        ? `/register?redirectUrl=${redirectUrl}`
                        : "/register"
                    }
                  >
                    Register
                  </Link>
                </span>
              )}
            </div>
          ) : (
            <Spinner />
          )}
        </div>
        {!register && (
          <div className="col-span-1 text-right">
            <Link href="/reset-password">Forgot your password?</Link>
          </div>
        )}
        {register && (
          <div className="col-span-1 text-right">
            <Link href="/login">Already have an account?</Link>
          </div>
        )}
      </div>
      {error?.message && (
        <div className="pt-4 text-red-400">
          <span>{error.message}</span>
        </div>
      )}
    </form>
  );
};

export default SignInSignUpForm;
