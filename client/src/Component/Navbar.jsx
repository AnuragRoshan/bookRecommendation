import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/navbar.css";
import { addUser } from "../Features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserStatus,
  selectUsers,
  removeUser,
} from "../Features/userSlice"; // Update the path accordingly

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState("");
  const userStatus = useSelector(selectUserStatus);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    handleNavItemClick();
  }, []);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);

    // Check if the clicked item is "login" or "logout" and dispatch the action accordingly
    // if (navItem === "login") {
    // Assuming you have the user data available, replace this with your actual user data
    // dispatch(addUser(userData));
    // } else if (navItem === "logout") {
    //   dispatch(removeUser());
    // }
  };

  return (
    <div className="nav-top">
      <Link to={`/`}>
        <div
          className={`nav-item ${activeNavItem === "home" ? "nav-active" : ""}`}
          onClick={() => handleNavItemClick("home")}
        >
          <i className="fa-solid fa-house"></i>Home
        </div>
      </Link>

      <Link to={`/likes`}>
        <div
          className={`nav-item ${
            activeNavItem === "likes" ? "nav-active" : ""
          }`}
          onClick={() => handleNavItemClick("likes")}
        >
          <i className="fa-solid fa-heart"></i>Likes
        </div>
      </Link>
      {userStatus ? (
        <>
          <Link to={`/profile`}>
            <div
              className={`nav-item ${
                activeNavItem === "profile" ? "nav-active" : ""
              }`}
              onClick={() => handleNavItemClick("profile")}
            >
              <i className="fa-solid fa-user"></i>
              {users.name}
            </div>
          </Link>
          <div onClick={() => handleNavItemClick("logout")}>
            <i class="fa-solid fa-right-from-bracket"></i>Logout
          </div>
        </>
      ) : (
        <>
          <Link to={`/login`}>
            <div
              className={`nav-item ${
                activeNavItem === "login" ? "nav-active" : ""
              }`}
              onClick={() => handleNavItemClick("login")}
            >
              <i class="fa-solid fa-right-to-bracket"></i>Login
            </div>
          </Link>
        </>
      )}

      <div className="search-input">
        <input type="text" name="search" id="" placeholder="Search Book" />
      </div>
    </div>
  );
};

export default Navbar;
