const express = require('express');
const employeesRouter = require('../routes/employees');
const rolesRouter = require('../routes/roles');
const departmentsRouter = require('../routes/departments');
const addDepartmentRouter = require('../routes/addDepartment');
const addRoleRouter = require('../routes/addRole');
const addEmployeeRouter = require('../routes/addEmployee');
const employeeRoleRouter = require('../routes/employeeRole');

const app = express();

app.use('/some', employeesRouter);

module.exports = app;