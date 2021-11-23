import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";

export const isSuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Suppose that we have a token, session, or whatever the way we authenticated the user
  // Here I will mock this function by pulling the superadmin user from the database and assign it to the request
  // The real function will fetch the user by id serialized from token and check if it does'nt has roleId, that mean this is the super admin

  try {
    const user = await User.findOne({ roleId: { $exists: false } });

    if (user) {
      req.currentUser = user;
    }
  } catch (error) {
    next(error);
  }

  next();
};
