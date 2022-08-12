import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { createRoot } from "react-dom/client";

import Layout from "./Layout";
import Home from "./home/Home";
import About from "./About";
import Login from "./login/Login";
import Registration from "./Registration/Registration";
import Explore from "./Explore/Explore";
import Comparison from "./Comparison/Comparison";
import OnePlace from "./OnePlace/OnePlace";
import SearchResult from "./searchResult/SearchResult";
import React from "react";
import UserProfile from "./UserProfile/UserProfile";
import Admin from "./admin/Admin";
import ShowPlaces from "./admin/showDetails/spot/ShowPlaces";
import ShowPlaceRatingInfo from "./admin/showDetails/spot/ShowPlaceRatingInfo";
import ShowSpots from "./admin/showDetails/spot/ShowSpots";
import ShowSpotRatingInfo from "./admin/showDetails/spot/ShowSpotRatingInfo";
import ShowSpotTypeTable from "./admin/showDetails/spot/ShowSpotTypeTable";
import ShowSpotTypeRelation from "./admin/showDetails/spot/ShowSpotType";
import ShowSpotFood from "./admin/showDetails/spot/ShowSpotFood";
import ShowSpotActivity from "./admin/showDetails/spot/ShowSpotActivity";
import ShowActivity from "./admin/showDetails/activity/ShowActivity";
import ShowActivityTypeTable from "./admin/showDetails/activity/ShowActivityType";
import ShowAgency from "./admin/showDetails/activity/ShowAgency";
import ShowActivityAgency from "./admin/showDetails/activity/ShowActivityAgency";
import ShowActivityPriceInfo from "./admin/showDetails/activity/ShowActivityPriceInfo";
import ShowActivityRatingInfo from "./admin/showDetails/activity/ShowActivityRatingInfo";
import ShowFood from "./admin/showDetails/food/ShowFood";
import ShowRestaurant from "./admin/showDetails/food/ShowRestaurant";
import ShowFoodRestaurant from "./admin/showDetails/food/ShowFoodRestaurant";
import ShowFoodPriceInfo from "./admin/showDetails/food/ShowFoodPriceInfo";
import ShowFoodRatingInfo from "./admin/showDetails/food/ShowFoodRatingInfo";
import ShowFoodTypeTable from "./admin/showDetails/food/ShowFoodType";
import ShowFoodTypeRelation from "./admin/showDetails/food/ShowFoodTypeRelation";
import ShowHotel from "./admin/showDetails/hotel/ShowHotel";
import ShowRoom from "./admin/showDetails/hotel/ShowRoom";
import ShowHotelAttribute from "./admin/showDetails/hotel/ShowHotelAttribute";
import ShowHotelAttributeRelation from "./admin/showDetails/hotel/ShowHotelAttributeRelation";
import ShowRoomAttribute from "./admin/showDetails/hotel/ShowRoomAttribute";
import ShowRoomAttributeRelation from "./admin/showDetails/hotel/ShowRoomAttributeRelation";
import ShowRoomPriceInfo from "./admin/showDetails/hotel/ShowRoomPriceInfo";
import ShowHotelRatingInfo from "./admin/showDetails/hotel/ShowHotelRatingInfo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*<Route path="Home" element={<Home />} />*/}
          <Route index element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Explore" element={<Explore />} />
          <Route path="Comparison" element={<Comparison />} />
          <Route path="OnePlace" element={<OnePlace />} />
          <Route path="search" element={<SearchResult />} />
          <Route path="user" element={<UserProfile />} />

          {/*for admin part*/}
          <Route path="admin" element={<Admin />} />
          <Route path="showplaces" element={<ShowPlaces />} />
          <Route path="showplaceratinginfo" element={<ShowPlaceRatingInfo />} />
          <Route path="showspots" element={<ShowSpots />} />
          <Route path="showspotratinginfo" element={<ShowSpotRatingInfo />} />
          <Route path="showspottypetable" element={<ShowSpotTypeTable />} />
          <Route
            path="showspottyperelation"
            element={<ShowSpotTypeRelation />}
          />
          <Route path="showspotfood" element={<ShowSpotFood />} />
          <Route path="showspotactivity" element={<ShowSpotActivity />} />
          <Route path="showactivity" element={<ShowActivity />} />
          <Route path="showactivitytype" element={<ShowActivityTypeTable />} />
          <Route path="showagency" element={<ShowAgency />} />
          <Route path="showactivityagency" element={<ShowActivityAgency />} />
          <Route
            path="showactivitypriceinfo"
            element={<ShowActivityPriceInfo />}
          />
          <Route
            path="showactivityratinginfo"
            element={<ShowActivityRatingInfo />}
          />
          <Route path="showfood" element={<ShowFood />} />
          <Route path="showRestaurant" element={<ShowRestaurant />} />
          <Route path="showfoodrestaurant" element={<ShowFoodRestaurant />} />
          <Route path="showfoodpriceinfo" element={<ShowFoodPriceInfo />} />
          <Route path="showfoodratinginfo" element={<ShowFoodRatingInfo />} />
          <Route path="showfoodtype" element={<ShowFoodTypeTable />} />
          <Route
            path="showfoodtyperelation"
            element={<ShowFoodTypeRelation />}
          />
          <Route path="showhotel" element={<ShowHotel />} />
          <Route path="showhotelattribute" element={<ShowHotelAttribute />} />
          <Route
            path="showhotelattributerelation"
            element={<ShowHotelAttributeRelation />}
          />
          <Route path="showroom" element={<ShowRoom />} />
          <Route path="showroomattribute" element={<ShowRoomAttribute />} />
          <Route
            path="showroomattributerelation"
            element={<ShowRoomAttributeRelation />}
          />
          <Route path="showroompriceinfo" element={<ShowRoomPriceInfo />} />
          <Route path="showhotelratinginfo" element={<ShowHotelRatingInfo />} />
          {/*admin part finish*/}
        </Route>

        <Route path="/Login" element={<Login />} />
        <Route path="Registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}
