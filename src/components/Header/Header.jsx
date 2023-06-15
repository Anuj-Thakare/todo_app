import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context, server } from "../../main";
import "./Header.css";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
        toast.success("Logged Out Successfully");
        setIsAuthenticated(false);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setIsAuthenticated(true);
        setLoading(false);
      }
    };

    return (
      <div>
      <nav>
        <h2>TODO - App</h2>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/profile"}>Profile</Link>
          </li>
          {isAuthenticated ? (
            <button disabled={loading} onClick={logoutHandler} className="btn1">Logout</button>
          ) : (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
    );
  };
  
  export default Header;
