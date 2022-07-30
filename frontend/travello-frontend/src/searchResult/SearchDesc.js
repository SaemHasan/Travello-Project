// import { Link } from 'react-router-dom';
import { Link } from "@mui/material";

function updateImgPath(imgPath) {
  const myArray = imgPath.split("/");
  return myArray[myArray.length - 1];
}

function SearchDesc(props) {
  const result = props.result;
  result.map((num, index) => {
    num.image = updateImgPath(num.image);
  });
  console.log(result);

  const handleClick = (place) => {
    localStorage.setItem("place", JSON.stringify(place));
    localStorage.removeItem("spot");
    localStorage.removeItem("food");
  };

  if (result === undefined) {
    return (
      <div>
        <h1>No results found</h1>
      </div>
    );
  } else if (result.length === 0) {
    return (
      <div>
        <h1>NO MATCHING</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Search Result : </h1>
        <div>
          {result.map((item) => {
            return (
              <div key={item.id}>
                <Link
                  onClick={(e) => handleClick(item)}
                  underline="hover"
                  style={{ color: "black" }}
                  href="/oneplace"
                >
                  <h2>{item.name}</h2>
                </Link>
                <p>{item.short_description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchDesc;
