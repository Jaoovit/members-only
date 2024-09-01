require("./config/passport");

const express = require("express");
const path = require("node:path");
const passport = require("passport");
const sessionConfig = require("./config/session");
require("dotenv").config();

const app = express();

// Middleware to parte JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session configuration
app.use(sessionConfig);

// Initialize passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Routes
const userRoutes = require("./routes/userRouter");
const messageRoutes = require("./routes/messageRouter");

app.use(userRoutes);
app.use(messageRoutes);

const PORT = process.env.PORT || 3200;
app.listen(PORT);
