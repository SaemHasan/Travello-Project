import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import Typography from "@material-ui/core/Typography";

export default function SearchResultActivity(props) {
  const data = props.result;

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
    return (
      <div>
        {/*<h1>Activities</h1>*/}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h2>Activities</h2>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {data.map((item) => (
            <Grid item xs={12} md={4} key={item.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="Place"
                  height="140"
                  image={"http://127.0.0.1:8000" + item.image}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.activity_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.type}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="success">
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
