import React, {useState} from 'react';
import './style.css'
import Button from "react-bootstrap/Button";
import Sliders from "../Components/auto_slider/Sliders";
import {Link} from "@mui/material";


function RegistrationForm() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [otherInterests, setotherInterests] = useState("");

    const [reg_success, set_reg_success] = useState(false);



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
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "city"){
            setCity(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }
        if(id === "otherInterests"){
            setotherInterests(value);
        }

    }

    function validateForm() {
        if (firstName.length > 0 && lastName.length>0 && email.length>0 && password.length>0 && confirmPassword.length>0 && city.length>0)
            return 1;
        else
            return 0;
  }


    const handleSubmit  = () => {
        console.log(firstName,lastName,email,city,password,confirmPassword,userinfo.interests);
        set_reg_success(true)
    }

    return(
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstName">First Name </label>
                    <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
                </div>
                <div className="lastname">
                    <label className="form__label" for="lastName">Last Name </label>
                    <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
                </div>
                <div className="city">
                    <label className="form__label" htmlFor="city">City </label>
                    <input className="form__input" type="text" value={city} onChange={(e) => handleInputChange(e)}
                           id="city" placeholder="City"/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" for="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                </div>

                <div className="footer">
                    <Button onClick={() => handleSubmit()} block="true" type="submit" class="btn"
                            disabled={!validateForm()}>Register</Button>

                    {reg_success == true &&
                <div className="container-fluid top ">
        <div className="container mt-5  pb-5 pt-5">
          <h3 className="form-head-contact-h3 ">
            Your interests {" "}
          </h3>

          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="interests"
                    value="Mountains"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Mountains
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="interests"
                    value="Sea"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Sea
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="interests"
                    value="Waterfalls"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Waterfalls
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="interests"
                    value="Forests"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Forests
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="interests"
                    value="Caves"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Caves
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="interests"
                    value="National Parks"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      National Parks
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="interests"
                    value="Wildlife attractions"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Wildlife attractions
                  </label>
                </div>
                <div className="form-check m-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="interests"
                    value="Islands"
                    id="flexCheckDefault"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                      Islands
                  </label>
                </div>
              </div>
            </div>

            <div className="form-floating mt-3 mb-3 text-center">
              <textarea
                className="form-control text"
                name="response"
                value={userinfo.response}
                placeholder="You're proficient in the following languages : "
                id="floatingTextarea2"
                style={{ height: "150px" }}
                onChange={handleChange}
              ></textarea>
            </div>
                              <div className="otherInterests">
                <label className="form__label" htmlFor="otherInterests">Other interests </label>
                <input className="form__input" type="text" value={otherInterests} onChange={(e) => handleInputChange(e)}
                       id="otherInterests" placeholder="Interests"/>
            </div>
              <p>&nbsp;&nbsp;</p>
              <a className="nav-link" href="#explore"><Button> <Link href = "/Explore" style={{ color:"white"}}> Explore Now!</Link></Button></a>
          </form>
        </div>
      </div>
                    }
                </div>



            </div>



            <p>
        fisrtname: {firstName}


      </p>
      <p>

        Lastname: {lastName}
      </p>
            <p>

        email: {email}
      </p>
             <p>

        city: {city}
      </p>
            <p>

        pass: {password}
      </p>
            <p>

        confirm_pass: {confirmPassword}
      </p>
            <p>

        interest: {userinfo.interests[0]}
      </p>
            <p>

        other interest: {otherInterests}
      </p>
        </div>

    )
}

export default RegistrationForm;