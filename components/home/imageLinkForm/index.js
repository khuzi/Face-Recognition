import React from "react";

import styles from "./imageLinkForm.module.css";

export function ImageLinkForm() {
  return (
    <div className={styles.image_link_form}>
      <p className="f3">
        This Magic Brain will detect faces in your pictures. Git it a try.
      </p>
      <div className={`mt3 pa4 br3 shadow-5 ${styles.form}`}>
        <input className="f4 pa2 w-70 center" type="text" />
        <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
          Detect
        </button>
      </div>
    </div>
  );
}
