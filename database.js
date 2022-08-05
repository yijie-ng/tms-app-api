const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

module.exports = mysql.createPool({
  // host: 'localhost',
  connectionLimit: 100,
  host: process.env.HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
