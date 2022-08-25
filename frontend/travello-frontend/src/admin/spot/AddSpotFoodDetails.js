// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";

export default function AddSpotFoodDetailsModal(props) {
  const [allFoodsFromUser, setAllFoodsFromUser] = useState([]);
  const [show, setShow] = useState(false);
  const [addMoreFood, setAddMoreFood] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [image, setImage] = useState("");


  function clearAll() {
    setFoodName("");
    setShortDescription("");
    setImage("");
  }

  function saveInputFromUser(){
      if(foodName === ""){
            alert("Please enter food name");
            return;
      }
      let data = {
          food_name: foodName,
          short_description: short_description
      }
      if(image !== ""){
            data.image = image;
      }
      setAllFoodsFromUser([...allFoodsFromUser, data]);
  }

  const handleAddMoreFood = async () => {
      await saveInputFromUser();
      clearAll();
      setShow(!show);
      setAddMoreFood(!addMoreFood);
  }

  const handleNext = async () => {
      if(foodName !== ""){
            await saveInputFromUser();
      }
      clearAll();
      setShow(false);
      setAddMoreFood(false);
  }



  const handleClose = () => {
    setShow(false);
    setAddMoreFood(false);
    props.handleClose();
  };

  useEffect(() => {
    setShow(props.show);
    // console.log("show: ", props.show);
  }, [props.show]);


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
          <Modal.Title>Add Food</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="food name"
                autoFocus
                onChange={(e) => setFoodName(e.target.value)}
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
                onChange={(e) => setShortDescription(e.target.value)}
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
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddMoreFood}>
            Add More Food
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
            </>
            <>
              <Modal
        show={addMoreFood}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Food</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="food name"
                autoFocus
                onChange={(e) => setFoodName(e.target.value)}
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
                onChange={(e) => setShortDescription(e.target.value)}
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
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddMoreFood}>
            Add More Food
          </Button>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
            </>
    </>
  );
}
