import React, { useState } from "react";
import "./style.css";
import Button from "react-bootstrap/Button";
import { Link } from "@mui/material";
import APIService from "../APIService";
import { useNavigate } from "react-router-dom";



function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otherInterests, setOtherInterests] = useState("");
  const [userID, setUserID] = useState("");
  // const [user, setUser] = useState({});

  const [reg_success, set_reg_success] = useState(false);

  let navigate = useNavigate();

  const interests = [
    { name: "Mountain" },
    { name: "Beach" },
    { name: "Lake" },
    { name: "Forest" },
    { name: "Hill" },
    { name: "Desert" },
    { name: "Waterfall" },
  ];

  const [userinfo, setUserInfo] = useState({
    interests: [],
    response: [],
  });

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { interests } = userinfo;

    console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        interests: [...interests, value],
        response: [...interests, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        interests: interests.filter((e) => e !== value),
        response: interests.filter((e) => e !== value),
      });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      setUsername(value);
    }
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "city") {
      setCity(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
    if (id === "otherInterests") {
      setOtherInterests(value);
    }
  };

  function validateForm() {
    if (
      username.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      city.length > 0
    )
      return 1;
    else return 0;
  }

  const handleSubmit = () => {
    console.log(
      username,
      firstName,
      lastName,
      email,
      city,
      password,
      confirmPassword,
      userinfo.interests
    );
    set_reg_success(true);
  };

  const handleRegister = (resp) => {
    console.log(resp);
    // console.log(resp.id);
    if (resp.id) {
      setUserID(resp.id);
      set_reg_success(true);
      console.log("User registered successfully");
    } else {
      alert("Registration failed");
      set_reg_success(false);
    }
  };

  const RegisterBtn = () => {
    APIService.RegisterUser({
      username: username,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
    })
      .then((resp) => handleRegister(resp))
      .catch((err) => console.log(err));
  };

  const submitBtn = () => {
    console.log(userinfo.interests);
    console.log(userinfo.response);
    console.log(otherInterests);
    console.log(userID);

    if (userinfo.interests.length > 0) {
      userinfo.interests.forEach((interest) => {
        APIService.insertUserInterests({
          user: userID,
          interest: interest,
        })
          .then((resp) => console.log(resp))
          .catch((err) => console.log(err));
      });
    }
    alert("Interests saved successfully");
    navigate("/");
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="username">
          <label className="form__label" htmlFor="username">
            Username{" "}
          </label>
          <input
            className="form__input"
            type="username"
            value={username}
            onChange={(e) => handleInputChange(e)}
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="firstname">
          <label className="form__label" htmlFor="firstName">
            First Name{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="lastname">
          <label className="form__label" htmlFor="lastName">
            Last Name{" "}
          </label>
          <input
            type="text"
            name=""
            id="lastName"
            value={lastName}
            className="form__input"
            onChange={(e) => handleInputChange(e)}
            placeholder="LastName"
          />
        </div>
        <div className="email">
          <label className="form__label" htmlFor="email">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="city">
          <label className="form__label" htmlFor="city">
            City{" "}
          </label>
          <input
            className="form__input"
            type="text"
            value={city}
            onChange={(e) => handleInputChange(e)}
            id="city"
            placeholder="City"
          />
        </div>
        <div className="password">
          <label className="form__label" htmlFor="password">
            Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="confirm-password">
          <label className="form__label" htmlFor="confirmPassword">
            Confirm Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>

        <div className="footer">
          <Button
            onClick={RegisterBtn}
            block="true"
            type="submit"
            className="btn"
            disabled={!validateForm()}
          >
            Register
          </Button>

          {reg_success === true && (
            <div className="container-fluid top ">
              {/*for log in*/}
              <div className="success">
                <h3>Registration Successful</h3>
                {/*<Link href="/login">Login</Link>*/}
              </div>
              {/*done*/}

              <div className="container mt-5  pb-5 pt-5">
                <h3 className="form-head-contact-h3 ">Your interests </h3>

                {interests.map(({ name }, index) => {
                  return (
                    <li key={index}>
                      <div className="toppings-list-item">
                        <div className="left-section">
                          <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={name}
                            value={name}
                            onChange={handleChange}
                          />
                          <label htmlFor={`custom-checkbox-${index}`}>
                            {name}
                          </label>
                        </div>
                        {/*<div className="right-section">{getFormattedPrice(price)}</div>*/}
                      </div>
                    </li>
                  );
                })}

                {/*<div className="form-floating mt-3 mb-3 text-center">*/}
                {/*    <textarea*/}
                {/*      className="form-control text"*/}
                {/*      name="response"*/}
                {/*      value={userinfo.response}*/}
                {/*      placeholder="You're proficient in the following languages : "*/}
                {/*      id="floatingTextarea2"*/}
                {/*      style={{ height: "150px" }}*/}
                {/*      onChange={handleChange}*/}
                {/*    ></textarea>*/}
                {/*  </div>*/}
                <div className="otherInterests">
                  <label
                    className="otherInterests__label"
                    htmlFor="otherInterests"
                  >
                    Other interests{" "}
                  </label>
                  <input
                    className="form__input"
                    type="text"
                    value={otherInterests}
                    onChange={(e) => handleInputChange(e)}
                    id="otherInterests"
                    placeholder="Interests"
                  />
                </div>
                <p>&nbsp;&nbsp;</p>
                <Button onClick={() => submitBtn()}>
                  {/*{" "}*/}
                  {/*<Link href="/" style={{ color: "white" }}>*/}
                  {/*  {" "}*/}
                  {/*  Submit*/}
                  {/*</Link>*/}
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
