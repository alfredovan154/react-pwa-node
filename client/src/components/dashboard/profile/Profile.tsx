import React, { useEffect, useRef, useState } from "react";
import ProfileImage from "@/assets/perfil.jpg";
import {
  IoCallOutline,
  IoCardOutline,
  IoEarthOutline,
  IoIdCardOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoMaleOutline,
  IoPencilSharp,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";
import "@/css/Component.css";
import "@/css/Profile.css";
import { User } from "@/lib/types";
import axios from "axios";
import { useAuth } from "@/hooks/authHook";

const Profile = () => {
  const [profile, setProfile] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const componentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const auth = useAuth();
  const url = import.meta.env.VITE_BASE_URL + "/user/me";

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: auth.getAccessToken(),
        },
      }).then((response) => {
        setProfile(response.data as User);
      });
    };
    if (isLoading) {
      fetchData();
    }
    setIsLoading(false);
  }, [isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleOnMouseEnter = () => {
    if (buttonRef.current?.style) {
      buttonRef.current.style.bottom = "50px";
    }
  };

  const handleOnMouseLeave = () => {
    if (buttonRef.current?.style) {
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
      {profile && !isLoading ? (
        <>
          <h1 className="component-title component-element">Perfil</h1>
          <div className="profile-image-container">
            <img src={ProfileImage} alt="" className="profile-image" />
          </div>
          <div className="profile-name-container component-element">
            <h3 className="profile-name">{profile.fullName}</h3>
            <span className="profile-role">
              {profile.role === "admin"
                ? "🛠️"
                : profile.role === "guest"
                ? "👀"
                : "👷"}{" "}
              {profile.role === "admin"
                ? "Administrador"
                : profile.role === "guest"
                ? "Invitado"
                : "Supervisor"}
            </span>
          </div>

          <div className="profile-info-container component-element">
            <IoPersonOutline className="profile-icon" size={"1.5rem"} />
            <div className="profile-info">
              <span className="profile-info-title">Nombre</span>
              <span className="profile-info-value">{profile.firstName}</span>
            </div>
          </div>

          <div className="profile-info-container component-element">
            <IoIdCardOutline className="profile-icon" size={"1.5rem"} />
            <div className="profile-info">
              <span className="profile-info-title">Apellidos</span>
              <span className="profile-info-value">{profile.lastName}</span>
            </div>
          </div>

          <div className="profile-info-container component-element">
            <IoMailOutline className="profile-icon" size={"1.5rem"} />
            <div className="profile-info">
              <span className="profile-info-title">Email</span>
              <span className="profile-info-value">{profile.email}</span>
            </div>
          </div>

          <div className="profile-info-container component-element">
            <IoEarthOutline className="profile-icon" size={"1.5rem"} />
            <div className="profile-info">
              <span className="profile-info-title">Address</span>
              <span className="profile-info-value">{profile.address}</span>
            </div>
          </div>

          <div className="profile-info-container component-element">
            <IoLockClosedOutline className="profile-icon" size={"1.5rem"} />
            <div className="profile-info">
              <span className="profile-info-title">Contraseña</span>
              <span className="profile-info-value">****************</span>
            </div>
          </div>

          <button className="profile-edit-button" ref={buttonRef}>
            <IoPencilSharp className="edit-button-icon" size={"1.2rem"} />
            Editar
          </button>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
