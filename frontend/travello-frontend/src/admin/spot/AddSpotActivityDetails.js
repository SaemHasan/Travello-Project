import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
import AddSpotFoodDetailsModal from "./AddSpotFoodDetails";
import APIService from "../../APIService";
import AddAgencyModal from "../activity/AddAgencyModal";
import AddActivityTypeModal from "../activity/AddActivityTypeModal";

export default function AddSpotActivityDetailsModal(props) {
  const [foodShow, setFoodShow] = useState(false);
  const [addMoreActivities, setAddMoreActivities] = useState(false);
  const [allActivityFromUser, setAllActivityFromUser] = useState([]);
  const [show, setShow] = useState(false);
  const [activityTypes, setActivityTypes] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [agencies, setAgencies] = useState([]);
  const [showAddAgency, setShowAddAgency] = useState(false);
  const [showAddType, setShowAddType] = useState(false);

  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [activityImage, setActivityImage] = useState("");
  const [activityType, setActivityType] = useState("");
  const [typeID, setTypeID] = useState("");
  const [agencyID, setAgencyID] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");



  function saveInputFromUser() {
    if(activityName === "" || agencyID === "" || typeID === "" || price === "" || rating === "") {
      alert("Please enter all fields");
      return;
    }
    let uploadData = {}
    uploadData.activity_name = activityName;
    uploadData.description = activityDescription;
    uploadData.image = activityImage;
    uploadData.type = activityType;
    uploadData.type_id = typeID;
    uploadData.agency_id = agencyID;
    uploadData.price = price;
    uploadData.rating = rating;
    setAllActivityFromUser([...allActivityFromUser, uploadData]);
  }

  function clearAllVariables() {
    setActivityName("");
    setActivityDescription("");
    setActivityImage("");
    setActivityType("");
    setTypeID("");
    setAgencyID("");
    setPrice("");
    setRating("");
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

  const handleAddAgency = () => {
    setShowAddAgency(true);
  }

  const handleCloseAddAgency = (t) => {
    APIService.getFromDB("agencies").then(async (agencies) => {
      await setAgencies(agencies);
    });
    setShowAddAgency(false);
  }

  const handleAddType = () => {
    setShowAddType(true);
  }

  const handleCloseAddType = (t) => {
    AdminAPI.getActivityTypes()
      .then(async (activityTypes) => {
        await setActivityTypes(activityTypes);
      })
      .catch((err) => {
        console.log(err);
      });

    setShowAddType(false);
  }

  const getActivityTypeObj = (typeid) => {
    for (let i = 0; i < activityTypes.length; i++) {
      if (activityTypes[i].type_id === parseInt(typeid)) {
        // console.log("activity type: ", activityTypes[i]);
        return activityTypes[i];
      }
    }
  };

  const handleActivitySave = async (typeID, name, des, img, actType) => {
    const type = getActivityTypeObj(typeID);

    const uploadData = new FormData();
    uploadData.append("activity_name", name);
    uploadData.append("description", des);
    if (img !== "") {
      uploadData.append("image", img, img.name);
    }
    uploadData.append("type", actType);
    uploadData.append("type_id", type.type_id);

    let id = -1;
    await AdminAPI.addActivityToDB(uploadData)
        .then((res) => {
          id = res.activity_id
          console.log("response : ", res);
        })

    return id;
  };

  const handleActivityAgencySave = async (activityID, agencyID, rating) => {
    const uploadData = new FormData();
    uploadData.append("activity_id", activityID);
    uploadData.append("agency_id", agencyID);
    uploadData.append("rating", rating);
    // console.log("save data to db here");
    let id = -1;
    await AdminAPI.addActivityAgencyToDB(uploadData)
        .then((res) => {
          id = res.activity_agency_id
          console.log(res);
          // alert("Activity Agency Added");
        })
    return id;
  };

  const handleActivityPriceSave = async (price, id) => {
    const uploadData = new FormData();
    uploadData.append("price", price);
    uploadData.append("activity_agency_id", id);
    // console.log("uploadData: ", price, "selected: ", selectedActivityAgency);
    await AdminAPI.addActivityPriceInfoToDB(uploadData)
        .then((res) => {
          console.log(res);
          // alert("Activity Price Added Successfully");
        })
  };

  const handleSpotActivitySave = (spotid, activityID) => {
    const uploadData = new FormData();
    uploadData.append("spot_id", spotid);
    uploadData.append("activity_id", activityID);
    // console.log("save data to db here");
    AdminAPI.addSpotActivityToDB(uploadData).then((res) => {
      console.log(res);

    });
  };

  const saveActivitiesToDB = async (spotID) => {
    for (const activity of allActivityFromUser) {
      const activity_id = await handleActivitySave(activity.type_id, activity.activity_name, activity.description, activity.image, activity.type);
      console.log("activity_id: ", activity_id);
      const activity_agency_id = await handleActivityAgencySave(activity_id, activity.agency_id, activity.rating);
      console.log("activity_agency_id: ", activity_agency_id);
      await handleActivityPriceSave(activity.price, activity_agency_id);
      await handleSpotActivitySave(spotID, activity_id);
    }
  }

  const handleSave = async (spotID) => {
    await saveActivitiesToDB(spotID);
    alert("Added Successfully");
  }

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

    APIService.getFromDB("agencies").then(async (agencies) => {
      await setAgencies(agencies);
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
                <option>Select Type</option>
                {activityTypes.map((type, idx) => (
                  <option key={idx} value={type.type_id}>
                    {type.type_name}
                  </option>
                ))}
              </Form.Select>
              <Button variant="primary" onClick={handleAddType}>
                Add Type</Button>
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Agency</Form.Label>
                <Form.Select onChange={(e) => setAgencyID(e.target.value)}>
                  <option value={0}>Select Agency</option>
                    {agencies.map((agency, idx) => (
                    <option key={idx} value={agency.agency_id}>
                        {agency.agency_name}
                    </option>
                    ))}
                </Form.Select>
              <Button variant="primary" onClick={handleAddAgency}>
                Add Agency
              </Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput55">
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              />
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
              <Button variant="primary" onClick={handleAddType}>
                Add Type</Button>
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Agency</Form.Label>
                <Form.Select onChange={(e) => setAgencyID(e.target.value)}>
                  <option value={0}>Select Agency</option>
                    {agencies.map((agency, idx) => (
                    <option key={idx} value={agency.agency_id}>
                        {agency.agency_name}
                    </option>
                    ))}
                </Form.Select>
              <Button variant="primary" onClick={handleAddAgency}>
                Add Agency
              </Button>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput55">
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              />
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
              handleSave={handleSave}
              spot={props.spot}
              activities={allActivityFromUser}
              />
        }
      </>

      <>
        {
          showAddAgency &&
            <AddAgencyModal
              show={showAddAgency}
              handleClose={handleCloseAddAgency}
            />
        }
      </>
      <>
        {
          showAddType &&
            <AddActivityTypeModal
                show={showAddType}
                handleClose={handleCloseAddType} />
        }
      </>
    </>
  );
}
