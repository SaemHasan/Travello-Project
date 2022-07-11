import '../App.css';
import Header from './header';
import Login_body from "./Login_body";

function Login() {
  return (
    <div className="body">
      <Header/>
      <Login_body/>
    </div>
  );
}

export default Login;