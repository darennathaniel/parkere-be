const express = require("express");
const router = express.Router();
const {Register, Login, Logout, GenerateUserToken} = require("../controller/userController");
const passport = require('passport');

router.post("/login", Login);
router.post("/logout", Logout);
router.post("/register", Register);
router.get("/google",  passport.authenticate('google', { session: false,
    scope: [ 'email', 'profile' ]
}));
router.get("/fail", (req, res) => res.send('bad'));
router.get("/google/callback", passport.authenticate('google', {session: false,failureRedirect : '/user/fail', failureMessage: true}), GenerateUserToken);
module.exports = router;