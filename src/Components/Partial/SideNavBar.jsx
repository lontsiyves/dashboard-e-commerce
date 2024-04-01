import React from "react";
import { Link } from "react-router-dom";

export default function SideNavBar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/dashboard/"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">E commerce</div>
      </a>
      <hr className="sidebar-divider" />
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="/login"
          data-toggle="collapse"
          data-target="#collapseproductPages"
          aria-expanded="true"
          aria-controls="collapseproductPages"
        >
          <i className="fas fa-fw fa-folder" />
          <span>Produits</span>
        </a>
        <div
          id="collapseproductPages"
          className="collapse"
          aria-labelledby="headingPages"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 px-2 collapse-inner rounded">
            <div className="py-2">
              <Link to={`/dashboard/product`}>
                <i className="fas fa-fw fa-list" /> Liste
              </Link>
            </div>
            <div className="py-2">
              <Link to={`/dashboard/product/add`}>
                <i className="fas fa-fw fa-plus" /> Ajouter
              </Link>
            </div>
          </div>
        </div>
      </li>
      <hr className="sidebar-divider d-none d-md-block" />
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div>
    </ul>
  );
}
