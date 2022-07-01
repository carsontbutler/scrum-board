import react, { useContext } from "react";
import { Modal, Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../store/auth-context";

const DeleteColumnModal = (props) => {
  const authCtx = useContext(AuthContext);
  console.log(props);
  console.log(props.showDeleteModal.id);
  let targetCol = props.formColumns.find(
    (col) => col.id == props.showDeleteModal.id
  );

  console.log(targetCol);

  const url = "http://localhost:8000/api";
  const axiosInstance = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + authCtx.access,
    },
  });

  const deleteColumnHandler = () => {

    switch (true) {
      case targetCol !== undefined && targetCol.id.toString().includes("temp"):
        let data = [...props.formColumns].filter((col) => col !== targetCol);
        props.setFormColumns(data);
        props.closeDeleteModal();
        break;
      case targetCol !== undefined && !targetCol.id.toString().includes("temp"):
        axiosInstance
          .delete(`${url}/column/${targetCol.id}/delete/`)
          .then((res) => {
            if (res.status == 204) {
              let data = [...props.formColumns].filter(
                (col) => col !== targetCol
              );
              props.setFormColumns(data);
              props.closeDeleteModal();
            } else {
              console.log(res); //! handle this properly with a message
            }
          });
        break;
    }
  };

  return (
    <Modal size={"md"} centered show={props.showDeleteModal.show}>
      <Modal.Header closeButton onHide={props.closeDeleteModal}>
        <Modal.Title>Delete column {targetCol.name}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {targetCol.tickets && targetCol.tickets.length > 0 ? (
            <div>
              <h5 className="text-decoration-underline text-center">
                WARNING:
              </h5>
              <h5 className="text-center mt-3">
                All tickets ({targetCol.tickets.length}) in this column
                will be deleted.
              </h5>
              <h6 className="text-center mt-3">
                Move the tickets to another column to avoid data loss.
              </h6>
            </div>
          ) : (
            <span>This action cannot be undone.</span>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button size="md" variant="danger" onClick={deleteColumnHandler}>
          Delete
        </Button>
        <Button
          size="md"
          onClick={props.closeDeleteModal}
          type="submit"
          variant="outline-danger"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteColumnModal;
