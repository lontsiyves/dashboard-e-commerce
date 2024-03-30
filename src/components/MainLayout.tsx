import React from 'react';
import Header from "./Partial/Header";
import Footer from "./Partial/Footer";
import SideNavBar from "./Partial/SideNavBar";


export default function MainLayout({ children }) {
  return (
    <div className="App">
    <div id="wrapper">
      <SideNavBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  </div>
  )
}
