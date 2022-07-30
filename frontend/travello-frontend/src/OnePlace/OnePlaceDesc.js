import '../App.css';
import {OnePlaceData} from "./OnePlace-data";
import React from "react";
import "./OnePlaceDesc.css";


function OnePlaceDesc() {
    let placename = OnePlaceData[0].heading;
    let imgsrc = OnePlaceData[0].image;
    let desc = OnePlaceData[0].desc;
    let hotelimg = OnePlaceData[1].image;
    let foodimg = OnePlaceData[2].image;
    let activityimg = OnePlaceData[3].image;

  return (
    <div>
        {/*<img src={imgsrc} alt="slide" className="imgdetails" />*/}
        <div><img src={imgsrc} alt="place_image" width={"100%"} height={"350px"}/></div>
        <div className="row">
            <div className="column" style={{backgroundColor:"#bbb"}}>
                <img className="my_image" src={hotelimg} height={"50"} alt={"hotel"} />
                {/*<h2>Column 1</h2>*/}
                {/*<p>Some text..</p>*/}
            </div>
            <div className="column" style={{backgroundColor:"#bbb"}}>
                <img className="my_image" src={foodimg} height={"50"} alt={"food"} />
                {/*<h2>Column 2</h2>*/}
                {/*<p>Some text..</p>*/}
            </div>
            <div className="column" style={{backgroundColor:"#bbb"}}>
                <img className="my_image" src={activityimg} height={"50"} alt={"activity"} />
                {/*<h2>Column 3</h2>*/}
                {/*<p>Some text..</p>*/}
            </div>
        </div>
        <div style={{marginTop: "20px", marginBottom: "20px", marginLeft: "10px"}}><h2><b><u>{placename}</u></b></h2></div>
        <div><p style={{marginLeft: "10px"}}>{desc}</p></div>
    </div>

  );
}

export default OnePlaceDesc;