import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../common/constants";
import { User } from "../models/user.model";

export const isDepartmentManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Suppose that we have a token, session, or whatever the way we authenticated the user
    // Here I will mock this function by pulling any user with manager role
    // The real function will fetch the user by id and check both the role and department

    const user = await User.findOne({ role: UserRoles.manager });

    if (user) {
      req.currentUser = user;
    }
  } catch (error) {
    next(error);
  }

  next();
};
