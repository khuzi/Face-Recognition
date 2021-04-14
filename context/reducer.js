import Router from "next/router";

import { SETUSER, SIGNIN, SIGNUP, SIGNOUT } from "./actions";

const onSubmitSignIn = async (signInEmail, signInPassword) => {
  const response = await fetch("http://localhost:3000/signin", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: signInEmail,
      password: signInPassword,
    }),
  });
  const data = await response.json();
  if (data.message === "success") {
    localStorage.setItem("user", JSON.stringify(data.user));
    Router.push("/");
  }
  return { user: data.user, isSignedIn: true };
};

const onSignout = () => {
  localStorage.clear();
  Router.push("/signin");
  return { user: null, isSignedIn: false };
};

const onSubmitSignUp = async (email, password, name) => {
  const response = await fetch("http://localhost:3000/register", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
  const data = await response.json();

  if (data.message === "success") {
    localStorage.setItem("user", JSON.stringify(data.user));
    Router.push("/");
  }
  return { user: data.user, isSignedIn: true };
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case SETUSER:
      return { isSignedIn: true, user: action.payload };
    case SIGNIN:
      const { email, password } = action.payload;
      return onSubmitSignIn(email, password);
    case SIGNUP:
      return onSubmitSignUp(
        action.payload.email,
        action.payload.password,
        action.payload.name
      );

    case SIGNOUT:
      return onSignout();
    default:
      return state;
  }
};
