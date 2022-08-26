import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
// import { Link } from 'react-router-dom';
import { Link } from "@mui/material";
import APIService from "../APIService";
import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";

export default function LoginBody() {
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  // const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [token, setToken] = useState("");
  let navigate = useNavigate(); // log in thakle page e redirect korar jonno

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    console.log("handleSubmit");
    event.preventDefault();
  };

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  const handleLogin = (resp) => {
    console.log("handleLogin");
    console.log(resp);
    if (resp.token) {
      // alert("Login Successful");
      setToken(resp.token);
      localStorage.setItem("token", JSON.stringify(resp.token));
      setLoggedIn(true);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  const loginBtn = () => {
    APIService.LoginUser({ username, password })
      .then((resp) => handleLogin(resp))
      .catch((err) => console.log(err));
  };

  return (
    <div  className="card center" style={{ width: "27rem", marginTop: "100px" }}>
      <Form style={{paddingRight:"30px"}} onSubmit={(e) => handleSubmit(e)}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" style={{marginTop: "20px"}}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <p>&nbsp;&nbsp;</p>
        <div className="side-by-side">
          <p>
            Don't have an account
            ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <Link href="/Registration">Register</Link>
        </div>
        <p>&nbsp;&nbsp;</p>

        <Button
          onClick={loginBtn}
          className="btn_login"
          block="true"
          type="submit"
          disabled={!validateForm()}
        >
          Login
        </Button>
      </Form>

      {loggedIn === true && (
        <div className="Login">
          <p>Login Successful</p>
          <Link href="/">Go to Home</Link>
        </div>
      )}

      {/*<p>*/}
      {/*  email: {email}*/}

      {/*</p>*/}
      {/*<p>*/}

      {/*  password: {password}*/}
      {/*</p>*/}
    </div>
  );

  // return(
  //     <div className= "Login">
  //       <br/>
  //       <br/>
  //
  //       <div className="mb-3">
  //         <label htmlFor= "username" className="form-label">Username</label>
  //         <input type="text" className="form-control" id="username" placeholder="Please Enter Username"
  //                value={username} onChange={(e) => setUsername(e.target.value)}/>
  //       </div>
  //
  //       <div className="mb-3">
  //         <label htmlFor="password" className="form-label"> Password</label>
  //           <input type="password" className="form-control" id="password" placeholder="Please Enter Password"
  //                value={password} onChange={ e=> setPassword(e.target.value)} />
  //       </div>
  //
  //       <button onClick={loginBtn} className="btn btn-primary" disabled={!validateForm()}>Login</button>
  //     </div>
  // )
}
