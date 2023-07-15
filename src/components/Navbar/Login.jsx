import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form" action="/login">
        <div>
          <label htmlFor="email">Email</label>
          <br/>
          <input
            className="login-input"
            type="email"
            name="email"
            id="email"
            placeholder="test@example.com"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input className="login-input" type="password" name="password" id="password" />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
