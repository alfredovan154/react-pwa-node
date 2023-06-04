import { useState } from "react";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import {
  IoLibrary,
  IoLibraryOutline,
  IoPerson,
  IoPersonOutline,
  IoShapesOutline,
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
          <NavLink to="students" className={"bar-menu-link"}>
            {({ isActive }) => (
              <>
                {isActive ? (
                  <IoLibrary className="icon-active" />
                ) : (
                  <IoLibraryOutline />
                )}
                <span
                  className={
                    "bar-menu-link-title " + (isActive ? "title-active" : "")
                  }
                >
                  Estudiantes
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
