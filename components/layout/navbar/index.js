import React from "react";
import Link from "next/link";

export function Navbar({ isSignedIn = false }) {
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
        <Link href="/signin">
          <a className="f3 link dim black underline pa3 pointer">Sign In</a>
        </Link>
        <Link href="/register">
          <a className="f3 link dim black underline pa3 pointer">Register</a>
        </Link>
      </nav>
    );
  }
}
