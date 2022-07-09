import "./App.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/pages/HomePage";
import AuthPage from "./components/pages//auth/AuthPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthContext from "./components/store/auth-context";
import DataContext from "./components/store/data-context";
import JoinOrgPage from "./components/pages/JoinOrgPage";
import SelectOrgPage from "./components/pages/SelectOrgPage";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { axiosInstance, url } from "./components/store/api";
function App() {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const isLoggedIn = authCtx.isLoggedIn;

  //fix
  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authCtx.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;

    const response = await axios.post(`${url}/token/refresh`, {
      refresh: authCtx.refresh,
    });
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    req.headers.Authorization = `Bearer  ${response.data.access}`;
    return req;
  });

  const getInitialData = async () => {
    const response = await axiosInstance
      .get(`/boards`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          dataCtx.setOrganizations(response.data.organizations);
          console.log(dataCtx);
        } else {
          console.log("error"); //! handle this error properly
        }
      });
  };

  useEffect(() => {
    getInitialData();
  }, [dataCtx.isLoggedIn]);

  return (
    <Router>
      <Switch>
        {isLoggedIn && (
          <Route path="/" exact>
            <HomePage getInitialData={getInitialData} />
          </Route>
        )}
        {!isLoggedIn && <Route path="/login" component={AuthPage} />}

        {isLoggedIn && (
          <Route path="/join" exact>
            <JoinOrgPage />
          </Route>
        )}

        {isLoggedIn && (
          <Route path="/select-org" exact>
            <SelectOrgPage />
          </Route>
        )}

        <Route path="*">
          {isLoggedIn && <Redirect to="/" />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
