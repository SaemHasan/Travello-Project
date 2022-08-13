// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";

export default function AddFoodModal(props) {
  const [show, setShow] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("food_name", foodName);
    uploadData.append("short_description", short_description);
    uploadData.append("image", image, image.name);

    AdminAPI.addFoodToDB(uploadData)
      .then((res) => {
        console.log(res);
        alert("Added Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
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
    console.log("do api call here");
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
          <Modal.Title>Add Food</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="food name"
                autoFocus
                onChange={(e) => setFoodName(e.target.value)}
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
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </Form.Group>
            {/*<Form.Group className="mb-3" controlId="exampleForm.ControlInput2">*/}
            {/*  <Form.Label>Type</Form.Label>*/}
            {/*  <Form.Control*/}
            {/*    type="text"*/}
            {/*    placeholder="activity type"*/}
            {/*    // onChange={(e) => setActivityType(e.target.value)}*/}
            {/*  />*/}
            {/*</Form.Group>*/}

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="File"
                placeholder="image url"
                onChange={(e) => setImage(e.target.files[0])}
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
