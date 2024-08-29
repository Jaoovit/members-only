require("dotenv").config();
const express = require("express");
const app = express();

// Routes
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");
app.get("/", userRouter);
app.get("/", messageRouter);

// EJS
app.set("views", __dirname);
app.set("view  engine", "ejs");

// Passport Session
const sessionConfig = require("./config/session");
const passport = require("passport");

app.use(sessionConfig);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

require("dotenv").config();
const PORT = process.env.PORT;
app.listen(PORT);
