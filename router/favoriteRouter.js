const express = require("express");
const router = express.Router();

const verifyToken = require('../helperFunctions/verifyToken');
const {GetFavoriteByUser, DeleteFavorite, SetFavorite} = require('../controller/favoriteController');

router.get("/getFavoriteByUser", verifyToken, GetFavoriteByUser);
router.post("/setFavorite", verifyToken, SetFavorite);
router.post("/deleteFavorite", verifyToken, DeleteFavorite);

module.exports = router;