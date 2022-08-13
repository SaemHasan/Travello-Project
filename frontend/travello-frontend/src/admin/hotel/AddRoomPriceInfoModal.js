// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";

export default function AddRoomPriceInfoModal(props) {
  const [show, setShow] = useState(false);
  const [rooms, setRooms] = useState([]);
  //for db
  const [selectedRoom, setSelectedRoom] = useState("");
  const [price, setPrice] = useState(0);
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("price", price);
    uploadData.append("start_time", start_time);
    uploadData.append("end_time", end_time);
    uploadData.append("room_id", selectedRoom);
    AdminAPI.postToDB(uploadData, "room_price_infos").then((res) => {
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
      const res = await AdminAPI.getFromDB("rooms");
      await setRooms(res);
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
          <Modal.Title>Add Room Price Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput43">
              <Form.Label>Select Room</Form.Label>
              <Form.Select
                onChange={async (e) => await setSelectedRoom(e.target.value)}
              >
                <option value="">Select Room No</option>
                {rooms.map((type, idx) => (
                  <option key={idx} value={type.room_id}>
                    {type.room_no}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Room Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="room price"
                onChange={(e) => setPrice(e.target.value)}
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
