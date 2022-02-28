//private
const express = require("express");
const router = express.Router();
const {fillCarparkDatabase} = require("../controller/fillDatabaseController");

router.get("/carpark", fillCarparkDatabase);

module.exports = router;