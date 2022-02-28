const express = require("express");
const cors = require("cors");

const app = express();

const userRoute = require("./router/userRouter");
const reviewRoute = require("./router/reviewRouter");
const fillDatabaseRoute = require("./router/fillDatabaseRouter");

app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/review', reviewRoute);
app.use('/fill', fillDatabaseRoute);

module.exports = app;
