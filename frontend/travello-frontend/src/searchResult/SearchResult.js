import "../App.css";
import SearchResultPlace from "./SearchResultPlace";
import { useEffect, useState } from "react";
import SearchResultFood from "./SearchResultFood";
import SearchResultActivity from "./SearchResultActivity";

function SearchResult() {
  const res = JSON.parse(localStorage.getItem("searchResult"));
  const type = JSON.parse(localStorage.getItem("searchType"));
  const [result, setResult] = useState(res);
  const [searchType, setSearchType] = useState(type);
  const [showPlace, setShowPlace] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showFood, setShowFood] = useState(false);

  async function fetchItems() {
    await setResult(res);
    await setSearchType(type);
    if (searchType === "Place") {
      setShowPlace(true);
      setShowActivity(false);
      setShowFood(false);
    } else if (searchType === "Activity") {
      setShowPlace(false);
      setShowActivity(true);
      setShowFood(false);
    } else if (searchType === "Food") {
      setShowPlace(false);
      setShowActivity(false);
      setShowFood(true);
    } else {
      setShowPlace(false);
      setShowActivity(false);
      setShowFood(false);
    }
  }
  useEffect(() => {
    fetchItems().then(() => {});
    // console.log(result);
    // console.log(searchType);
  }, []);

  return (
    <div className="body">
      <h2>Search Result</h2>
      {showPlace && <SearchResultPlace result={result} />}
      {showFood && <SearchResultFood result={result} />}
      {showActivity && <SearchResultActivity result={result} />}
    </div>
  );
}

export default SearchResult;
