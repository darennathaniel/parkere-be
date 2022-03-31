const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = `postgresql://root:password@localhost:5432/parkere`;

const proConfig = process.env.DATABASE_URL; // for production put database url in .env
const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
});
// For production, set NODE_ENV = production in .env

module.exports = pool;
