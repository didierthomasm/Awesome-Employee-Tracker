const pool = require("../connection");
const express = require('express');
const employees = express.Router();

employees.get('/', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM employee');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = employees;