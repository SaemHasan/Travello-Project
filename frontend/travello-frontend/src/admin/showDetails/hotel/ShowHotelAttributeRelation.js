import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";

export default function ShowHotelAttributeRelation() {
  const [data, setData] = useState([]);
  const type = "hotel_attribute_tables";
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
      <h1>Show Hotel Attribute Relation</h1>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={3} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Hotel Attribute ID : {item.hotel_attribute_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Attribute ID: {item.attribute_id}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Hotel ID: {item.hotel_id}
                </Typography>
                {item.value && (
                  <Typography variant="body2" color="text.secondary">
                    Value : {item.value}
                  </Typography>
                )}
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
