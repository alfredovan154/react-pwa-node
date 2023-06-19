import "@/css/LoginForm.css";
import axios from "axios";
import React, { FormEvent } from "react";
import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [confirmPassword, setConfirmPassword] = React.useState<string>();
  const [error, setError] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const temporarypass = searchParams.get("temporaryPass");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!temporarypass) {
      navigate("/login", { replace: true });
    }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = import.meta.env.VITE_BASE_URL + "/user/recover_password";
    if (password === confirmPassword) {
      axios({
        method: "post",
        url: url,
        data: {
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          temporaryPass: temporarypass,
        },
      }).then((response) => {
        navigate("/login", { replace: true });
      });
    } else {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-form-container"
        onSubmit={handleSubmit}
        method="post"
      >
        <h1 className="login-title">Reinciar Contraseña</h1>
        <div className="login-input-container login-form-item">
          <IoMailOutline className="login-icon" size={"1rem"} />
          <input
            type="text"
            name="email"
            id="email"
            className="login-text-input"
            placeholder="Email"
            required
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
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-input-container login-form-item">
          <IoLockClosedOutline className="login-icon" size={"1rem"} />
          <input
            type="password"
            name="password-verify"
            id="password-verify"
            className="login-text-input"
            placeholder="Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error ? (
          <div className="login-form-item">
            <span className="error-message">La contraseñas no coinciden</span>
          </div>
        ) : null}
        <div className="login-button-container login-form-item">
          <button className="login-button" type="submit">
            Reinciar contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
