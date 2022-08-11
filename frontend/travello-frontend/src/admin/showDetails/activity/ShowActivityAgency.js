import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";

export default function ShowActivityAgency() {
  const [data, setData] = useState([]);
  const type = "activity_agencies";
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
      <h1>Activity Agency</h1>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={3} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Activity Agency ID : {item.activity_agency_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Activity ID : {item.activity_id}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Agency ID : {item.agency_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating : {item.rating}
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
