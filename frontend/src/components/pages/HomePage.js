import React, { useState, useEffect, useContext } from "react";
import Navigation from "../Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Toast, ToastContainer } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import Board from "../Board";
import CreateOrganizationModal from "../Modals/CreateOrganizationModal";
import JoinOrganizationModal from "../Modals/JoinOrganizationModal";
import CreateBoardModal from "../Modals/CreateBoardModal";
import EditBoardModal from "../Modals/EditBoardModal";
import SelectOrganization from "./SelectOrganization";
import ManageOrganizationsModal from "../Modals/ManageOrganizationsModal";
import SelectBoard from "./SelectBoard";
import InboxModal from "../Modals/InboxModal";
import { axiosInstance, url } from "../store/api";

const HomePage = (props) => {
  const authCtx = useContext(AuthContext);
  const [isViewingInbox, setIsViewingInbox] = useState(false);
  const [isCreatingBoard, setIsCreatingBoard] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [isCreatingOrganization, setIsCreatingOrganization] = useState(false);
  const [isJoiningOrganization, setIsJoiningOrganization] = useState(false);
  const [showManageOrganizationsModal, setShowManageOrganizationsModal] =
    useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const hideToastHandler = () => {
    setShowToast(false);
  };

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
        console.log(response.data);
        if (response.status === 200) {
          props.setData({
            ...props.data,
            organizations: response.data.organizations,
            joinRequests: response.data.join_requests,
          });
          props.setIsLoading(false);
        } else {
          console.log("error");
        }
      });
  }, []);

  const showCreateOrganizationModal = () => {
    setIsCreatingOrganization(true);
  };

  const closeCreateOrganizationModal = () => {
    setIsCreatingOrganization(false);
  };

  const showJoinOrganizationModal = () => {
    setIsJoiningOrganization(true);
  };

  const closeJoinOrganizationModal = () => {
    setIsJoiningOrganization(false);
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

  const showInboxModalHandler = () => {
    setIsViewingInbox(true);
  };

  const closeInboxModalHandler = () => {
    setIsViewingInbox(false);
  };

  const showManageOrganizationsModalHandler = () => {
    setShowManageOrganizationsModal(true);
  };

  const hideManageOrganizationsModalHandler = () => {
    setShowManageOrganizationsModal(false);
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
        showCreateOrganizationModal={showCreateOrganizationModal}
        showJoinOrganizationModal={showJoinOrganizationModal}
        showInboxModalHandler={showInboxModalHandler}
        showManageOrganizationsModal={showManageOrganizationsModal}
        setShowManageOrganizationsModal={setShowManageOrganizationsModal}
        showManageOrganizationsModalHandler={
          showManageOrganizationsModalHandler
        }
      />
      <Container>
        <div>
          {
            <ManageOrganizationsModal
              api={props.api}
              data={props.data}
              showManageOrganizationsModal={showManageOrganizationsModal}
              setShowManageOrganizationsModa={setShowManageOrganizationsModal}
              showManageOrganizationsModalHandler={
                showManageOrganizationsModalHandler
              }
              hideManageOrganizationsModalHandler={
                hideManageOrganizationsModalHandler
              }
            />
          }
          {isViewingInbox && (
            <InboxModal
              closeInboxModalHandler={closeInboxModalHandler}
              isViewingInbox={isViewingInbox}
              api={props.api}
              data={props.data}
              setData={props.setData}
            />
          )}
          {Object.keys(props.data.activeBoard).length === 0 &&
            !props.data.activeOrganization && (
              <SelectOrganization
                data={props.data}
                api={props.api}
                setData={props.setData}
                showCreateOrganizationModal={showCreateOrganizationModal}
                showJoinOrganizationModal={showJoinOrganizationModal}
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
        {isCreatingOrganization && (
          <CreateOrganizationModal
            isCreatingOrganization={isCreatingOrganization}
            closeCreateOrganizationModal={closeCreateOrganizationModal}
            api={props.api}
            data={props.data}
            setData={props.setData}
          />
        )}
        {isJoiningOrganization && (
          <JoinOrganizationModal
            isJoiningOrganization={isJoiningOrganization}
            closeJoinOrganizationModal={closeJoinOrganizationModal}
            api={props.api}
            data={props.data}
            setData={props.setData}
            setToastMessage={setToastMessage}
            setShowToast={setShowToast}
          />
        )}
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
        <ToastContainer position="bottom-center">
          <Toast
            className="text-center mx-auto toast mb-5"
            show={showToast}
            onClose={hideToastHandler}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Message</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </div>
  );
};

export default HomePage;
