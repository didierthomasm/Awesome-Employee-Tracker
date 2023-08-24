const express = require('express');
const mysql = require('mysql2');
/*require('dotenv').config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;*/

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'nEruda44##',
    database: 'workforce_management'
  },
  // This console.log should be a callback function inside createConnection
  (err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database.');
    }
  }
);

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
