import React, { useEffect, useState } from "react";
import EmptyView from "../../components/common/EmptyView";
import FilterPanel from "../../components/Home/FilterPanel";
import List from "../../components/Home/List";
import SearchBar from "../../components/Home/SearchBar";
import "./styles.css";
import ExploreAPI from "../../ExploreAPI";
import Button from "react-bootstrap/Button";
import OnePlaceAPI from "../../../OnePlace/OnePlaceAPI";

const Home = () => {

  //const [dataList, setdataList] = useState();
  const [dataList, set_dataList] = useState([]);
  const [hotelList, set_hotelList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [list, setList] = useState(dataList);
  const [activities, setActivity] = useState([]);
  const [foods, setFoods] = useState([]);
  const [places, setPlaces] = useState([]);
  const [allPlaceName, setAllPlaceName] = useState([]);
  const [spotLength, setspotLength] = useState(0);
  let [getAgencyCor, setgetAgencyCor] = React.useState([]);
  let [getAgencyCor2, setgetAgencyCor2] = React.useState([]);
  let [getAgencyCor3, setgetAgencyCor3] = React.useState([]);
  let recohotel = "";
  let recohotel_2 = "";
  let recohotel_3 = "";


  useEffect(() => {
  //console.log(list)

      while (allPlaceName.length !== 0) {
                  allPlaceName.pop();
                }

      for (let m =0; m < list.length; m++)
            {
              allPlaceName.push(list[m].place_name);
            }
            //console.log(all_place_name);
            let uniquePlace_nameAray=[]
              for(let k=0; k < allPlaceName.length; k++){
                  if(uniquePlace_nameAray.indexOf(allPlaceName[k]) === -1) {
                      uniquePlace_nameAray.push(allPlaceName[k]);
                  }
              }
              setAllPlaceName(uniquePlace_nameAray);

              //console.log(uniquePlace_nameAray);


}, [JSON.stringify(list)])

  useEffect(() => {
      async function fetchData() {

              //console.log("running");
              //setSelectedCategory('place');
              // You can await here


                //const spots = await ExploreAPI.getAllSpot(1);
                const allspots = await ExploreAPI.getAllSpots();
                //console.log(allspots.length);
                setspotLength(allspots.length);
                const my_places = await ExploreAPI.getAllPlaces(allspots.length);
                const activity_name = await ExploreAPI.getActivitiesNames();
                const food_filter_response = await ExploreAPI.getFoodFilters();
                const place_filter_list = await ExploreAPI.getSpotTypeNames();
                //const all_place_name = []

                //set_place_list(response)
                  //console.log("activity_name");
                  //console.log(place_filter_list);
                  //console.log(food_filter_response);
                  //console.log(activity_name);
                  //console.log(my_places);
                  //console.log(spots);
                  //console.log("alll spot");
                  //console.log(allspots);
                  while (dataList.length !== 0) {
                  dataList.pop();
                }
                while (activities.length !== 0) {
                  activities.pop();
                }
                while (foods.length !== 0) {
                  foods.pop();
                }
                while (places.length !== 0) {
                  places.pop();
                }
                while (allPlaceName.length !== 0){
                      allPlaceName.pop();
                }
                //  {my_places.map((r) => (
                //
                //     //dataList.push({id: r.id, title: r.title , category: r.category, place: 'waterfall', food: 'upojati food',activity: 'trekking',coverSrc: r.coverSrc, rating: r.rating,})
                //     dataList.push({id: r.id, title: r.title, desc: r.desc,  category: r.category, place: 'waterfall', food: ['upojati food','chinese'], activity: 'trekking', rating: r.rating,  coverSrc: r.coverSrc,place_id:r.place_id})
                //
                // ))};

            {allspots.map((r) => (

                    //dataList.push({id: r.id, title: r.title , category: r.category, place: 'waterfall', food: 'upojati food',activity: 'trekking',coverSrc: r.coverSrc, rating: r.rating,})
                    dataList.push({id: r.id, title: r.title, desc: r.desc,  category: r.category, place: 'waterfall', food: ['upojati food','chinese'], activity: 'trekking', rating: r.rating,  coverSrc: r.coverSrc, place_id : r.place_id, place_name : r.place_name, food_names: "shutki", misc: "abc", hotel:"", cordinate_lattitude:r.cordinate_lattitude, cordinate_longitude:r.cordinate_longitude })

                ))};
            //console.log(dataList);

            for (let m =0; m < dataList.length; m++)
            {
              allPlaceName.push(dataList[m].place_name);
            }
            //console.log(all_place_name);
            let uniquePlace_nameAray=[]
              for(let k=0; k < allPlaceName.length; k++){
                  if(uniquePlace_nameAray.indexOf(allPlaceName[k]) === -1) {
                      uniquePlace_nameAray.push(allPlaceName[k]);
                  }
              }

              setAllPlaceName(uniquePlace_nameAray);

              //console.log(uniquePlace_nameAray);
            {activity_name.map((r) => (

                    //dataList.push({id: r.id, title: r.title , category: r.category, place: 'waterfall', food: 'upojati food',activity: 'trekking',coverSrc: r.coverSrc, rating: r.rating,})
                    activities.push({id: r.id, checked: r.checked,   label: r.label,})

                ))};

            {food_filter_response.map((r) => (

                    //dataList.push({id: r.id, title: r.title , category: r.category, place: 'waterfall', food: 'upojati food',activity: 'trekking',coverSrc: r.coverSrc, rating: r.rating,})
                    foods.push({id: r.id, checked: r.checked,   label: r.label,})

                ))};

            {place_filter_list.map((r) => (

                    //dataList.push({id: r.id, title: r.title , category: r.category, place: 'waterfall', food: 'upojati food',activity: 'trekking',coverSrc: r.coverSrc, rating: r.rating,})
                    places.push({id: r.id, checked: r.checked,   label: r.label,})

                ))};

            for (let m =0; m < dataList.length; m++)
            {
              dataList[m].food = []
            }
            for (let m =0; m < dataList.length; m++)
            {
              dataList[m].activity = []
            }
            for (let m =0; m < dataList.length; m++)
            {
              dataList[m].place = []
            }
            for (let m =0; m < dataList.length; m++)
            {
              dataList[m].misc = []
            }
            //console.log(allspots.length);
            for (let i = 0; i < allspots.length; i++) {
              const response = await ExploreAPI.getAllFood(i+1);
              //console.log("in get all food");
              //console.log(response);
              let templist_foods = [];
              //let templist_food_id = [];
              {response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    templist_foods.push({ids : r.id_list , foods :  r.name_list})
                ))}
                //console.log(templist_foods);
                // {response.map((r) => (
                // //console.log(r.activity_id)
                //     //activity_id_list.push(r.activity_id)
                //     templist_food_id.push(r.id_list)
                // ))}
                let uniqueArray_food=[]
              for(let k=0; k < templist_foods[0].foods.length; k++){
                  if(uniqueArray_food.indexOf(templist_foods[0].foods[k]) === -1) {
                      uniqueArray_food.push(templist_foods[0].foods[k]);
                  }
              }
              //console.log("unique food ")
              //console.log(uniqueArray_food);
              for (let j =0; j < dataList.length; j++)
              {
                if (dataList[j].title === allspots[i].title)
                {
                  dataList[j].food_names = uniqueArray_food;
                  //console.log("rakin");
                  break;
                }
              }
              //console.log("food names");
              //console.log(dataList);
              //console.log(i);
              let final_food_response = await ExploreAPI.getFoodTypes(templist_foods[0].ids);
              //console.log(final_food_response);
              let templist = [];
              {final_food_response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    templist.push(r.food)
                ))}
              let uniqueArray=[]
              for(let k=0; k < templist.length; k++){
                  if(uniqueArray.indexOf(templist[k]) === -1) {
                      uniqueArray.push(templist[k]);
                  }
              }
              //console.log(templist);
              for (let j =0; j < dataList.length; j++)
              {
                if (dataList[j].title === allspots[i].title)
                {
                  dataList[j].food = uniqueArray;
                  //console.log("rakin");
                  break;
                }
              }
              templist=[];
              uniqueArray=[];

            }


            for (let i = 0; i < allspots.length; i++) {
              const response = await ExploreAPI.getAllActivityExplore(i+1);
              //console.log(response);

              let templist = [];
              {response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    templist.push(r)
                ))}
              //console.log(templist)
              let uniqueArray=[]
              for(let k=0; k < templist.length; k++){
                  if(uniqueArray.indexOf(templist[k]) === -1) {
                      uniqueArray.push(templist[k]);
                  }
              }
              //console.log(templist);
              for (let j =0; j < dataList.length; j++)
              {
                if (dataList[j].title === allspots[i].title)
                {
                  dataList[j].activity = uniqueArray;
                  //console.log("rakin");
                  break;
                }
              }
              templist=[];
              uniqueArray=[];

            }

            for (let i = 0; i < allspots.length; i++) {
              const response = await ExploreAPI.getAllSpotTypeExplore(i+1);
              //console.log(response);

              let templist = [];
              {response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    templist.push(r)
                ))}
              //console.log(templist)
              let uniqueArray=[]
              for(let k=0; k < templist.length; k++){
                  if(uniqueArray.indexOf(templist[k]) === -1) {
                      uniqueArray.push(templist[k]);
                  }
              }
              //console.log(dataList)
              //console.log(uniqueArray);
              for (let j =0; j < dataList.length; j++)
              {
                if (dataList[j].title === allspots[i].title)
                {
                  dataList[j].place = uniqueArray;
                  //console.log("rakin");
                  //console.log(dataList[j].place);
                  break;
                }
              }

              templist=[];
              uniqueArray=[];

            }

            //console.log(allspots.length);
            for (let i = 0; i < allspots.length; i++) {
                //console.log(i+1);
              const response = await ExploreAPI.getHotelMIscofSpot(i+1);
              //console.log(response);
              //console.log(response);

              let templist = [];
              {response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    templist.push(r)
                ))}
              //console.log(templist)
              let uniqueArray=[]
              for(let k=0; k < templist.length; k++){
                  if(uniqueArray.indexOf(templist[k]) === -1) {
                      uniqueArray.push(templist[k]);
                  }
              }
              //console.log(templist);
              for (let j =0; j < dataList.length; j++)
              {
                if (dataList[j].title === allspots[i].title)
                {
                  dataList[j].misc = uniqueArray;
                  //console.log("rakin");
                  break;
                }
              }
              //console.log(dataList);
              templist=[];
              uniqueArray=[];
            }




                              while (allPlaceName.length !== 0) {
                  allPlaceName.pop();
                }

      for (let m =0; m < list.length; m++)
            {
              allPlaceName.push(list[m].place_name);
            }
            //console.log(all_place_name);
            uniquePlace_nameAray=[]
              for(let k=0; k < allPlaceName.length; k++){
                  if(uniquePlace_nameAray.indexOf(allPlaceName[k]) === -1) {
                      uniquePlace_nameAray.push(allPlaceName[k]);
                  }
              }
              setAllPlaceName(uniquePlace_nameAray);

              console.log("==============All place name=========================")
                console.log(allPlaceName)

            for (let m =0; m < allPlaceName.length; m++)
            {
                  console.log(allPlaceName[m])
                  let newList = dataList.filter((item) => item.place_name === allPlaceName[m]);
                  console.log(newList)
                //   //console.log("spot lise:")
                if(newList.length!==0)
                {
                    const min_distance = await ExploreAPI.getMinDistance(newList);
                    console.log(min_distance.name)
                    console.log("min_distance.name")
                    for(let n=0; n<dataList.length; n++)
                    {
                        if(dataList[n].place_name === allPlaceName[m])
                        {
                            dataList[n].hotel = min_distance.name
                        }
                    }
                }

                //   //hotelList.push({"Sylhet":min_distance.name})
                //   //console.log(hotelList["Sylhet"])

            }
            console.log(dataList)









            console.log("dataList");
            setList(dataList);
            setResultsFound(true);







      }
      fetchData();

    }, []);


  const [selectedRating, setSelectedRating] = useState(null);
  // const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);









  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const handleSelectCategory = (event, value) =>
    !value ? setSelectedCategory(null) : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? setSelectedRating(null) : setSelectedRating(value);

  //for place
  const handleChangeCheckedPlace = (id) => {
    const placesStateList = places;
    const changeCheckedPlaces = placesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setPlaces(changeCheckedPlaces);
  };

  //for food
  const handleChangeCheckedFood = (id) => {
    const foodsStateList = foods;
    const changeCheckedFoods = foodsStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setFoods(changeCheckedFoods);
  };

  //for activity
  const handleChangeCheckedActivity = (id) => {
    const activitiesStateList = activities;
    const changeCheckedActivities = activitiesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setActivity(changeCheckedActivities);
  };

  // const handleChangePrice = (event, value) => {
  //   setSelectedPrice(value);
  // };

  function makeplaceList(list) {
    let updatedList = [];
    updatedList = list.filter((item) => item.category === "place");
    return updatedList;
    //return p1 * p2;   // The function returns the product of p1 and p2
  }
  function getplaceList(list, placeName) {
      //console.log(allPlaceName)
      let updatedList = [];
      updatedList = list.filter((item) => item.place_name === placeName);
      //console.log(updatedList)
      //console.log("spot lise:")
      //const min_distance = await ExploreAPI.getMinDistance(updatedList);
      //console.log(min_distance)

      for (let m = 0; m < updatedList.length; m++) {
          let uniqueArray = []
          for (let k = 0; k < updatedList[m].place.length; k++) {
              if (uniqueArray.indexOf(updatedList[m].place[k]) === -1) {
                  uniqueArray.push(updatedList[m].place[k]);
              }
          }
          updatedList[m].place = uniqueArray;
          //console.log(updatedList[0].place)
          //console.log("updatedList.place")
      }


      return updatedList;
      //return p1 * p2;   // The function returns the product of p1 and p2
  }

  function makespotList(list) {
    let updatedList = [];
    updatedList = list.filter((item) => item.category === "spot");
    return updatedList;
    //return p1 * p2;   // The function returns the product of p1 and p2
  }

  const getPlaceStr = (size) => {
    var str ="placesChecked.includes(item.place["+0+"])";
    for (let i = 1; i < size; i++) {

          str = str + " || " + "placesChecked.includes(item.place[" + i + "])";

    }
    //var str = "filtersChecked.includes(item.food[0]) || filtersChecked.includes(item.food[1])"
    //console.log(str)
    return str
}

  const getFoodStr = (size1,size2) => {
    var str ="";
    for (let i = 0; i < size1; i++) {
      for(let j = 0; j<size2; j++)
        if (i === 0 && j === 0)
        {
          str = str + "foodsChecked.includes(item.food["+0+"]["+0+"])";
        }
        else {
          str = str + " || " + "foodsChecked.includes(item.food[" + i + "][" + j + "])";
        }
    }
    //var str = "filtersChecked.includes(item.food[0]) || filtersChecked.includes(item.food[1])"
    //console.log(str)
    return str
}

  const getActivityStr = (size) => {
    var str ="activitiesChecked.includes(item.activity["+0+"])";
    for (let i = 1; i < size; i++) {

          str = str + " || " + "activitiesChecked.includes(item.activity[" + i + "])";

    }
    //var str = "filtersChecked.includes(item.food[0]) || filtersChecked.includes(item.food[1])"
    //console.log(str)
    return str
}

  const applyFilters = async () => {
      let updatedList = dataList;
      //console.log("in filter");
      //console.log(dataList);
      //console.log(updatedList);

      // Rating Filter
      if (selectedRating) {
          updatedList = updatedList.filter(
              (item) => parseInt(item.rating) === parseInt(selectedRating)
          );
      }

      // Category Filter
      if (selectedCategory) {
          updatedList = updatedList.filter(
              (item) => item.category === selectedCategory
          );
      }

      // Checkbox filter
      //for place
      const placesChecked = places
          .filter((item) => item.checked)
          .map((item) => item.label.toLowerCase());

      if (placesChecked.length) {
          updatedList = updatedList.filter((item) =>
              eval(getPlaceStr(item.place.length))
          );
          for (let m =0; m < allPlaceName.length; m++)
            {
                  console.log(allPlaceName[m])
                  let newList = updatedList.filter((item) => item.place_name === allPlaceName[m]);
                  console.log(newList)
                //   //console.log("spot lise:")
                if(newList.length!==0)
                {
                    const min_distance = await ExploreAPI.getMinDistance(newList);
                    console.log(min_distance.name)
                    for(let n=0; n<updatedList.length; n++)
                    {
                        if(updatedList[n].place_name === allPlaceName[m])
                        {
                            updatedList[n].hotel = min_distance.name
                        }
                    }
                }

                //   //hotelList.push({"Sylhet":min_distance.name})
                //   //console.log(hotelList["Sylhet"])

            }

      }

      // if (placesChecked.length) {
      //   updatedList = updatedList.filter((item) =>
      //     placesChecked.includes(item.place)
      //       eval(getActivityStr(item.activity.length))
      //   );
      // }

      //for food


      const foodsChecked = foods
          .filter((item) => item.checked)
          .map((item) => item.label.toLowerCase());

      if (foodsChecked.length) {


          updatedList = updatedList.filter((item) =>
              eval(getFoodStr(item.food.length, 2))
          );
          // if (foodsChecked.length) {
          //   updatedList = updatedList.filter((item) =>
          //     foodsChecked.includes(item.food)
          //   );
      }

      //for activity
      const activitiesChecked = activities
          .filter((item) => item.checked)
          .map((item) => item.label.toLowerCase());

      //console.log(activitiesChecked)
      let mylist = [{'activity_list': activitiesChecked}]
      //console.log(mylist)
      localStorage.setItem("activity_list", JSON.stringify(mylist));



      if (activitiesChecked.length) {
          updatedList = updatedList.filter((item) =>
              //activitiesChecked.includes(item.activity)
              eval(getActivityStr(item.activity.length))
          );
          //GetRecommendHotel(updatedList);
          for (let i = 0; i<updatedList.length; i++) {
              const hotel_list_byID_3 = await ExploreAPI.getHotelIDCor(updatedList[i].id);
              //console.log(hotel_list_byID_3);
              const activity_list_byID_3 = await ExploreAPI.getActivityIdCor(updatedList[i].id, activitiesChecked);
              //console.log(activitiesChecked);
              //console.log(activity_list_byID_3);
              const res = await ExploreAPI.getAgencyCorExplore(activity_list_byID_3, hotel_list_byID_3);
              //console.log(res);
              //recohotel_3 = getAgencyCor3.name;
              //console.log(recohotel_3);
              let templist = [];
              {
                  res.map((r) => (
                      //console.log(r.activity_id)
                      //activity_id_list.push(r.activity_id)
                      templist.push(r)
                  ))
              }
              //console.log(templist);
              //console.log(templist[0].name);
              //updatedList[i].hotel = templist[0].name;
              //updatedList[2].hotel = templist[0].name;
              //updatedList[3].hotel = "rakin";
              // updatedList[11].hotel = "rakin";
              // updatedList[12].hotel = "rakin";
          }
      }

      // Search Filter
      if (searchInput) {
          updatedList = updatedList.filter(
              (item) =>
                  item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
                  -1
          );
      }

      // Price Filter
      // const minPrice = selectedPrice[0];
      // const maxPrice = selectedPrice[1];
      //
      // updatedList = updatedList.filter(
      //   (item) => item.price >= minPrice && item.price <= maxPrice
      // );

      setList(updatedList);

      !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [
    selectedRating,
    selectedCategory,
    places,
    activities,
    foods,
    searchInput,
    //selectedPrice,
  ]);

  return (
    <div className="home" style={{paddingLeft:"50px", paddingRight:"50px"}}>
      {/* Search Bar */}
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className="home_panelList-wrap">
        {/* Filter Panel */}
        <div className="home_panel-wrap">
          <FilterPanel
            selectedCategory={selectedCategory}
            selectCategory={handleSelectCategory}
            selectedRating={selectedRating}
            //selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            places={places}
            foods={foods}
            activities={activities}
            changeCheckedPlace={handleChangeCheckedPlace}
            changeCheckedFood={handleChangeCheckedFood}
            changeCheckedActivity={handleChangeCheckedActivity}
            //changePrice={handleChangePrice}
          />
        </div>
        {/* List & Empty View */}
        <div className="home_list-wrap">
          {makeplaceList(list).length === 0 ? (
            <p></p>
          ) : (
            <h1
              className="center_title"
              style={{ color: "blue", marginBottom: "30px", marginTop: "10px" }}
            >
              Places
            </h1>
          )}
            <div>
            {allPlaceName.map(placeName =>{
                return(
                    <div >
                                    <h1
              className="center_title"
              style={{ color: "blue", marginBottom: "30px", marginTop: "10px"}}
            >
              {placeName}
            </h1>
                        <h2>{getAgencyCor3.name}</h2>
                        <div className="fullPlace">{resultsFound ? <List list={getplaceList(list, placeName)} /> : <EmptyView />}</div>
                    </div>


                )
            })}
        </div>

            {/*<div className="fullPlace">{resultsFound ? <List list={makeplaceList(list)} /> : <EmptyView />}</div>*/}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {makespotList(list).length === 0 ? (
            <p></p>
          ) : (
            <h1
              className="center_title"
              style={{ color: "blue", marginBottom: "30px", marginTop: "10px"}}
            >
              {/*Spots*/}
            </h1>
          )}
          {/*<div>{resultsFound ? <List list={makespotList(list)} /> : <EmptyView />}</div>*/}
        </div>
      </div>
    </div>
  );
};

export default Home;
