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

const HomePage = (props) => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);

  const [tickets, setTickets] = useState([]);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);

  const [activeBoardData, setActiveBoardData] = useState({
    name: "",
    columns: [],
    tickets: [],
  });

  const getBoardData = async () => {
    const board = dataCtx.activeBoard.id;
    const response = await axiosInstance
      .get(`/board/${board}/tickets`)
      .then((response) => {
        if (response.status === 200) {
          dataCtx.setActiveBoardData(response.data);
        } else {
          console.log("error");
        } //handle error properly
      });
  };

  useEffect(() => {
    getBoardData();
  }, [dataCtx.activeBoard]);

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
    console.log('get tickets handler: ');
    const id = board.target.id;
    console.log(id);
    const targetBoard = dataCtx.activeOrganization.boards.find((obj) => obj.id == id);
    console.log(targetBoard);
    dataCtx.setActiveBoard(targetBoard);
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


  //! Replace this with something else?
  useEffect(() => {
    if (dataCtx.organizations.length === 1) {
      dataCtx.setActiveOrganization(dataCtx.organizations[0]);
    }
  }, [dataCtx.organizations]);

  return (
    <div>
      <Navigation
        getTicketsHandler={getTicketsHandler}
        showCreateBoardModal={showCreateBoardModal}
      />
      <Container>
        {dataCtx.activeBoard && (
          <Board
            showEditBoardModal={showEditBoardModal}
            getBoardData={getBoardData}
          />
        )}
        {isCreatingBoard && (
          <CreateBoardModal
            isCreatingBoard={isCreatingBoard}
            closeCreateBoardModal={closeCreateBoardModal}
            getBoardData={getBoardData}
            getInitialData={props.getInitialData}
          />
        )}
        {isEditingBoard && (
          <EditBoardModal
            isEditingBoard={isEditingBoard}
            closeEditBoardModal={closeEditBoardModal}
          />
        )}
        
      </Container>
    </div>
  );
};

export default HomePage;
