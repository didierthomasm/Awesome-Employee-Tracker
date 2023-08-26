const mysql = require('mysql2/promise');
require('dotenv').config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const connectionConfig = {
  host: 'localhost',
  user: dbUsername,
  password: dbPassword,
  database: 'workforce_management'
};

const pool = mysql.createPool(connectionConfig);

module.exports = pool;
