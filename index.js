// Import the 'inquirer' library for handling command-line prompts
const inquirer = require('inquirer');

// Import the 'employee' module that contains functions for employee-related actions
const employee = require('./lib/employee');

// Main function to initiate the application
async function main() {
  // Prompt the user to select an action from a list of options
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

  // Use a switch statement to handle the selected action
  switch (options) {
    case 'View all employees':
      // Call the 'allEmployees' function from the 'employee' module to list all employees
      await employee.allEmployees();
      break;
    case 'Add employee':
      // Call the 'addEmployee' function from the 'employee' module to add a new employee
      await employee.addEmployee();
      break;
    case 'Update employee role':
      // Call the 'updateEmployeeRole' function from the 'employee' module to update an employee's role
      await employee.updateEmployeeRole();
      break;
    case 'View all roles':
      // Call the 'allRoles' function from the 'employee' module to list all roles
      await employee.allRoles();
      break;
    case 'Add role':
      // Call the 'addRole' function from the 'employee' module to add a new role
      await employee.addRole();
      break;
    case 'View all departments':
      // Call the 'allDepartments' function from the 'employee' module to list all departments
      await employee.allDepartments();
      break;
    case 'Add department':
      // Call the 'addDepartment' function from the 'employee' module to add a new department
      await employee.addDepartment();
      break;
    case 'Quit':
    case 'Exit':
      // Call the 'shutDown' function from the 'employee' module to gracefully exit the application
      await employee.shutDown();
      break;
  }

  // Call the 'main' function recursively to continue the application loop
  await main();

}

// Start the application by calling the 'main' function
main();
