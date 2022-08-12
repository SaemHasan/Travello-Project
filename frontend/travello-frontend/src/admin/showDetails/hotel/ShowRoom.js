import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";
import AddRoomModal from "../../hotel/AddRoomModal";

export default function ShowRoom() {
  const [data, setData] = useState([]);
  const type = "rooms";
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
      {/*<h1>Rooms</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Room</h2>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Room
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddRoomModal type={type} handleClose={handleClose} show={showModal} />
      )}
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Room no : {item.room_no}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type : {item.room_type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hotel id : {item.hotel_id}
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
                  onClick={() => handleDelete(item.room_id)}
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
