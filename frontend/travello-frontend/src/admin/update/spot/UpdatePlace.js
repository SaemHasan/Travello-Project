import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../../AdminAPI";
import { allDistricts } from "../../spot/BDdistricts";

export default function UpdatePlaceModal(props) {
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [short_description, setShort_description] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [district, setDistrict] = useState("");

  const handleSave = () => {
    // console.log(name, short_description, image, rating, district);
    const uploadData = new FormData();
    uploadData.append("name", name);
    uploadData.append("short_description", short_description);
    if (image !== "") {
      uploadData.append("image", image, image.name);
    }

    uploadData.append("rating", rating);
    uploadData.append("district", district);

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
    setId(props.item.place_id);
    setName(props.item.name);
    setShort_description(props.item.short_description);
    setDistrict(props.item.district);
    setRating(props.item.rating);
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
          <Modal.Title>Add Place</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Place Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="place name"
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="File"
                placeholder="image url"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
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
