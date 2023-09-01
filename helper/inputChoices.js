'use strict'
const pool = require("../config/connection");

async function roles() {
  let roleTitles = [];
  try {
    const query = `
        SELECT title
        FROM role
    `;
    const [rows] = await pool.query(query);
    roleTitles = rows.map(row => row.title);
    return roleTitles;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function managers() {
  let managerNames = [];
  try {
    const query = `
      SELECT CONCAT(em.first_name, ' ', em.last_name) AS manager
      FROM employee em
    `;
    const [rows] = await pool.query(query);
    managerNames = rows.map((row => row.manager));
    managerNames.push('None');
    return managerNames;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function departments() {
  let departmentNames = [];
  try {
    const query = `
        SELECT name
        FROM department
    `;
    const [rows] = await pool.query(query);
    departmentNames = rows.map((row => row.name));
    return departmentNames;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function employees() {
  let employeeNames = [];
  try {
    const query = `
        SELECT CONCAT(first_name, ' ', last_name)
        FROM employee
    `;
    const [rows] = await pool.query(query);
    employeeNames = rows.map((row => row.name));
    return employeeNames;
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = { roles, managers, departments, employees };