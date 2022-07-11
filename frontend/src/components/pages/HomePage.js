import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import Board from "../Board";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import CreateBoardModal from "../Modals/CreateBoardModal";
import EditBoardModal from "../Modals/EditBoardModal";
import DataContext from "../store/data-context";
import SelectOrganization from "./SelectOrganization";
import SelectBoard from "./SelectBoard";

const HomePage = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);

  console.log(props);

  const url = "http://localhost:8000/api";

  const axiosInstance = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + authCtx.access,
    },
  });

  const getBoardData = async () => {
    const board = dataCtx.activeBoard.id;
    const response = await axiosInstance
      .get(`/board/${board}/tickets`)
      .then((response) => {
        if (response.status === 200) {
          props.api.setActiveBoardData(response.data);
        } else {
          console.log("error");
        } //handle error properly
      });
  };

  const showCreateBoardModal = () => {
    setIsCreatingBoard(true);
  };

  const closeCreateBoardModal = () => {
    setIsCreatingBoard(false);
  };

  const showEditBoardModal = () => {
    setIsEditingBoard(true);
  };

  const closeEditBoardModal = () => {
    setIsEditingBoard(false);
  };

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authCtx.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log("HomePage Axios Interceptor");
    console.log(req.headers.Authorization);
    if (!isExpired) return req;

    const response = await axios.post(`${url}/token/refresh`, {
      refresh: authCtx.refresh,
    });
    localStorage.setItem("access", response.data.access);
    req.headers.Authorization = `Bearer  ${response.data.access}`;
    return req;
  });

  return (
    <div>
      <Navigation
        organizations={props.organizations}
        setOrganizations={props.setOrganizations}
        activeOrganization={props.activeOrganization}
        setActiveOrganization={props.setActiveOrganization}
        activeBoard={props.activeBoard}
        setActiveBoard={props.setActiveBoard}
        fetchAndSetActiveBoardData={props.fetchAndSetActiveBoardData}
        setActiveBoardData={props.setActiveBoardData}
        setOrganization={props.setOrganization}
        data={props.data}
        api={props.api}
      />
      <Container>
        <div>
          {Object.keys(props.data.activeBoard).length === 0 &&
            !props.data.activeOrganization && (
              <SelectOrganization
                data={props.data}
                api={props.api}
              />
            )}
          {Object.keys(props.data.activeBoard).length === 0 &&
            props.data.activeOrganization && (
              <SelectBoard
                organizations={props.organizations}
                setOrganizations={props.setOrganizations}
                activeOrganization={props.activeOrganization}
                setActiveOrganization={props.setActiveOrganization}
                activeBoard={props.activeBoard}
                setActiveBoard={props.setActiveBoard}
                fetchAndSetActiveBoardData={props.fetchAndSetActiveBoardData}
                setActiveBoardData={props.setActiveBoardData}
                data={props.data}
                api={props.api}
              />
            )}
          {Object.keys(props.data.activeBoard).length !== 0 && (
            <Board
              showEditBoardModal={showEditBoardModal}
              getBoardData={getBoardData}
              organizations={props.organizations}
              setOrganizations={props.setOrganizations}
              activeOrganization={props.activeOrganization}
              setActiveOrganization={props.setActiveOrganization}
              activeBoard={props.activeBoard}
              setActiveBoard={props.setActiveBoard}
              activeBoardData={props.activeBoardData}
              setActiveBoardData={props.setActiveBoardData}
              activeTicket={props.activeTicket}
              setActiveTicket={props.setActiveTicket}
              setActiveTicketHandler={props.setActiveTicketHandler}
              fetchAndSetActiveBoardData={props.fetchAndSetActiveBoardData}
              fetchUpdatedBoardData={props.fetchUpdatedBoardData}
              data={props.data}
              api={props.api}
            />
          )}
        </div>
        {isCreatingBoard && (
          <CreateBoardModal
            isCreatingBoard={isCreatingBoard}
            closeCreateBoardModal={closeCreateBoardModal}
            getBoardData={getBoardData}
            getInitialData={props.getInitialData}
            data={props.data}
            api={props.api}
          />
        )}
        {isEditingBoard && (
          <EditBoardModal
            isEditingBoard={isEditingBoard}
            closeEditBoardModal={closeEditBoardModal}
            data={props.data}
            api={props.api}
          />
        )}
      </Container>
    </div>
  );
};

export default HomePage;
