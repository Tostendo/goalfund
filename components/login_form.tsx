import { useState } from "react";
import Router from "next/router";
import Spinner from "./spinner";

type Props = {
  register?: boolean;
  onSubmit: Function;
  label: string;
};

const SignInSignUpForm = ({ register, onSubmit, label }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const data = { email: email, username: username, password: password };
    return onSubmit(data).then((response: any) => {
      response.error ? setError(response.error) : Router.push("/dashboard");
      setIsLoading(false);
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
      <div className="grid grid-cols-2 items-center">
        <div className="col-span-1">
          {!isLoading ? (
            <button className="button-primary" onClick={handleSubmit}>
              {label}
            </button>
          ) : (
            <Spinner />
          )}
        </div>
        {!register && (
          <div className="col-span-1 text-right">
            <a href="/reset-password">Forgot your password?</a>
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
