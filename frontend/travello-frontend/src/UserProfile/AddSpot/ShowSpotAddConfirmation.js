import {Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Rating} from "@mui/material";

export default function ShowSpotAddConfirmation(props) {
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
                <div className="container">
                    <div className="row">
                        {/*<h1>Spot Details</h1>*/}
                        <h4>Spot Name: {props.spot.name}</h4>
                        {props.spot.short_description && <p>Spot Description: {props.spot.short_description}</p>}
                        {props.spot.address_line && <p>Address Line : {props.spot.address_line}</p>}
                        {props.spot.district && <p>District : {props.spot.district}</p>}
                        {props.spot.thana && <p>Thana : {props.spot.thana}</p>}
                        {props.spot.upzila && <p>Upzila : {props.spot.upzila}</p>}
                        {props.spot.rating && <Rating name="read-only" value={props.spot.rating} readOnly/>}
                    </div>
                    <div className="row" style={{paddingTop:10}}>
                        {
                            props.activites && props.activites.map((activity, index) => {
                                return (
                                    <div key={index} style={{paddingTop:10}}>
                                        <h4>Activity Name: {activity.activity_name}</h4>
                                        {activity.description && <p>Activity Description: {activity.description}</p>}
                                        {activity.type && <p> Type : {activity.type}</p>}
                                        {activity.price && <p>Price : {activity.price}</p>}
                                        {activity.rating && <Rating name="read-only" value={activity.rating} readOnly/>}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="row" style={{paddingTop:10}}>
                        {
                            props.foods && props.foods.map((food, index) => {
                                return (
                                    <div key={index} style={{paddingTop:10}}>
                                        <h4>Food Name: {food.food_name}</h4>
                                        {food.short_description && <p>Food Description: {food.short_description}</p>}

                                        {food.price && <p>Price : {food.price}</p>}
                                        {food.rating && <Rating name="read-only" value={food.rating} readOnly/>}
                                    </div>
                                )
                            })
                        }
                    </div>
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