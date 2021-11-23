"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentRouter = void 0;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var department_controller_1 = require("../controllers/department.controller");
var is_department_manager_1 = require("../middlewares/is-department-manager");
var is_super_admin_1 = require("../middlewares/is-super-admin");
var require_auth_1 = require("../middlewares/require-auth");
var validate_request_1 = require("../middlewares/validate-request");
var router = express_1.default.Router();
exports.departmentRouter = router;
var validateDepartmentBody = function () {
    return [
        express_validator_1.body("name")
            .isString()
            .withMessage("Name must be string")
            .trim()
            .notEmpty()
            .withMessage("Name must be non empty"),
        express_validator_1.body("description")
            .optional()
            .isString()
            .withMessage("Description must be string")
            .trim()
            .notEmpty()
            .withMessage("Description must be non empty"),
    ];
};
var validateDepartmentId = function () {
    return [express_validator_1.param("id").isMongoId().withMessage("Invalid id")];
};
router.put("/:id", is_super_admin_1.isSuperAdmin, is_department_manager_1.isDepartmentManager, require_auth_1.requireAuth, validateDepartmentId(), validate_request_1.validateRequest, validateDepartmentBody(), department_controller_1.updateDepartmentByIdController);
router.get("/:id/users", is_department_manager_1.isDepartmentManager, require_auth_1.requireAuth, department_controller_1.getDepartmentUsersController);
router.use(is_super_admin_1.isSuperAdmin, require_auth_1.requireAuth);
router.get("/", department_controller_1.getAllDepartmentsController);
router.post("/", validateDepartmentBody(), validate_request_1.validateRequest, department_controller_1.createDepartmentController);
router.get("/:id", validateDepartmentId(), validate_request_1.validateRequest, department_controller_1.getDepartmentByIdController);
router.delete("/:id", validateDepartmentId(), validate_request_1.validateRequest, department_controller_1.deleteDepartmentByIdController);
