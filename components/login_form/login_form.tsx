import { useState } from "react";

type Props = {
  register?: boolean;
};

const SignInSignUpForm = ({ register }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.info(
      "Data is: ",
      JSON.stringify({ email: email, username: username, password: password })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {register && (
        <div>
          <label>Username</label>
          <input
            type="text"
            className="u-full-width"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
      )}
      <div>
        <label>Email</label>
        <input
          type="email"
          className="u-full-width"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          className="u-full-width"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button className="button-primary" type="submit">
        Register
      </button>
    </form>
  );
};

export default SignInSignUpForm;
