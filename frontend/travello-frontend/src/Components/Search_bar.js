import React, { useState } from "react";
import "./Search_bar.css"
import TextField from "@mui/material/TextField";
import Button from 'react-bootstrap/Button';

const Search_bar = () => {

    const getInitialState = () => {
    const value="";
    return value;
  };

  const [value, setValue] = useState(getInitialState);
  const [keyword_text, setKeyword] = useState("");
  const [location_text, setLocation] = useState("");

  const handleChange_dropdown = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="divSearchBar">
        <h1><b>Search here!</b></h1>
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
                  <select value={value} onChange={handleChange_dropdown} className="dropbtn">
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
                                    <a href="https://react.school" target="_blank">
                  <Button className="srcbtn"> Search </Button>
                </a>

                </div>


      </div>
                   {/*         <p>{`You selected ${value}`}</p>*/}
                   {/*<h3>Your Enter Value is: {keyword_text} </h3>*/}
                   {/*<h3>Your Enter Value is: {location_text} </h3>*/}
    </div>
  );
}

export default Search_bar;