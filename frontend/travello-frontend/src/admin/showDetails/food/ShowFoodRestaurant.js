import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";
import AddFoodRestaurantModal from "../../food/AddFoodRestaurantModal";

export default function ShowFoodRestaurant() {
  const [data, setData] = useState([]);
  const type = "food_restaurants";
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
    let isExecuted = window.confirm("Are you sure to execute this action?");
    console.log(isExecuted);
    if (isExecuted) {
      await AdminAPI.deleteFromDB(type, id);
      fetchData().then(() => {});
    }
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
      {/*<h1>Food Restaurant Relation</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Food Restaurant Relation</h2>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Food Restaurant
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddFoodRestaurantModal
          type={type}
          handleClose={handleClose}
          show={showModal}
        />
      )}

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={3} key={item.food_restaurant_id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Food Restaurant ID : {item.food_restaurant_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Restaurant ID: {item.restaurant_id}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Food ID: {item.food_id}
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
                  onClick={() => handleDelete(item.food_restaurant_id)}
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
