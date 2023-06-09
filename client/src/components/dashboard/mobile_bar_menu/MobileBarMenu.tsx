import { useState } from "react";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import {
  IoBagHandle,
  IoBagHandleOutline, IoPeople,
  IoPeopleOutline,
  IoPerson,
  IoPersonOutline,
  IoShapesOutline
} from "react-icons/io5";
import "@/css/MobileBarMenu.css";

const MobileBarMenu = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <IconContext.Provider
      value={{ className: "bar-menu-icons", size: "1.3rem" }}
    >
      <div className="bar-menu-container">
        <div className="bar-menu">
          <NavLink to="me" className={"bar-menu-link"}>
            {({ isActive }) => (
              <>
                {isActive ? (
                  <IoPerson className="icon-active" />
                ) : (
                  <IoPersonOutline />
                )}
                <span
                  className={
                    "bar-menu-link-title " + (isActive ? "title-active" : "")
                  }
                >
                  Perfil
                </span>
              </>
            )}
          </NavLink>
          <NavLink to="products" className={"bar-menu-link"}>
            {({ isActive }) => (
              <>
                {isActive ? (
                  <IoBagHandle className="icon-active" />
                ) : (
                  <IoBagHandleOutline />
                )}
                <span
                  className={
                    "bar-menu-link-title " + (isActive ? "title-active" : "")
                  }
                >
                  Productos
                </span>
              </>
            )}
          </NavLink>
          <NavLink to="visitors" className={"bar-menu-link"}>
            {({ isActive }) => (
              <>
                {isActive ? (
                  <IoPeople className="icon-active" />
                ) : (
                  <IoPeopleOutline />
                )}
                <span
                  className={
                    "bar-menu-link-title " + (isActive ? "title-active" : "")
                  }
                >
                  Visitantes
                </span>
              </>
            )}
          </NavLink>
          <div className="bar-menu-link">
            <IoShapesOutline />
            <span className="bar-menu-link-title">Componente</span>
          </div>
          <div className="bar-menu-link">
            <IoShapesOutline />
            <span className="bar-menu-link-title">Componente</span>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};

export default MobileBarMenu;
