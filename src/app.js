const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const morgan = require("morgan");

require("dotenv").config();

app.use(morgan("dev", {
  stream: process.stdout
}));

// Dynamic CORS based on environment
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://devtinder-frontend-4djh.onrender.com"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ADD: Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "DevTinder Backend API",
    status: "running",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

// ADD: 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Route not found",
    path: req.path 
  });
});

// ADD: Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

const server = http.createServer(app);

initializeSocket(server);
connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(process.env.PORT || 8888, () => {
      console.log(`Server is successfully listening on port ${process.env.PORT || 8888}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
  });