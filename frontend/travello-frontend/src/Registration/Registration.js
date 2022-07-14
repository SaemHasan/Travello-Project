import '../App.css';
import Header from './header';
import RegistrationForm from './registrationForm';
import CheckboxInterests from "./CheckboxInterests";
import "./style.css";
import Navbar from "./Navbar";

function Registration() {
  return (
    <div className="body">
      {/*<Header/>*/}
      <Navbar/>
      {/*<div><CheckboxInterests/></div>*/}
      <RegistrationForm/>
    </div>
  );
}

export default Registration;