import react, { useState } from "react";
import { Modal, Container, Button, Row, Col, Table } from "react-bootstrap";
import "./Modals/Modal.css";
import "./Inbox.css";

const Inbox = (props) => {
  console.log(props);
  const [selectedRequest, setSelectedRequest] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const showApproveModalHandler = (e) => {
    setSelectedRequest(dummyData.find((obj) => obj.id == e.target.id));
    setShowApproveModal(true);
  };

  const hideApproveModalHandler = () => {
    setSelectedRequest("");
    setShowApproveModal(false);
  };

  const showDeclineModalHandler = (e) => {
    setSelectedRequest(dummyData.find((obj) => obj.id == e.target.id));
    setShowDeclineModal(true);
  };

  const hideDeclineModalHandler = () => {
    setSelectedRequest("");
    setShowDeclineModal(false);
  };

  const ApproveModal = (props) => {
    return (
      <Modal size={"md"} centered show={props.showApproveModal}>
        <Modal.Header closeButton onHide={props.hideApproveModalHandler}>
          <Modal.Title>Confirm approval</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto">
          Approve {props.selectedRequest.username}'s request to join{" "}
          {props.selectedRequest.organization}?
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <div className="approve-btn">
            <Button>Approve</Button>
          </div>

          <div className="inbox-cancel-btn">
            <Button onClick={props.hideApproveModalHandler}>Cancel</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  const DeclineModal = (props) => {
    return (
      <Modal size={"md"} centered show={props.showDeclineModal}>
        <Modal.Header closeButton onHide={props.hideDeclineModalHandler}>
          <Modal.Title>Decline</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow-auto">
          Decline {props.selectedRequest.username}'s request to join{" "}
          {props.selectedRequest.organization}?
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <div>
            <Button variant="danger">Decline</Button>
          </div>

          <div className="inbox-cancel-btn">
            <Button onClick={props.hideDeclineModalHandler}>Cancel</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  };

  let dummyData = [
    {
      time: "7/26/2022 10:26 AM",
      username: "John Smith",
      organization: "Gmail",
      status: "Pending",
      id: 12345,
    },
    {
      time: "7/22/2022 10:00 PM",
      username: "Michael Scott",
      organization: "Dunder Mifflin",
      status: "Pending",
      id: 99999,
    },
  ];

  const RequestData = (props) => {
    console.log(props);
    return props.data.joinRequests.map((req) => (
      <tr id={req.id}>
        <td id={req.id}>{req.time.split('T')[0]}</td>
        {/* Need to redo backend view to provide user+id in an array */}
        <td id={req.id}>{req.requester_username}</td>
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
          <Button
            onClick={showDeclineModalHandler}
            id={req.id}
            variant="danger"
          >
            Decline
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
      <ApproveModal
        showApproveModal={showApproveModal}
        hideApproveModalHandler={hideApproveModalHandler}
        dummyData={dummyData}
        selectedRequest={selectedRequest}
      />
      <DeclineModal
        showDeclineModal={showDeclineModal}
        hideDeclineModalHandler={hideDeclineModalHandler}
        dummyData={dummyData}
        selectedRequest={selectedRequest}
      />
    </Container>
  );
};

export default Inbox;
