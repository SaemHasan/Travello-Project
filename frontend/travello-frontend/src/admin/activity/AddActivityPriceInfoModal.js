// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
// import AdminAPI from "../AdminAPI";

export default function AddActivityPriceModal(props) {
  const [show, setShow] = useState(false);
  const [activity_agency, setActivityAgency] = useState([]);
  const [activity, setActivity] = useState([]);
  const [agency, setAgency] = useState([]);
  //for db
  const [selectedActivityAgency, setSelectedActivityAgency] = useState("");
  const [price, setPrice] = useState(0);
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const handleSave = () => {
    const uploadData = new FormData();
    uploadData.append("price", price);
    uploadData.append("start_time", start_time);
    uploadData.append("end_time", end_time);
    uploadData.append("activity_agency_id", selectedActivityAgency);
    // console.log("uploadData: ", price, "selected: ", selectedActivityAgency);
    AdminAPI.addActivityPriceInfoToDB(uploadData).then((res) => {
      console.log(res);
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
    async function fetchData() {
      const res = await AdminAPI.getAll_Activity_Agency();
      // console.log(res);
      await setActivityAgency(res.map((item) => item.activity_agency_id));

      // console.log("activity_agency: ", activity_agency);
      let actArray = [];
      let agenArray = [];

      actArray = await AdminAPI.getActivityFromid(
        res.map((item) => item.activity_id)
      );

      // console.log(actArray);
      agenArray = await AdminAPI.getAgencyFromid(
        res.map((item) => item.agency_id)
      );
      // console.log(agenArray);

      await setActivity(actArray);
      await setAgency(agenArray);
      // console.log("activity: ", activity);
      // console.log("agency: ", agency);
    }

    fetchData().then(() => {
      // console.log("fetch done");
    });
    // console.log("do api call here");
    // console.log("agency : ", agency);
    // console.log("activity : ", activity);
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
          <Modal.Title>Add Activity Price Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput43">
              <Form.Label>Select Activity Agency</Form.Label>
              <Form.Select
                onChange={async (e) =>
                  await setSelectedActivityAgency(e.target.value)
                }
              >
                <option value="">Select Activity Agency</option>
                {activity_agency.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type +
                      ": Activity: " +
                      activity[idx] +
                      "  Agency: " +
                      agency[idx] +
                      " "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Activity Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="activity price"
                autoFocus
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="start time"
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput22">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="end time"
                onChange={(e) => setEndTime(e.target.value)}
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
