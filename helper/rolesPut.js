const pool = require('../config/connection');

// Define a function to fetch the old role title
async function getOldRoleTitle(employeeId) {
  const [rowsOld] = await pool.query(`
    SELECT r.title
    FROM employee e
    INNER JOIN role r ON e.role_id = r.id
    WHERE e.id = ?`,
    [employeeId]
  );

  if (rowsOld.length > 0) {
    return rowsOld[0].title;
  }

  return null;
}

// Define a function to update the employee's role
async function updateEmployeeRole(employeeId, newRoleId) {
  await pool.query(`
    UPDATE employee SET role_id = ? WHERE id = ?`,
    [newRoleId, employeeId]
  );
}

// Define a function to fetch the new role title
async function getNewRoleTitle(employeeId) {
  const [rowsNew] = await pool.query(`
    SELECT r.title
    FROM employee e
    INNER JOIN role r ON e.role_id = r.id
    WHERE e.id = ?`,
    [employeeId]
  );

  if (rowsNew.length > 0) {
    return rowsNew[0].title;
  }

  return null;
}

module.exports = { getOldRoleTitle, updateEmployeeRole, getNewRoleTitle };