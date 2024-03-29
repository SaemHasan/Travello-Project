import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid, Rating,
} from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";
import AddPlaceModal from "../../spot/AddPlaceModal";
import UpdatePlaceModal from "../../update/spot/UpdatePlace";

export default function ShowPlaces() {
  const [data, setData] = useState([]);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateItem, setUpdateItem] = useState({});
  const type = "places";
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

  const handleUpdateClose = (refresh) => {
    setUpdateShow(false);
    if (refresh) window.location.reload(false);
  };

  const handleUpdateShow = async (item) => {
    await setUpdateItem(item);
    setUpdateShow(true);
  };

  return (
    <div>
      {/*<h1>Places</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Places</h2>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Place
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddPlaceModal type={type} handleClose={handleClose} show={showModal} />
      )}
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.place_id}>
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
                {/*<Typography variant="body2" color="text.secondary">*/}
                {/*  {item.short_description}*/}
                {/*</Typography>*/}
                <Typography variant="body2" color="secondary">
                  <Rating name="read-only" value={item.rating} readOnly />
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => handleUpdateShow(item)}
                >
                  Update
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item.place_id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {updateShow && (
        <UpdatePlaceModal
          type={type}
          item={updateItem}
          handleClose={handleUpdateClose}
          show={updateShow}
        />
      )}
    </div>
  );
}
