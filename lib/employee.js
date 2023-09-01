const pool = require('../config/connection'); // Import the database connection pool
const inputs = require('./inputs'); // Import the inputs module for user interactions

// Function to fetch and display all employees with their details
async function allEmployees() {
  try {
    const query = `
      SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary,
             CONCAT(em.first_name, ' ', em.last_name) AS manager
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee em ON e.manager_id = em.id
    `;

    const [rows] = await pool.query(query);

    console.log('');
    console.log('id | first_name | last_name | title | department | salary | manager');
    console.log('-- | ---------- | --------- | ----- | ----------- | ------ | ----------');

    rows.forEach(({ id, first_name, last_name, role, department, salary, manager }) => {
      console.log(`${id} | ${first_name} | ${last_name} | ${role} | ${department} | $${salary} | ${manager}`);
    });

    console.log('');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to fetch and display all departments
async function allDepartments() {
  try {
    const [rows] = await pool.query('SELECT * FROM department');

    console.log('');
    console.log('  id | department');
    console.log('  -- | -----------------');

    rows.forEach(({ id, name }) => {
      console.log(`   ${id} | ${name}`);
    });

    console.log('');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to fetch and display all roles
async function allRoles() {
  try {
    const query = `
      SELECT r.id, r.title, r.salary, d.name AS department
      FROM role r
      LEFT JOIN department d ON r.department_id = d.id
    `;

    const [rows] = await pool.query(query);

    console.log('');
    console.log('id | title | department | salary');
    console.log('-- | ----- | ------ | -----------');

    rows.forEach(({ id, title, salary, department }) => {
      console.log(`${id} | ${title} | ${department} | $${salary}`);
    });

    console.log('');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to add a new employee
async function addEmployee() {
  const { first_name, last_name, role, manager } = await inputs.askForEmployeeDetails();

  try {
    // Fetch the role ID based on the provided role title
    const roleIdQuery = 'SELECT id FROM role WHERE title = ?';
    const [roleIdRows] = await pool.query(roleIdQuery, [role]);
    const roleId = roleIdRows[0].id;

    let managerId = null;
    if (manager !== 'None') {
      // Fetch the manager ID based on the provided manager's full name
      const managerIdQuery = `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`;
      const [managerIdRows] = await pool.query(managerIdQuery, [manager]);
      managerId = managerIdRows[0].id;
    }

    // Insert the new employee into the database
    const insertQuery = `
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)
    `;

    await pool.query(insertQuery, [first_name, last_name, roleId, managerId]);
    console.log(' ');
    console.log('Employee added successfully.');
    console.log(' ');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to add a new department
async function addDepartment() {
  const { name } = await inputs.askForDepartmentDetails();
  try {
    // Insert the new department into the database
    await pool.query(`
      INSERT INTO department (name) VALUES (?)
    `, [name]);
    console.log(' ');
    console.log('Department added successfully.');
    console.log(' ');
  } catch (error) {
    console.error(error);
  }
}

// Function to add a new role
async function addRole() {
  const { title, salary, department } = await inputs.askForRoleDetails();

  try {
    // Fetch the department ID based on the provided department name
    const departmentIdQuery = `SELECT id FROM department WHERE name = ?`;
    const [departmentIdRows] = await pool.query(departmentIdQuery, [department]);
    const departmentId = departmentIdRows[0].id;

    // Insert the new role into the database
    const insertQuery = `
      INSERT INTO role (title, salary, department_id) 
      VALUES (?, ?, ?)`;

    await pool.query(insertQuery, [title, salary, departmentId]);
    console.log(' ');
    console.log('Role added successfully');
    console.log(' ');
  } catch (e) {
    console.error('Error', e);
  }
}

// Function to update an employee's role
async function updateEmployeeRole() {
  const { employee, role } = await inputs.askForUpdateRole();
  try {
    // Update the employee's role based on the provided employee name and role title
    const updateQuery = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const roleIdQuery = `SELECT id FROM role WHERE title = ?`
    const employeeIdQuery = `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`;

    const [roleIdRows] = await pool.query(roleIdQuery, [role]);
    const roleID = roleIdRows[0].id;

    const [employeeIdRows] = await pool.query(employeeIdQuery, [employee]);
    const employeeId = employeeIdRows[0].id;

    await pool.query(updateQuery, [roleID, employeeId]);
    console.log(' ');
    console.log('Employee updated successfully');
    console.log(' ');
  } catch (e) {
    console.error('Error', e);
  }
}

// Function to gracefully shut down the application
async function shutDown() {
  await pool.end();
  await process.exit(0);
}

// Export all the functions to be used in other modules
module.exports = {
  allEmployees,
  allDepartments,
  allRoles,
  addEmployee,
  addDepartment,
  addRole,
  updateEmployeeRole,
  shutDown
};
