import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { allDistricts } from "../spot/BDdistricts";
import AdminAPI from "../AdminAPI";

export default function AddHotelModal(props) {
  const [show, setShow] = useState(false);
  const [allSpots, setAllSpots] = useState([]);
  const [name, setName] = useState("");
  const [short_description, setShort_description] = useState("");
  const [addressline, setAddressline] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [upzila, setUpzila] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [spot_id, setSpot_id] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");

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
    uploadData.append("website", website);
    uploadData.append("email", email);
    uploadData.append("phone_number", phone_number);
    uploadData.append("spot_id", spot_id);

    AdminAPI.addHotelToDB(uploadData)
      .then((res) => {
        console.log("response : ", res);
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
    AdminAPI.getSpots().then(async (res) => {
      await setAllSpots(res);
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
          <Modal.Title>Add Hotel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Hotel name"
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
              <Form.Label>Select Spot</Form.Label>
              <Form.Select onChange={(e) => setSpot_id(e.target.value)}>
                {allSpots.map((type, idx) => (
                  <option key={idx} value={type.spot_id}>
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput10">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="link"
                placeholder="website"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput11">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                onChange={(e) => setPhone_number(e.target.value)}
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
