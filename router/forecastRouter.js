const express = require("express");
const router = express.Router();

const {GetForecast} = require('../controller/forecastController');

router.get("/", GetForecast);

module.exports = router;