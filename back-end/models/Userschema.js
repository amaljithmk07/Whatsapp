const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  sender_login_id: {
    ref: "login_DB",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  receiver_login_id: {
    ref: "login_DB",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
  },
});
const Data = mongoose.model("register_DB", userschema);
module.exports = Data;
