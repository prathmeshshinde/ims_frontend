import React, { useContext, useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImsService } from "../Services/ImsServices";

const AuthContext = createContext("");

export const AuthProvider: React.FC<any> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();

  const getUser = (username: any) => {
    ImsService.getUser(username)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const localStore = localStorage.getItem("username");
    const sessionStore = sessionStorage.getItem("username");
    if (!localStore && !sessionStore) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }

    getUser(localStore);

    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   setCurrentUser(user);
    //   if (!user) {
    //     navigate("/login");
    //   } else {
    //     navigate("/");
    //   }
    // });
    // return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}

// const AuthProvider: React.FC<any> = ({ children }) => {
//   const localStore = localStorage.getItem("username");
//   return <AuthContext.Provider></AuthContext.Provider>;
// };

// export default AuthContext;
