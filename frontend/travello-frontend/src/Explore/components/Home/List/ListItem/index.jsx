// import React from 'react';
import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from "@mui/material";
import ExploreAPI from "../../../../ExploreAPI";

const api_path = "http://127.0.0.1:8000/media/";



const ListItem = ({
  item: { id, coverSrc, title, desc, price, deliveryFee, serviceTime, rating, category, place_id },
}) =>{

  //   const isPlace = true;
  //   const [places, setPlaces] = useState([
  //   { id: 1, checked: false, label: 'Mountain' },
  //   { id: 2, checked: false, label: 'Waterfall' },
  //   { id: 3, checked: false, label: 'Forest' },
  // ]);
  //
    async function handleClick(id,category,place_id) {

    //console.log("spot clicked");
    if (category === "place")
    {

        //console.log("place");
        localStorage.removeItem("place");
        localStorage.removeItem("food");
        localStorage.removeItem("spot");
        localStorage.removeItem("explore_spot");
        localStorage.removeItem("explore_place");
        const place = await ExploreAPI.getOnePlacebyID(place_id);
        //console.log(place);
        localStorage.setItem("explore_place", JSON.stringify(place));
        localStorage.setItem("place", JSON.stringify(place));
        const explore_place = JSON.parse(localStorage.getItem("explore_place"));
        //console.log(explore_place);
        window.location.href = "/Oneplace";

    }
    else if (category === "spot")
    {

        //console.log("spot");
        //console.log(id);
        localStorage.removeItem("place");
        localStorage.removeItem("food");
        localStorage.removeItem("spot");
        localStorage.removeItem("explore_spot");
        localStorage.removeItem("explore_place");
        const spot = await ExploreAPI.getOneSpotbyID(id);
        //console.log(spot);
        let my_spot = []
        {spot.map((r) => (
            my_spot.push({spot_id: r.spot_id, name: r.name, short_description : r.short_description, image: r.image,})
        ))};
        localStorage.setItem("explore_spot", JSON.stringify(spot));
        localStorage.setItem("spot", JSON.stringify(my_spot[0]));
        //console.log(my_spot[0].spot_id);
        const explore_spot = JSON.parse(localStorage.getItem("explore_spot"));
        //console.log(explore_spot);
        window.location.href = "/Oneplace";

    }

    //localStorage.setItem("spot", JSON.stringify(spot));
    //localStorage.removeItem("place");
    //localStorage.removeItem("food");
    // console.log(place);
  }
    return(
        // {{category} === "place" && (
        <div className='listItem-wrap-explore' >


            <ul>
                <li>
                    <Link
                underline="hover"
                style={{ color: "black" }}
                onClick={(e) => handleClick(id,category,place_id)}

                //href=
              >
                    <img src={api_path + coverSrc} alt="adventure"/>
      <span className="large-explore">
          <div className="div-color-explore">

              <img src={api_path + coverSrc} className="large-image-explore" alt="adventure" />
              <div>
          <p className="heading-des"> {desc} </p>



              </div>


          </div>

      </span>
                </Link>
                </li>


  </ul>















            {/*<img src={coverSrc} alt=''/>*/}
            <header>
                <h4>{title}</h4>
                <span>🌟{rating}</span>
            </header>
            {/*<footer>*/}
            {/*    <p>*/}
            {/*        <b>{serviceTime}</b> <span> Delivery Fee ${deliveryFee}</span>*/}
            {/*    </p>*/}
            {/*    <p>*/}
            {/*        <b>${price}</b>*/}
            {/*    </p>*/}
            {/*</footer>*/}
        </div>
    );
};


export default ListItem;
