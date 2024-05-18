const mongoose = require("mongoose");
const loginschema = new mongoose.Schema({
  profile: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
});
const Data = mongoose.model("login_DB", loginschema);
module.exports = Data;
