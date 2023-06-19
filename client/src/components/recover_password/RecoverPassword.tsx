import axios from "axios";
import React, { FormEvent } from "react";
import { IoMailOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const RecoverPassword = () => {
  const [email, setEmail] = React.useState<string>();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = import.meta.env.VITE_BASE_URL + "/user/recover_password";
    axios({
      method: "get",
      url: url,
      params: {
        email: email
      },
    }).then((response) => {
      navigate("/login", { replace: true });
    });
  };

  return (
    <div className="login-container">
      <form
        className="login-form-container"
        onSubmit={handleSubmit}
        method="post"
      >
        <h1 className="login-title">Recuperar Contraseña</h1>
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
        <div className="login-button-container login-form-item">
          <button className="login-button" type="submit">
            Recuperar contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecoverPassword;
