"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var department_routes_1 = require("./department.routes");
var user_routes_1 = require("./user.routes");
var router = require('express').Router();
router.use('/users', user_routes_1.userRouter);
router.use('/departments', department_routes_1.departmentRouter);
exports.default = router;
