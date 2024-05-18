const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const registerroutes = require("./router/Registerroutes");
const loginroutes = require("./router/Loginroutes");
const userrroutes = require("./router/Userroutes");

mongoose
  .connect(
    `mongodb+srv://amaljithmk123:8086171296@cluster0.zztbpoj.mongodb.net/whatsapp`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected Successful");
  })
  .catch((err) => {
    console.log(err);
  });
server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/register", registerroutes);
server.use("/api/login", loginroutes);
server.use("/api/user", userrroutes);

const port = 2222;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
