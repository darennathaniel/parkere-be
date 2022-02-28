const express = require("express");
const cors = require("cors");

const app = express();

const userRoute = require("./router/userRouter");
const reviewRoute = require("./router/reviewRouter");
const favoriteRoute = require("./router/favoriteRouter");
const forecastRoute = require("./router/forecastRouter");
const fillDatabaseRoute = require("./router/fillDatabaseRouter");


app.use(cors());
app.use(express.json());

app.use('/user', userRoute);
app.use('/review', reviewRoute);
app.use('/fav', favoriteRoute);
app.use('/forecast', forecastRoute);
app.use('/fill', fillDatabaseRoute);


module.exports = app;
