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
import AddActivityModal from "../../activity/AddActivityModal";
import UpdateActivityModal from "../../update/activity/UpdateActivity";

export default function ShowActivity() {
  const [data, setData] = useState([]);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateItem, setUpdateItem] = useState({});
  const type = "activities";
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
      {/*<h1>Activities</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={6} key="1">
          <h2>Activities</h2>
        </Grid>
        <Grid item xs={6} key="2">
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Activity
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddActivityModal
          type={type}
          handleClose={handleClose}
          show={showModal}
        />
      )}
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.activity_id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="Place"
                height="140"
                image={item.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.activity_name}
                </Typography>
                <Typography variant="body2" color="secondary">
                  {item.type}
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
                  onClick={() => handleDelete(item.activity_id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {updateShow && (
        <UpdateActivityModal
          type={type}
          item={updateItem}
          handleClose={handleUpdateClose}
          show={updateShow}
        />
      )}
    </div>
  );
}
