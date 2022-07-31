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
import { axiosInstance, url } from "./components/store/api";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const [organizations, setOrganizations] = useState([]);
  const [activeBoard, setActiveBoard] = useState({});
  const [activeBoardData, setActiveBoardData] = useState({});
  const [activeOrganization, setActiveOrganization] = useState("");
  const [activeTicket, setActiveTicket] = useState("");

  const [data, setData] = useState({
    organizations: [],
    activeOrganization: "",
    activeBoard: {},
    activeBoardData: {},
    activeTicket: "",
    joinRequests: [],
  });

  axiosInstance.interceptors.request.use(
    async (req) => {
      const user = jwt_decode(localStorage.getItem("access"));
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) return req;
      const response = await axios.post(`${url}/token/refresh`, {
        refresh: localStorage.getItem("refresh"),
      });
      authCtx.refreshTokens(response.data.access, response.data.refresh);
      req.headers.Authorization = `Bearer  ${response.data.access}`;
      console.log(req);
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const selectOrganization = async (e) => {
    let targetOrg = data.organizations.find((obj) => obj.id == e.target.id);
    console.log(targetOrg);
    setData({ ...data, activeBoard: {}, activeOrganization: targetOrg });
  };

  const setActiveTicketHandler = (e) => {
    setActiveTicket(
      data.activeBoardData.tickets.find((obj) => obj.id == e.target.id)
    );
  };

  const fetchAndSetActiveBoardData = async (e) => {
    console.log(data);
    await axiosInstance
      .get(`${url}/board/${e.target.id}/tickets/`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((res) => {
        console.log(res);
        setData({
          ...data,
          activeBoardData: res.data,
          activeBoard: data.activeOrganization.boards.find(
            (obj) => obj.id == e.target.id
          ),
        });
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
        setData({
          ...data,
          activeBoardData: res.data,
          activeBoard: data.activeOrganization.boards.find(
            (obj) => obj.id == id
          ),
        });
      });
  };

  const getInitialData = async () => {
    console.log("get initial data");
    await axiosInstance
      .get(`/boards`, {
        headers: { Authorization: "Bearer " + authCtx.access },
      })
      .then((response) => {
        if (response.status === 200) {
          let newOrganizations = response.data.organizations;
          let newJoinRequests = response.data.join_requests;
          console.log("getInitialData");
          console.log(response.data);
          setData({
            ...data,
            organizations: newOrganizations,
            joinRequests: newJoinRequests,
          });
        } else {
          console.log("error"); //! handle this error properly
        }
      });
  };

  const api = {
    fetchAndSetActiveBoardData: fetchAndSetActiveBoardData,
    fetchUpdatedBoardData: fetchUpdatedBoardData,
    setActiveTicket: setActiveTicket,
    setActiveTicketHandler: setActiveTicketHandler,
    selectOrganization: selectOrganization,
    getInitialData: getInitialData,
  };

  return (
    <Router>
      <Switch>
        {authCtx.isLoggedIn && (
          <Route path="/" exact>
            <HomePage
              data={data}
              setData={setData}
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
              <AuthPage
                setIsLoading={setIsLoading}
                api={api}
                data={data}
                setData={setData}
              />
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
