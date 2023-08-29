'use strict'
const router = require('express').Router();
const departments = require('./departments');
const employees = require('./employees');
const roles = require('./roles');

router.use('/departments', departments);
router.use('/employees', employees);
router.use('/roles', roles);

module.exports = router;