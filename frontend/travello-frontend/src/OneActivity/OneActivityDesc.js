import "../App.css";
import { OneActivityData } from "./OneActivity-data";
import React, { useEffect, useState } from "react";
import "./OneActivityDesc.css";
import OneActivityAPI from "./OneActivityAPI";
import {Link} from "@mui/material";
import Button from "react-bootstrap/Button";





function OneActivityDesc() {

    const [sortlist, setSortList] = useState(false);
    const [oneActivity, setOneActivity] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imgsrc, setImgsrc] = useState("");
    const [dataList, set_dataList] = useState([]);
    const [list, setList] = useState([]);
    const [sortedlist, setSortedList] = useState([]);
    const Show_sorted = () => (
              <div>
            {sortedlist.map(article =>{
                return(
                    <div key={article.id}>
                        <div
        style={{
          boxShadow: '1px 2px 9px #F4AAB9',
          margin: '4em',
          padding: '1em',

        }}
      >

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

  )

    const Show_unsorted = () =>(
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
    )


  useEffect(() => {
      const activity = JSON.parse(localStorage.getItem("activity"));
      const api_path = "http://127.0.0.1:8000";


      if (activity !== null) {
        console.log("activity is not null");
        setOneActivity(activity);
        setName(activity.activity_name);
        setDescription(activity.description);
        if (activity.image.includes("http://127.0.0.1:8000")){
            setImgsrc(activity.image);
        }
        else{
            setImgsrc(api_path + activity.image);
        }
    }
      async function fetchData() {
          //console.log(food.food_id);
          const response = await OneActivityAPI.getAgencyFromActivityID(activity.activity_id);
          console.log(response);
          while (dataList.length !== 0) {
                  dataList.pop();
                }
                {response.map((r) => (
                    dataList.push({id: r.id, name: r.name, email: r.email,  website: r.website, phoneno: r.phoneno, price: r.price,})
                ))};
          setList(dataList);
          console.log(list);
      }
      function sortlist(){

        let my_list = dataList;
        console.log("my_list");
        //console.log(dataList);
        //console.log(my_list);
        my_list.sort(function(first, second) {
  return first.price - second.price;});
        //my_list.reverse();
        console.log(my_list);
        const t = my_list
        setSortedList(my_list);
        set_dataList(t);
        console.log(t);
        console.log(sortlist);
    }
      fetchData();
      sortlist();
        }, [sortlist]);

    function makesortlist() {
        setSortList(true);
    }



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
        <div style={{paddingBottom:"20px"}}> <Button style={{float:"right", }} onClick={makesortlist}> <b>Sort by price</b> </Button> </div>

        {sortlist && <Show_sorted />}
        {!sortlist && <Show_unsorted />}





    </div>

  );
}

export default OneActivityDesc;
