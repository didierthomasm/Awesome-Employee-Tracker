const inquirer = require('inquirer');
const employee = require('./lib/inputs');

async function main() {
  const { options } = await inquirer.prompt([
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
      ],
    },
  ]);

  switch (options) {
    case 'View all employees':
      await employee.allEmployees();
      break;
    case 'Add employee':
      await employee.addEmployee();
      break;
    case 'Update employee role':
      await employee.updateEmployeRole();
      break;
    case 'View all roles':
      await employee.allRoles();
      break;
    case 'Add role':
      await employee.addRole();
      break;
    case 'View all departments':
      await employee.allDepartments();
      break;
    case 'Add department':
      await employee.addDepartment();
      break;
    case 'Quit':
    case 'Exit':
      await employee.shutDown();
      break;
  }

  // Handle other actions...

  console.log('Goodbye!');
}

main();
