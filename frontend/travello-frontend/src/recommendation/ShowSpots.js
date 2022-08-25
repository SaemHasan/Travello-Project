import {Button, Card, CardActions, CardContent, CardMedia, Grid, Rating} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import {useNavigate} from "react-router-dom";

export default function ShowSpots(props){

    let navigate = useNavigate();

    const handleLearnMore = (item) => {
        localStorage.setItem("spot", JSON.stringify(item));
        localStorage.removeItem("place");
        localStorage.removeItem("food");
        navigate("/oneplace");
    }

    return (
        <>
            {/*<h1>Spots</h1>*/}
            <Grid container spacing={3}>
          {props.data.map((item) => (
            <Grid item xs={12} md={3} key={item.spot_id}>
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
        </>
    )
}