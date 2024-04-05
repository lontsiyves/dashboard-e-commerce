import Header from "../Partial/Header";
import Footer from "../Partial/Footer";
import SideNavBar from "../Partial/SideNavBar";
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../Pages/LoginPage";

export default function MainLayout({ children }) {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
     setToken(storedToken);
      // setToken("storedToken");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      {!!token ? (
        <div className="App">
          <div id="wrapper">
            <SideNavBar />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Header />
                <Outlet />
                <div className="position-absolute bottom-0 start-50 translate-middle-x">
                <Footer />
                </div>
              </div>
             
            </div>
          </div>
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>

          <div
            className="modal fade"
            id="logoutModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Ready to Leave?
                  </h5>
                  <button
                    className="close"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  Select "Logout" below if you are ready to end your current
                  session.
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <a className="btn btn-primary" href="login.html">
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
