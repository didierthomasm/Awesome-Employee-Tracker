const inquirer = require('inquirer');
const { roles, managers, departments, employees} = require('../helper/inputChoices');

// Helper function for asking the user for a new employee
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

// Helper function for asking the user for a new department
async function askForDepartmentDetails() {
  return { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the department name:'
    },
  ]);
}

// Helper function for asking the user for a new role
async function askForRoleDetails() {
  const departmentChoice = await departments()
  return { title, salary, department } = await inquirer.prompt([
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
      type: 'list',
      name: 'department',
      message: 'Select a department:',
      choices: departmentChoice
    }
  ]);
}

// Helper function to ask the user for an update on the role of an employee
async function askForUpdateRole() {
  const employeeChoice = await employees();
  const roleChoice = await roles();
  return  { employee, role } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Select a employee:',
      choices: employeeChoice
    },
    {
      type: 'list',
      name: 'role',
      message: 'Select a role:',
      choices: roleChoice
    }
  ])
}

module.exports = { askForEmployeeDetails, askForDepartmentDetails, askForRoleDetails, askForUpdateRole };