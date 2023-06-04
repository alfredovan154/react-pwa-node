import React from "react";
import MobileBarMenu from "../mobile_bar_menu/MobileBarMenu";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/authHook";

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /*
  React.useEffect(() => {
    if (auth.getAccessToken() == null || auth.getAccessToken() == "undefined") {
      const from = (location.state as string) || "/";
      navigate("/login", {replace: true});
    }
  });
  */

  return (
    <>
      <Outlet />
      <MobileBarMenu />
    </>
  );
};

export default Dashboard;
