import "../App.css";
import SearchDesc from "./SearchDesc";

function SearchResult() {
  const result = JSON.parse(localStorage.getItem("searchResult"));
  console.log(result);
  return (
    <div className="body">
      {/*<h1>Search Result</h1>*/}
      <SearchDesc result={result} />
    </div>
  );
}

export default SearchResult;
