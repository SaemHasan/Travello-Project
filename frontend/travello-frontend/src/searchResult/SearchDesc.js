// import { Link } from 'react-router-dom';
import { Link } from "@mui/material";

function SearchDesc(props) {
  const result = props.result;
  // console.log(result);

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
        <h1>NO MATCHING RESULT</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-success">Search Result : </h1>
        <div className="card-group">
          {result.map((item) => {
            return (
              <div className="card" style={{ width: "18rem" }}>
                {/*<img className="card-img-top" src="..." alt="Card image cap" />*/}
                <div className="card-body">
                  <Link
                    onClick={(e) => handleClick(item)}
                    underline="hover"
                    style={{ color: "black" }}
                    href="/oneplace"
                  >
                    <h5 className="card-title">{item.name}</h5>
                  </Link>
                  {/*<p className="card-text"> {item.short_description}</p>*/}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SearchDesc;
