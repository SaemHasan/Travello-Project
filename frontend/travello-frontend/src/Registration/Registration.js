import '../App.css';
import Header from './header';
import RegistrationForm from './registrationForm';
import CheckboxInterests from "./CheckboxInterests";
import "./style.css";

function Registration() {
  return (
    <div className="body">
      <Header/>
      <div><CheckboxInterests/></div>
      <RegistrationForm/>
    </div>
  );
}

export default Registration;