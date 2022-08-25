// demo modal for add

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AdminAPI from "../AdminAPI";
import APIService from "../../APIService";
import AddRestaurantModal from "../food/AddRestaurantModal";
import ShowSpotAddConfirmation from "./ShowSpotAddConfirmation";

export default function AddSpotFoodDetailsModal(props) {
  const [allFoodsFromUser, setAllFoodsFromUser] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [showAddRestaurantModal, setShowAddRestaurantModal] = useState(false);

  const [show, setShow] = useState(false);
  const [addMoreFood, setAddMoreFood] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const [foodName, setFoodName] = useState("");
  const [short_description, setShortDescription] = useState("");
  const [image, setImage] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");


  function clearAll() {
    setFoodName("");
    setShortDescription("");
    setImage("");
    setRestaurantId("");
    setPrice("");
    setRating("");
  }

  function saveInputFromUser(){
      if(foodName === "" || restaurantId === "" || price === "" || rating === ""){
            alert("Please enter all fields");
            return;
      }
      let data = {
          food_name: foodName,
          short_description: short_description,
          restaurant_id : restaurantId,
          price: price,
          rating: rating,
      }
      if(image !== ""){
            data.image = image;
      }
      else{
          data.image = "";
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
      setShowNext(true);
  }



  const handleClose = () => {
    setShow(false);
    setAddMoreFood(false);
    props.handleClose();
  };

  const handleAddRestaurant = () => {
    setShowAddRestaurantModal(true);
  };

  const handleCloseAddRestaurant = (t) => {
      APIService.getFromDB("restaurants").then((res) => {
        setAllRestaurants(res);
    });
    setShowAddRestaurantModal(false);
  };

  const handleFoodInfoSave = async (name, des, img) => {
      const uploadData = new FormData();
      uploadData.append("food_name", name);
      uploadData.append("short_description", des);
      if (img !== "") {
          uploadData.append("image", img, img.name);
      }
      let id = -1;
      await AdminAPI.addFoodToDB(uploadData)
          .then((res) => {
              console.log(res);
              id = res.food_id;
              // alert("Added Successfully");
          })

      return id;
  };

  const handleFoodRestaurantSave = async (food_id, res_id, rate) => {
    const uploadData = new FormData();
    uploadData.append("food_id", food_id);
    uploadData.append("restaurant_id", res_id);
    uploadData.append("rating", rate);
    // console.log("save data to db here");
    let id = -1;
    await AdminAPI.postToDB(uploadData, "food_restaurants").then((res) => {
      console.log(res);
      id = res.food_restaurant_id;
      // alert("Added Successfully");
    });
    return id;
  };

  const handleFoodPriceSave = async (p, food_res_id) => {
      const uploadData = new FormData();
      uploadData.append("price", p);
      uploadData.append("food_restaurant_id", food_res_id);

      await AdminAPI.postToDB(uploadData, "food_price_infos").then((res) => {
          console.log(res);
          // alert("Added Successfully");
      });

  };

  const handleSpotFoodSave = async (spotID, foodID) => {
      const uploadData = new FormData();
      uploadData.append("spot_id", spotID);
      uploadData.append("food_id", foodID);
      // console.log("save data to db here");
      await AdminAPI.addSpotFoodToDB(uploadData).then((res) => {
          console.log(res);
          // alert("Added Successfully");
      });
  };

  const handleSpotSave = async (name, des, adLine, dis, thana, upzila, image, rating, place_id) => {
        // const spot = props.spot
        // console.log(spot)
        // const spotName = props.spot.name;
        const uploadData = new FormData();
        // uploadData.append("name", spotName);
        uploadData.append("short_description", des);
        uploadData.append("address_line", adLine);
        uploadData.append("district", dis);
        uploadData.append("thana", thana);
        uploadData.append("upzila", upzila);
        uploadData.append("name", name);
        if(image !== "") {
            uploadData.append("image", image, image.name);
        }
        uploadData.append("rating", rating);
        uploadData.append("place_id", place_id);

        let id = -1;
        await AdminAPI.addSpotToDB(uploadData)
            .then((res) => {
                id = res.spot_id
                console.log("response : ", res);
                // alert("Added Successfully");
            })
        return id;
    };

  const saveFoodToDB = async (spotID) => {
      for (const food of allFoodsFromUser) {
          let food_id = await handleFoodInfoSave(food.food_name, food.short_description, food.image);
          console.log("food id ", food_id);
          let id = await handleFoodRestaurantSave(food_id, food.restaurant_id, food.rating);
          console.log("food restaurant id ", id);
          await handleFoodPriceSave(food.price, id);
          await handleSpotFoodSave(spotID, food_id);
      }
  }

  const handleSave = async () => {
      // console.log()
      let spotid = await handleSpotSave(props.spot.name, props.spot.short_description, props.spot.address_line, props.spot.district, props.spot.thana, props.spot.upzila, props.spot.image, props.spot.rating, props.spot.place_id);
    await saveFoodToDB(spotid);
    await props.handleSave(spotid);
  };

  useEffect(() => {
    setShow(props.show);
    // console.log("show: ", props.show);
  }, [props.show]);

  useEffect(() => {
    APIService.getFromDB("restaurants").then((res) => {
      setAllRestaurants(res);
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
            <Form.Group>
                <Form.Label>Restaurant</Form.Label>
              <Form.Select
                onChange={(e) => setRestaurantId(e.target.value)}
              >
                <option>Select Restaurant</option>
                {allRestaurants.map((restaurant) => (
                  <option value={restaurant.restaurant_id}>
                    {restaurant.restaurant_name}
                  </option>
                ))}
              </Form.Select>

              <Button variant="primary" onClick={handleAddRestaurant}>
                  Add Restaurant</Button>
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

            <Form.Group>
                <Form.Label>Restaurant</Form.Label>
              <Form.Select
                onChange={(e) => setRestaurantId(e.target.value)}
              >
                <option>Select Restaurant</option>
                {allRestaurants.map((restaurant) => (
                  <option value={restaurant.restaurant_id}>
                    {restaurant.restaurant_name}
                  </option>
                ))}
              </Form.Select>

              <Button variant="primary" onClick={handleAddRestaurant}>
                  Add Restaurant</Button>
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
            {showAddRestaurantModal &&
                <AddRestaurantModal
                    show={showAddRestaurantModal}
                    handleClose={handleCloseAddRestaurant}
                />
            }
        </>

        <>
          {showNext &&
            <ShowSpotAddConfirmation
              show={showNext}
              handleClose={handleClose}
              handleSave = {handleSave}
              spot={props.spot}
              activites={props.activities}
              foods = {props.foods}

            />
          }
        </>
    </>
  );
}
