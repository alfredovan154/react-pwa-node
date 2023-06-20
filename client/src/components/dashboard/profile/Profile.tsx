import React, { useEffect, useRef, useState } from "react";
import ProfileImage from "@/assets/perfil.jpg";
import {
  IoCallOutline,
  IoCardOutline,
  IoCheckmark,
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
  const [profile, setProfile] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const auth = useAuth();
  const url = import.meta.env.VITE_BASE_URL + "/user";

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: url + "/me",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditing = async () => {
    if (isEditing) {
      await axios({
        method: "post",
        url: url,
        headers: {
          Authorization: auth.getAccessToken(),
        },
        data: profile,
      }).then((response) => {
        setIsLoading(true);
        setIsEditing(false);
      });
    } else {
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="component" ref={componentRef}>
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
              {!isEditing ? (
                <span className="profile-info-value">{profile.firstName}</span>
              ) : (
                <input
                  type="text"
                  className="profile-info-value"
                  onChange={handleChange}
                  name="firstName"
                  value={profile.firstName}
                />
              )}
            </div>
          </div>

          <div className="profile-info-container component-element">
            <IoIdCardOutline className="profile-icon" size={"1.5rem"} />
            <div className="profile-info">
              <span className="profile-info-title">Apellidos</span>
              {!isEditing ? (
                <span className="profile-info-value">{profile.lastName}</span>
              ) : (
                <input
                  type="text"
                  className="profile-info-value"
                  onChange={handleChange}
                  name="lastName"
                  value={profile.lastName}
                />
              )}
            </div>
          </div>

          <div className="profile-info-container component-element">
            <IoMailOutline className="profile-icon" size={"1.5rem"} />
            <div className="profile-info">
              <span className="profile-info-title">Email</span>
              {!isEditing ? (
                <span className="profile-info-value">{profile.email}</span>
              ) : (
                <input
                  type="text"
                  className="profile-info-value"
                  onChange={handleChange}
                  name="email"
                  value={profile.email}
                />
              )}
            </div>
          </div>

          <div className="profile-info-container component-element">
            <IoEarthOutline className="profile-icon" size={"1.5rem"} />
            <div className="profile-info">
              <span className="profile-info-title">Address</span>
              {!isEditing ? (
                <span className="profile-info-value">{profile.address}</span>
              ) : (
                <input
                  type="text"
                  className="profile-info-value"
                  onChange={handleChange}
                  name="address"
                  value={profile.address}
                />
              )}
            </div>
          </div>

          <div className="profile-info-container component-element">
            <IoLockClosedOutline className="profile-icon" size={"1.5rem"} />
            <div className="profile-info">
              <span className="profile-info-title">Contraseña</span>
              {!isEditing ? (
                <span className="profile-info-value">************</span>
              ) : (
                <input
                  type="password"
                  className="profile-info-value"
                  onChange={handleChange}
                  name="pass"
                  value={profile.pass}
                />
              )}
            </div>

            <button className="profile-edit-button" onClick={handleEditing}>
              {!isEditing ? (
                <>
                  <IoPencilSharp className="edit-button-icon" size={"1.2rem"} />
                  Editar
                </>
              ) : (
                <>
                  <IoCheckmark className="edit-button-icon" size={"1.2rem"} />
                  Aceptar
                </>
              )}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
