
import {Button} from "@mui/material";
import AddSpotDetailsModal from "./AddSpot/AddSpotAllDetailsModal";
import {useState} from "react";

export default function AddSpot() {
    const [showSpotDetails, setShowSpotDetails] = useState(false);

    const handleSpotDetails = () => {
        setShowSpotDetails(!showSpotDetails);
    };
    return (
        <>
            <div>
                <Button variant="contained" onClick={handleSpotDetails}>
                    Add Spot
                </Button>
            </div>
            <>
                {
                    showSpotDetails &&
                    <AddSpotDetailsModal handleClose={handleSpotDetails} show={showSpotDetails}/>
                }
            </>
        </>
    )
}