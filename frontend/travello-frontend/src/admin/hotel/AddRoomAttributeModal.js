import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";

export default function AddRoomAttributeModal(props) {
  const [show, setShow] = useState(false);
  const [attribute_name, setAttribute_name] = useState("");
  const [attribute_value, setAttribute_value] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("attribute_name", attribute_name);
    uploadData.append("attribute_value", attribute_value);

    AdminAPI.postToDB(uploadData, "room_attributes")
      .then((response) => {
        console.log(response);
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

  const handleShow = () => setShow(true);

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
          <Modal.Title>Add Room Attribute</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Attribute Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="attribute name"
                autoFocus
                onChange={(e) => setAttribute_name(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Attribute Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="attribute value"
                onChange={(e) => setAttribute_value(e.target.value)}
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
