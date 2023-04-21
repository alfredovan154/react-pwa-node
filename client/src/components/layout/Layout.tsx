import React from "react";
import { Outlet } from "react-router";
import "@/css/App.css";

const Layout = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default Layout;
