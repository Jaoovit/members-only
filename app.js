const express = require("express");
const app = express();

// Middleware to parte JSON
app.use(express.json());

// MIddleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// EJS
const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");
app.use("/", userRouter);
app.use("/", messageRouter);

// Passport Session
const sessionConfig = require("./config/session");
const passport = require("passport");

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

require("dotenv").config();
const PORT = process.env.PORT || 3200;
app.listen(PORT);
