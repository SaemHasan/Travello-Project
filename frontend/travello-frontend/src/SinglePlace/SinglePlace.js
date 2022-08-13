import "../App.css";
import SinglePlaceDesc from "./SinglePlaceDesc";
import ReviewBox from "../OnePlace/ReviewBox";
import ShowReviews from "../OnePlace/ShowReviews";


function SinglePlace() {
  return (
    <div className="body">
      <SinglePlaceDesc />
      <ReviewBox />
      <ShowReviews />
    </div>
  );
}

export default SinglePlace;