import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const {currentUser}=useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>
            Net<span className="logo">Friends</span>
          </span>
        </Link>
        <HomeOutlinedIcon  className="icon"/>
          {darkMode ? (
            <LightModeIcon className="icon" onClick={toggle} />
          ) : (
            <DarkModeOutlinedIcon className="icon" onClick={toggle} />
          )}

        <WidgetsOutlinedIcon  className="icon"/>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon className="icon" />
        <EmailOutlinedIcon  className="icon"/>
        <NotificationsOutlinedIcon  className="icon"/>
        <div className="user">
          <img
            src={currentUser.profilePic||'/profile.png'}
            alt=""
          />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
