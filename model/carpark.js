const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = require("./review");

const carparkSchema = new Schema({
  total_lots: {
    type: String,
  },
  lot_type: {
    type: String,
  },
  lot_available: {
    type: String,
  },
  park_number: {
    type: String,
  },
  park_coordinate: {
    type: String,
  },
  park_address: {
    type: String,
  },
  building_type: {
    type: String,
  },
  rates: {
    type: String,
  },
  short_term: {
    type: String,
  },
  paying_system: {
    type: String,
  },
  free_parking: {
    type: Boolean,
  },
  night_parking: {
    type: Boolean,
  },
  reviews: {
    type: [reviewSchema.schema],
  },
});

carparkSchema.set("toJSON");

module.exports = {
  model: mongoose.model("Carpark", carparkSchema),
  schema: carparkSchema,
};
