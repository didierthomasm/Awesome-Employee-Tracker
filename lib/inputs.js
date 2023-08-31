const inquirer = require('inquirer');
const { roles, managers, departments } = require('../helper/inputChoices');
const pool = require("../config/connection");



async function askForEmployeeDetails() {
  const roleChoices = await roles();
  const managerChoices = await managers();
  return { first_name, last_name, role, manager } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name:'
    },
    {
      type: 'list',
      name: 'role',
      message: 'Select a role:',
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Select a manager:',
      choices: managerChoices
    },
  ]);
}

async function askForDepartmentDetails() {
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'Enter the department name:'
    },
  ]);
}

async function askForRoleDetails() {
  const departmentChoice = await departments()
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:'
    },
    {
      type: 'input',
      name: 'department_id',
      message: departmentChoice
    }
  ]);
}

module.exports = { askForEmployeeDetails, askForDepartmentDetails, askForRoleDetails };