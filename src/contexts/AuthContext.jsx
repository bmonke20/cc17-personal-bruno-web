import { createContext, useEffect, useState } from "react";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "../utils/localstorage";
import userApi from "../apis/userApi";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (getAccessToken()) {
          const res = await userApi.getAuth();
          setAuthUser(res.data.user);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsAuthUserLoading(false);
      }
    };
    fetch();
  }, []);

  const login = async (credentials) => {
    const res = await userApi.login(credentials);
    setAccessToken(res.data.accessToken);

    const resGetAuth = await userApi.getAuth();

    setAuthUser(resGetAuth.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, authUser, isAuthUserLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
