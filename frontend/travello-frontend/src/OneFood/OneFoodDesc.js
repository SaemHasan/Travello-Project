import "../App.css";
import React, { useEffect, useState } from "react";
import "./OneFoodDesc.css";
import OneFoodAPI from "./OneFoodAPI";
import Button from "react-bootstrap/Button";




function OneFoodDesc() {

  const [sortlist, setSortList] = useState(false);
  const [oneFood, setOneFood] = useState([]);
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
          while (dataList.length !== 0) {
                  dataList.pop();
                }
                {response.map((r) => (
                    dataList.push({id: r.id, name: r.name, email: r.email,  website: r.website, phoneno: r.phoneno, price: r.price,})
                ))};
          setList(dataList);
          //console.log(list);
      }
      function sortlist(){

        let my_list = dataList;
        console.log("my_list");
        //console.log(dataList);
        //console.log(my_list);
        my_list.sort(function(sixth, second) {
  return sixth[1] - second[1];});
        my_list.reverse();
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
        <div> <Button style={{float:"right", }} onClick={makesortlist}> <b>Sort by price</b> </Button> </div>

        {sortlist && <Show_sorted />}
        {!sortlist && <Show_unsorted />}





    </div>

  );
}

export default OneFoodDesc;
