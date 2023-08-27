const express = require('express');
const api = require('./routes/index');
const pool = require('./connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', api);

// const connection = mysql.createConnection(
//   {
//     host: 'localhost',
//     user: dbUsername,
//     password: dbPassword,
//     database: 'workforce_management'
//   },
//   (err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//     } else {
//       console.log('Connected to the database.');
//     }
//   }
// );

/*connection.query('SELECT * FROM employee', function (err, results) {
  console.log(results);
})*/

/*async function fetchDepartments() {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM department');
    console.log('Departments:', rows);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchEmployee() {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM employee');
    console.log('Employee:', rows);
  } catch (error) {
    console.error('Error:', error);
  }
}



fetchEmployee();
fetchDepartments();*/





app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
