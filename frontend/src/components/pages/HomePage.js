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
import { axiosInstance, url } from "../store/api";

const HomePage = (props) => {
  const authCtx = useContext(AuthContext);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);

  const [foundDuplicateColPosition, setFoundDuplicateColPosition] =
    useState(false);

  const checkForDuplicateColumnPositions = (arr) => {
    let emptyArr = [];
    arr.forEach((col) => {
      if (emptyArr.includes(col.position)) {
        setFoundDuplicateColPosition(true);
      } else {
        emptyArr.push(col.position);
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
          props.setData({
            ...props.data,
            organizations: response.data.organizations,
          });
          props.setIsLoading(false);
        } else {
          console.log("error"); //! handle this error properly
        }
      });
    props.api.getInitialData();
  }, []);

  const getBoardData = async () => {
    const board = props.data.activeBoard.id;
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

  return props.isLoading ? (
    <div>loading</div>
  ) : (
    <div>
      <Navigation
        data={props.data}
        setData={props.setData}
        api={props.api}
        foundDuplicateColPosition={foundDuplicateColPosition}
        setFoundDuplicateColPosition={setFoundDuplicateColPosition}
        checkForDuplicateColumnPositions={checkForDuplicateColumnPositions}
        showCreateBoardModal={showCreateBoardModal}
      />
      <Container>
        <div>
          {Object.keys(props.data.activeBoard).length === 0 &&
            !props.data.activeOrganization && (
              <SelectOrganization
                data={props.data}
                api={props.api}
                setData={props.setData}
              />
            )}
          {Object.keys(props.data.activeBoard).length === 0 &&
            props.data.activeOrganization && (
              <SelectBoard
                data={props.data}
                api={props.api}
                showCreateBoardModal={showCreateBoardModal}
              />
            )}
          {Object.keys(props.data.activeBoard).length !== 0 && (
            <Board
              showEditBoardModal={showEditBoardModal}
              data={props.data}
              api={props.api}
              setData={props.setData}
              foundDuplicateColPosition={foundDuplicateColPosition}
              setFoundDuplicateColPosition={setFoundDuplicateColPosition}
              checkForDuplicateColumnPositions={
                checkForDuplicateColumnPositions
              }
            />
          )}
        </div>
        {isCreatingBoard && (
          <CreateBoardModal
            isCreatingBoard={isCreatingBoard}
            closeCreateBoardModal={closeCreateBoardModal}
            data={props.data}
            setData={props.setData}
            api={props.api}
          />
        )}

        {isEditingBoard && (
          <EditBoardModal
            isEditingBoard={isEditingBoard}
            closeEditBoardModal={closeEditBoardModal}
            data={props.data}
            setData={props.setData}
            api={props.api}
          />
        )}
      </Container>
    </div>
  );
};

export default HomePage;
