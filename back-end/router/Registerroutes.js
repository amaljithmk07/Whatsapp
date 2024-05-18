const express = require("express");
const registerroutes = express.Router();
const registerDB = require("../models/Registerschema");
const loginDB = require("../models/Loginschema");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front-end/public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

registerroutes.post("/", upload.single("profile"), async (req, res) => {
  try {
    const email = req.body.email;
    const lower_email = email.toLowerCase();

    console.log("Request Body:", req.body); // Log the request body
    console.log("Uploaded file info:", req.file); // Log file info

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "No file uploaded",
      });
    }
    const old_email = await loginDB.findOne({ email: lower_email });
    if (old_email) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email already exist",
      });
    }
    const hashedpassword = await bcrypt.hash(req.body.password, 12);

    const log = {
      email: lower_email,
      password: hashedpassword,
      role: 2,
    };
    const log_result = await loginDB(log).save();
    const reg = {
      login_id: log_result._id,
      name: req.body.name,
      //file path for cloudinary
      // profile: req.file.path,
      profile: req.file.filename,
    };
    const reg_result = await registerDB(reg).save();

    if (reg_result) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Register Successful",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: true,
      message: "Network error",
      errormessage: err.message,
    });
  }
});

module.exports = registerroutes;
