"use client";

import { AuthReducer } from "./AuthReducer";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import Cookies from "js-cookie";

interface initialStateType {
  currentUser: any;
  dispatch: React.Dispatch<any>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const storedUser = Cookies.get("user");
const INITIAL_STATE: initialStateType = {
  currentUser: storedUser ? JSON.parse(storedUser) : null,
  dispatch: () => {},
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    // Only set the cookie if there is a valid currentUser
    if (state.currentUser !== null) {
      Cookies.set("user", JSON.stringify(state.currentUser));
    }
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
