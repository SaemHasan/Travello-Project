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

export default function ShowAgency() {
  const [data, setData] = useState([]);
  const type = "agencies";
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
      <h1>Agencies</h1>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="Agency"
                height="140"
                image={item.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Name : {item.agency_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone : {item.phone_number}
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
