const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRouter");

app.get("/", userRouter);
app.get("/", messageRouter);

require("dotenv").config();
const PORT = process.env.PORT;
app.listen(PORT);
