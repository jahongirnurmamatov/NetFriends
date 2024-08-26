import { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import axios from 'axios';
const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
  });
  const [err,setErr]=useState(null);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick =async (e)=>{
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/auth/register',inputs)
      
    } catch (error) {
      setErr(error.response.data);
    }
  }
  console.log(err)
 


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Net Friends</h1>~
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni alias
            ex earum autem totam nulla, accusantium esse, dicta eius, amet
            provident ut necessitatibus.
          </p>
          <span>Do you have an account??</span>
          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Username"
              required
              name="username"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              onChange={handleChange}
            />
            {err && <p>{err}</p>}
            <button >Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
