import React, { useState } from "react";
import axios from "axios";
import "../../Styles/login.css";
import { useSelector } from "react-redux";
import { selectUserStatus, selectUsers } from "../../Features/userSlice";

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
      .post(`http://localhost:5000/login`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        //   window.history.replaceState(null, "", "/");
        console.log(response);
        // Navigate("/");
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
        <div className="login-link-signup">New User ? Signup </div>
        hey{users.name}
      </div>
    </div>
  );
};

export default Login;
