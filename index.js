const inquirer = require('inquirer');
const employee = require('./lib/employee');

const actions = {
  'View all employees': employee.allEmployees,
  'View employees by manager': employee.viewEmployeesByManager,
  'View employees by department': employee.viewEmployeesByDepartment,
  'Add employee': employee.addEmployee,
  'Update employee role': employee.updateEmployeeRole,
  'Update employee manager': employee.updateEmployeeManager,
  'Delete employee': employee.deleteEmployee,
  'View all roles': employee.allRoles,
  'Add role': employee.addRole,
  'Delete role': employee.deleteRole,
  'View all departments': employee.allDepartments,
  'View budget of department': employee.budgetForDepartment,
  'Add department': employee.addDepartment,
  'Delete department': employee.deleteDepartment,
  'Quit': employee.shutDown
};

async function main() {
  try {
    const { options } = await inquirer.prompt([
      {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: Object.keys(actions),
      },
    ]);

    if (actions[options]) {
      await actions[options]();
    } else {
      console.log("Invalid action selected.");
    }

    // Only continue the loop if the user hasn't chosen "Quit"
    if (options !== 'Quit') {
      await main();
    }

  } catch (error) {
    console.error("Error:", error.message);
    await main();
  }
}

main();
