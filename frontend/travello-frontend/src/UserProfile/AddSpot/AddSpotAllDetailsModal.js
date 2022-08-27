import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../../admin/AdminAPI";
import {allDistricts} from "./BDdistricts";
import AddSpotActivityDetailsModal from "./AddSpotActivityDetails";

export default function AddSpotDetailsModal(props) {
  const [activityShow, setActivityShow] = useState(false);
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
  const [spotData, setSpotData] = useState({});
  const handleNext = () => {

    if(name ==="" || place_id ===""){
      alert("Please fill name and place");
      return;
    }
    let uploadData = {}
    uploadData.name = name
    uploadData.short_description = short_description
    uploadData.address_line = addressline
    uploadData.district = district
    uploadData.thana = thana
    uploadData.upzila = upzila
    uploadData.image = image
    uploadData.rating = rating
    uploadData.place_id = place_id

    setSpotData(uploadData)
    setShow(false);
    setActivityShow(true);
  };

  const handleClose = () => {
    setShow(false);
    props.handleClose();
  };




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
                <option value="">Select A Place</option>
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
                <option value="">Select A District</option>
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
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
        </>
      <>
        {activityShow && (
          <AddSpotActivityDetailsModal
              handleClose={handleClose}
            show={activityShow}
            spot = {spotData}
          />
        )}
      </>


    </>
  );
}
