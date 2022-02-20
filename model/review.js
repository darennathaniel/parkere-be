const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carpark: {
    type: Schema.Types.ObjectId,
    ref: "Carpark",
  },
  comment: {
    type: String,
  },
  ratingNumber: {
    type: Number,
    required: true,
  },
});

reviewSchema.set("toJSON");

module.exports = {
  model: mongoose.model("Review", reviewSchema),
  schema: reviewSchema,
};
