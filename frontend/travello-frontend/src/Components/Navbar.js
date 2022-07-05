import React from "react";
import Button from 'react-bootstrap/Button';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#"><b><i>Travello</i></b></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">

  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ display: "flex", justifyContent: 'flex-end'}}>
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#"><Button> Home </Button></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#"><Button> Explore </Button></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#"><Button> Login </Button></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#"><Button> Register </Button></a>
      </li>
      {/*<li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
    </li>*/}
    </ul>
  </div>
</nav>
    )
}

export default Navbar;