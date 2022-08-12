// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../../AdminAPI";

export default function UpdateActivityTypeModal(props) {
  const [show, setShow] = useState(false);
  const [type_name, setTypeName] = useState("");
  const [id, setId] = useState("");

  const handleSave = () => {
    // const uploadData = { type_name: type_name };
    const uploadData = new FormData();
    uploadData.append("type_name", type_name);

    AdminAPI.UpdateDB(uploadData, props.type, id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setShow(false);
    props.handleClose(true);
  };

  const handleClose = () => {
    setShow(false);
    props.handleClose(false);
  };

  useEffect(() => {
    setShow(props.show);
    setId(props.item.type_id);
    setTypeName(props.item.type_name);
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
          <Modal.Title>Update Activity Type</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>ID : {id}</h3>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="type name"
                value={type_name}
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
