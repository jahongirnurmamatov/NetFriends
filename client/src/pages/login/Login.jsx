import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/')
    } catch (error) {
      setErr(error.response.data);
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni alias
            ex earum autem totam nulla, accusantium esse, dicta eius, amet
            provident ut necessitatibus.
          </p>
          <span>Don't you have an account?</span>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              required
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && <p>{err}</p>}
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
