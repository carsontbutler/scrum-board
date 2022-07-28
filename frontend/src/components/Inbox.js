import react, { useState, useContext } from "react";
import AuthContext from "./store/auth-context";
import {
  Modal,
  Container,
  Button,
  Table,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "./Modals/Modal.css";
import "./Inbox.css";
import { axiosInstance, url } from "./store/api";

const Inbox = (props) => {
  const authCtx = useContext(AuthContext);
  const [selectedRequest, setSelectedRequest] = useState();
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDenyModal, setShowDenyModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const hideToastHandler = () => {
    setShowToast(false);
  };

  const showApproveModalHandler = (e) => {
    setSelectedRequest(
      props.data.joinRequests.find((obj) => obj.id == e.target.id)
    );
    setShowApproveModal(true);
  };

  const hideApproveModalHandler = () => {
    setSelectedRequest("");
    setShowApproveModal(false);
  };

  const showDenyModalHandler = (e) => {
    setSelectedRequest(
      props.data.joinRequests.find((obj) => obj.id == e.target.id)
    );
    setShowDenyModal(true);
  };

  const hideDenyModalHandler = () => {
    setSelectedRequest("");
    setShowDenyModal(false);
  };

  const ApproveModal = (props) => {
    const submitHandler = (e) => {
      e.preventDefault();
      axiosInstance
        .patch(
          `${url}/requests/${props.selectedRequest.id}/respond/`,
          { status: "Approved" },
          { headers: { Authorization: "Bearer " + authCtx.access } }
        )
        .then((resp) => {
          if (resp.status == 200) {
            props.api.getInitialData();
            props.hideApproveModalHandler();
            props.setToastMessage(
              `${
                props.selectedRequest.requester_info.username
              } has been approved to join ${
                props.data.organizations.find(
                  (obj) => obj.id == props.selectedRequest.organization
                ).name
              }`
            );
            props.setShowToast(true);
          } else {
            props.setErrorMessage(
              "Something went wrong. Please try again later."
            );
          }
        });
    };
    return (
      <Modal size={"md"} centered show={props.showApproveModal}>
        <Modal.Header closeButton onHide={props.hideApproveModalHandler}>
          <Modal.Title>Confirm approval</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto text-center">
          Approve {props.selectedRequest.requester_info.username}'s request to
          join{" "}
          {
            props.data.organizations.find(
              (obj) => obj.id == props.selectedRequest.organization
            ).name
          }
          ?
          {props.errorMessage && (
            <h6 className="text-center error-message">{props.errorMessage}</h6>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <div className="approve-btn">
            <Button onClick={submitHandler}>Approve</Button>
          </div>

          <div className="inbox-cancel-btn">
            <Button onClick={props.hideApproveModalHandler}>Cancel</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  const DenyModal = (props) => {
    const submitHandler = (e) => {
      e.preventDefault();
      axiosInstance
        .patch(
          `${url}/requests/${props.selectedRequest.id}/respond/`,
          { status: "Denied" },
          { headers: { Authorization: "Bearer " + authCtx.access } }
        )
        .then((resp) => {
          if (resp.status == 200) {
            props.api.getInitialData();
            props.hideDenyModalHandler();
            props.setToastMessage(
              `${
                props.selectedRequest.requester_info.username
              } has been denied access to ${
                props.data.organizations.find(
                  (obj) => obj.id == props.selectedRequest.organization
                ).name
              }`
            );
            props.setShowToast(true);
          } else {
            props.setErrorMessage(
              "Something went wrong. Please try again later."
            );
          }
        });
    };
    return (
      <Modal size={"md"} centered show={props.showDenyModal}>
        <Modal.Header closeButton onHide={props.hideDenyModalHandler}>
          <Modal.Title>Deny</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto">
          Deny {props.selectedRequest.requester_info.username}'s request to join{" "}
          {
            props.data.organizations.find(
              (obj) => obj.id == props.selectedRequest.organization
            ).name
          }
          ?{props.errorMessage && <h6>{props.errorMessage}</h6>}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <div>
            <Button onClick={submitHandler} variant="danger">
              Deny
            </Button>
          </div>

          <div className="inbox-cancel-btn">
            <Button onClick={props.hideDenyModalHandler}>Cancel</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  const RequestData = (props) => {
    console.log(props);
    return props.data.joinRequests.map((req) => (
      <tr id={req.id}>
        <td id={req.id}>{req.time.split("T")[0]}</td>
        <td id={req.id}>{req.requester_info.username}</td>
        <td id={req.id}>
          {
            props.data.organizations.find((obj) => obj.id == req.organization)
              .name
          }
        </td>
        <td id={req.id}>{req.status}</td>
        <td className="approve-btn" id={req.id}>
          <Button id={req.id} onClick={showApproveModalHandler}>
            Approve
          </Button>
        </td>
        <td className="decline-btn">
          <Button onClick={showDenyModalHandler} id={req.id} variant="danger">
            Deny
          </Button>
        </td>
      </tr>
    ));
  };
  return (
    <Container>
      <h4 className="text-center inbox-section mb-4">Join Requests</h4>
      <Table striped className="table-header">
        <thead>
          <tr>
            <th>Time</th>
            <th>Username</th>
            <th>Organization</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <RequestData data={props.data} />
        </tbody>
      </Table>
      {selectedRequest && (
        <ApproveModal
          showApproveModal={showApproveModal}
          hideApproveModalHandler={hideApproveModalHandler}
          joinRequests={props.data.joinRequests}
          selectedRequest={selectedRequest}
          data={props.data}
          api={props.api}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setToastMessage={setToastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      )}
      {selectedRequest && (
        <DenyModal
          showDenyModal={showDenyModal}
          hideDenyModalHandler={hideDenyModalHandler}
          joinRequests={props.data.joinRequests}
          selectedRequest={selectedRequest}
          data={props.data}
          api={props.api}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setToastMessage={setToastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
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
  );
};

export default Inbox;
