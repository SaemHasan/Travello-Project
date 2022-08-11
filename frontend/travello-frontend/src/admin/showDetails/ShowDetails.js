import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminAPI from "../AdminAPI";
import Typography from "@material-ui/core/Typography";

export default function ShowDetails(props) {
  const [data, setData] = useState([]);
  const type = "places";
  useEffect(() => {
    async function fetchData() {
      console.log("type from props: ", props.type);
      await AdminAPI.getFromDB("places").then(async (res) => {
        await setData(res);
      });
    }
    fetchData().then(() => console.log("fetched data"));
    // console.log("data: ", data);
  }, []);

  return (
    <div>
      <h1>Details</h1>
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
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.short_description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Update</Button>
                <Button size="small">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
