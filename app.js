const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("dotenv").config();

const app = express();

const userRoute = require("./router/userRouter");
const reviewRoute = require("./router/reviewRouter");
const favoriteRoute = require("./router/favoriteRouter");
const forecastRoute = require("./router/forecastRouter");
const carparkRoute = require("./router/carparkRouter");
const fillDatabaseRoute = require("./router/fillDatabaseRouter");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "5mb" }));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    secret: "anything",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRoute);
app.use("/review", reviewRoute);
app.use("/fav", favoriteRoute);
app.use("/forecast", forecastRoute);
app.use("/carpark", carparkRoute);
app.use("/fill", fillDatabaseRoute);

module.exports = app;
