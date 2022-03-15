const pool = require("../db.js");

const SetFavorite = async (req, res) => {
  try {
    const user = req.user;

    const userId = user.id;
    const carparkId = req.body.carpark_id;

    if (!userId || !carparkId) throw Error("Missing data");

    const checkExistence = await pool.query(
      "SELECT * FROM Favorite WHERE user_id=($1) AND carpark_id=($2)",
      [userId, carparkId]
    );
    if (checkExistence.rows[0]) throw Error("Already set to favorite");

    const insertFavorite = await pool.query(
      "INSERT INTO Favorite(user_id, carpark_id) VALUES($1,$2) RETURNING *",
      [userId, carparkId]
    );

    if (!insertFavorite) throw Error("fail to insert to the database");

    const queryFavorite = await pool.query(
      "SELECT * FROM Carpark WHERE _id = ($1)",
      [carparkId]
    );

    return res.status(200).json({
      message: "success",
      data: queryFavorite.rows[0],
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

const GetFavoriteByUser = async (req, res) => {
  try {
    const user = req.user;
    const userId = user.id;

    if (!userId) throw Error("Missing data");

    const queryFavorite = await pool.query(
      "SELECT * FROM Favorite WHERE user_id = ($1)",
      [userId]
    );
    if (!queryFavorite) throw Error("fail to retrieve from database");

    let carparks = [];
    for (let i = 0; i < queryFavorite.rows.length; i++) {
      const queryCarpark = await pool.query(
        "SELECT * FROM Carpark WHERE _id = ($1)",
        [queryFavorite.rows[i].carpark_id]
      );
      carparks.push(queryCarpark.rows[0]);
    }

    return res.status(200).json({
      message: "success",
      data: carparks,
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
const FavoriteController = {
  SetFavorite,
  GetFavoriteByUser,
};

module.exports = FavoriteController;
