import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { Logo, Rank, ImageLinkForm, FaceRecognition } from "../components";
import { useAuth, useFace } from "../context/globalstate";
import { SETUSER } from "../context/actions";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useAuth();
  if (typeof window === "undefined") {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  const isUser =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  if (!isUser) {
    router.push("/signin");
    return null;
  } else {
    useEffect(() => {
      if (!state.user) {
        dispatch({ type: SETUSER, payload: isUser });
      }
    }, []);
    const { faceState } = useFace();
    return (
      <>
        <Logo />
        <Rank />
        <ImageLinkForm />
        <FaceRecognition imageUrl={faceState.imageUrl} box={faceState.box} />
      </>
    );
  }
}
