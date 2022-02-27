const express = require("express");
const router = express.Router();
const {Register, Login, Logout} = require("../controller/userController");

router.post("/login", Login);
router.post("/logout", Logout);
router.post("/register", Register);
module.exports = router;