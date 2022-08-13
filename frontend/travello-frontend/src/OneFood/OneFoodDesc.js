import "../App.css";
import React, { useEffect, useState } from "react";
import "./OneFoodDesc.css";
import OneFoodAPI from "./OneFoodAPI";
import Button from "react-bootstrap/Button";




function OneFoodDesc() {

  const [oneFood, setOneFood] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgsrc, setImgsrc] = useState("");
  const [dataList, set_dataList] = useState([]);
  const [list, setList] = useState(dataList);


  useEffect(() => {
      const food = JSON.parse(localStorage.getItem("food"));
      const api_path = "http://127.0.0.1:8000";

      if (food !== null) {
        console.log("food is not null");
        setOneFood(food);
        setName(food.food_name);
        setDescription(food.short_description);
        setImgsrc(api_path + food.image);
    }
      async function fetchData() {
          //console.log(food.food_id);
          const response = await OneFoodAPI.getRestaurantFromFoodID(food.food_id);
          //console.log(response);
          // while (dataList.length !== 0) {
          //         dataList.pop();
          //       }
                {response.map((r) => (
                    dataList.push({id: r.id, name: r.name, email: r.email,  website: r.website, phoneno: r.phoneno, price: r.price,})
                ))};
          setList(dataList);
          console.log(list);
      }
      fetchData();
        }, []);

  //
  //   const p = JSON.parse(localStorage.getItem("place"));
  //   const api_path = "http://127.0.0.1:8000";
  //
  //   if (p !== null) {
  //     console.log("p is not null");
  //     setOnePlace(p);
  //     setName(p.name);
  //     setDescription(p.short_description);
  //     setImgsrc(api_path + p.image);
  //     // OnePlaceAPI.updateImgPath(p.image);
  //   }
  //
  //   const spot = JSON.parse(localStorage.getItem("spot"));
  //   if (spot !== null) {
  //     console.log("spot is not null");
  //     //console.log(spot);
  //     setOnePlace(spot);
  //     setName(spot.name);
  //     setDescription(spot.short_description);
  //     setImgsrc(api_path + spot.image);
  //   }
  //
  //   const explore_place = JSON.parse(localStorage.getItem("explore_place"));
  //   if (explore_place !== null) {
  //     //console.log("explore_place is not null");
  //     //console.log(exploreSpot);
  //     //const spot = await OnePlaceAPI.getOneSpotbyID(exploreSpot);
  //     let my_place = []
  //     {explore_place.map((r) => (
  //         my_place.push({id: r.place_id, name: r.name, short_description : r.short_description, image: r.image,})
  //     ))};
  //     //console.log(my_place);
  //     //console.log(spot);
  //     //console.log(my_place[0].id);
  //     setOnePlace(my_place[0]);
  //     setName(my_place[0].name);
  //     setDescription(my_place[0].short_description);
  //     setImgsrc(api_path + String(my_place[0].image));
  //
  //   } else {
  //     console.log("null found");
  //   }
  //
  //
  //   const exploreSpot = JSON.parse(localStorage.getItem("explore_spot"));
  //   if (exploreSpot !== null) {
  //     //console.log("spot is not null");
  //     //console.log(exploreSpot);
  //     //const spot = await OnePlaceAPI.getOneSpotbyID(exploreSpot);
  //     let my_spot = []
  //     {exploreSpot.map((r) => (
  //         my_spot.push({id: r.spot_id, name: r.name, short_description : r.short_description, image: r.image,})
  //     ))};
  //     //console.log(my_spot);
  //     //console.log(spot);
  //     setOnePlace(my_spot[0]);
  //     setName(my_spot[0].name);
  //     setDescription(my_spot[0].short_description);
  //     setImgsrc(api_path + String(my_spot[0].image));
  //
  //   } else {
  //     console.log("null found");
  //   }
  //
  //   const food = JSON.parse(localStorage.getItem("food"));
  //   if (food !== null) {
  //     console.log("food is not null");
  //     setOnePlace(food);
  //     setName(food.food_name);
  //     setDescription(food.short_description);
  //     setImgsrc(api_path + food.image);
  //   }
  // }, []);
  //
  // let hotelimg = OnePlaceData[1].image;
  // let foodimg = OnePlaceData[2].image;
  // let activityimg = OnePlaceData[3].image;

  return (




    <div>
      {/*<img src={imgsrc} alt="slide" className="imgdetails" />*/}
      <div>
        <img
          className="img-fluid mainImage"
          src={imgsrc}
          alt="Responsive image"
          width={"100%"}
        />
      </div>

      <div
        style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "10px" }}
      >
        <h2>
          <b>
            <u>{name}</u>
          </b>
        </h2>
      </div>
      <div>
        <p style={{ marginLeft: "10px" }}>{description}</p>
      </div>
        <div> <Button style={{float:"right", }}> <b>Sort by price</b> </Button> </div>
        <div>
            {list.map(article =>{
                return(
                    <div key={article.id}>
                        <div
        style={{
          boxShadow: '1px 2px 9px #F4AAB9',
          margin: '4em',
          padding: '1em',

        }}
      >
                            <p>abcddddd</p>
                           <p><b>{article.name}</b></p>
                           <p>{article.email}</p>
                           <p>{article.website}</p>
                           <p>{article.phoneno}</p>
                           <p>Price : {article.price} Taka</p>
      </div>

                    </div>
                )
            })}
        </div>


    </div>
  );
}

export default OneFoodDesc;
