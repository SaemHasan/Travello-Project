import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import AdminAPI from "../../AdminAPI";
import AddHotelAttributeRelationModal from "../../hotel/AddHotelAttributeRelationModal";

export default function ShowHotelAttributeRelation() {
  const [data, setData] = useState([]);
  const type = "hotel_attribute_tables";
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
      {/*<h1>Show Hotel Attribute Relation</h1>*/}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Hotel Attribute Relation</h2>
        </Grid>
        <Grid item xs={6}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddModalShow}
          >
            Add Hotel Attribute Relation
          </Button>
        </Grid>
      </Grid>

      {showModal && (
        <AddHotelAttributeRelationModal
          type={type}
          handleClose={handleClose}
          show={showModal}
        />
      )}
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={3} key={item.hotel_attribute_id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Hotel Attribute ID : {item.hotel_attribute_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Attribute ID: {item.attribute_id}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Hotel ID: {item.hotel_id}
                </Typography>
                {item.value && (
                  <Typography variant="body2" color="text.secondary">
                    Value : {item.value}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="success">
                  Update
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item.hotel_attribute_id)}
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
