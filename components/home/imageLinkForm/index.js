import React from "react";
import Clarifai from "clarifai";

import { SETURL, DETECT } from "../../../context/actions";
import { useAuth, useFace } from "../../../context/globalstate";

import styles from "./imageLinkForm.module.css";

const app = new Clarifai.App({
  apiKey: "fc3cdca5cb1845c3851c5e58bfc6c73a",
});

export function ImageLinkForm() {
  const { state, dispatch } = useAuth();
  const { faceState, faceDispatch } = useFace();

  const onBtnClick = () => {
    console.log("sss");
    app.models
      .predict("fc3cdca5cb1845c3851c5e58bfc6c73a", faceState.imageUrl)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.image_link_form}>
      <p className="f3">
        This Magic Brain will detect faces in your pictures. Git it a try.
      </p>
      <div className={`mt3 pa4 br3 shadow-5 ${styles.form}`}>
        <input
          className="f4 pa2 w-70 center"
          type="text"
          onChange={(e) =>
            faceDispatch({ type: SETURL, payload: e.target.value })
          }
        />
        <button
          className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          onClick={(e) => {
            e.preventDefault();
            // faceDispatch({
            //   type: DETECT,
            //   payload: { authDispatch: dispatch, authState: state },
            // });
            onBtnClick();
          }}
        >
          Detect
        </button>
      </div>
    </div>
  );
}
