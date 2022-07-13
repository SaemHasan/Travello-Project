import React from 'react';
import { categoryList, ratingList } from '../../../constants';
import CheckboxPlace from '../../common/CheckboxPlace';
import CheckboxFood from "../../common/CheckboxFood";
import CheckboxActivity from "../../common/CheckboxActivity";
import FilterListToggle from '../../common/FilterListToggle';
import SliderProton from '../../common/SliderProton';
import './styles.css';

const FilterPanel = ({
  selectedCategory,
  selectCategory,
  selectedRating,
  selectedPrice,
  selectRating,
  places,
  changeCheckedPlace,
  changePrice,
}) => (
  <div>
    {/*<div className='input-group'>*/}
    {/*  <p className='label'>Category</p>*/}
    {/*  <FilterListToggle*/}
    {/*    options={categoryList}*/}
    {/*    value={selectedCategory}*/}
    {/*    selectToggle={selectCategory}*/}
    {/*  />*/}
    {/*</div>*/}
    <div className='input-group'>
        <div className='first'><p className='label_cuisine'>Search by filters</p></div>
        <div className='input-group_2'>
      {places.map((place) => (
        <CheckboxPlace
          key={place.id}
          place={place}
          changeChecked={changeCheckedPlace}
        />
      ))}
        </div></div>
    {/*  <div className='input-group'>*/}
    {/*  <div className='first'><p className='label_cuisine'>Food filters</p></div>*/}
    {/*    <div className='input-group_2'>*/}
    {/*  {foods.map((food) => (*/}
    {/*    <CheckboxFood*/}
    {/*      key={food.id}*/}
    {/*      food={food}*/}
    {/*      changeChecked={changeCheckedFood}*/}
    {/*    />*/}
    {/*  ))}*/}
    {/*        </div>*/}
    {/*</div>*/}
    {/*  <div className='input-group'>*/}
    {/*  <div className='first'><p className='label_cuisine'>Activity filters</p></div>*/}
    {/*    <div className='input-group_2'>*/}
    {/*  {activities.map((activity) => (*/}
    {/*    <CheckboxActivity*/}
    {/*      key={activity.id}*/}
    {/*      activity={activity}*/}
    {/*      changeChecked={changeCheckedActivity}*/}
    {/*    />*/}
    {/*  ))}*/}
    {/*        </div>*/}
    {/*</div>*/}
    <div className='input-group'>
      <p className='label-range'>Price Range</p>
      <SliderProton value={selectedPrice} changePrice={changePrice} />
    </div>
    <div className='input-group'>
      <p className='label'>Star Rating</p>
      <FilterListToggle
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div>
  </div>
);

export default FilterPanel;
