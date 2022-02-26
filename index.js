const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const pool = require("./db.js")

// const url = process.env.MONGODB_URI;
// mongoose
//   .connect(url)
//   .then(() => {
//     console.log("Connected to MongoDB!");
//   })
//   .catch((err) => {
//     console.log("Could not connect to MongoDB, ", err);
//   });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
