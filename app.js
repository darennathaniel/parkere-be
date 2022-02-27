const express = require("express");
const cors = require("cors");

const app = express();

const userRoute = require("./router/userRouter");
app.use(cors());
app.use(express.json());

app.use('/user', userRoute)
module.exports = app;
