// import React from 'react';
import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from "@mui/material";

const api_path = "http://127.0.0.1:8000/media/";



const ListItem = ({
  item: { coverSrc, title, desc, price, deliveryFee, serviceTime, rating, category },
}) =>{

  //   const isPlace = true;
  //   const [places, setPlaces] = useState([
  //   { id: 1, checked: false, label: 'Mountain' },
  //   { id: 2, checked: false, label: 'Waterfall' },
  //   { id: 3, checked: false, label: 'Forest' },
  // ]);
  //
    function handleClick(spot) {
    console.log("spot clicked");
    localStorage.setItem("spot", JSON.stringify(spot));
    //localStorage.removeItem("place");
    //localStorage.removeItem("food");
    // console.log(place);
  }
    return(
        // {{category} === "place" && (
        <div className='listItem-wrap-explore' >


            <ul>
                <li>
              {/*      <Link*/}
              {/*  underline="hover"*/}
              {/*  style={{ color: "black" }}*/}
              {/*  onClick={(e) => handleClick()}*/}
              {/*  href="/oneplace"*/}
              {/*>*/}
                    <img src={api_path + coverSrc} alt="adventure"/>
      <span className="large-explore">
          <div className="div-color-explore">

              <img src={api_path + coverSrc} className="large-image-explore" alt="adventure" />
              <div>
          <p className="heading-des"> {desc} </p>



              </div>


          </div>

      </span>
                {/*</Link>*/}
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
