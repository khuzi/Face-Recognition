import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Signin() {
  const router = useRouter();
  const [state, setState] = useState({
    signInEmail: "",
    signInPassword: "",
  });

  const onEmailChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      signInEmail: event.target.value,
    }));
  };

  const onPasswordChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      signInPassword: event.target.value,
    }));
  };

  const onSubmitSignIn = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: state.signInEmail,
        password: state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          router.push("/");
        }
      })
      .catch((err) => {
        console.log("Error in signin", err);
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              className="f6 link dim black db pointer"
              onClick={() => router.push("/register")}
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
}
