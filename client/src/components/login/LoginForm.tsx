import React from "react";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import "@/css/LoginForm.css";
import axios from "axios";

const LoginForm = () => {
  const sendRecoverEmail = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/email/recover_password",
      data: {
        email: "thealf154@gmail.com",
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="login-container">
      <form action="" method="post" className="login-form-container">
        <h1 className="login-title">Log in</h1>
        <div className="login-input-container login-form-item">
          <IoMailOutline className="login-icon" size={"1rem"} />
          <input
            type="text"
            name="email"
            id="email"
            className="login-text-input"
            placeholder="Email"
          />
        </div>
        <div className="login-input-container login-form-item">
          <IoLockClosedOutline className="login-icon" size={"1rem"} />
          <input
            type="text"
            name="password"
            id="password"
            className="login-text-input"
            placeholder="Password"
          />
        </div>
        <div className="remember-forgot-container login-form-item">
          <div className="rememberme-container">
            <input type="checkbox" name="rememberme" id="rememberme" />
            <label htmlFor="rememberme" className="remember-me">Recuérdame</label>
          </div>
        </div>
        <div className="login-button-container login-form-item">
          <button className="login-button" type="submit">Ingresar</button>
        </div>
        <a
          href="/#"
          onClick={() => sendRecoverEmail()}
          className="forgot-password"
        >
          ¿Has olvidado tu contraseña?
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
