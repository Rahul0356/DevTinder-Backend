const express = require("express")
const connectDB = require("./config/database.js")
const app = express();
const User = require("../models/user.js")
const {} = require("../utils/validation.js")
const cookieParser = require("cookie-parser");
const jwt = require (j)

const { adminAuth }= require("./middlewares/auth.js")

app.use ("/admin",adminAuth)


connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
