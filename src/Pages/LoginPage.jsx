import Footer from "../components/Partial/Footer";
import LoginForm from "../components/module/LoginForm";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Loading from "../components/atoms/Loading";
import { SuccessNotify, ErrorNotify } from "../lib/notify";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSave = async (userCredentials) => {
    const { username, password } = userCredentials;
    setLoading(true);
    axios({
      url: `${process.env.REACT_APP_API_URL}/auth/login`,
      method: "POST",
      data: {
        username,
        password,
      },
    })
      .then((response) => {
        if (response.data?.token) {
          setToken(response?.data?.token);
          localStorage.setItem("token", response?.data?.token);
          SuccessNotify("Connexion réussie");
          navigate("/dashboard/");
          setLoading(false);
        } else {
          setError(response?.data);
          ErrorNotify(response?.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setError(error.message);
        } else if (error.code === "ERR_BAD_REQUEST") {
          setError(error.response.data);
        }
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Bienvenue !</h1>
                      </div>
                        <>
                          <LoginForm loading={loading} onSubmit={handleSave} />
                          <p className="text-danger">{error}</p>
                        </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
