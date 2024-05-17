import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loginformInput, setLoginForminput] = useState({});
  const formData = (e) => {
    const { name, value } = e.target;
    setLoginForminput({ ...loginformInput, [name]: value });
  };
  const formDataSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:2222/api/login/`, loginformInput)
      .then((data) => {
        console.log(data);
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
          <form action="" className="login-form">
            <div className="login-form-title">LOGIN</div>

            <input
              type="text"
              className="login-form-input"
              placeholder="Email"
              name="email"
              onChange={formData}
            />
            <input
              type="text"
              className="login-form-input"
              placeholder="Password"
              name="password"
              onChange={formData}
            />
            <button className="login-form-btn" onClick={formDataSubmit}>
              Submit
            </button>
          </form>
          <div className="login-register-link">New User ? Register Now</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
