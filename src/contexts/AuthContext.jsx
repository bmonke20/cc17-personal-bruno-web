// import { createContext, useEffect, useState } from "react";
// import {
//   getAccessToken,
//   setAccessToken,
//   removeAccessToken,
// } from "../utils/localstorage";
// import userApi from "../apis/userApi";

// export const AuthContext = createContext();

// export default function AuthContextProvider({ children }) {
//   const [authUser, setAuthUser] = useState(null);
//   const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         if (getAccessToken()) {
//           const res = await userApi.getAuth();
//           setAuthUser(res.data.user);
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setIsAuthUserLoading(false);
//       }
//     };
//     fetch();
//   }, []);

//   const login = async (credentials) => {
//     const res = await userApi.login(credentials);
//     setAccessToken(res.data.accessToken);

//     const resGetAuth = await userApi.getAuth();

//     setAuthUser(resGetAuth.data.user);
//   };

//   const logout = () => {
//     removeAccessToken();
//     setAuthUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ login, logout, authUser, isAuthUserLoading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

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
    const fetchAuthUser = async () => {
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

    fetchAuthUser();
  }, []);

  // useEffect(() => {
  //   const fetchAuthUser = async () => {
  //     try {
  //       if (getAccessToken()) {
  //         const res = await userApi.getAuth();
  //         setAuthUser(res.data.user);
  //       } else {
  //         setAuthUser(null); // ถ้าไม่มี accessToken ให้ setAuthUser เป็น null
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsAuthUserLoading(false);
  //     }
  //   };

  //   fetchAuthUser();
  // }, []);

  const login = async (credentials) => {
    try {
      const res = await userApi.login(credentials);
      setAccessToken(res.data.accessToken);

      const resGetAuth = await userApi.getAuth();
      setAuthUser(resGetAuth.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  // Example in useAuth or login service
  // const login = async (credentials) => {
  //   try {
  //     const response = await userApi.login(credentials);
  //     const { accessToken } = response.data;
  //     const redirectUrl = response.data.isAdmin ? "/admin" : "/";
  //     return { accessToken, redirectUrl };
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
