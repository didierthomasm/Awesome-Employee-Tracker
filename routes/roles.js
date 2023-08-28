const pool = require("../connection");
const express = require('express');
const roles = express.Router();

roles.get('/', async (req, res) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM role');
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = roles;