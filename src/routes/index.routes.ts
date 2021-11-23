import { authRouter } from "./auth.routes";
import { departmentRouter } from "./department.routes";
import { userRouter } from "./user.routes";

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/departments", departmentRouter);

export default router;
