const express = require("express");
const registerroutes = express.Router();
const registerDB = require("../models/Registerschema");
const loginDB = require("../models/Loginschema");
const bcrypt = require("bcryptjs");

registerroutes.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const old_email = await loginDB.findOne({ email: req.body.email });
    if (old_email) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email already exist",
      });
    }
    const hashedpassword = await bcrypt.hash(req.body.password, 12);

    const log = {
      email: req.body.email,
      password: hashedpassword,
      role: 2,
    };
    const log_result = await loginDB(log).save();
    const reg = {
      login_id: log_result._id,
      name: req.body.name,
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
    });
  }
});

module.exports = registerroutes;
