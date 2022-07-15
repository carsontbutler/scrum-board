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

import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { axiosInstance, url } from "./components/store/api";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const [organizations, setOrganizations] = useState([]);
  const [activeBoard, setActiveBoard] = useState({});
  const [activeBoardData, setActiveBoardData] = useState({});
  const [activeOrganization, setActiveOrganization] = useState("");
  const [activeTicket, setActiveTicket] = useState("");

  const data = {
    organizations: organizations,
    activeOrganization: activeOrganization,
    activeBoard: activeBoard,
    activeBoardData: activeBoardData,
    activeTicket: activeTicket,
  };

  const setOrganization = async (e) => {
    setActiveBoard({});
    let targetOrg = organizations.find((obj) => obj.id == e.target.id);
    await setActiveOrganization(targetOrg);
    console.log(activeOrganization);
  };

  const setActiveTicketHandler = (e) => {
    setActiveTicket(
      data.activeBoardData.tickets.find((obj) => obj.id == e.target.id)
    );
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

  const fetchUpdatedBoardData = async (board) => {
    let id = board.id;
    await axiosInstance
      .get(`${url}/board/${id}/tickets/`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((res) => {
        console.log(res.data);
        setActiveBoardData(res.data);
        setActiveBoard(activeOrganization.boards.find((obj) => obj.id == id));
      });
  };

  const getInitialData = async () => {
    await axiosInstance
      .get(`/boards`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((response) => {
        if (response.status === 200) {
          setOrganizations(response.data.organizations);
          console.log(response.data.organizations);
        } else {
          console.log("error"); //! handle this error properly
        }
      });
  };

  useEffect(() => {
    axiosInstance
      .get(`/boards`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((response) => {
        if (response.status === 200) {
          let newOrganizations = response.data.organizations;
          api.setOrganizations(newOrganizations);
          setIsLoading(false);
        } else {
          console.log("error"); //! handle this error properly
        }
      });
  }, [authCtx.login]);

  const api = {
    setActiveBoard: setActiveBoard,
    setActiveBoardData: setActiveBoardData,
    setOrganization: setOrganization,
    setOrganizations: setOrganizations,
    setActiveOrganization: setActiveOrganization,
    fetchAndSetActiveBoardData: fetchAndSetActiveBoardData,
    fetchUpdatedBoardData: fetchUpdatedBoardData,
    setActiveTicket: setActiveTicket,
    setActiveTicketHandler: setActiveTicketHandler,
    getInitialData: getInitialData,
  };

  return (
    <Router>
      <Switch>
        {authCtx.isLoggedIn && (
          <Route path="/" exact>
            <HomePage
              data={data}
              api={api}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route
            path="/login"
            component={() => (
              <AuthPage setIsLoading={setIsLoading} api={api} data={data} />
            )}
          />
        )}

        <Route path="*">
          {authCtx.isLoggedIn && <Redirect to="/" />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
