import React, {useEffect, useState} from "react";
import "./Search_bar.css";
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import HomeAPIService from "../home/HomeAPIService";
import SearchResult from "../searchResult/SearchResult";
import {useNavigate} from "react-router-dom";
import APIService from "../APIService";
import {Autocomplete, Stack} from "@mui/material";


const keywordOptions = [
    {label: 'rice'},
    {label: 'chicken'},
    {label: 'chowmein'},
    {label: 'noodles'},
    {label: 'pizza'},
    {label: 'burger'},
    {label: 'pasta'},
    {label: 'Khacchi'},
    {label: 'Biryani'},
    {label: 'Kabab'},
    {label: 'trekking'},
    {label: 'sight seeing'},
    {label: 'hiking'},
    {label: 'biking'},
    {label: 'boat riding'},
    {label: 'paragliding'},
    {label: 'rafting'},
    {label: 'cycling'},
    {label: 'camping'},
    {label: 'hunting'},
    {label: 'fishing'},
    {label: 'climbing'},
    {label: 'diving'},
    {label: 'swimming'},
    {label: 'surfing'},
    {label: 'skiing'},
]

const Search_bar = () => {
    const getInitialState = () => {
        const value = "";
        return value;
    };


    const [value, setValue] = useState(getInitialState);
    const [keyword_text, setKeyword] = useState("");
    const [location_text, setLocation] = useState("");
    const [locations, setLocations] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await HomeAPIService.getAllplaceSpotNames();
            setLocations(response);
        }

        fetchData();
    }, [])

    const handleKeywordChange = (value) => {
        console.log("keyword ", value);
        setKeyword(value);
    };

    const handleChange_dropdown = (e) => {
        // console.log("search dropdown: ",e.target.value);
        setValue(e.target.value);
    };

    const handleSearchBtn = async () => {
        console.log("search type: ", value);
        console.log("search keyword: ", keyword_text);
        console.log("search location: ", location_text);

        if (value === "") {
            alert("Please select a search type.");
        } else if (keyword_text === "" && location_text === "") {
            alert("Please enter a keyword or location.");
        } else if (keyword_text === "" && location_text !== "") {
            // activity
            if (value === "Activity") {
                const resp = await HomeAPIService.searchSpotActivity(keyword_text, location_text);
                let activities = []
                for (let i = 0; i < resp.length; i++) {
                    activities.push(await APIService.getFromDB_byID("activities", resp[i].activity_id))
                }
                console.log("activities: ", activities);
                localStorage.setItem("searchResult", JSON.stringify(activities));
                localStorage.setItem("searchType", JSON.stringify(value));
                navigate("/search");
            }
            // food
            else if (value === "Food") {
                const resp = await HomeAPIService.searchSpotFood(keyword_text, location_text);
                let foods = []
                for (let i = 0; i < resp.length; i++) {
                    foods.push(await APIService.getFromDB_byID("foods", resp[i].food_id))
                }
                console.log("foods: ", foods);
                localStorage.setItem("searchResult", JSON.stringify(foods));
                localStorage.setItem("searchType", JSON.stringify(value));
                navigate("/search");
            } else if (value === "Place") {
                const resp = await HomeAPIService.searchPlace(
                    keyword_text,
                    location_text
                );
                localStorage.setItem("searchResult", JSON.stringify(resp));
                localStorage.setItem("searchType", JSON.stringify(value));
                navigate("/search");
                // console.log("search place: ", resp);
            } else if (value === "Spot") {
                const resp = await HomeAPIService.searchSpot(keyword_text, location_text);
                localStorage.setItem("searchResult", JSON.stringify(resp));
                localStorage.setItem("searchType", JSON.stringify(value));
                navigate("/search");
                // console.log("search spot: ", resp);
            }
        } else {
            if (value === "Place") {
                const resp = await HomeAPIService.searchPlace(
                    keyword_text,
                    location_text
                );
                localStorage.setItem("searchResult", JSON.stringify(resp));
                localStorage.setItem("searchType", JSON.stringify(value));
                // console.log("search place: ", resp);
            }

            if (value === "Food") {
                const resp = await HomeAPIService.searchFood(
                    keyword_text,
                    location_text
                );
                localStorage.setItem("searchResult", JSON.stringify(resp));
                localStorage.setItem("searchType", JSON.stringify(value));
                // console.log("search food: ", resp);
            }

            if (value === "Activity") {
                const resp = await HomeAPIService.searchActivity(
                    keyword_text,
                    location_text
                );
                localStorage.setItem("searchResult", JSON.stringify(resp));
                localStorage.setItem("searchType", JSON.stringify(value));
                // console.log("search activity: ", resp);
            } else if (value === "Spot") {
                const resp = await HomeAPIService.searchSpot(keyword_text, location_text);
                localStorage.setItem("searchResult", JSON.stringify(resp));
                localStorage.setItem("searchType", JSON.stringify(value));
                // console.log("search spot: ", resp);
            }

            navigate("/search");
        }

    };
    return (
        <div className="divSearchBar">
            <h1>
                <b>Search here!</b>
            </h1>
            <div className="search">
                <div className="side-by-side">

                    {/*<Autocomplete*/}
                    {/*    id="keyword"*/}
                    {/*    fullWidth*/}
                    {/*    options={keywordOptions.map((option) => option.label)}*/}
                    {/*    onChange={(e, values) => {*/}
                    {/*        handleKeywordChange(values);*/}
                    {/*    }}*/}
                    {/*    renderInput={(params) => <TextField {...params} label="Keyword"/>}*/}
                    {/*/>*/}

                    {/*<Autocomplete*/}
                    {/*    id="location"*/}
                    {/*    fullWidth*/}
                    {/*    options={locations.map((option) => option.name)}*/}
                    {/*    onChange={(e, values) => {*/}
                    {/*        setLocation(values);*/}
                    {/*    }}*/}
                    {/*    renderInput={(params) => <TextField {...params} label="Location"/>}*/}
                    {/*/>*/}

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
                            <option value="Spot">Spot</option>
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
