import React, { useEffect, useState } from "react";
import EmptyView from "../../components/common/EmptyView";
import FilterPanel from "../../components/Home/FilterPanel";
import List from "../../components/Home/List";
import SearchBar from "../../components/Home/SearchBar";
import "./styles.css";
import ExploreAPI from "../../ExploreAPI";

const Home = () => {

  //const [dataList, setdataList] = useState();
  const [dataList, set_dataList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [list, setList] = useState(dataList);
  const [activities, setActivity] = useState([]);
  const [foods, setFoods] = useState([]);
  const [places, setPlaces] = useState([]);
  useEffect(() => {
      async function fetchData() {

              //console.log("running");
              //setSelectedCategory('place');
              // You can await here


                //const spots = await ExploreAPI.getAllSpot(1);
                const allspots = await ExploreAPI.getAllSpots();
                //console.log(allspots.length);
                const my_places = await ExploreAPI.getAllPlaces(allspots.length);
                const activity_name = await ExploreAPI.getActivitiesNames();
                const food_filter_response = await ExploreAPI.getFoodFilters();
                const place_filter_list = await ExploreAPI.getSpotTypeNames();

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
                 {my_places.map((r) => (

                    //dataList.push({id: r.id, title: r.title , category: r.category, place: 'waterfall', food: 'upojati food',activity: 'trekking',coverSrc: r.coverSrc, rating: r.rating,})
                    dataList.push({id: r.id, title: r.title, desc: r.desc,  category: r.category, place: 'waterfall', food: ['upojati food','chinese'], activity: 'trekking', rating: r.rating,  coverSrc: r.coverSrc,place_id:r.place_id})

                ))};

            {allspots.map((r) => (

                    //dataList.push({id: r.id, title: r.title , category: r.category, place: 'waterfall', food: 'upojati food',activity: 'trekking',coverSrc: r.coverSrc, rating: r.rating,})
                    dataList.push({id: r.id, title: r.title, desc: r.desc,  category: r.category, place: 'waterfall', food: ['upojati food','chinese'], activity: 'trekking', rating: r.rating,  coverSrc: r.coverSrc, place_id : r.place_id})

                ))};
            //console.log(dataList);
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
            //console.log(allspots.length);
            for (let i = 0; i < allspots.length; i++) {
              const response = await ExploreAPI.getAllFood(i+1);
              //console.log(i);
              let final_food_response = await ExploreAPI.getFoodTypes(response);
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
              for (let m =0; m < dataList.length; m++)
              {
                if (dataList[m].id === i+1)
                {
                  for (let n =0; n < dataList.length; n++)
                  {
                    if (dataList[m].place_id === dataList[n].place_id)
                    {
                      dataList[n].food = dataList[n].food.concat(dataList[m].food)
                    }
                  }
                }

              }


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
              for (let m =0; m < dataList.length; m++)
              {
                if (dataList[m].id === i+1)
                {
                  for (let n =0; n < dataList.length; n++)
                  {
                    if (dataList[m].place_id === dataList[n].place_id && dataList[n].id !== i+1)
                    {
                      dataList[n].activity = dataList[n].activity.concat(dataList[m].activity)
                    }
                  }
                }

              }
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
              //console.log(uniqueArray);
              for (let j =0; j < dataList.length; j++)
              {
                if (dataList[j].title === allspots[i].title)
                {
                  dataList[j].place = uniqueArray;
                  //console.log("rakin");
                  break;
                }
              }
              templist=[];
              uniqueArray=[];
              for (let m =0; m < dataList.length; m++)
              {
                if (dataList[m].id === i+1)
                {
                  for (let n =0; n < dataList.length; n++)
                  {
                    if (dataList[m].place_id === dataList[n].place_id && dataList[n].id !== i+1)
                    {
                      dataList[n].place = dataList[n].place.concat(dataList[m].place)
                    }
                  }
                }

              }


            }






            console.log(dataList);
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

  const applyFilters = () => {
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
          eval(getPlaceStr(item.activity.length))
      );
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
                  eval(getFoodStr(item.food.length,2))
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

    if (activitiesChecked.length) {
      updatedList = updatedList.filter((item) =>
        //activitiesChecked.includes(item.activity)
          eval(getActivityStr(item.activity.length))
      );
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
    <div className="home">
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
          {resultsFound ? <List list={makeplaceList(list)} /> : <EmptyView />}
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
              Spots
            </h1>
          )}
          {resultsFound ? <List list={makespotList(list)} /> : <EmptyView />}
        </div>
      </div>
    </div>
  );
};

export default Home;
