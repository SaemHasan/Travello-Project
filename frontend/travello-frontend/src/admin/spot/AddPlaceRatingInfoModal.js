// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
// import AdminAPI from "../AdminAPI";

export default function AddPlaceRatingModal(props) {
  const [show, setShow] = useState(false);
  const [allplaces, setAllPlaces] = useState([]);
  //for db
  const [selectedPlace, setSelectedPlace] = useState("");
  const [factor, setFactor] = useState(0);
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("factor", factor);
    uploadData.append("start_time", start_time);
    uploadData.append("end_time", end_time);
    uploadData.append("place_id", selectedPlace);

    AdminAPI.addPlaceRatingInfoToDB(uploadData).then((res) => {
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
      const res = await AdminAPI.getPlaces();

      await setAllPlaces(res);
    }

    fetchData().then(() => {
      // console.log("fetch done");
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
          <Modal.Title>Add Place Rating Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput43">
              <Form.Label>Select Place</Form.Label>
              <Form.Select
                onChange={async (e) => await setSelectedPlace(e.target.value)}
              >
                <option value="">Select a place</option>
                {allplaces.map((type, idx) => (
                  <option key={idx} value={type.place_id}>
                    {type.name}
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
