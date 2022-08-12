import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";
import AddActivityTypeModal from "../../activity/AddActivityTypeModal";
import UpdateActivityTypeModal from "../../update/activity/UpdateActivityType";

export default function ShowActivityTypeTable() {
  const [data, setData] = useState([]);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateItem, setUpdateItem] = useState({});
  const type = "activity_types";
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Activity Type</h2>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Activity Type
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddActivityTypeModal
          type={type}
          handleClose={handleClose}
          show={showModal}
        />
      )}

      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={3} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Type ID : {item.type_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type Name: {item.type_name}
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
                  onClick={() => handleDelete(item.type_id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {updateShow && (
        <UpdateActivityTypeModal
          type={type}
          item={updateItem}
          handleClose={handleUpdateClose}
          show={updateShow}
        />
      )}
    </div>
  );
}
