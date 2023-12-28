import React, { useState } from "react";
import "../Styles/navbar.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserStatus,
  selectUsers,
  removeUser,
} from "../Features/userSlice"; // Update the path accordingly

const Navbar = (props) => {
  const [activeNavItem, setActiveNavItem] = useState("home");
  const userStatus = useSelector(selectUserStatus);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  return (
    <div className="nav-top">
      <div
        className={`nav-item ${activeNavItem === "home" ? "nav-active" : ""}`}
        onClick={() => handleNavItemClick("home")}
      >
        <i className="fa-solid fa-house"></i>Home
      </div>
      <div
        className={`nav-item ${activeNavItem === "likes" ? "nav-active" : ""}`}
        onClick={() => handleNavItemClick("likes")}
      >
        <i className="fa-solid fa-heart"></i>Likes
      </div>
      {userStatus ? (
        <>
          <div
            className={`nav-item ${
              activeNavItem === "profile" ? "nav-active" : ""
            }`}
            onClick={() => handleNavItemClick("profile")}
          >
            <i className="fa-solid fa-user"></i>Profile
          </div>
          <div>
            <i class="fa-solid fa-right-from-bracket"></i>Logout
          </div>
        </>
      ) : (
        <>
          <div>
            <i class="fa-solid fa-right-to-bracket"></i>Login
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
