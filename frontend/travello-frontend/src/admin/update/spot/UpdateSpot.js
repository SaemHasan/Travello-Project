import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../../AdminAPI";
import { allDistricts } from "../../spot/BDdistricts";

export default function UpdateSpotModal(props) {
  const [id, setID] = useState("");
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
    if (image !== "") {
      uploadData.append("image", image, image.name);
    }
    uploadData.append("rating", rating);
    uploadData.append("place_id", place_id);

    AdminAPI.UpdateDB(uploadData, props.type, id)
      .then((res) => {
        console.log("response : ", res);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("save data to db here");
    setShow(false);
    props.handleClose(true);
  };

  const handleClose = () => {
    setShow(false);
    props.handleClose(false);
  };

  useEffect(() => {
    setID(props.item.spot_id);
    setName(props.item.name);
    setShort_description(props.item.short_description);
    if (props.item.address_line !== null) {
      setAddressline(props.item.address_line);
    }
    setDistrict(props.item.district);
    setThana(props.item.thana);
    setUpzila(props.item.upzila);
    setRating(props.item.rating);
    setPlace_id(props.item.place_id);
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
          <Modal.Title>Update Spot</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Spot Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="spot name"
                autoFocus
                value={name}
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
                value={short_description}
                onChange={(e) => setShort_description(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address Line"
                value={addressline}
                onChange={(e) => setAddressline(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
              <Form.Label>Thana</Form.Label>
              <Form.Control
                type="text"
                placeholder="Thana"
                value={thana}
                onChange={(e) => setThana(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
              <Form.Label>Upzila</Form.Label>
              <Form.Control
                type="text"
                placeholder="upzila"
                value={upzila}
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
              <Form.Select
                value={place_id}
                onChange={(e) => setPlace_id(e.target.value)}
              >
                {allPlaces.map((type, idx) => (
                  <option key={idx} value={type.place_id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Select District</Form.Label>
              <Form.Select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
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
                value={rating}
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
