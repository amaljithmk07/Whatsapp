import React, { useEffect, useState } from "react";
import "./Mainpage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Mainpage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("userId");
  const logoutHandler = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const [profileview, setProfileview] = useState({}); ///for logged in user profile

  const [usersprofile, setUsersprofile] = useState([]); ///for all user profile

  useEffect(() => {
    // logged in user profile view
    axios
      .get(`http://localhost:2222/api/user/profile-view/${id}`)
      .then((data) => {
        setProfileview(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    ///for available users
    axios
      .get(`http://localhost:2222/api/user/available-user`)
      .then((data) => {
        setUsersprofile(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(profileview);
  return (
    <div>
      <div className="main-body">
        <div className="left-body">
          <div className="left-navbar-sec">
            {/* ///user Profile */}
            <img
              src={`/upload/${profileview.profile}`}
              alt=""
              className="left-navbar-profile"
            />
            <div className="left-navbar-menu-sec">
              <img
                src="/logout.png"
                alt=""
                className="left-navbar-icon"
                onClick={logoutHandler}
              />
              <img src="/status.svg" alt="" className="left-navbar-icon" />
              <img src="menu.png" alt="" className="left-navbar-icon" />
            </div>
          </div>

          {/* //////////////// */}

          {usersprofile.map((data) => (
            <div className="left-chat-body">
              {/* <img src="./dp2.webp" className="left-chat-profile" /> */}
              <img
                src={`/upload/${data.profile}`}
                className="left-chat-profile"
              />
              <div className="left-chat-name-sec">
                <div className="left-chat-name">{data.name}</div>
                <div className="left-chat-msg-tick">
                  <img
                    src="double-tick.png"
                    alt=""
                    style={{ height: "15px" }}
                  />
                  AMALJITH
                </div>
              </div>
              <div className="left-chat-msg-count-sec">
                08:50
                <div className="left-chat-count">5</div>
              </div>
            </div>
          ))}
        </div>

        {/* ////////////////////////////////////////// */}
        <div className="right-body">
          <div className="right-navbar-sec">
            <div className="right-navbar-profile-sec">
              <img src="./dp2.webp" alt="" className="right-navbar-profile" />
              Amaljith{" "}
            </div>
            <div className="right-navbar-search-sec">
              <img src="search.png" alt="" className="right-navbar-icon" />
              <img src="menu.png" alt="" className="right-navbar-icon" />
            </div>
          </div>
          <div className="right-message-body">
            <div className="right-message-encrypt">
              {" "}
              <img
                src="./encrypt.png"
                alt=""
                className="right-message-encrypt-icon"
              />{" "}
              Messages are end-to-end encrypted.No one outside of this chat,not
              even Whatsapp,can read or listen to them.Click to learn more.{" "}
            </div>

            <div className="right-message-today">TODAY</div>
          </div>
          <div className="right-text-body-sec">
            <img src="paper-pin.png" alt="" className="right-text-body-pin" />
            <input
              type="text"
              className="right-message-input"
              placeholder="Type a message here ..."
            />
            <img src="send.png" alt="" className="right-text-body-send" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
