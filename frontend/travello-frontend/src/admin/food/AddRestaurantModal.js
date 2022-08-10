import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { allDistricts } from "../spot/BDdistricts";
import AdminAPI from "../AdminAPI";

export default function AddRestaurantModal(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [addressline, setAddressline] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [upzila, setUpzila] = useState("");
  const [image, setImage] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("restaurant_name", name);
    uploadData.append("address_line", addressline);
    uploadData.append("district", district);
    uploadData.append("thana", thana);
    uploadData.append("upzila", upzila);
    uploadData.append("image", image, image.name);
    uploadData.append("website", website);
    uploadData.append("email", email);
    uploadData.append("phone_number", phone_number);

    AdminAPI.addRestaurantToDB(uploadData)
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

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Restaurant</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Restaurant name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
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
