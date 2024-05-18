const express = require("express");
const loginroutes = express.Router();
const loginDB = require("../models/Loginschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

loginroutes.post("/", async (req, res) => {
  try {
    const lower_email = req.body.email.toLowerCase();
    const old_user = await loginDB.findOne({ email: lower_email });

    if (!old_user) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User doesnt exist",
      });
    }

    const passwordcheck = await bcrypt.compare(
      req.body.password,
      old_user.password
    );
    if (!passwordcheck) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Password wrong",
      });
    }
    console.log(req.body.profile);


    const token = await jwt.sign(
      {
        userID: old_user._id,
        userEmail: old_user.lower_email,
        userRole: old_user.role,
      },
      "this_is_secret_message",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      success: true,
      error: false,
      message: "Login Successful",
      token: token,
      userId: old_user._id,
      userEmail: old_user.lower_email,
      userRole: old_user.role,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network error",
    });
  }
});

module.exports = loginroutes;
