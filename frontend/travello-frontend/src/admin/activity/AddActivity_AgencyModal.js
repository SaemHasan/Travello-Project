// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
// import AdminAPI from "../AdminAPI";

export default function AddActivityAgencyModal(props) {
  const [show, setShow] = useState(false);
  const [activities, setActivities] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedAgency, setSelectedAgency] = useState("");
  const [rating, setRating] = useState(0);

  const handleSave = async () => {
    const uploadData = new FormData();
    uploadData.append("activity_id", selectedActivity);
    uploadData.append("agency_id", selectedAgency);
    uploadData.append("rating", rating);
    // console.log("save data to db here");
    await AdminAPI.addActivityAgencyToDB(uploadData)
        .then((res) => {
          console.log(res);
          alert("Activity Agency Added");
        })
        .catch((err) => {
          console.log(err);
          // alert("Error! Please try again.");
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

  useEffect(() => {
    AdminAPI.getAllActivity().then(async (res) => {
      await setActivities(res);
    });
  }, [activities]);

  useEffect(() => {
    AdminAPI.getAllAgency().then(async (res) => {
      await setAgencies(res);
    });
  }, [agencies]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Activity Agency</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Select Agency</Form.Label>
              <Form.Select onChange={(e) => setSelectedAgency(e.target.value)}>
                {agencies.map((type, idx) => (
                  <option key={idx} value={type.agency_id}>
                    {type.agency_name}
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
