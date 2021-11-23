import { userRouter } from "./user.routes";

const router = require('express').Router();

router.use('/users', userRouter);

export default router;