const mongoose = require("mongoose");
const loginschema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
const Data = mongoose.model("login_DB", loginschema);
module.exports = Data;
