'use strict';

// Import the database connection module
const pool = require("../config/connection");

// Function to retrieve role titles and ids from the database
async function roles() {
  let roleList = [];
  try {
    // SQL query to retrieve role titles and ids
    const query = `
        SELECT id, title
        FROM role
    `;
    // Execute the query using the database connection
    const [roleRows] = await pool.query(query);
    // Extract role titles and ids from the query result using map()
    roleList = roleRows.map(({ id, title }) => ({ name: title, value: id }));
    // Return the array of role titles and ids
    return roleList;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to retrieve manager names and ids from the database
async function managers() {
  let managerList = [];
  try {
    // SQL query to retrieve manager names and ids
    const query = `
            SELECT id, CONCAT(first_name, ' ', last_name) AS managerName
            FROM employee
        `;
    // Execute the query using the database connection
    const [managerRows] = await pool.query(query);
    // Extract manager names and ids from the query result using map()
    managerList = managerRows.map(({ id, managerName }) => ({ name: managerName, value: id }));
    // Add to the list a None in the case is no manager
    managerList.push({name: 'None', value: null});
    return managerList;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to retrieve department names and ids from the database
async function departments() {
  let departmentList = [];
  try {
    // SQL query to retrieve department names and ids
    const query = `
        SELECT id, name
        FROM department
    `;
    // Execute the query using the database connection
    const [departmentRows] = await pool.query(query);
    // Extract department names and ids from the query result using map()
    departmentList = departmentRows.map(row => ({name: row.name, value: row.id}));
    // Return the array of department names and ids
    return departmentList;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to retrieve employee names and ids from the database
async function employees() {
  let employeeList = [];
  try {
    // SQL query to retrieve employee names and ids
    const query = `
        SELECT id, CONCAT(first_name, ' ', last_name) AS employeeName
        FROM employee
    `;
    // Execute the query using the database connection
    const [rows] = await pool.query(query);
    // Extract employee names and ids from the query result using map()
    employeeList = rows.map(({employeeName, id}) => ({name: employeeName, value: id }));
    // Return the array of employee names and ids
    return employeeList;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Export the functions to be used in other parts of the application
module.exports = { roles, managers, departments, employees };
