import React from "react";
import {Outlet} from "react-router-dom"  

export default function DefaultLayout({ children }) {
  return (
    <div className="App">
       <Outlet />
    </div>
  );
}


