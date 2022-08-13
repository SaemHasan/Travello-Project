import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";
import AddSpotTypeModal from "../../spot/AddSpotTypeModal";

export default function ShowSpotTypeRelation() {
  const [data, setData] = useState([]);
  const type = "spot_types";
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
      {/*<h1>Spot Type Relation</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Spot Type Relation</h2>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Spot Type Relation
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddSpotTypeModal
          type={type}
          handleClose={handleClose}
          show={showModal}
        />
      )}
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={3} key={item.spot_type_id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Spot Type ID : {item.spot_type_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Spot ID: {item.spot_id}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Type ID: {item.type_id}
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
                  onClick={() => handleDelete(item.spot_type_id)}
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
