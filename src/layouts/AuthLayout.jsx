import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <h1>AuthLayout</h1>
      <Outlet />
    </>
  );
};

export default AuthLayout;
