import react, { useContext } from "react";
import { Modal, Container, Button, Form } from "react-bootstrap";
import AuthContext from "../store/auth-context";
import { axiosInstance, url } from "../store/api";

const DeleteColumnModal = (props) => {
  const authCtx = useContext(AuthContext);
  let targetCol = props.formColumns.find(
    (col) => col.id == props.showDeleteModal.id
  );

  const deleteColumnHandler = () => {
    //!remove TEMP part of this if not in use
    switch (true) {
      case targetCol !== undefined && targetCol.id.toString().includes("temp"):
        let data = [...props.formColumns].filter((col) => col !== targetCol);
        props.setFormColumns(data);
        props.closeDeleteModal();
        break;
      case targetCol !== undefined && !targetCol.id.toString().includes("temp"):
        axiosInstance
          .delete(`${url}/column/${targetCol.id}/delete/`, {
            headers: { Authorization: "Bearer " + authCtx.access },
          })
          .then((res) => {
            if (res.status == 204) {
              let data = [...props.formColumns].filter(
                (col) => col !== targetCol
              );
              props.closeDeleteModal();
              props.setFormColumns(data);
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
