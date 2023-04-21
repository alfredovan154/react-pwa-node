import { useRef } from "react";
import ProfileImage from "@/assets/perfil.jpg";
import {
  IoCallOutline,
  IoEarthOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoMaleOutline,
  IoPencilSharp,
} from "react-icons/io5";
import "@/css/Component.css";
import "@/css/Profile.css";

const Profile = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOnMouseEnter = () => {
    if(buttonRef.current?.style){
        buttonRef.current.style.bottom = "50px";
    }
  };

  const handleOnMouseLeave = () => {
    if(buttonRef.current?.style){
        buttonRef.current.style.bottom = "120px";
    }
  };

  return (
    <div
      className="component"
      ref={componentRef}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <h1 className="component-title component-element">Perfil</h1>
      <div className="profile-image-container">
        <img src={ProfileImage} alt="" className="profile-image" />
      </div>
      <div className="profile-name-container component-element">
        <h3 className="profile-name">Alfredo Vanegas Arcega</h3>
        <span className="profile-role">🛠️ Administrador️️️</span>
      </div>

      <div className="profile-info-container component-element">
        <IoMaleOutline className="profile-icon" size={"1.5rem"} />
        <div className="profile-info">
          <span className="profile-info-title">Sexo</span>
          <span className="profile-info-value">Hombre</span>
        </div>
      </div>

      <div className="profile-info-container component-element">
        <IoEarthOutline className="profile-icon" size={"1.5rem"} />
        <div className="profile-info">
          <span className="profile-info-title">Edad</span>
          <span className="profile-info-value">21</span>
        </div>
      </div>

      <div className="profile-info-container component-element">
        <IoMailOutline className="profile-icon" size={"1.5rem"} />
        <div className="profile-info">
          <span className="profile-info-title">Correo</span>
          <span className="profile-info-value">thealf154@gmail.com</span>
        </div>
      </div>

      <div className="profile-info-container component-element">
        <IoCallOutline className="profile-icon" size={"1.5rem"} />
        <div className="profile-info">
          <span className="profile-info-title">Télefono</span>
          <span className="profile-info-value">+52 442 148 8492</span>
        </div>
      </div>

      <div className="profile-info-container component-element">
        <IoLockClosedOutline className="profile-icon" size={"1.5rem"} />
        <div className="profile-info">
          <span className="profile-info-title">Contraseña</span>
          <span className="profile-info-value">**************</span>
        </div>
      </div>

      <button className="profile-edit-button" ref={buttonRef}>
        <IoPencilSharp className="edit-button-icon" size={"1.2rem"} />
        Editar
      </button>
    </div>
  );
};

export default Profile;
