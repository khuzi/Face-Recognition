import React from "react";
import Link from "next/link";

import { useAuth } from "../../../context/globalstate";
import { SIGNOUT } from "../../../context/actions";

export function Navbar({ isSignedIn = false }) {
  const { state, dispatch } = useAuth();
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href="/">
          <a className="f3 link dim black underline pa3 pointer">Sign Out</a>
        </Link>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        {!state.isSignedIn && (
          <Link href="/signin">
            <a className="f3 link dim black underline pa3 pointer">Sign In</a>
          </Link>
        )}
        <Link href="/register">
          <a className="f3 link dim black underline pa3 pointer">Register</a>
        </Link>
        {state.isSignedIn && (
          <a
            className="f3 link dim black underline pa3 pointer"
            onClick={() => dispatch({ type: SIGNOUT })}
          >
            Sign Out
          </a>
        )}
      </nav>
    );
  }
}
