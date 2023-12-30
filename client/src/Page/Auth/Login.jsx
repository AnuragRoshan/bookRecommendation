import React, { useState } from "react";
import axios from "axios";
import "../../Styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(formData);
  };

  const handleLogin = async () => {
    try {
      // Make a POST request to the login endpoint
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );

      // Handle the response as needed (e.g., show a success message, redirect)
      console.log("Login successful:", response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Login failed:", error.message);
    }
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
      </div>
    </div>
  );
};

export default Login;
