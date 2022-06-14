import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import Board from "../Board";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import CreateBoardModal from "../Modals/CreateBoardModal";
import EditBoardModal from "../Modals/EditBoardModal";

const HomePage = (props) => {
  const authCtx = useContext(AuthContext);
  const organizations = props.organizations;
  const [activeOrganization, setActiveOrganization] = useState("");
  const [activeBoard, setActiveBoard] = useState("");
  const [tickets, setTickets] = useState([]);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  console.log(props);
  console.log(activeBoard);

  const [activeBoardData, setActiveBoardData] = useState({
    name: "",
    columns: [],
    tickets: [],
  });

  const getBoardData = async () => {
    const board = activeBoard.id;
    const response = await axiosInstance
      .get(`/board/${board}/tickets`)
      .then((response) => {
        if (response.status === 200) {
          setActiveBoardData(response.data);
        } else {
          console.log("error");
        } //handle error properly
      });
  };

  useEffect(() => {
    getBoardData();
  }, [activeBoard]);

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

  const url = "http://localhost:8000/api";

  const axiosInstance = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + authCtx.access,
    },
  });

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

  const getTicketsHandler = async (board) => {
    console.log(board);
    console.log(activeBoard);
    const id = board.target.id;
    const targetBoard = activeOrganization.boards.find((obj) => obj.id == id);
    setActiveBoard(targetBoard);
    const response = await axiosInstance
      .get(`/board/${id}/tickets`)
      .then((response) => {
        if (response.status === 200) {
          setTickets(response.data);
          console.log(response.data);
        } else {
          console.log("error");
        } //handle error properly
      });
  };

  const setActiveOrganizationHandler = (org) => {
    console.log(org);
    const id = org.target.id;
    const targetOrg = organizations.find((obj) => obj.id == id);
    setActiveOrganization(targetOrg);
    console.log(targetOrg);
    if (targetOrg.boards.length > 0) {
      setActiveBoard(targetOrg.boards[0]);
    } else {
      setActiveBoard();
    }
  };

  //! Replace this with something else?
  useEffect(() => {
    if (organizations.length === 1) {
      setActiveOrganization(organizations[0]);
    }
  }, [organizations]);

  return (
    <div>
      <Navigation
        organizations={organizations}
        activeOrganization={activeOrganization}
        setActiveOrganizationHandler={setActiveOrganizationHandler}
        getTicketsHandler={getTicketsHandler}
        showCreateBoardModal={showCreateBoardModal}
        setActiveBoard={setActiveBoard}
      />
      <Container>
        {activeBoard && (
          <Board
            tickets={tickets}
            activeOrganization={activeOrganization}
            activeBoard={activeBoard}
            showEditBoardModal={showEditBoardModal}
            activeBoardData={activeBoardData}
            
          />
        )}
        {isCreatingBoard && (
          <CreateBoardModal
            organizations={organizations}
            activeOrganization={activeOrganization}
            isCreatingBoard={isCreatingBoard}
            closeCreateBoardModal={closeCreateBoardModal}
            getBoardData={getBoardData}
            setActiveBoard={setActiveBoard}
            getInitialData={props.getInitialData}
          />
        )}
        {isEditingBoard && (
          <EditBoardModal
            organizations={organizations}
            activeOrganization={activeOrganization}
            isEditingBoard={isEditingBoard}
            closeEditBoardModal={closeEditBoardModal}
            activeBoard={activeBoard}
            activeBoardData={activeBoardData}
          />
        )}
      </Container>
    </div>
  );
};

export default HomePage;
