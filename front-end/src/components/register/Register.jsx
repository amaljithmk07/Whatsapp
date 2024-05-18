import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formInput, setForminput] = useState({});
  const formData = (e) => {
    const { name, value } = e.target;
    setForminput({ ...formInput, [name]: value });
  };
  console.log(formInput);
  const formDataSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:2222/api/register/`, formInput)
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="register-main-body">
        <div className="register-sub-body">
          <form action="" className="register-form">
            <div className="register-form-title">REGISTER</div>

            <input
              type="text"
              name="name"
              className="register-form-input"
              placeholder="Username"
              onChange={formData}
            />
            <input
              type="text"
              name="email"
              className="register-form-input"
              placeholder="Email"
              onChange={formData}
            />
            <input
              type="password"
              name="password"
              className="register-form-input"
              placeholder="Password"
              onChange={formData}
            />
            <button className="register-form-btn" onClick={formDataSubmit}>
              Submit
            </button>
          </form>
          <div className="register-register-link">
            Already a User ?
            <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
