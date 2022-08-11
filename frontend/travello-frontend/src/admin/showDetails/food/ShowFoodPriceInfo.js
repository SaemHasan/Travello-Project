import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";

export default function ShowFoodPriceInfo() {
  const [data, setData] = useState([]);
  const type = "food_price_infos";
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
      <h1>Food Price Info</h1>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={3} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Price ID : {item.price_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Time: {item.start_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End Time: {item.end_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Food Restaurant ID: {item.food_restaurant_id}
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
