'use strict';

// Import the database connection module
const pool = require("../config/connection");

// Function to retrieve role titles from the database
async function roles() {
  let roleTitles = [];
  try {
    // SQL query to retrieve role titles
    const query = `
        SELECT title
        FROM role
    `;
    // Execute the query using the database connection
    const [rows] = await pool.query(query);
    // Extract role titles from the query result using map()
    roleTitles = rows.map(row => row.title);
    // Return the array of role titles
    return roleTitles;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to retrieve manager names from the database
async function managers() {
  let managerNames = [];
  try {
    // SQL query to retrieve manager names
    const query = `
      SELECT CONCAT(em.first_name, ' ', em.last_name) AS manager
      FROM employee em
    `;
    // Execute the query using the database connection
    const [rows] = await pool.query(query);
    // Extract manager names from the query result using map()
    managerNames = rows.map(row => row.manager);
    // Add 'None' as an option to the manager names
    managerNames.push('None');
    // Return the array of manager names
    return managerNames;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to retrieve department names from the database
async function departments() {
  let departmentNames = [];
  try {
    // SQL query to retrieve department names
    const query = `
        SELECT name
        FROM department
    `;
    // Execute the query using the database connection
    const [rows] = await pool.query(query);
    // Extract department names from the query result using map()
    departmentNames = rows.map(row => row.name);
    // Return the array of department names
    return departmentNames;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to retrieve employee names from the database
async function employees() {
  let employeeNames = [];
  try {
    // SQL query to retrieve employee names
    const query = `
        SELECT CONCAT(first_name, ' ', last_name) AS name
        FROM employee
    `;
    // Execute the query using the database connection
    const [rows] = await pool.query(query);
    // Extract employee names from the query result using map()
    employeeNames = rows.map((row => row.name));
    // Return the array of employee names
    return employeeNames;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Export the functions to be used in other parts of the application
module.exports = { roles, managers, departments, employees };
