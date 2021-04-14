import { useContext, useReducer } from "react";

import AuthContext from "./context";
import { authReducer } from "./reducer";

export const AuthContextProvider = ({ children }) => {
  const initialState = useContext(AuthContext);
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
