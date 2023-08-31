const pool = require("../config/connection");

async function roles() {
  let roleTitles = [];
  try {
    const query = `
        SELECT title
        FROM role
    `;
    const [rows] = await pool.query(query);

    // Extract only the title values using map()
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
    managerNames.push('Null');
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

module.exports = { roles, managers, departments }