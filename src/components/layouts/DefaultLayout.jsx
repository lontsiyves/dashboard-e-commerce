import React from "react";
import { Outlet } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage";

export default function DefaultLayout({ children }) {
  return (
    <div className="App">
      <Outlet />
      <LoginPage />
    </div>
  );
}
