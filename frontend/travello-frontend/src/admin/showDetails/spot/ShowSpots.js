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
import AddSpotModal from "../../spot/AddSpotModal";
import UpdateSpotModal from "../../update/spot/UpdateSpot";

export default function ShowSpots() {
  const [data, setData] = useState([]);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateItem, setUpdateItem] = useState({});
  const type = "spots";
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
      {/*<h1>Spots</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Spots</h2>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Spot
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddSpotModal type={type} handleClose={handleClose} show={showModal} />
      )}
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.spot_id}>
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
                <Typography variant="body2" color="text.secondary">
                  {item.short_description}
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
                  onClick={() => handleDelete(item.spot_id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {updateShow && (
        <UpdateSpotModal
          type={type}
          item={updateItem}
          handleClose={handleUpdateClose}
          show={updateShow}
        />
      )}
    </div>
  );
}
