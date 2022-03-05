const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  Logout,
  Google,
} = require("../controller/userController");

router.post("/login", Login);
router.post("/logout", Logout);
router.post("/register", Register);
router.get("/google", Google);
router.get("/fail", (req, res) => res.send("bad"));
module.exports = router;
