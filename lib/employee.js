const pool = require('../config/connection'); // Import the database connection pool
const inputs = require('./inputs');
const printTable = require('../helper/consolePrintTable');

// Function to fetch and display all employees with their details
async function allEmployees() {
  try {
    const query = `
      SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name, r.title AS role, d.name AS department, r.salary,
             CONCAT(em.first_name, ' ', em.last_name) AS manager
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee em ON e.manager_id = em.id
    `;

    const [employeesRows] = await pool.query(query);

    const columnDef = {
      id: { title: 'ID', width: 4 },
      name: { title: 'Employee Name', width: 20 },
      role: { title: 'Role', width:30 },
      department: { title: 'Department', width: 30 },
      salary: { title: 'Salary', width: 10 },
      manager: { title: 'Manager', width: 20 }
    };

    printTable(employeesRows, columnDef);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to fetch and display all departments
async function allDepartments() {
  try {
    const [departmentsRoles] = await pool.query('SELECT id, name FROM department');

    const columnDef = {
      id: { title: 'ID', width: 4 },
      name: { title: 'Department', width: 30 },
    };

    printTable(departmentsRoles, columnDef);

    console.log('');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to fetch and display all roles
async function allRoles() {
  try {
    const query = `
      SELECT r.id, r.title AS role, r.salary, d.name AS department
      FROM role r
      LEFT JOIN department d ON r.department_id = d.id
    `;

    const [rolesRows] = await pool.query(query);

    const columnDef = {
      id: { title: 'ID', width: 4 },
      role: { title: 'Role', width:30 },
      department: { title: 'Department', width: 30 },
      salary: { title: 'Salary', width: 10 },
    };

    printTable(rolesRows, columnDef);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to add a new employee
async function addEmployee() {
  try {
    const { first_name, last_name, role: roleId, manager: managerId } = await inputs.askForEmployeeDetails();

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
  try {
    const { name } = await inputs.askForDepartmentDetails();
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
  try {
    const { title, salary, department: departmentId } = await inputs.askForRoleDetails();

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
  const { employee: employeeId, role: roleId } = await inputs.askForUpdateRole();

  try {
    // Update the employee's role based on the provided employee name and role title
    const updateQuery = `UPDATE employee SET role_id = ? WHERE id = ?`;

    await pool.query(updateQuery, [roleId, employeeId]);

    console.log(' ');
    console.log('Employee updated successfully');
    console.log(' ');
  } catch (e) {
    console.error('Error', e);
  }
}

// Function to update an employee's manager
async function updateEmployeeManager(){
  const { employee: employeeId, manager: managerId } = await inputs.askForUpdateManager();

  try {
    const updateQuery = `UPDATE employee SET manager_id = ? WHERE id = ?`;

    await pool.query(updateQuery, [managerId, employeeId]);

    console.log(' ');
    console.log('Manager updated successfully');
    console.log(' ')
  } catch (e) {
    console.error('Error', e);
  }
}

async function viewEmployeesByManager() {
  try {
    // Get the manager's ID directly from the inquirer prompt
    const { manager: managerId } = await inputs.askForManager();

    // If the user selected 'None', you can decide to either terminate the function or proceed with a different logic.
    if (!managerId) {
      console.log('No manager selected.');
      return;
    }

    // SQL query to get employees by manager
    const query = `
      SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name, r.title AS role, d.name AS department, r.salary,
             CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
      WHERE e.manager_id = ?;
    `;

    // Query the database using the manager's ID
    const [byManagerRows] = await pool.query(query, [managerId]);

    const columnDef = {
      id: { title: 'ID', width: 4 },
      name: { title: 'Employee Name', width: 20 },
      role: { title: 'Role', width:30 },
      department: { title: 'Department', width: 30 },
      salary: { title: 'Salary', width: 10 },
      manager: { title: 'Manager', width: 20 }
    };

    printTable(byManagerRows, columnDef);

  } catch (e) {
    console.error('Error', e.message);
  }
}

async function viewEmployeesByDepartment() {
  try {
    // Get the manager's ID directly from the inquirer prompt
    const { department: departmentId } = await inputs.askForDepartment();

    // If the user selected 'None', you can decide to either terminate the function or proceed with a different logic.
    if (!departmentId) {
      console.log('No department selected.');
      return;
    }

    // SQL query to get employees by manager
    const query = `
        SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name, r.title AS role, d.name AS department, r.salary,
              CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
        WHERE d.id = ?;
    `;

    // Query the database using the manager's ID
    const [byDepartmentRows] = await pool.query(query, [departmentId]);

    const columnDef = {
      id: { title: 'ID', width: 4 },
      name: { title: 'Employee Name', width: 20 },
      role: { title: 'Role', width:30 },
      department: { title: 'Department', width: 30 },
      salary: { title: 'Salary', width: 10 },
      manager: { title: 'Manager', width: 20 }
    };

    printTable(byDepartmentRows, columnDef);

  } catch (e) {
    console.error('Error', e.message);
  }
}

async function deleteDepartment() {
  try {
    const { department: departmentId } = await inputs.askForDepartment();
    const query = `DELETE FROM department WHERE id = ?`;

    await pool.query(query, [departmentId]);

    console.log('');
    console.log('Department deleted successfully');
    console.log('');
  } catch (e) {
    console.error('Error', e.message);
  }
}

async function deleteRole() {
  try {
    const { role: roleId } = await inputs.askForRole();
    const query = `DELETE FROM role WHERE id = ?`;

    await pool.query(query, [roleId]);

    console.log('');
    console.log('Role deleted successfully');
    console.log('');
  } catch (e) {
    console.error('Error', e.message);
  }
}

async function deleteEmployee() {
  try {
    const { employee: employeeId } = await inputs.askForEmployee();
    const query = `DELETE FROM employee WHERE id = ?`;

    await pool.query(query, [employeeId]);

    console.log('');
    console.log('Employee deleted successfully');
    console.log('');
  } catch (e) {
    console.error('Error:', e.message);
  }
}

async function budgetForDepartment() {
  try {
    const { department: departmentId } = await inputs.askForDepartment();
    const query = `
        SELECT depto.id, depto.name AS department, SUM(rl.salary) AS budget
        FROM department depto
        JOIN role rl ON depto.id = rl.department_id
        WHERE depto.id = ?
        GROUP BY depto.id
    `;

    const [budgetRows] = await pool.query(query, [departmentId]);

    const columnDef = {
      id: { title: 'ID', width: 4 },
      department: { title: 'Department', width: 30 },
      budget: { title: 'Budget', width: 10 },
    };

    printTable(budgetRows, columnDef);

  } catch (e) {
    console.error('Error:', e.message);
  }
}


// Function to gracefully shut down the application
async function shutDown() {
  console.log('Bye');
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
  updateEmployeeManager,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  budgetForDepartment,
  shutDown
};
