const mongoose = require("mongoose");
const registerschema = new mongoose.Schema({
  login_id: {
    ref: "login_DB",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  profile: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
});
const Data = mongoose.model("register_DB", registerschema);
module.exports = Data;
