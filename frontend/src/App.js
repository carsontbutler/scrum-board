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
import SelectOrgPage from "./components/pages/SelectOrganization";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { axiosInstance, url } from "./components/store/api";
function App() {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [organizations, setOrganizations] = useState([]);
  const [activeBoard, setActiveBoard] = useState({});
  const [activeBoardData, setActiveBoardData] = useState({});
  const [activeOrganization, setActiveOrganization] = useState("");

  useEffect(()=>{console.log(activeOrganization)},[activeOrganization])

  const setOrganization = async (e) => {
    let targetOrg = organizations.find((obj) => obj.id == e.target.id);
    await setActiveOrganization(targetOrg);
    console.log(activeOrganization);
  };

  const fetchAndSetActiveBoardData = async (e) => {
    console.log(e.target);
    console.log("fetchActiveBoardData");
    await axiosInstance
      .get(`${url}/board/${e.target.id}/tickets/`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((res) => {
        console.log(res.data);
        setActiveBoardData(res.data);
        setActiveBoard(
          activeOrganization.boards.find((obj) => obj.id == e.target.id)
        );
      });
  };

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
          setOrganizations(response.data.organizations);
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
            <HomePage
              getInitialData={getInitialData}
              organizations={organizations}
              setOrganizations={setOrganizations}
              activeOrganization={activeOrganization}
              setActiveOrganization={setActiveOrganization}
              activeBoard={activeBoard}
              setActiveBoard={setActiveBoard}
              activeBoardData={activeBoardData}
              fetchAndSetActiveBoardData={fetchAndSetActiveBoardData}
              setActiveBoardData={setActiveBoardData}
              setOrganization={setOrganization}
            />
          </Route>
        )}
        {!isLoggedIn && <Route path="/login" component={AuthPage} />}

        <Route path="*">
          {isLoggedIn && <Redirect to="/" />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
