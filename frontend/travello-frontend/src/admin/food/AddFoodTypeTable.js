// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";

export default function AddFoodTypeTableModal(props) {
  const [show, setShow] = useState(false);
  const [type_name, setTypeName] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("type_name", type_name);

    AdminAPI.postToDB(uploadData, "food_type_tables")
      .then((response) => {
        console.log(response);
        alert("Added Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
    setShow(false);
    props.handleClose(props.type);
  };

  const handleClose = () => {
    setShow(false);
    props.handleClose(props.type);
  };

  useEffect(() => {
    setShow(props.show);
    // console.log("show: ", props.show);
  }, [props.show]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Food Type</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="type name"
                autoFocus
                onChange={(e) => setTypeName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
