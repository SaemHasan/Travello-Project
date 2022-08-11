// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
// import AdminAPI from "../AdminAPI";

export default function AddSpotFoodModal(props) {
  const [show, setShow] = useState(false);

  const [spots, setSpots] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState("");
  const [selectedFood, setSelectedFood] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("spot_id", selectedSpot);
    uploadData.append("food_id", selectedFood);
    // console.log("save data to db here");
    AdminAPI.addSpotFoodToDB(uploadData).then((res) => {
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
    AdminAPI.getSpots().then(async (res) => {
      await setSpots(res);
    });
  }, []);

  useEffect(() => {
    AdminAPI.getAllFoods().then(async (res) => {
      await setFoods(res);
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
          <Modal.Title>Add Spot Food Relation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Select Spot</Form.Label>
              <Form.Select onChange={(e) => setSelectedSpot(e.target.value)}>
                {spots.map((type, idx) => (
                  <option key={idx} value={type.spot_id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Select Food</Form.Label>
              <Form.Select onChange={(e) => setSelectedFood(e.target.value)}>
                {foods.map((type, idx) => (
                  <option key={idx} value={type.food_id}>
                    {type.food_name}
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
