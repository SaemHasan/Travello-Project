import React, { useEffect, useState } from 'react';
import EmptyView from '../../components/common/EmptyView';
import FilterPanel from '../../components/Home/FilterPanel';
import List from '../../components/Home/List';
import SearchBar from '../../components/Home/SearchBar';
import './styles.css';
import ComparisonAPI from "../../ComparisonAPI";

const Home = () => {
      var activity_id_list = []
      const [load_category, setLoadCategory] = useState("");
      const [dataList, set_dataList] = useState([]);
      const [activityFilterList, set_activityFilterList] = useState([]);
      const [foodFilterList, set_foodFilterList] = useState([]);
      const [placeFilterList, set_placeFilterList] = useState([]);
      //let dataList = []
      let response = []
const [list, setList] = useState([]);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

      useEffect(() => {
      async function fetchData() {

          const spot = JSON.parse(localStorage.getItem("spot"));
          if (spot !== null) {
            if (JSON.parse(localStorage.getItem("load_category"))=="activity") {
              console.log("running");
              //applyFilters();
              // You can await here

                response = await ComparisonAPI.getAllActivity(spot.spot_id);
                const activity_filter_response = await ComparisonAPI.getActivityFilters();


                console.log(response)
                console.log(activity_filter_response)




                //set_place_list(response)
                  //console.log(response)


                while (dataList.length !== 0) {
                  //console.log(response[i])
                  //myList = {'id': response[i].id, 'title': response[i].title, 'activity': response[i].activity}
                  dataList.pop()
                }
                while (activityFilterList.length !== 0) {
                  //console.log(response[i])
                  //myList = {'id': response[i].id, 'title': response[i].title, 'activity': response[i].activity}
                  activityFilterList.pop()
                }

                //dataList.append(response)



                {response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    dataList.push({id: r.id, title: r.title , activity: r.activity, coverSrc: r.coverSrc, desc:r.desc})


                ))}
                {activity_filter_response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    activityFilterList.push({id: r.id, checked: r.checked , label: r.label})


                ))}
            //dataList.push({id: Math.round(30 + Math.random() * (100 - 30)), title: 'Jooyy Risotto',desc: "abcd    ed",serviceTime: '50-65min',deliveryFee: 8.5,category: 'spot',place: 'mountain',food: 'bengali', activity: 'adventure',rating: 2,price: 2200,coverSrc: '/images/spots/nacho-burger.jpg'})


             console.log(activity_filter_response)
            //setList(dataList)
            setResultsFound(true)





               // console.log(activity_id_list.length)

                // ...
            }
          else if (JSON.parse(localStorage.getItem("load_category"))=="food")
          {

              console.log("running food");
              //applyFilters();
              // You can await here
                console.log(spot.spot_id);
                response = await ComparisonAPI.getAllFoodComparison(spot.spot_id);
                const final_food_response = await ComparisonAPI.getFoodTypes(response);
                const food_filter_response = await ComparisonAPI.getFoodFilters();

                console.log(final_food_response)
                console.log(food_filter_response)




                //set_place_list(response)
                  //console.log(response)


                while (dataList.length !== 0) {
                  //console.log(response[i])
                  //myList = {'id': response[i].id, 'title': response[i].title, 'activity': response[i].activity}
                  dataList.pop()
                }
                while (foodFilterList.length !== 0) {
                  //console.log(response[i])
                  //myList = {'id': response[i].id, 'title': response[i].title, 'activity': response[i].activity}
                  foodFilterList.pop()
                }

                //dataList.append(response)



                {final_food_response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    dataList.push({id: r.id, title: r.title , food: r.food, coverSrc: r.coverSrc,desc:r.desc})


                ))}
              {food_filter_response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    foodFilterList.push({id: r.id, checked: r.checked , label: r.label})


                ))}
            //dataList.push({id: Math.round(30 + Math.random() * (100 - 30)), title: 'Jooyy Risotto',desc: "abcd    ed",serviceTime: '50-65min',deliveryFee: 8.5,category: 'spot',place: 'mountain',food: 'bengali', activity: 'adventure',rating: 2,price: 2200,coverSrc: '/images/spots/nacho-burger.jpg'})


             console.log(dataList)
            //setList(dataList)
            setResultsFound(true)
          }

          else if (JSON.parse(localStorage.getItem("load_category"))=="place")
          {
              console.log("running hotel");
              //applyFilters();
              // You can await here

                response = await ComparisonAPI.getAllHotels(spot.spot_id);
                const hotel_filter_response = await ComparisonAPI.getHotelFilters();


                console.log(response)
                console.log(hotel_filter_response)




                //set_place_list(response)
                  //console.log(response)


                while (dataList.length !== 0) {
                  //console.log(response[i])
                  //myList = {'id': response[i].id, 'title': response[i].title, 'activity': response[i].activity}
                  dataList.pop()
                }
                while (placeFilterList.length !== 0) {
                  //console.log(response[i])
                  //myList = {'id': response[i].id, 'title': response[i].title, 'activity': response[i].activity}
                  placeFilterList.pop()
                }

                //dataList.append(response)



                {response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    dataList.push({id: r.id, title: r.title , place: r.place, coverSrc: r.coverSrc,desc:r.desc, rating:r.rating, misc:r.misc, category:"place"})


                ))}
              {hotel_filter_response.map((r) => (
                //console.log(r.activity_id)
                    //activity_id_list.push(r.activity_id)
                    placeFilterList.push({id: r.id, checked: r.checked , label: r.label})


                ))}
            //dataList.push({id: Math.round(30 + Math.random() * (100 - 30)), title: 'Jooyy Risotto',desc: "abcd    ed",serviceTime: '50-65min',deliveryFee: 8.5,category: 'spot',place: 'mountain',food: 'bengali', activity: 'adventure',rating: 2,price: 2200,coverSrc: '/images/spots/nacho-burger.jpg'})


             console.log(dataList)
            //setList(dataList)
            setResultsFound(true)
          }

          }


      }
      fetchData();

    }, []);



  let PlaceName = JSON.parse(localStorage.getItem("spot")).name;
  let ComparisonType = JSON.parse(localStorage.getItem("load_category"));
  let bestTitle = "";
  let myList = null;
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);



  if (ComparisonType === "place") {
    myList = placeFilterList;
    bestTitle = "hotels";
  }
  else if (ComparisonType === "food")
  {
    myList = foodFilterList;
    bestTitle = "foods";
  }
  else if (ComparisonType === "activity")
  {
    myList = activityFilterList;
    bestTitle = "activities";
  }
  else {
    myList = null;
  }

  const [filters, setFilters] = useState(myList);

  // const [foods, setFoods] = useState([
  //   { id: 1, checked: false, label: 'Bengali' },
  //   { id: 2, checked: false, label: 'Chinese' },
  //   { id: 3, checked: false, label: 'Italian' },
  // ]);
  //
  // const [activities, setActivity] = useState([
  //   { id: 1, checked: false, label: 'Trekking' },
  //   { id: 2, checked: false, label: 'Boat riding' },
  //   { id: 3, checked: false, label: 'Kayaking' },
  // ]);



  // const handleSelectCategory = (event, value) =>
  //   !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  //for place
  const handleChangeCheckedFilter = (id) => {
    const filtersStateList = filters;
    const changeCheckedFilters = filtersStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setFilters(changeCheckedFilters);
  };

  //for food
  // const handleChangeCheckedFood = (id) => {
  //   const foodsStateList = foods;
  //   const changeCheckedFoods = foodsStateList.map((item) =>
  //     item.id === id ? { ...item, checked: !item.checked } : item
  //   );
  //   setFoods(changeCheckedFoods);
  // };
  //
  // //for activity
  // const handleChangeCheckedActivity = (id) => {
  //   const activitiesStateList = activities;
  //   const changeCheckedActivities = activitiesStateList.map((item) =>
  //     item.id === id ? { ...item, checked: !item.checked } : item
  //   );
  //   setActivity(changeCheckedActivities);
  // };
const getFoodStr = (size) => {
    var str ="filtersChecked.includes(item.food["+0+"])"
    for (let i = 1; i < size; i++) {
        str = str +" || "+ "filtersChecked.includes(item.food["+i+"])"
    }
    //var str = "filtersChecked.includes(item.food[0]) || filtersChecked.includes(item.food[1])"
    console.log(str)
    return str
}
const getHotelStr = (size) => {
    var str ="filtersChecked.includes(item.place["+0+"])"
    for (let i = 1; i < size; i++) {
        str = str +" || "+ "filtersChecked.includes(item.place["+i+"])"
    }
    //var str = "filtersChecked.includes(item.food[0]) || filtersChecked.includes(item.food[1])"
    console.log(str)
    console.log(size)
    return str
}

  const applyFilters = () => {
    let updatedList = dataList;
    console.log(updatedList)
    console.log(dataList)

    // Rating Filter
    // if (selectedRating) {
    //   updatedList = updatedList.filter(
    //     (item) => parseInt(item.rating) === parseInt(selectedRating)
    //   );
    // }

    // Category Filter
    // if (selectedCategory) {
    //   updatedList = updatedList.filter(
    //     (item) => item.category === selectedCategory
    //   );
    // }

    // Checkbox filter
    //for place
    const filtersChecked = filters
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    //used for filtering and updating the list to show
    if (ComparisonType === "activity") {
      if (filtersChecked.length) {
        updatedList = updatedList.filter((item) =>
            filtersChecked.includes(item.activity)
        );
      }
    }
    else if (ComparisonType === "food")
    {
      if (filtersChecked.length) {


              updatedList = updatedList.filter((item) =>
                  eval(getFoodStr(item.food.length))
        );


      }
    }
    else if (ComparisonType === "place")
    {
      if (filtersChecked.length) {
        updatedList = updatedList.filter((item) =>
            eval(getHotelStr(item.place.length))
            //filtersChecked.includes(item.place[0])
        );
      }
    }

    //for food
    // const foodsChecked = foods
    //   .filter((item) => item.checked)
    //   .map((item) => item.label.toLowerCase());
    //
    // if (foodsChecked.length) {
    //   updatedList = updatedList.filter((item) =>
    //     foodsChecked.includes(item.food)
    //   );
    // }
    //
    // //for activity
    // const activitiesChecked = activities
    //   .filter((item) => item.checked)
    //   .map((item) => item.label.toLowerCase());
    //
    // if (activitiesChecked.length) {
    //   updatedList = updatedList.filter((item) =>
    //     activitiesChecked.includes(item.activity)
    //   );
    // }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // Price Filter




    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, filters, searchInput]);

  return (
    <div className='home' style={{paddingLeft:"50px", paddingRight:"50px"}}>
      {/* Search Bar */}
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className='center'><h3 align='center'>Best {bestTitle} in {PlaceName}</h3></div>
      <div className='home_panelList-wrap'>
        {/* Filter Panel */}
        <div className='home_panel-wrap'>
          <FilterPanel
            // selectedCategory={selectedCategory}
            // selectCategory={handleSelectCategory}
            places={filters}
            // foods={foods}
            // activities={activities}
            changeCheckedPlace={handleChangeCheckedFilter}
            // changeCheckedFood={handleChangeCheckedFood}
            // changeCheckedActivity={handleChangeCheckedActivity}

          />
        </div>
        {/* List & Empty View */}
        <div className='home_list-wrap'>
          {resultsFound ? <List list={list} /> : <EmptyView />}
        </div>
      </div>
    </div>
  );
};

export default Home;
