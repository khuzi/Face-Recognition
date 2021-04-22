import React from "react";

import styles from "./faceRecognition.module.css";

export const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div
      className="center ma"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="absolute mt1">
        <img id="inputimage" alt="" src={imageUrl} width="400px" heigh="auto" />
        {box && (
          <div
            className={styles.bounding_box}
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};
