import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
import AddSpotFoodDetailsModal from "./AddSpotFoodDetails";

export default function AddSpotActivityDetailsModal(props) {
  const [foodShow, setFoodShow] = useState(false);
  const [addMoreActivities, setAddMoreActivities] = useState(false);
  const [allActivityFromUser, setAllActivityFromUser] = useState([]);
  const [show, setShow] = useState(false);
  const [activityTypes, setActivityTypes] = useState([]);
  const [reRender, setReRender] = useState(false);

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

  function saveInputFromUser() {
    if(activityName === ""){
      alert("Please enter activity name");
      return;
    }
    let uploadData = {}
    uploadData.activity_name = activityName;
    uploadData.description = activityDescription;
    if(activityName !==""){
      uploadData.image = activityImage;
    }
    uploadData.type = activityType;
    uploadData.type_id = typeID;
    setAllActivityFromUser([...allActivityFromUser, uploadData]);
  }

  function clearAllVariables() {
    setActivityName("");
    setActivityDescription("");
    setActivityImage("");
    setActivityType("");
    setTypeID("");
  }

  const handleAddMoreActivity = async () => {
    await saveInputFromUser();
    await clearAllVariables();
    // console.log("allActivityFromUser: ", allActivityFromUser);
    setAddMoreActivities(!addMoreActivities);
    setShow(!show);
    setReRender(!reRender);
  }

  const handleNext = async () => {
    // console.log(props.spot);
    if(activityName !== ""){
      await saveInputFromUser();
    }
    await clearAllVariables();
    setShow(false);
    setAddMoreActivities(false);
    setFoodShow(true);
    // props.handleClose();
  };


  const handleClose = () => {
    setActivityName("");
    setActivityImage("");
    setActivityDescription("");
    setActivityType("");
    setTypeID("");
    setShow(false);
    setAddMoreActivities(false);
    // props.handleClose();
  };

  useEffect(() => {
    setShow(props.show);
    // console.log("show: ", props.show);
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
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Activity Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="activity name"
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
                rows={3}
                onChange={(e) => setActivityDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="activity type"
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
              <Form.Select onChange={(e) => setTypeID(e.target.value)}>
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
          <Button variant="secondary" onClick={handleAddMoreActivity}>
            Add Activity
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
      </>
      <>
      <Modal
        show={addMoreActivities}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Activity Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="activity name"
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
                rows={3}
                onChange={(e) => setActivityDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="activity type"
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
              <Form.Select onChange={(e) => setTypeID(e.target.value)}>
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
          <Button variant="secondary" onClick={handleAddMoreActivity}>
            Add Activity
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
      </>
      <>
        {foodShow &&
            <AddSpotFoodDetailsModal
              show={foodShow}
              handleClose={handleClose}
              spot={props.spot}
              activities={allActivityFromUser}
              />
        }
      </>
    </>
  );
}
