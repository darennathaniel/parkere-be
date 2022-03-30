const app = require("./app");
require("dotenv").config();
const http = require("http");
const server = http.createServer(app);

const port = process.env.PORT || 4000;
const host = "0.0.0.0";

server.listen(port, host, () => {
  console.log(`Server listening at port ${port}`);
});
