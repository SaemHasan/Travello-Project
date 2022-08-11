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
          <Route path="admin" element={<Admin />} />
          <Route path="showplaces" element={<ShowPlaces />} />
          <Route path="showplaceratinginfo" element={<ShowPlaceRatingInfo />} />
          <Route path="showspots" element={<ShowSpots />} />
          <Route path="showspotratinginfo" element={<ShowSpotRatingInfo />} />
          <Route path="showspottypetable" element={<ShowSpotTypeTable />} />
        </Route>

        <Route path="/Login" element={<Login />} />
        <Route path="Registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}
