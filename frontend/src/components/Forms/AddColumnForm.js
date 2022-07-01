import react, { useContext, useRef } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../store/auth-context";
import DataContext from "../store/data-context";

const AddColumnForm = () => {
  const authCtx = useContext(AuthContext);
  const dataCtx = useContext(DataContext);
  const url = "http://localhost:8000/api/";

  console.log(dataCtx);

  const nameRef = useRef();

  const submitHandler = (e) => {
    console.log("submitted");
    const name = nameRef.current.value;
    console.log(name);
    e.preventDefault();
    const axiosInstance = axios.create({
      baseURL: url,
      timeout: 5000,
      headers: {
        Authorization: "Bearer " + authCtx.access,
      },
    });

    axiosInstance
      .post(`${url}column/create/`, {
        board: dataCtx.activeBoardData.id,
        name: name,
        position: dataCtx.activeBoardData.columns.length,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Row className="text-center">
      <Form onSubmit={submitHandler} id="addColumnForm">
        <Form.Group className="mt-2">
          <Form.Label>Column name</Form.Label>
          <Form.Control type="text" className="column-name" ref={nameRef} />
        </Form.Group>
      </Form>
    </Row>
  );
};

export default AddColumnForm;
