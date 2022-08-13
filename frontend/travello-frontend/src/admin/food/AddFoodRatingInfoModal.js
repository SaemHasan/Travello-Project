// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
// import AdminAPI from "../AdminAPI";

export default function AddFoodRatingModal(props) {
  const [show, setShow] = useState(false);
  const [food_restaurant, setFoodRestaurant] = useState([]);
  const [food, setFood] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  //for db
  const [selectedFoodRestaurant, setSelectedFoodRestaurant] = useState("");
  const [factor, setFactor] = useState(0);
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("factor", factor);
    uploadData.append("start_date", start_time);
    uploadData.append("end_date", end_time);
    uploadData.append("food_restaurant_id", selectedFoodRestaurant);

    AdminAPI.postToDB(uploadData, "food_rating_infos").then((res) => {
      console.log(res);
      alert("Added Successfully");
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
    async function fetchData() {
      const res = await AdminAPI.getFromDB("food_restaurants");
      // console.log(res);
      await setFoodRestaurant(res.map((item) => item.food_restaurant_id));

      // console.log("activity_agency: ", activity_agency);
      let foodArray = [];
      let resArray = [];

      foodArray = await AdminAPI.getFoodFromids(
        res.map((item) => item.food_id)
      );

      resArray = await AdminAPI.getRestaurantFromids(
        res.map((item) => item.restaurant_id)
      );

      await setFood(foodArray);
      await setRestaurant(resArray);
    }

    fetchData().then(() => {
      // console.log("fetch done");
    });
    // console.log("do api call here");
    // console.log("agency : ", agency);
    // console.log("activity : ", activity);
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
          <Modal.Title>Add Food Rating Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput43">
              <Form.Label>Select Food Restaurant</Form.Label>
              <Form.Select
                onChange={async (e) =>
                  await setSelectedFoodRestaurant(e.target.value)
                }
              >
                <option value="">Select Food Restaurant</option>
                {food_restaurant.map((type, idx) => (
                  <option key={idx} value={type}>
                    {"Food: " + food[idx] + "  Restaurant: " + restaurant[idx]}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label>Rating Factor</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                max="1"
                placeholder="factor"
                onChange={(e) => setFactor(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="start time"
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput22">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="end time"
                onChange={(e) => setEndTime(e.target.value)}
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
