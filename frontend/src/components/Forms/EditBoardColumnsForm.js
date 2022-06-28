import react, { useContext, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "./EditBoardColumnsForm.css";
import DataContext from "../store/data-context";
import { Trash } from "phosphor-react";

const EditBoardColumnsForm = () => {
  const dataCtx = useContext(DataContext);

  const [formColumns, setFormColumns] = useState(
    dataCtx.activeBoardData.columns
  );

  const [columnCount, setColumnCount] = useState(formColumns.length);

  const addColumnHandler = () => {
    let newColumn = {name: "", position: formColumns.length}
    setFormColumns([...formColumns, newColumn])
    setColumnCount(formColumns.length);
  };

  const MappedColumns = () => {

    return formColumns
      .sort((a, b) => {
        return a.position - b.position;
      })
      .map((col, i) => (
        <Row className="form-column text-center">
          <Col xl={2} lg={2} md={2} sm={2} xs={2}>
            <Form.Group controlId="formPosition" className="mt-2">
              <Form.Control
                type="number"
                min="0"
                max={columnCount}
                defaultValue={col.position}
              />
            </Form.Group>
          </Col>
          <Col xl={8} lg={8} md={8} sm={8} xs={8}>
            <Form.Group controlId="columnName" className="mt-2">
              <Form.Control
                type="text"
                className="column-name"
                defaultValue={col.name}
              />
            </Form.Group>
          </Col>
          <Col xl={1} lg={1} md={1} sm={1} xs={1} className="pt-2">
            <Trash size={22} color="#b80a0a" className="delete-button" />
          </Col>
        </Row>
      ));
  };

  return (
    <Form>
      <Row className="mt-3">
        <Col xl={2} lg={2} md={2} sm={2} xs={2}>
          <h6 className="text-decoration-underline">Position</h6>
        </Col>
        <Col xl={8} lg={8} md={8} sm={8} xs={8}>
          <h6 className="text-decoration-underline">Column name</h6>
        </Col>
        <Col xl={1} lg={1} md={1} sm={1} xs={1}></Col>
      </Row>
      <Col></Col>
      <MappedColumns />
      <Button
        onClick={addColumnHandler}
        className="mt-3"
        variant="outline-primary"
      >
        Add column
      </Button>
    </Form>
  );
};

export default EditBoardColumnsForm;
