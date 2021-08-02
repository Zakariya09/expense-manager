import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";

const Auth = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const userObj = {
      name,
      password,
    };

    dispatch({ type: "login", data: userObj });
  };
  return (
    <Fragment>
      <form
        onSubmit={submitHandler}
        style={{ textAlign: "center", marginTop: "10%" }}
      >
        <div>
          <input
            type="text"
            name="username"
            onChange={nameChangeHandler}
            value={name}
          />
        </div>
        <div>
          <input
            type="text"
            name="password"
            onChange={passwordChangeHandler}
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </Fragment>
  );
};
export default Auth;
