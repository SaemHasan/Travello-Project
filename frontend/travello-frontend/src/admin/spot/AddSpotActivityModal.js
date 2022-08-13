// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
// import AdminAPI from "../AdminAPI";

export default function AddSpotActivityModal(props) {
  const [show, setShow] = useState(false);

  const [spots, setSpots] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("spot_id", selectedSpot);
    uploadData.append("activity_id", selectedActivity);
    // console.log("save data to db here");
    AdminAPI.addSpotActivityToDB(uploadData).then((res) => {
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
    AdminAPI.getSpots().then(async (res) => {
      await setSpots(res);
    });
  }, []);

  useEffect(() => {
    AdminAPI.getAllActivity().then(async (res) => {
      await setActivities(res);
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
          <Modal.Title>Add Spot Activity Relation</Modal.Title>
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
              <Form.Label>Select Activity</Form.Label>
              <Form.Select
                onChange={(e) => setSelectedActivity(e.target.value)}
              >
                {activities.map((type, idx) => (
                  <option key={idx} value={type.activity_id}>
                    {type.activity_name}
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
