const pool = require("../../config/connection");
const { getOldRoleTitle, updateEmployeeRole, getNewRoleTitle } = require('../../helper/rolesPut');
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

roles.get('/:id', async (req, res) => {
  const roleId = req.params.id;

  try {
    const [rows, fields] = await pool.query(
      `SELECT * FROM role WHERE id = ?`,
      [roleId]
    );
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: 'Role not found' });
    }
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'Database error' });
  }
});


roles.post('/', async (req, res) => {
  const { title, salary, department_id } = req.body;

  if (title && salary && department_id) {
    try {
      const [rows, fields] = await pool.query(`
        INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
        [title, salary, department_id]);
      res.json(`Role ${title} added successfully`)
    } catch (error) {
      console.error('Error', error);
      res.status(500).json( { error: 'Database error' });
    }
  } else {
    res.status(400).json( { error: 'Role name required' });
  }
});

roles.delete('/:id', async (req, res) => {
  const roleId = req.params.id;

  if (roleId) {
    try {
      const [rows, fields] = await pool.query(`
        DELETE FROM role WHERE id = ?`,
        [roleId]);
      res.json(`Role deleted successfully`)
    } catch (error) {
      console.error('Error', error);
      res.status(500).json( { error: 'Database error' });
    }
  } else {
    res.status(400).json( { error: 'Role ID required' });
  }
});

roles.put('/:id', async (req, res) => {
  const employeeId = req.params.id;
  const { role } = req.body;

  if (!employeeId || !role) {
    return res.status(400).json({ error: 'Role ID and employee ID required' });
  }

  try {
    const oldRole = await getOldRoleTitle(employeeId);
    if (oldRole === null) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await updateEmployeeRole(employeeId, role);

    const newRole = await getNewRoleTitle(employeeId);
    if (newRole === null) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(`Role updated from ${oldRole} to ${newRole}`);
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = roles;