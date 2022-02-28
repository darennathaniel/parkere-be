const express = require("express");
const router = express.Router();

const verifyToken = require('../helperFunctions/verifyToken');
const {GetReviewByCarpark, PostReview} = require('../controller/reviewController');

router.get("/getReviewByCarpark", GetReviewByCarpark);
router.post("/postReview", verifyToken, PostReview);

module.exports = router;