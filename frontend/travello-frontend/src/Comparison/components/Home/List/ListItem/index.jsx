// import React from 'react';

import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from "@mui/material";
import ComparisonAPI from "../../../../ComparisonAPI";
import ExploreAPI from "../../../../../Explore/ExploreAPI";
import SinglePlaceAPI from "../../../../../SinglePlace/SinglePlaceAPI";

const api_path = "http://127.0.0.1:8000/media/";
const ListItem = ({
  item: {id, coverSrc, title, desc, price, deliveryFee, serviceTime, rating, misc },
}) =>{
    const MAX_LENGTH = 150;
    console.log(api_path + coverSrc);
  //   const [places, setPlaces] = useState([
  //   { id: 1, checked: false, label: 'Mountain' },
  //   { id: 2, checked: false, label: 'Waterfall' },
  //   { id: 3, checked: false, label: 'Forest' },
  // ]);
    async function handleClick(id) {

        const category = JSON.parse(localStorage.getItem("load_category"));
        if(category==="place") //hotel ta place nam a dewa
        {
        localStorage.setItem("hotel_id", JSON.stringify(id));
        window.location.href = "/Onehotel";

        }
        else if(category==="food") //hotel ta place nam a dewa
        {
            const food_obj = await ComparisonAPI.getOneFood(id);
            let food_list = [];
            {food_obj.map((r) => (
                    //dataList.push({id: r.id, title: r.title , category: r.category, place: 'waterfall', food: 'upojati food',activity: 'trekking',coverSrc: r.coverSrc, rating: r.rating,})
                    food_list.push({food_id: r.food_id, food_name: r.food_name, short_description: r.short_description,  image: r.image})

                ))};
            console.log(food_list)


        localStorage.setItem("food", JSON.stringify(food_list[0]));
        window.location.href = "/Onefood";

        }
        else if(category==="activity") //hotel ta place nam a dewa
        {

            const activity_obj = await ComparisonAPI.getOneActivity(id);
            let activity_list = [];
            {activity_obj.map((r) => (
                    //dataList.push({id: r.id, title: r.title , category: r.category, place: 'waterfall', food: 'upojati food',activity: 'trekking',coverSrc: r.coverSrc, rating: r.rating,})
                    activity_list.push({activity_id: r.activity_id, activity_name: r.activity_name, type: r.type,  description: r.description, image: r.image,  type_id: r.type_id})

                ))};
            console.log(activity_list)


        localStorage.setItem("activity", JSON.stringify(activity_list[0]));
        window.location.href = "/Oneactivity";

        }
  }

    return(
        // {{category} === "place" && (
        <div className='listItem-wrap-comp' >


            <ul>
                <li>
                    <Link
                underline="hover"
                style={{ color: "black" }}
                onClick={(e) => handleClick(id)}

                //href=
              >
                    <img src={api_path + coverSrc} alt="adventure"/>

      <span className="large-comp">
          <div className="div-color-comp">

              <img src={api_path + coverSrc} className="large-image-comp" alt="adventure" />


              <div>
                      <div>
      {desc.length > MAX_LENGTH ?
        (
          <div className="heading-des">
            {`${desc.substring(0, MAX_LENGTH)}...`}<p style={{color:"blue"}}><u>Read more</u></p>
          </div>
        ) :
        <p>{desc}</p>
      }
    </div>
              </div>
            </div>
          </span>
                        </Link>
        </li>
      </ul>


{misc.map(mis =>{
    return(
            <h8> {mis}<br/> </h8>

    )
    })}
      <header>
        <h4>{title}</h4>
        <span>🌟{rating}</span>
      </header>


    </div>
  );
};

export default ListItem;
