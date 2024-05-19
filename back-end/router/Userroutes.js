const express = require("express");
const userrroutes = express.Router();
const registerDB = require("../models/Registerschema");
const loginDB = require("../models/Loginschema");
const userDB = require("../models/Userschema");

///for user profile
userrroutes.get("/profile-view/:id", async (req, res) => {
  try {
    const profile = await registerDB.findOne({ login_id: req.params.id });

    if (profile) {
      return res.status(200).json({
        success: true,
        error: false,
        data: profile,
        message: "Profile view successful",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
    });
  }
});

////for available users
userrroutes.get("/available-user", async (req, res) => {
  try {
    const profile = await registerDB.find();

    if (profile) {
      return res.status(200).json({
        success: true,
        error: false,
        data: profile,
        message: "users Profile view successful",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
    });
  }
});

///////clicking user body for chatting

userrroutes.get("/select-user-for-chat/:id", async (req, res) => {
  try {
    const seelctedUser = await registerDB.findOne({ login_id: req.params.id });

    if (seelctedUser) {
      return res.status(200).json({
        success: true,
        error: false,
        data: seelctedUser,
        message: "selected users Profile view successful",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
    });
  }
});

///////Select user for chat

userrroutes.get("/select-user-for-chat/:id", async (req, res) => {
  try {
    const selectedUser = await registerDB.findOne({ login_id: req.params.id });

    if (selectedUser) {
      return res.status(200).json({
        success: true,
        error: false,
        data: selectedUser,
        message: "selected users Profile view successful",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
    });
  }
});

///////Sending Message

userrroutes.post("/send-message/:id/:currentuser", async (req, res) => {
  try {
    console.log(req.params.id);
    console.log(req.params.currentuser);
    console.log(req.body.message);
    const message = {
      sender_login_id: req.params.currentuser,
      receiver_login_id: req.params.id,
      message: req.body.message,
    };

    const Data = await userDB(message).save();
    if (Data) {
      return res.status(200).json({
        success: true,
        error: false,
        data: Data,
        message: "Message Send Successful",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
    });
  }
});

module.exports = userrroutes;
