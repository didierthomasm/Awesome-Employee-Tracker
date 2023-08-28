const pool = require("../connection");
const express = require('express');
const departments = express.Router();

departments.get('/', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM department');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = departments;