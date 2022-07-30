import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
// import { Link } from 'react-router-dom';
import { Link } from "@mui/material";
import APIService from "../APIService";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      APIService.getUserObject(token)
        .then(async (user) => {
          console.log("setting user");
          await setUser(user);
          console.log("finished setting user");
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    if (token) {
      console.log("token found");
      setToken(token);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  const LogoutBtn = () => {
    console.log("LogoutBtn");
    localStorage.removeItem("token");
    setToken("");
    setLoggedIn(false);
    navigate("/");
  };

  const handleUserBtn = () => {
    console.log("handleUserBtn");
    console.log(user);
    navigate("/user");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand" href="#">
        <b>
          <i>
            <Link href="/" underline="hover" style={{ color: "black" }}>
              Travello
            </Link>
          </i>
        </b>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></button>
      <div
        className="collapse navbar-collapse"
        id="navbarNavDropdown"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              <Button>
                <Link href="/" style={{ color: "white" }}>
                  {" "}
                  Home{" "}
                </Link>
              </Button>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Explore">
              <Button>
                {" "}
                <Link href="/Explore" style={{ color: "white" }}>
                  {" "}
                  Explore{" "}
                </Link>
              </Button>
            </a>
          </li>
          {loggedIn === false && (
            <li className="nav-item">
              <a className="nav-link" href="/Login">
                <Button>
                  <Link href="/Login" style={{ color: "white" }}>
                    {" "}
                    Login{" "}
                  </Link>{" "}
                </Button>
              </a>
            </li>
          )}
          {loggedIn === true && (
            <li className="nav-item">
              <div className="nav-link">
                <Button onClick={LogoutBtn}>Logout</Button>
              </div>
            </li>
          )}

          {loggedIn === true && user.username && (
            <li className="nav-item">
              <div className="nav-link">
                <Button onClick={handleUserBtn}>{user.username}</Button>
              </div>
            </li>
          )}

          {loggedIn === false && (
            <li className="nav-item">
              <a className="nav-link" href="/Registration">
                <Button>
                  <Link href="/Registration" style={{ color: "white" }}>
                    {" "}
                    Register{" "}
                  </Link>{" "}
                </Button>
              </a>
            </li>
          )}
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
  );
};

export default Navbar;
