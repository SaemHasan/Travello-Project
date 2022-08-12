import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../../AdminAPI";

export default function UpdateActivityModal(props) {
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [activityTypes, setActivityTypes] = useState([]);

  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [activityImage, setActivityImage] = useState("");
  const [activityType, setActivityType] = useState("");
  const [typeID, setTypeID] = useState("");

  const getActivityTypeObj = (typeid) => {
    for (let i = 0; i < activityTypes.length; i++) {
      if (activityTypes[i].type_id === parseInt(typeid)) {
        // console.log("activity type: ", activityTypes[i]);
        return activityTypes[i];
      }
    }
  };

  const handleSave = () => {
    const type = getActivityTypeObj(typeID);
    console.log("Image: ", activityImage);
    const uploadData = new FormData();
    uploadData.append("activity_name", activityName);
    uploadData.append("description", activityDescription);
    if (activityImage !== null)
      uploadData.append("image", activityImage, activityImage.name);
    uploadData.append("type", activityType);
    uploadData.append("type_id", type.type_id);

    AdminAPI.UpdateDB(uploadData, props.type, id)
      .then((res) => {
        console.log("response : ", res);
      })
      .catch((err) => {
        console.log(err);
      });
    setShow(false);
    props.handleClose(true);
  };

  const handleClose = () => {
    setShow(false);
    props.handleClose(false);
  };

  useEffect(() => {
    setActivityName(props.item.activity_name);
    setActivityType(props.item.type);
    setActivityDescription(props.item.description);
    setActivityImage(props.item.image);
    setTypeID(props.item.type_id);
    setId(props.item.activity_id);
    setShow(props.show);
  }, [props.show]);

  useEffect(() => {
    AdminAPI.getActivityTypes()
      .then(async (activityTypes) => {
        await setActivityTypes(activityTypes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/*<Button variant="primary" onClick={handleShow}>*/}
      {/*  Add Activity*/}
      {/*</Button>*/}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Activity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Activity Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="activity name"
                value={activityName}
                autoFocus
                onChange={(e) => setActivityName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={activityDescription}
                rows={3}
                onChange={(e) => setActivityDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="activity type"
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="File"
                placeholder="image url"
                onChange={(e) => setActivityImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Select Type</Form.Label>
              <Form.Select
                value={typeID}
                onChange={(e) => setTypeID(e.target.value)}
              >
                {activityTypes.map((type, idx) => (
                  <option key={idx} value={type.type_id}>
                    {type.type_name}
                  </option>
                ))}
              </Form.Select>
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
