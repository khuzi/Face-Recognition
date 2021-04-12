import React from "react";
import Image from "next/image";
import Tilt from "react-tilt";

import styles from "./logo.module.css";

export function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt
        className={`${styles.tilt} br2 shadow-2`}
        options={{ max: 55 }}
        style={{
          height: 150,
          width: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="Tilt-inner">
          <Image
            src="/assets/brain.png"
            width="100%"
            height="100%"
            alt="logo"
          />
        </div>
      </Tilt>
    </div>
  );
}
