import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import {useNavigate} from "react-router-dom";

export default function SearchResultPlace(props) {
  const data = props.result;
  let navigate = useNavigate();

  const handleLearnMore = (item) => {
    localStorage.setItem("place", JSON.stringify(item));
    navigate("/SinglePlace");
  }

  if (data === undefined) {
    return (
      <div>
        <h1>No results found</h1>
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div>
        <h1>NO MATCHING RESULT</h1>
      </div>
    );
  } else {
    return (
      <div>
        {/*<h1 className="center">Places</h1>*/}
        <Grid container spacing={3}>
          {data.map((item) => (
            <Grid item xs={12} md={3} key={item.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="Place"
                  height="140"
                  image={"http://127.0.0.1:8000" + item.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography component="legend">Rating</Typography>
                  <Rating name="read-only" value={item.rating} readOnly />
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="success" onClick={(e) =>handleLearnMore(item)}>
                    Show More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
