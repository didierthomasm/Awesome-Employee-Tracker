const express = require('express');
const employeesRouter = require('../routes/employees');
const rolesRouter = require('../routes/roles');
const departmentsRouter = require('../routes/departments');
const addDepartmentRouter = require('../routes/addDepartment');
const addRoleRouter = require('../routes/addRole');
const addEmployeeRouter = require('../routes/addEmployee');
const employeeRoleRouter = require('../routes/employeeRole');

const app = express();

app.use('/employees', employeesRouter);
app.use('/roles', rolesRouter);
app.use('/departments', departmentsRouter);
app.use('/add-department', addDepartmentRouter);
app.use('/add-role', addRoleRouter);
app.use('add-employee', addEmployeeRouter);
app.use('employee-role', employeeRoleRouter);

module.exports = app;