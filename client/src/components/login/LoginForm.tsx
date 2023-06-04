import React, { FormEvent } from "react";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import "@/css/LoginForm.css";
import axios from "axios";
import { useAuth } from "@/hooks/authHook";
import { Navigate, useLocation, useNavigate } from "react-router";

const LoginForm = () => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const sendRecoverEmail = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/login/recover_password",
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = import.meta.env.VITE_BASE_URL + '/user/login';
    axios({
      method: "post",
      url: url,
      data: {
        email: email,
        password: password,
      },
    }).then((response) => {
      const from = location.state || "/dashboard";
      auth.signin(response.data.accessToken, () => {
        navigate(from, { replace: true });
      });
    });
  };

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={handleSubmit} method="post">
        <h1 className="login-title">Log in</h1>
        <div className="login-input-container login-form-item">
          <IoMailOutline className="login-icon" size={"1rem"} />
          <input
            type="text"
            name="email"
            id="email"
            className="login-text-input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-input-container login-form-item">
          <IoLockClosedOutline className="login-icon" size={"1rem"} />
          <input
            type="password"
            name="password"
            id="password"
            className="login-text-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="remember-forgot-container login-form-item">
          <div className="rememberme-container">
            <input type="checkbox" name="rememberme" id="rememberme" />
            <label htmlFor="rememberme" className="remember-me">
              Recuérdame
            </label>
          </div>
        </div>
        <div className="login-button-container login-form-item">
          <button className="login-button" type="submit">
            Ingresar
          </button>
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
