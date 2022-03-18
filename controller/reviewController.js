const pool = require("../db.js");

const GetReviewByCarpark = async (req, res) => {
  try {
    const carpark_id = req.query.carpark_id;

    if (!carpark_id) {
      throw Error("No carpark id found!");
    }

    const queryReviews = await pool.query(
      "SELECT * FROM Review WHERE carpark_id=($1)",
      [carpark_id]
    );
    const reviews = queryReviews.rows;
    const responseData = [];
    for (var i = 0; i < reviews.length; i++) {
      const user_id = reviews[i].user_id;
      const queryUser = await pool.query(
        "SELECT username FROM Account WHERE user_id=($1)",
        [user_id]
      );
      const username = queryUser.rows[0].username;
      responseData.push({
        review_id: reviews[i].review_id,
        username: username,
        carpark_id: carpark_id,
        comment: reviews[i].comment,
        rating: reviews[i].rating,
      });
    }

    return res.status(200).json({
      message: "success",
      data: responseData,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: [],
      error: true,
    });
  }
};

const PostReview = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;
    const carparkId = req.body.carparkId;
    const comment = req.body.comment;
    const rating = req.body.rating;

    if (!userId) {
      throw Error("Missing user id");
    }
    if (!carparkId) {
      throw Error("Missing carpark id");
    }
    if (!rating) {
      throw Error("Missing rating number");
    }

    const queryReview = await pool.query(
      "INSERT INTO Review(user_id, carpark_id, comment, rating) VALUES($1,$2,$3,$4) RETURNING *",
      [userId, carparkId, comment, rating]
    );

    if (!queryReview) throw Error("fail to insert to the database");

    return res.status(200).json({
      message: "success",
      data: {
        review_id: queryReview.rows[0].review_id,
        username: user.name,
        carpark_id: carparkId,
        comment: comment,
        rating: rating,
      },
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: [],
      error: true,
    });
  }
};

const ReviewController = {
  GetReviewByCarpark,
  PostReview,
};

module.exports = ReviewController;
