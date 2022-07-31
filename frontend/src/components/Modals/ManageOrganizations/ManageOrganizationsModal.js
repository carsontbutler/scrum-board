import react, { useState, useContext } from "react";
import { Row, Modal, Toast, ToastContainer } from "react-bootstrap";
import "../Modal.css";
import "../../Inbox.css";
import HomeView from "./HomeView";
import ManageView from "./ManageView";

const ManageOrganizationsModal = (props) => {
  const [view, setView] = useState({ screen: "home" });
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hideToastHandler = () => {
    setShowToast(false);
    setToastMessage("");
  };

  const hideManageOrganizationsModalHandler = () => {
    console.log('ran');
    setView({ ...view, screen: "home" });
    props.setShowManageOrganizationsModal(false);
  };

  const showManageView = (e) => {
    console.log(e.target);
    props.setData({
      ...props.data,
      activeOrganization: props.data.organizations.find(
        (obj) => obj.id == e.target.id
      ),
    });
    setView({ ...view, screen: "manageOrg" });
  };

  return (
    <Modal
      size={"lg"}
      centered
      show={props.showManageOrganizationsModal}
      fullscreen={false}
      scrollable={true}
    >
      <Modal.Header
        closeButton
        onHide={hideManageOrganizationsModalHandler}
        className="mx-3"
      >
        <Modal.Title>My Organizations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {view.screen == "home" && (
            <HomeView
              data={props.data}
              showManageView={showManageView}
              api={props.api}
              setData={props.setData}
              showCreateOrganizationModal={props.showCreateOrganizationModal}
              showJoinOrganizationModal={props.showJoinOrganizationModal}
            />
          )}
          {view.screen == "manageOrg" && (
            <ManageView
              view={view}
              data={props.data}
              setData={props.setData}
              api={props.api}
              setView={setView}
              showToast={showToast}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center"></Modal.Footer>
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
    </Modal>
  );
};

export default ManageOrganizationsModal;
