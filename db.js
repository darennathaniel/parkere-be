const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = `postgresql://darennathanieljanto:password@localhost:5432/parkere`;

const proConfig = process.env.DATABASE_URL; // for production put database url in .env
const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
});
// For production, set NODE_ENV = production in .env

module.exports = pool;

// PG_USER =darennathanieljanto
// PG_PASSWORD=password
// PG_HOST = localhost
// PG_PORT = 5432
// PG_DATABASE = parkere
