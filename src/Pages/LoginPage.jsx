import React from 'react'
import Footer from '../components/Partial/Footer';
import LoginForm from "../components/module/LoginForm"

export default function LoginPage() {
  return (
<div id="layoutAuthentication">
  <div id="layoutAuthentication_content">
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
         <LoginForm />
          </div>
        </div>
      </div>
    </main>
  </div>
  <Footer />
</div>


  )
}
