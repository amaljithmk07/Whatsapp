import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loginformInput, setLoginForminput] = useState({});
  const formDataHandler = (e) => {
    const { name, value } = e.target;
    setLoginForminput({ ...loginformInput, [name]: value });
  };
  console.log(loginformInput);
  const formDataSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("profile", loginformInput.profile);

    axios
      .post(`http://localhost:2222/api/login/`, loginformInput)
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("token", data.data.token);
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
              type="file"
              id="fileupload"
              hidden
              name="profile"
              onChange={formDataHandler}
            />
            <label htmlFor="fileupload">
              <img
                src="./profile-upload.jpg"
                alt=""
                className="login-form-file-upload"
              />
            </label>
            <input
              type="text"
              className="login-form-input"
              placeholder="Email"
              name="email"
              onChange={formDataHandler}
            />
            <input
              type="text"
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
