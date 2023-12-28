import React from "react";
import "../../Styles/login.css";

const Login = () => {
  return (
    <div className="login-top">
      <div className="login-inner-top">
        <div className="login-head">LOGIN</div>
        <div className="login-input-detail">
          <input type="text" placeholder="Email ID" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </div>
        <div className="login-link-signup">New User ? Signup </div>
      </div>
    </div>
  );
};

export default Login;
