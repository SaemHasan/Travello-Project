import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";

export default function ShowActivityRatingInfo() {
  const [data, setData] = useState([]);
  const type = "activity_rating_infos";
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
      <h1>Activity Rating Info</h1>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={3} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Rating ID : {item.rating_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Factor: {item.factor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Time: {item.start_time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End Time: {item.end_time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activity Agency ID: {item.activity_agency_id}
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
