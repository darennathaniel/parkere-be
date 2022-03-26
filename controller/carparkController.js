const pool = require("../db.js");
const distance = require("../helperFunctions/distance");

const GetAllCarpark = async (req, res) => {
  const body = req.query;
  try {
    if (!body.latitude || !body.longitude) {
      throw Error("no source location!");
    }
    const sourceLat = Number(body.latitude);
    const sourceLon = Number(body.longitude);
    const queryResult = await pool.query("SELECT * FROM Carpark");

    if (!queryResult) throw Error("fail to retrieve from database");

    let data = [];

    for (let i = 0; i < queryResult.rows.length; i++) {
      const destinationLat = Number(queryResult.rows[i].lat);
      const destinationLon = Number(queryResult.rows[i].lon);
      data.push({
        ...queryResult.rows[i],
        distance: distance(
          sourceLat,
          sourceLon,
          destinationLat,
          destinationLon
        ),
      });
    }

    return res.status(200).json({
      message: "success",
      data: data,
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

const GetCarpark = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: [],
      error: true,
    });
  }
};

const CarparkController = {
  GetAllCarpark,
  GetCarpark,
};
module.exports = CarparkController;
