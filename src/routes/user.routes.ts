import express from "express";
import { body, param } from "express-validator";
import { validateBody } from "../common/constants";
import { BadRequestError } from "../common/errors/bad-request-error";
import {
  getAllUsersController,
  createUserController,
  getUserByIdController,
  assignDepartController,
  deleteUserByIdController,
} from "../controllers/user.controller";
import { isSuperAdmin } from "../middlewares/is-super-admin";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { Department } from "../models/department.model";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";

const router = express.Router();

const validateUserBody = (validate: validateBody): any => {
  switch (validate) {
    case validateBody.create:
      return [
        body("firstName")
          .isString()
          .withMessage("First name must be string")
          .trim()
          .notEmpty()
          .withMessage("First name must be non empty"),
        body("lastName")
          .optional()
          .isString()
          .withMessage("Last name must be string")
          .trim()
          .notEmpty()
          .withMessage("Last name must be non empty"),
        body("username")
          .isString()
          .withMessage("User name must be string")
          .trim()
          .notEmpty()
          .withMessage("User name must be non empty"),
        body("email")
          .isEmail()
          .withMessage("Email must be valid")
          .custom(async (email: string) => {
            const user = await User.findOne({ email });
            if (user) {
              throw new BadRequestError("Email already exists");
            }

            return true;
          }),
        body("password")
          .isString()
          .withMessage("Password must be string")
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage("Password must be between 4 and 20 characters"),
        body("roleId")
          .isMongoId()
          .withMessage("Invalid id")
          .custom(async (roleId: string) => {
            const role = await Role.findById(roleId);

            if (!role) {
              throw new BadRequestError("Invalid role id");
            }
            return true;
          }),
        body("departmentId")
          .optional()
          .isMongoId()
          .withMessage("Invalid id")
          .custom(async (departmentId: string) => {
            const department = await Department.findById(departmentId);

            if (!department) {
              throw new BadRequestError("Invalid department id");
            }
            return true;
          }),
      ];

    case validateBody.patch:
      return [
        param("id").isMongoId().withMessage("Invalid id"),
        body("departmentId")
          .isMongoId()
          .withMessage("Invalid id")
          .custom(async (departmentId: string) => {
            const department = await Department.findById(departmentId);

            if (!department) {
              throw new BadRequestError("Invalid department id");
            }
            return true;
          }),
      ];
  }
};

const validateUserId = () => {
  return [param("id").isMongoId().withMessage("Invalid id")];
};

router.use(isSuperAdmin, requireAuth);

router.get("/", getAllUsersController);
router.post(
  "/",
  validateUserBody(validateBody.create),
  validateRequest,
  createUserController
);
router.get("/:id", validateUserId(), validateRequest, getUserByIdController);
router.patch(
  "/:id",
  validateUserBody(validateBody.patch),
  validateRequest,
  assignDepartController
);
router.delete(
  "/:id",
  validateUserId(),
  validateRequest,
  deleteUserByIdController
);

export { router as userRouter };
