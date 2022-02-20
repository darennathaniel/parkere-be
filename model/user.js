const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  favorites: {
    type: Array,
    required: true,
  },
});

userSchema.set("toJSON");

module.exports = {
  model: mongoose.model("User", userSchema),
  schema: userSchema,
};
