import { useContext, useReducer } from "react";

import AuthContext, { FaceContext } from "./context";
import { authReducer, faceReducer } from "./reducer";

export const ContextProvider = ({ children }) => {
  const initialAuthState = useContext(AuthContext);
  const initialFaceState = useContext(FaceContext);
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const [faceState, faceDispatch] = useReducer(faceReducer, initialFaceState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <FaceContext.Provider
        value={{
          faceState,
          faceDispatch,
        }}
      >
        {children}
      </FaceContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useFace = () => useContext(FaceContext);
