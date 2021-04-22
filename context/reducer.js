import Router from "next/router";
const Clarifai = require("clarifai");

import { SETUSER, SIGNIN, SIGNUP, SIGNOUT, SETURL, DETECT } from "./actions";

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

const app = new Clarifai.App({
  apiKey: "fc3cdca5cb1845c3851c5e58bfc6c73a",
});

const calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById("inputimage");
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - clarifaiFace.right_col * width,
    bottomRow: height - clarifaiFace.bottom_row * height,
  };
};

const displayFaceBox = (state, box) => {
  return { ...state, box: box };
};

const onButtonDetectSubmit = (faceState, authDispatch, authState) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, faceState.imageUrl)
    .then((response) => {
      console.log("hi", response);
      if (response) {
        fetch("http://localhost:3000/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: authState.user.id,
          }),
        })
          .then((response) => response.json())
          .then((count) => {
            authDispatch({
              type: SETUSER,
              payload: { ...authState.user, entries: count },
            });
          });
      }
      return displayFaceBox(calculateFaceLocation(faceState, response));
    })
    .catch((err) => console.log(err));
};

export const faceReducer = (state, action) => {
  switch (action.type) {
    case SETURL:
      return { ...state, imageUrl: action.payload };
    case DETECT:
      return onButtonDetectSubmit(state, action.authDispatch, action.authState);
    default:
      return state;
  }
};
