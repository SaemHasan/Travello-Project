import '../App.css';
import Header from './header';
import LoginBody from "./LoginBody";
import Navbar from "./Navbar";

function Login() {
  return (
    <div className="body" style={{paddingLeft:"50px", paddingRight:"50px"}}>
      {/*<Header/>*/}
        <Navbar/>
      <LoginBody/>
    </div>
  );
}

export default Login;