// private function

const axios = require("axios");
const pool = require("../db.js");
const svy21 = require("../helperFunctions/svy21");

const fillCarparkDatabase = async (req, res) => {
  try {
    // const api_url = "https://data.gov.sg/api/action/datastore_search";
    // const result = await axios.get(api_url, {
    //   params: {
    //     resource_id: "139a3035-e624-4f56-b63f-89ae28d4ae4c",
    //     limit: 4352,
    //   },
    // });

    // if (!result) throw Error("Fail to fetch the api");
    if (!req.body) {
      throw Error("No data!");
    }
    const carparkArray = req.body;
    const carparkSet = new Set();

    for (var i = 0; i < carparkArray.length; i++) {
      const carpark = carparkArray[i];
      if (carparkSet.has(carpark.car_park_no)) {
        continue;
      }
      carparkSet.add(carpark.car_park_no);
      const converter = new svy21();
      const { lat, lon } = converter.computeLatLon(
        carpark.y_coord,
        carpark.x_coord
      );
      const centralArea = [
        "ACB",
        "BBB",
        "BRB1",
        "CY",
        "DUXM",
        "HLM",
        "KAB",
        "KAM",
        "KAS",
        "PRM",
        "SLS",
        "SR1",
        "SR2",
        "TPM",
        "UCS",
        "WCB",
      ];
      const rate = centralArea.includes(carpark.car_park_no)
        ? "$1.20 per half-hour (7:00am to 5:00pm, Monday to Saturday) $0.60 per half hour (Other hours)"
        : "$0.60 per half-hour";
      const newCarpark = await pool.query(
        "INSERT INTO Carpark(_id, building_type, lat, lon, free_parking, gantry_height, carpark_basement, park_number, park_address, short_term, paying_system, night_parking, rate) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
        [
          carpark._id,
          carpark.car_park_type,
          lat,
          lon,
          carpark.free_parking,
          carpark.gantry_height,
          carpark.car_park_basement,
          carpark.car_park_no,
          carpark.address,
          carpark.short_term_parking,
          carpark.type_of_parking_system,
          carpark.night_parking,
          rate,
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
