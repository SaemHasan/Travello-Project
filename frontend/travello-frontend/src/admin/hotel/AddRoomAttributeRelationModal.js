// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
// import AdminAPI from "../AdminAPI";

export default function AddRoomAttributeRelationModal(props) {
  const [show, setShow] = useState(false);

  const [rooms, setRooms] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [value, setValue] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("room_id", selectedRoom);
    uploadData.append("attribute_id", selectedAttribute);
    uploadData.append("value", value);
    // console.log("save data to db here");
    AdminAPI.postToDB(uploadData, "room_attribute_tables").then((res) => {
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
    AdminAPI.getFromDB("rooms").then(async (res) => {
      await setRooms(res);
    });
  }, []);

  useEffect(() => {
    AdminAPI.getFromDB("room_attributes").then(async (res) => {
      await setAttributes(res);
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
          <Modal.Title>Add Room Attribute Relation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Select Room No</Form.Label>
              <Form.Select onChange={(e) => setSelectedRoom(e.target.value)}>
                <option value="">Select Room No</option>
                {rooms.map((type, idx) => (
                  <option key={idx} value={type.room_id}>
                    {type.room_no}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Select Attribite</Form.Label>
              <Form.Select
                onChange={(e) => setSelectedAttribute(e.target.value)}
              >
                <option value="">Select Attribute</option>
                {attributes.map((type, idx) => (
                  <option key={idx} value={type.attribute_id}>
                    {type.attribute_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Attribute Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="relation value"
                onChange={(e) => setValue(e.target.value)}
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
