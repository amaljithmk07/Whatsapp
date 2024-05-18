const express = require("express");
const loginroutes = express.Router();
const loginDB = require("../models/Loginschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "../front-end/public/upload");
  },
  filename: function (req, res, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

loginroutes.post("/", upload.single("image"), async (req, res) => {
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
      userID: old_user._id,
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
