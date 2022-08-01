import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, userId) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialAccess = localStorage.getItem("access");
  const initialRefresh = localStorage.getItem("refresh");
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [access, setAccess] = useState(initialAccess);
  const [refresh, setRefresh] = useState(initialRefresh);
  const [loginTimestamp, setLoginTimestamp] = useState();
  const tokenDuration = new Date(Date.now() + 5 * 60 * 1000);

  const userIsLoggedIn = !!access;

  const logoutHandler = () => {
    setAccess(null);
    setRefresh(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("loginTimestamp");
  };

  const loginHandler = (userId, username, access, refresh) => {
    setUserId(userId);
    setUsername(username);
    setAccess(access);
    setRefresh(refresh);
    setLoginTimestamp(new Date().getTime());
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("loginTimestamp", new Date().getTime());
  };

  const refreshTokens = (access, refresh) => {
    setAccess(access);
    setRefresh(refresh);
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  };

  const tokenIsValid = () => {
    const currentTime = new Date().getTime();
    const timeExpired = currentTime - loginTimestamp;
    if (timeExpired >= tokenDuration) {
      return false;
    } else {
      return true;
    }
  };

  const contextValue = {
    access: access,
    refresh: refresh,
    username: username,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    tokenDuration: tokenDuration,
    tokenIsValid: tokenIsValid,
    login: loginHandler,
    logout: logoutHandler,
    refreshTokens: refreshTokens
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
