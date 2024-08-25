import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const {login}=useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin= ()=>{
    login();
    navigate('/');

  }
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World!</h1>~
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni alias
            ex earum autem totam nulla, accusantium esse, dicta eius, amet
            provident ut necessitatibus.
          </p>
          <span>Don't you have an account?</span>
          <Link to={'/register'}>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
