// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
// import AdminAPI from "../AdminAPI";

export default function AddFoodTypeModal(props) {
  const [show, setShow] = useState(false);

  const [foods, setFoods] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("food_id", selectedFood);
    uploadData.append("type_id", selectedType);
    // console.log("save data to db here");
    AdminAPI.postToDB(uploadData, "food_types").then((res) => {
      console.log(res);
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

  useEffect(() => {
    AdminAPI.getFromDB("foods").then(async (res) => {
      await setFoods(res);
    });
  }, []);

  useEffect(() => {
    AdminAPI.getFromDB("food_type_tables").then(async (res) => {
      await setTypes(res);
    });
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
          <Modal.Title>Add Spot Type Relation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Select Spot</Form.Label>
              <Form.Select onChange={(e) => setSelectedFood(e.target.value)}>
                {foods.map((type, idx) => (
                  <option key={idx} value={type.food_id}>
                    {type.food_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Select Type</Form.Label>
              <Form.Select onChange={(e) => setSelectedType(e.target.value)}>
                {types.map((type, idx) => (
                  <option key={idx} value={type.type_id}>
                    {type.type_name}
                  </option>
                ))}
              </Form.Select>
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
