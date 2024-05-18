import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(); //preview Uploaded images

  //form data handler
  const [formInput, setForminput] = useState({});

  // for register input handler
  const formData = (e) => {
    const { name, value } = e.target;
    setForminput({ ...formInput, [name]: value });
  };

  const formPhoto = (e) => {
    console.log(e.target.files[0]);
    const { name } = e.target;
    setForminput({ ...formInput, [name]: e.target.files[0] });
  };

  //for Profile preview
  const photopreview = (e) => {
    console.log(e);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  console.log(formInput);

  /////form data submit
  const formDataSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("profile", formInput.profile);
    formData.append("name", formInput.name);
    formData.append("email", formInput.email);
    formData.append("password", formInput.password);

    axios
      .post(`http://localhost:2222/api/register/`, formData)
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
          <form
            action=""
            className="register-form"
            encType="multipart/formdata"
          >
            <div className="register-form-title">REGISTER</div>

            <input
              type="file"
              id="fileupload"
              hidden
              name="profile"
              onChange={(e) => {
                formPhoto(e);
                photopreview(e);
              }}
            />
            <label htmlFor="fileupload">
              <img
                src={file ? file : "./profile-upload.jpg"}
                // src={"./profile-upload.jpg"}
                alt=""
                className="register-form-file-upload"
              />
            </label>
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
