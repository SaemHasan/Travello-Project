// import React from "react";
// import ReactModal from "react-modal";
// import "./demoModal.css";
//
// class DemoModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showModal: false,
//       showModal2: false,
//     };
//
//     this.handleOpenModal = this.handleOpenModal.bind(this);
//     this.handleOpenModal2 = this.handleOpenModal2.bind(this);
//     this.handleCloseModal = this.handleCloseModal.bind(this);
//     this.handleCloseModal2 = this.handleCloseModal2.bind(this);
//   }
//
//   handleOpenModal() {
//     this.setState({ showModal: true });
//   }
//
//   handleOpenModal2() {
//     this.setState({ showModal2: true });
//   }
//
//   handleCloseModal() {
//     this.setState({ showModal: false });
//   }
//
//   handleCloseModal2() {
//     this.setState({ showModal2: false });
//   }
//
//   render() {
//     return (
//       <div>
//         <button onClick={this.handleOpenModal}>Trigger #1 Modal</button>
//         <button onClick={this.handleOpenModal2}>Trigger #2 Modal</button>
//         <ReactModal
//           isOpen={this.state.showModal}
//           contentLabel="Modal #1 Global Style Override Example"
//           onRequestClose={this.handleCloseModal}
//           className="Modal"
//           overlayClassName="Overlay"
//         >
//           <p>Modal text!</p>
//           <button onClick={this.handleCloseModal}>Close Modal</button>
//         </ReactModal>
//         <ReactModal
//           isOpen={this.state.showModal2}
//           contentLabel="Modal #2 Global Style Override Example"
//           onRequestClose={this.handleCloseModal2}
//           className="Modal"
//           overlayClassName="Overlay"
//         >
//           <p>Modal #2 text!</p>
//           <button onClick={this.handleCloseModal2}>Close Modal</button>
//         </ReactModal>
//       </div>
//     );
//   }
// }
//
// export default DemoModal;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function DemoModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
