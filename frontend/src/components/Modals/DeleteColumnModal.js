import react, { useContext } from "react";
import { Modal, Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../store/auth-context";

const DeleteColumnModal = (props) => {
  const authCtx = useContext(AuthContext);
  console.log(props);

  const url = "http://localhost:8000/api";
  const axiosInstance = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
      Authorization: "Bearer " + authCtx.access,
    },
  });

  const deleteColumnHandler = () => {
    let targetCol = props.targetCol;

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
    <Modal size={"sm"} centered show={props.showDeleteModal}>
      <Modal.Header closeButton onHide={props.closeDeleteModal}>
        <Modal.Title>Delete column "{props.targetCol.name}?"</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>{props.targetCol.tickets.length > 0 ? (<span>This action cannot be undone. NOTE: All {props.targetCol.tickets.length} tickets from in this column will be deleted. Move the tickets to another column to avoid data loss.</span>) : (<span>This action cannot be undone.</span>)}</Container>
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
