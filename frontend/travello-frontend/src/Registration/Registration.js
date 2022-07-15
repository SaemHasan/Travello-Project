import '../App.css';
import Header from './header';
import RegistrationForm from './registrationForm';
import "./style.css";
import Navbar from "./Navbar";

function Registration() {
  return (
    <div className="body">
      {/*<Header/>*/}
      <Navbar/>
      <RegistrationForm/>
    </div>
  );
}

export default Registration;