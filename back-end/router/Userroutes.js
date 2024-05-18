const express = require("express");
const userrroutes = express.Router();
const registerDB = require("../models/Registerschema");
const loginDB = require("../models/Loginschema");

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

module.exports = userrroutes;
