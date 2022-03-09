// private function

const axios = require("axios");
const pool = require("../db.js");

const fillCarparkDatabase = async (req, res) => {
  try {
    const api_url = "https://data.gov.sg/api/action/datastore_search";
    const result = await axios.get(api_url, {
      params: {
        resource_id: "139a3035-e624-4f56-b63f-89ae28d4ae4c",
        limit: 1000,
      },
    });

    if (!result) throw Error("Fail to fetch the api");
    const carparkArray = result.data.result.records;
    const carparkSet = new Set();

    for (var i = 0; i < carparkArray.length; i++) {
      const carpark = carparkArray[i];
      if (carparkSet.has(carpark.car_park_no)) {
        console.log(carpark.car_park_no);
        continue;
      }
      carparkSet.add(carpark.car_park_no);
      const newCarpark = await pool.query(
        "INSERT INTO Carpark(_id, building_type, x_coor, y_coor, free_parking, gantry_height, carpark_basement, park_number, park_address, short_term, paying_system, night_parking) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
        [
          carpark._id,
          carpark.car_park_type,
          carpark.x_coord,
          carpark.y_coord,
          carpark.free_parking,
          carpark.gantry_height,
          carpark.car_park_basement,
          carpark.car_park_no,
          carpark.address,
          carpark.short_term_parking,
          carpark.type_of_parking_system,
          carpark.night_parking,
        ]
      );
      if (!newCarpark) throw Error("fail to insert a record");
    }

    return res.status(200).json({
      message: "success",
      data: "",
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

const fillDatabase = {
  fillCarparkDatabase,
};

module.exports = fillDatabase;
