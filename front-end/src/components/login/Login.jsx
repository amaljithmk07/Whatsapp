import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loginformInput, setLoginForminput] = useState([]); //Login form Input Handler

  ///for form Input
  const formDataHandler = (e) => {
    const { name, value } = e.target;
    setLoginForminput({ ...loginformInput, [name]: value });
  };



  // console.log(loginformInput);
  const formDataSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post(`http://localhost:2222/api/login/`, loginformInput)
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("userId", data.data.userId);
        navigate(`/home`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="login-main-body">
        <div className="login-sub-body">
          <form action="" className="login-form" encType="multipart/form-data">
            <div className="login-form-title">LOGIN</div>

           
            <input
              type="text"
              className="login-form-input"
              placeholder="Email"
              name="email"
              onChange={formDataHandler}
            />
            <input
              type="password"
              className="login-form-input"
              placeholder="Password"
              name="password"
              onChange={formDataHandler}
            />
            <button className="login-form-btn" onClick={formDataSubmit}>
              Submit
            </button>
          </form>
          <div className="login-register-link">
            New User ?
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
