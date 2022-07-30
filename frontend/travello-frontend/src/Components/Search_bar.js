import React, { useState } from "react";
import "./Search_bar.css";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import HomeAPIService from "../home/HomeAPIService";
import SearchResult from "../searchResult/SearchResult";
import { useNavigate } from "react-router-dom";

const Search_bar = () => {
  const getInitialState = () => {
    const value = "";
    return value;
  };

  const [value, setValue] = useState(getInitialState);
  const [keyword_text, setKeyword] = useState("");
  const [location_text, setLocation] = useState("");

  let navigate = useNavigate();

  const handleChange_dropdown = (e) => {
    // console.log("search dropdown: ",e.target.value);
    setValue(e.target.value);
  };

  const handleSearchBtn = async () => {
    console.log("search type: ", value);
    console.log("search keyword: ", keyword_text);
    console.log("search location: ", location_text);

    if (value === "Place") {
      const resp = await HomeAPIService.searchPlace(
        keyword_text,
        location_text
      );
      localStorage.setItem("searchResult", JSON.stringify(resp));
      console.log("search place: ", resp);
    }
    navigate("/search");
  };
  return (
    <div className="divSearchBar">
      <h1>
        <b>Search here!</b>
      </h1>
      <div className="search">
        <div className="side-by-side">
          <TextField
            id="keyword"
            variant="outlined"
            fullWidth
            label="Keyword"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <TextField
            id="location"
            variant="outlined"
            fullWidth
            label="Location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />

          <div>
            <select
              value={value}
              onChange={handleChange_dropdown}
              className="dropbtn"
            >
              <option disabled={true} value="">
                Select Category
              </option>
              <option value="Place">Place</option>
              <option value="Food">Food</option>
              <option value="Activity">Activity</option>
            </select>
          </div>
        </div>
        <div>
          <p>&nbsp;&nbsp;&nbsp;</p>
          {/*<a>*/}
          <Button className="srcbtn" onClick={handleSearchBtn}>
            {" "}
            Search{" "}
          </Button>
          {/*</a>*/}
        </div>
      </div>
      {/*         <p>{`You selected ${value}`}</p>*/}
      {/*<h3>Your Enter Value is: {keyword_text} </h3>*/}
      {/*<h3>Your Enter Value is: {location_text} </h3>*/}
    </div>
  );
};

export default Search_bar;
