import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";

export default function ShowActivity() {
  const [data, setData] = useState([]);
  const type = "activities";
  useEffect(() => {
    async function fetchData() {
      await AdminAPI.getFromDB(type).then(async (res) => {
        await setData(res);
      });
    }
    fetchData().then(() => {});
    // console.log("data: ", data);
  }, []);

  return (
    <div>
      <h1>Activities</h1>
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
                  {item.activity_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.type}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="success">
                  Update
                </Button>
                <Button size="small" variant="contained" color="error">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
