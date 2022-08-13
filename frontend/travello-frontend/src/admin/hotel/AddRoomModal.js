import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";

export default function AddRoomModal(props) {
  const [show, setShow] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [room_type, setRoom_type] = useState("");
  const [image, setImage] = useState("");
  const [room_no, setRoom_no] = useState("");
  const [selectedhotel, setSelectedhotel] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("hotel_id", selectedhotel);
    uploadData.append("room_no", room_no);
    uploadData.append("image", image, image.name);
    uploadData.append("room_type", room_type);

    AdminAPI.postToDB(uploadData, "rooms")
      .then((res) => {
        console.log("response : ", res);
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
    AdminAPI.getFromDB("hotels").then((res) => {
      setHotels(res);
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
          <Modal.Title>Add Room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Select Hotel</Form.Label>
              <Form.Select onChange={(e) => setSelectedhotel(e.target.value)}>
                {hotels.map((type, idx) => (
                  <option key={idx} value={type.hotel_id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Room No</Form.Label>
              <Form.Control
                type="number"
                placeholder="room no"
                onChange={(e) => setRoom_no(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Room Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="room type"
                onChange={(e) => setRoom_type(e.target.value)}
              />
            </Form.Group>

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
