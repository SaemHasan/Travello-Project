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
import AddRestaurantModal from "../../food/AddRestaurantModal";

export default function ShowRestaurant() {
  const [data, setData] = useState([]);
  const type = "restaurants";
  async function fetchData() {
    await AdminAPI.getFromDB(type).then(async (res) => {
      await setData(res);
    });
  }

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetchData().then(() => {});
    // console.log("data: ", data);
  }, []);

  const handleDelete = async (id) => {
    await AdminAPI.deleteFromDB(type, id);
    fetchData().then(() => {});
  };

  const handleAddModalShow = () => {
    setShowModal(true);
  };

  const handleClose = (type) => {
    setShowModal(false);
    window.location.reload(false);
  };

  return (
    <div>
      {/*<h1>Restaurant</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Restaurant</h2>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Restaurant
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddRestaurantModal
          type={type}
          handleClose={handleClose}
          show={showModal}
        />
      )}

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.restaurant_id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="Place"
                height="140"
                image={item.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.restaurant_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone Number : {item.phone_number}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="success">
                  Update
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item.restaurant_id)}
                >
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
