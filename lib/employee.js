const inquirer = require('inquirer');

async function allEmployees() {
  return await inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'Add employee',
        'Update employee role',
        'View all roles',
        'Add role',
        'View all departments',
        'Add department',
        'Quit'
      ]
    }
  ]);
}

module.exports = { allEmployees, };