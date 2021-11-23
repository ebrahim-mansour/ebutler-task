import { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../common/errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { Password } from "../services/password";

const router = require("express").Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    // The token should be stored in session or database to be used
    // in the future for authentication

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    res.status(200).json({ existingUser, token: userJwt });
  }
);

export { router as authRouter };
