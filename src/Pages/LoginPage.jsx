import React ,{useEffect} from 'react'
import Footer from '../components/Partial/Footer';
import LoginForm from "../components/module/LoginForm"

export default function LoginPage() {
  useEffect(()=> {
    const data = fetch('https://fakestoreapi.com/users/')
            .then(res=>res.json())
            .then(json=>console.log("USER",json))
  })
  return (
<div>
  <div className="container">
    {/* Outer Row */}
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12 col-md-9">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* Nested Row within Card Body */}
            <div className="row">
              <div className="col-lg-6 d-none d-lg-block bg-login-image" />
              <div className="col-lg-6">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



  )
}
