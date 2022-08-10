import React, { useEffect, useState } from 'react';
import EmptyView from '../../components/common/EmptyView';
import FilterPanel from '../../components/Home/FilterPanel';
import List from '../../components/Home/List';
import SearchBar from '../../components/Home/SearchBar';
import { dataList,placeFilterList,foodFilterList,activityFilterList,varList } from '../../constants';
import './styles.css';

const Home = () => {
  let PlaceName = varList[0].PlaceName;
  let ComparisonType = varList[0].ComparisonType;
  let bestTitle = varList[0].bestTitle;
  let myList = null;
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);


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

  const [list, setList] = useState(dataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

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

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = dataList;

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.rating) === parseInt(selectedRating)
      );
    }

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
            filtersChecked.includes(item.food)
        );
      }
    }
    else if (ComparisonType === "place")
    {
      if (filtersChecked.length) {
        updatedList = updatedList.filter((item) =>
            filtersChecked.includes(item.place)
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
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, filters, searchInput, selectedPrice]);

  return (
    <div className='home'>
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
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            places={filters}
            // foods={foods}
            // activities={activities}
            changeCheckedPlace={handleChangeCheckedFilter}
            // changeCheckedFood={handleChangeCheckedFood}
            // changeCheckedActivity={handleChangeCheckedActivity}
            changePrice={handleChangePrice}
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
