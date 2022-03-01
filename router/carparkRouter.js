const express = require("express");
const router = express.Router();

const {GetAllCarpark, GetCarpark} = require('../controller/carparkController');

router.get("/getAllCarpark", GetAllCarpark);
router.post("/getCarpark", GetCarpark);

module.exports = router;