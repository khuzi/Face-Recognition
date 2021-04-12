import React from "react";

import { Navbar } from "./navbar";

export function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
