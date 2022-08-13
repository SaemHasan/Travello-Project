import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { allDistricts } from "./BDdistricts";
import AdminAPI from "../AdminAPI";

export default function AddSpotModal(props) {
  const [show, setShow] = useState(false);
  const [allPlaces, setAllPlaces] = useState([]);
  const [name, setName] = useState("");
  const [short_description, setShort_description] = useState("");
  const [addressline, setAddressline] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [upzila, setUpzila] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [place_id, setPlace_id] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("name", name);
    uploadData.append("short_description", short_description);
    uploadData.append("address_line", addressline);
    uploadData.append("district", district);
    uploadData.append("thana", thana);
    uploadData.append("upzila", upzila);
    uploadData.append("image", image, image.name);
    uploadData.append("rating", rating);
    uploadData.append("place_id", place_id);

    AdminAPI.addSpotToDB(uploadData)
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
    // console.log("do api call here");
    AdminAPI.getPlaces().then(async (res) => {
      await setAllPlaces(res);
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
          <Modal.Title>Add Spot</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Spot Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="spot name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setShort_description(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address Line"
                onChange={(e) => setAddressline(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
              <Form.Label>Thana</Form.Label>
              <Form.Control
                type="text"
                placeholder="Thana"
                onChange={(e) => setThana(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
              <Form.Label>Upzila</Form.Label>
              <Form.Control
                type="text"
                placeholder="upzila"
                onChange={(e) => setUpzila(e.target.value)}
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Select Place</Form.Label>
              <Form.Select onChange={(e) => setPlace_id(e.target.value)}>
                {allPlaces.map((type, idx) => (
                  <option key={idx} value={type.place_id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Select District</Form.Label>
              <Form.Select onChange={(e) => setDistrict(e.target.value)}>
                {allDistricts.map((type, idx) => (
                  <option key={idx} value={type.name}>
                    {type.name}
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
