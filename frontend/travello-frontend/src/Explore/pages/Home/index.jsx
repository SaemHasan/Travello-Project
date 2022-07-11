import React, { useEffect, useState } from 'react';
import EmptyView from '../../components/common/EmptyView';
import FilterPanel from '../../components/Home/FilterPanel';
import List from '../../components/Home/List';
import SearchBar from '../../components/Home/SearchBar';
import { dataList } from '../../constants';
import './styles.css';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);

  const [places, setPlaces] = useState([
    { id: 1, checked: false, label: 'Mountain' },
    { id: 2, checked: false, label: 'Waterfall' },
    { id: 3, checked: false, label: 'Forest' },
  ]);

  const [foods, setFoods] = useState([
    { id: 1, checked: false, label: 'Bengali' },
    { id: 2, checked: false, label: 'Chinese' },
    { id: 3, checked: false, label: 'Italian' },
  ]);

  const [activities, setActivity] = useState([
    { id: 1, checked: false, label: 'Trekking' },
    { id: 2, checked: false, label: 'Boat riding' },
    { id: 3, checked: false, label: 'Kayaking' },
  ]);

  const [list, setList] = useState(dataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleSelectCategory = (event, value) =>
    !value ? null : setSelectedCategory(value);

  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

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
        placesChecked.includes(item.place)
      );
    }

    //for food
    const foodsChecked = foods
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (foodsChecked.length) {
      updatedList = updatedList.filter((item) =>
        foodsChecked.includes(item.food)
      );
    }

    //for activity
    const activitiesChecked = activities
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (activitiesChecked.length) {
      updatedList = updatedList.filter((item) =>
        activitiesChecked.includes(item.activity)
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
  }, [selectedRating, selectedCategory, places, activities, foods, searchInput, selectedPrice]);

  return (
    <div className='home'>
      {/* Search Bar */}
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className='home_panelList-wrap'>
        {/* Filter Panel */}
        <div className='home_panel-wrap'>
          <FilterPanel
            selectedCategory={selectedCategory}
            selectCategory={handleSelectCategory}
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            places={places}
            foods={foods}
            activities={activities}
            changeCheckedPlace={handleChangeCheckedPlace}
            changeCheckedFood={handleChangeCheckedFood}
            changeCheckedActivity={handleChangeCheckedActivity}
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
