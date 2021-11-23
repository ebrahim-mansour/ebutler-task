import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../common/errors/not-authorized-error";

declare global {
  namespace Express {
    interface Request {
      currentUser?: {
        firstName: string;
        lastName?: string;
        username: string;
        email: string;
        roleId?: string;
        departmentId?: string;
      };
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
