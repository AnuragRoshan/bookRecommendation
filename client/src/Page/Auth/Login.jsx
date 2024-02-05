import React, { useState } from "react";
import axios from "axios";
import "../../Styles/login.css";
import { useSelector } from "react-redux";
import { selectUserStatus, selectUsers } from "../../Features/userSlice";
import { Link } from "react-router-dom";
import { api } from "../../Assist/env";

const Login = () => {
  const [formData, setFormData] = useState({});
  const userStatus = useSelector(selectUserStatus);
  const users = useSelector(selectUsers);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(formData);
  };

  const handleLogin = async () => {
    await axios
      .post(`${api}login`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        //   window.history.replaceState(null, "", "/");
        console.log(response);
        // Navigate("/");
        if (response.status === 200) {
          window.location.href = "/";
        } else if (response.status === 201) {
          alert("Wrong Credentials Try Again !");
        }
      });
  };

  return (
    <div className="login-top">
      <div className="login-inner-top">
        <div className="login-head">LOGIN</div>
        <div className="login-input-detail">
          <input
            type="text"
            placeholder="Email ID"
            value={formData.email}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="login-link-signup">
          New User ?{" "}
          <Link to={"/signup"} style={{ color: "blue" }}>
            {" "}
            Signup{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
