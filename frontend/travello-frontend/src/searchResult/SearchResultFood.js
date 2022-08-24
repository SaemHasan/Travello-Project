import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import {useNavigate} from "react-router-dom";

export default function SearchResultFood(props) {
  const data = props.result;

  let navigate = useNavigate();

  const handleLearnMore = (item) => {
    localStorage.setItem("food", JSON.stringify(item));
    navigate("/oneFood");
  }

  if (data === undefined) {
    return (
      <div>
        <h1>NO RESULT FOUND</h1>
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div>
        <h1>NO MATCHING RESULT</h1>
      </div>
    );
  } else {
    if(data[0].image.includes("http://127.0.0.1:8000")){

    }
    else{
      data.map((item) => {
        item.image = "http://127.0.0.1:8000" + item.image;
      });
    }
    return (
      <div>
        {/*<h1>Food</h1>*/}
        {/*<Grid container spacing={2}>*/}
        {/*  <Grid item xs={6}>*/}
        {/*    <h2>Foods</h2>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}

        <Grid container spacing={3}>
          {data.map((item) => (
            <Grid item xs={12} md={4} key={item.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="Place"
                  height="140"
                  image={item.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.food_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.short_description}
                  </Typography>
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
