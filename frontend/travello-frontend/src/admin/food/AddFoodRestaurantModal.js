// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
// import AdminAPI from "../AdminAPI";

export default function AddFoodRestaurantModal(props) {
  const [show, setShow] = useState(false);
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [rating, setRating] = useState(0);

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("food_id", selectedFood);
    uploadData.append("restaurant_id", selectedRestaurant);
    uploadData.append("rating", rating);
    // console.log("save data to db here");
    AdminAPI.postToDB(uploadData, "food_restaurants").then((res) => {
      console.log(res);
      alert("Added Successfully");
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
    AdminAPI.getFromDB("restaurants").then(async (res) => {
      await setRestaurants(res);
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
          <Modal.Title>Add Food Restaurant</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Select Restaurant</Form.Label>
              <Form.Select
                onChange={(e) => setSelectedRestaurant(e.target.value)}
              >
                {restaurants.map((type, idx) => (
                  <option key={idx} value={type.restaurant_id}>
                    {type.restaurant_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="rating"
                onChange={(e) => setRating(e.target.value)}
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
