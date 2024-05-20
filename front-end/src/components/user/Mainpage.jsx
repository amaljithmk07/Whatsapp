import React, { useEffect, useState } from "react";
import "./Mainpage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URI from "../constent/Constent";
const Mainpage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const currentuserId = sessionStorage.getItem("userId");
  const logoutHandler = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const [profileview, setProfileview] = useState({}); ///for logged in user profile

  const [usersprofile, setUsersprofile] = useState([]); ///for all user profile

  const [selectuser, setSelectuser] = useState({}); ///clicking user body for chatting

  useEffect(() => {
    // logged in user profile view
    axios
      // .get(`http://localhost:2222/api/user/profile-view/${currentuserId}`)
      .get(`${BASE_URI}/api/user/profile-view/${currentuserId}`)
      .then((data) => {
        setProfileview(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    ///for available users
    axios
      // .get(`http://localhost:2222/api/user/available-user`)
      .get(`${BASE_URI}/api/user/available-user`)
      .then((data) => {
        setUsersprofile(data.data.data);
        // console.log(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(currentuserId);

  //////filter for displaying chat screen except logged user

  var available_users = usersprofile.filter((data) => {
    return data.login_id != currentuserId;
  });
  console.log(available_users);

  ///////clicking user chat body for chatting

  const selectUserforChat = (id) => {
    axios
      // .get(`http://localhost:2222/api/user/select-user-for-chat/${id}`)
      .get(`${BASE_URI}/api/user/select-user-for-chat/${id}`)
      .then((data) => {
        setSelectuser(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // type messages and sending
  const [messagestate, setMessagestate] = useState({});
  const [messageDisplay, setMessagedisplay] = useState();

  const messageHandler = (e) => {
    const { name, value } = e.target;
    setMessagestate({ ...messagestate, [name]: value });
  };

  // message sending api
  const messageSendHandler = (id) => {
    axios
      .post(
        // `http://localhost:2222/api/user/send-message/${id}/${currentuserId}`,
        `${BASE_URI}/api/user/send-message/${id}/${currentuserId}`,
        messagestate
      )
      .then((data) => {
        console.log(data.data.data);
        setMessagedisplay(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

          {available_users.map((data) => (
            <div
              className="left-chat-body"
              key={data._id}
              onClick={() => selectUserforChat(data.login_id)}
            >
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
              {/* <img src="./dp2.webp" alt="" className="right-navbar-profile" /> */}
              <img
                src={
                  selectuser.profile
                    ? `/upload/${selectuser.profile}`
                    : "./dp2.webp"
                }
                alt=""
                className="right-navbar-profile"
              />
              {/* Amaljith{" "} */}
              {selectuser.name ? selectuser.name : "Amaljith"}
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
            <div className="right-message-receive-area">
              {messageDisplay ? (
                <div className="right-message-box-time-sec">
                  <div className="right-message-box">
                    {messageDisplay.message}
                  </div>
                  <div className="right-message-time">
                    {messageDisplay.time}{" "}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="right-text-body-sec">
            <img src="paper-pin.png" alt="" className="right-text-body-pin" />
            <input
              type="text"
              name="message"
              className="right-message-input"
              placeholder="Type a message here ..."
              onChange={messageHandler}
            />
            <img
              src="send.png"
              alt=""
              className="right-text-body-send"
              onClick={() => messageSendHandler(selectuser.login_id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
