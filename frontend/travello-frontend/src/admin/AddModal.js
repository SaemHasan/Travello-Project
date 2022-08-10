// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import AdminAPI from "../AdminAPI";

export default function AddModal(props) {
  const [show, setShow] = useState(false);

  const handleSave = () => {
    const uploadData = new FormData();
    // console.log("save data to db here");
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

  useEffect(() => {
    // console.log("do api call here");
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Activity Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="activity name"
                autoFocus
                // onChange={(e) => setActivityName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                // onChange={(e) => setActivityDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="activity type"
                // onChange={(e) => setActivityType(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="File"
                placeholder="image url"
                // onChange={(e) => setActivityImage(e.target.files[0])}
              />
            </Form.Group>

            {/*<Form.Group className="mb-3" controlId="exampleForm.ControlInput4">*/}
            {/*  <Form.Label>Select Type</Form.Label>*/}
            {/*  <Form.Select*/}
            {/*  onChange={(e) => setTypeID(e.target.value)}*/}
            {/*  >*/}
            {/*    {activityTypes.map((type, idx) => (*/}
            {/*      <option key={idx} value={type.type_id}>*/}
            {/*        {type.type_name}*/}
            {/*      </option>*/}
            {/*    ))}*/}
            {/*  </Form.Select>*/}
            {/*</Form.Group>*/}
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
