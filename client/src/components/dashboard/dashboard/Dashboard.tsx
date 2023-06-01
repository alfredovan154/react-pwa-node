import React from "react";
import MobileBarMenu from "../mobile_bar_menu/MobileBarMenu";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/hooks/authHook";

const Dashboard = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!auth.accessToken) {
    const from = (location.state as string) || "/";
    navigate(from, { replace: true });
  }

  return (
    <>
      <Outlet />
      <MobileBarMenu />
    </>
  );
};

export default Dashboard;
