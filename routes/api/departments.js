const pool = require("../../config/connection");
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

departments.get('/:id', async (req, res) => {
  const departmentId = req.params.id;

  try {
    const [rows, fields] = await pool.query(
      `SELECT * FROM department WHERE id = ?`,
      [departmentId]
    );
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'Database error' });
  }
});


departments.post('/', async (req, res) => {
  const { name } = req.body;

  if (name) {
    try {
      const [rows, fields] = await pool.query(`
        INSERT INTO department (name) VALUES (?)`,
        [name]);
      res.json(`Department ${name} added successfully`)
    } catch (error) {
      console.error('Error', error);
      res.status(500).json( { error: 'Database error' });
    }
  } else {
    res.status(400).json( { error: 'Department name required' });
  }
});

departments.delete('/:id', async (req, res) => {
  const departmentId = req.params.id;

  if (departmentId) {
    try {
      const [rows, fields] = await pool.query(`
        DELETE FROM department WHERE id = ?`,
        [departmentId]);
      res.json(`Department deleted successfully`)
    } catch (error) {
      console.error('Error', error);
      res.status(500).json( { error: 'Database error' });
    }
  } else {
    res.status(400).json( { error: 'Department ID required' });
  }
});

module.exports = departments;