import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";
import AddSpotRatingModal from "../../spot/AddSpotRatingModal";

export default function ShowSpotRatingInfo() {
  const [data, setData] = useState([]);
  const type = "spot_rating_infos";
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
      {/*<h1>Spot Rating Info</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Spot Rating Info</h2>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Spot Rating
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddSpotRatingModal
          type={type}
          handleClose={handleClose}
          show={showModal}
        />
      )}
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={3} key={item.rating_id}>
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
                  Spot ID: {item.spot_id}
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
                  onClick={() => handleDelete(item.rating_id)}
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
