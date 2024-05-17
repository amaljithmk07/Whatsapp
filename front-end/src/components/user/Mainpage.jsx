import React from "react";
import "./Mainpage.css";
const Mainpage = () => {
  return (
    <div>
      <div className="main-body">
        <div className="left-body">
          <div className="left-navbar-sec">
            <img src="vite.svg" alt="" className="left-navbar-profile" />
            <div className="left-navbar-menu-sec">
              <img src="/status.svg" alt="" className="left-navbar-icon" />
              <img src="menu.png" alt="" className="left-navbar-icon" />
            </div>
          </div>

          {/* //////////////// */}
          <div className="left-chat-body">
            <div className="left-chat-profile"></div>
            <div className="left-chat-name-sec">
              <div className="left-chat-name">AMALJITH</div>
              <div className="left-chat-msg-tick">
                <img src="double-tick.png" alt="" style={{ height: "15px" }} />
                AMALJITH
              </div>
            </div>
            <div className="left-chat-msg-count-sec">
              08:50
              <div className="left-chat-count">5</div>
            </div>
          </div>
        </div>

        {/* ////////////////////////////////////////// */}
        <div className="right-body">
          <div className="right-navbar-sec">
            <div className="right-navbar-profile-sec">
              <img src="vite.svg" alt="" className="right-navbar-profile" />
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
