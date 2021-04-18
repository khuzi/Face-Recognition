import { createContext } from "react";

export default createContext({
  user: null,
  isSignedIn: false,
});

export const FaceContext = createContext({
  imageUrl: "",
});
