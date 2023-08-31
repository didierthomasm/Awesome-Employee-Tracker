const pool = require('../config/connection');
const inputs = require('./inputs');

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

    console.log('')

    console.log('id | first_name | last_name | title | department | salary | manager');
    console.log('-- | ---------- | --------- | ----- | ----------- | ------ | ----------');

    rows.forEach(({ id, first_name, last_name, role, department, salary, manager }) => {
      console.log(`${id} | ${first_name} | ${last_name} | ${role} | ${department} | ${salary} | ${manager}`);
    });

    console.log('');

  } catch (error) {
    console.error('Error:', error);
  }
}

async function allDepartments() {
  try {
    const [rows] = await pool.query('SELECT * FROM department');

    console.log('')

    console.log('  id | department');
    console.log('  -- | -----------------');

    rows.forEach(({ id, name }) => {
      console.log(`   ${id} | ${name}`);
    });

    console.log('')

  } catch (error) {
    console.error('Error:', error);
  }
}

async function allRoles() {
  try {
    const query = `
      SELECT r.id, r.title, r.salary, d.name AS department
      FROM role r
      LEFT JOIN department d ON r.department_id = d.id
    `;

    const [rows] = await pool.query(query);

    console.log('')

    console.log('id | title | department | salary');
    console.log('-- | ----- | ------ | -----------');

    rows.forEach(({ id, title, salary, department }) => {
      console.log(`${id} | ${title} | ${department} | ${salary}`);
    });

    console.log('')

    // return rows;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function addEmployee() {
  const { first_name, last_name, role_id, manager_id  } = await inputs.askForEmployeeDetails();;

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
}

async function addDepartment() {
  await inputs.askForDepartmentDetails();
}

async function addRole() {
  await inputs.askForRoleDetails();
}

async function updateEmployeeRole() {
  return await {}
}

async function shutDown() {
  await pool.end();
  await process.exit(0);
}

module.exports = { allEmployees, allDepartments, allRoles, addEmployee, addDepartment, addRole, updateEmployeeRole, shutDown };