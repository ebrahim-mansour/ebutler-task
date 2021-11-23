import express from "express";
import { body, param } from "express-validator";
import {
  getAllDepartmentsController,
  createDepartmentController,
  getDepartmentByIdController,
  deleteDepartmentByIdController,
  updateDepartmentByIdController,
  getDepartmentUsersController,
} from "../controllers/department.controller";
import { isDepartmentManager } from "../middlewares/is-department-manager";
import { isSuperAdmin } from "../middlewares/is-super-admin";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

const validateDepartmentBody = (): any => {
  return [
    body("name")
      .isString()
      .withMessage("Name must be string")
      .trim()
      .notEmpty()
      .withMessage("Name must be non empty"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be string")
      .trim()
      .notEmpty()
      .withMessage("Description must be non empty"),
  ];
};

const validateDepartmentId = () => {
  return [param("id").isMongoId().withMessage("Invalid id")];
};

router.put(
  "/:id",
  isSuperAdmin,
  isDepartmentManager,
  requireAuth,
  validateDepartmentId(),
  validateRequest,
  validateDepartmentBody(),
  updateDepartmentByIdController
);

router.get(
  "/:id/users",
  isDepartmentManager,
  requireAuth,
  getDepartmentUsersController
);

router.use(isSuperAdmin, requireAuth);

router.get("/", getAllDepartmentsController);
router.post(
  "/",
  validateDepartmentBody(),
  validateRequest,
  createDepartmentController
);
router.get(
  "/:id",
  validateDepartmentId(),
  validateRequest,
  getDepartmentByIdController
);
router.delete(
  "/:id",
  validateDepartmentId(),
  validateRequest,
  deleteDepartmentByIdController
);

export { router as departmentRouter };
