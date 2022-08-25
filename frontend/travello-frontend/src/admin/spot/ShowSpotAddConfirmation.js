import {Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import AdminAPI from "../AdminAPI";

export default function ShowSpotAddConfirmation(props){
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        props.handleClose();
    };



    const handleSave = async () => {
        // console.log("props.spot : ", props.spot);
        props.handleSave();
        setShow(false);
    };

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

   return (
       <Modal
       show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
       >
           <Modal.Header closeButton>
            <Modal.Title> Spot Add Preview</Modal.Title>
          </Modal.Header>

           <Modal.Body>
              <div>
                <h1>Spot Added!</h1>
                <p>Thanks for adding a spot to the map. We'll review it and add it to the map shortly.</p>
                <p>Want to add another spot? <a href="/add">Click here</a></p>
              </div>
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

   )
}