import Footer from "../components/Partial/Footer";
import LoginForm from "../components/module/LoginForm";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Loading from "../components/atoms/Loading";
import { SuccessNotify, ErrorNotify } from "../lib/notify";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleSave = async (userCredentials) => {
    setLoading(true);
    const { username, password } = userCredentials;

    try {
      fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          console.log("response: ", response);
          if (response.ok) {
            setToken(response.json());
            localStorage.setItem("token", token);
            SuccessNotify("Connexion réussie");
            navigate("/dashboard/");
          } else {
            ErrorNotify("une erreur est survenue");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      ErrorNotify("une erreur est survenue");
    }
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
                      {loading ? (
                        <Loading
                          type={"spokes"}
                          color={"#4e73df"}
                          width={"20%"}
                          height={"20%"}
                        />
                      ) : (
                        <LoginForm onSubmit={handleSave} />
                      )}
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
