// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";

export default function AddHotelRatingInfoModal(props) {
  const [show, setShow] = useState(false);
  const [hotels, setHotels] = useState([]);
  //for db
  const [selectedHotel, setSelectedHotel] = useState("");
  const [factor, setFactor] = useState(0);
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("factor", factor);
    uploadData.append("start_time", start_time);
    uploadData.append("end_time", end_time);
    uploadData.append("hotel_id", selectedHotel);
    AdminAPI.postToDB(uploadData, "hotel_rating_infos").then((res) => {
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
      const res = await AdminAPI.getFromDB("hotels");
      await setHotels(res);
    }
    fetchData();
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
          <Modal.Title>Add Hotel Rating Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput43">
              <Form.Label>Select Hotel</Form.Label>
              <Form.Select
                onChange={async (e) => await setSelectedHotel(e.target.value)}
              >
                <option value="">Select Hotel</option>
                {hotels.map((type, idx) => (
                  <option key={idx} value={type.hotel_id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Factor</Form.Label>
              <Form.Control
                type="number"
                placeholder="rating factor"
                min="0"
                max="1"
                step="0.1"
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
