import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/navbar.css";
import { addUser } from "../Features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserStatus,
  selectUsers,
  removeUser,
} from "../Features/userSlice";
import axios from "axios";
import Cookies from "js-cookie";

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Add this line for search input
  const userStatus = useSelector(selectUserStatus);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    handleNavItemClick();
  }, []);

  function deleteCookie(name) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/logout", null, {
        withCredentials: true, // include cookies in the request
      });

      if (response.status === 200) {
        // Logout successful
        console.log("User logged out");
        window.location.href = "/";
      } else {
        // Handle logout failure
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    // console.log(searchInput);
  };

  const handleSearchSubmit = () => {
    // Implement your logic for handling search, e.g., redirect to a search page with the searchInput
    // You can use react-router-dom for this purpose
    console.log("Search submitted:", searchInput);
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
          <div onClick={() => handleLogout()}>
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
        <input
          type="text"
          name="search"
          placeholder="Search Book"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
      <Link to={`/search/${searchInput}`}>
        <div
          style={{ paddingInlineStart: "0.2rem" }}
          onClick={handleSearchSubmit}
        >
          Search
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
