const pool = require("../../config/connection");
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

employees.get('/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
    const [rows, fields] = await pool.query(
      `SELECT * FROM employee WHERE id = ?`,
      [employeeId]
    );
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'Database error' });
  }
});


employees.post('/', async (req, res) => {
  const { first_name, last_name, role_id, manager_id  } = req.body;

  if (first_name && last_name && role_id) {
    try {
      const [rows, fields] = await pool.query(`
        INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [first_name, last_name, role_id, manager_id]);
      res.json(`Employee ${first_name} ${last_name} added successfully`)
    } catch (error) {
      console.error('Error', error);
      res.status(500).json( { error: 'Database error' });
    }
  } else {
    res.status(400).json( { error: 'Employee name, role, and manager_id are required' });
  }
});

employees.delete('/:id', async (req, res) => {
  const employeeId = req.params.id;

  if (employeeId) {
    try {
      const [rows, fields] = await pool.query(`
        DELETE FROM employee WHERE id = ?`,
        [employeeId]);
      res.json(`Employee deleted successfully`)
    } catch (error) {
      console.error('Error', error);
      res.status(500).json( { error: 'Database error' });
    }
  } else {
    res.status(400).json( { error: 'Employee ID required' });
  }
});

module.exports = employees;