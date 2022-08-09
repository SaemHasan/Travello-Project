import Button from "react-bootstrap/Button";

function DemoModal() {
  return (
    <div>
      {/*-- Button trigger modal --*/}
      <Button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </Button>

      {/*-- Modal --*/}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Modal title
              </h5>
              <Button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </Button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <Button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </Button>
              <Button type="button" className="btn btn-primary">
                Save changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoModal;
