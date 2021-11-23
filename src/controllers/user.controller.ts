import { Request, Response } from "express";
import { NotFoundError } from "../common/errors/not-found-error";
import { User } from "../models/user.model";

export const createUserController = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    roleId,
    departmentId,
  } = req.body;

  const user = User.build({
    firstName,
    lastName,
    username,
    email,
    password,
    roleId,
    departmentId,
  });
  await user.save();

  res.status(201).send({ user });
};

export const getAllUsersController = async (req: Request, res: Response) => {
  const { searchKey, roleId, departmentId } = req.query;

  let query = {} as any;
  let limit = +(req.query.limit || 50);
  let page = +(req.query.page || 1);
  let skip = (page - 1) * limit;
  let popQuery = [] as any;

  if (searchKey) {
    query.$or = [
      { username: { $regex: searchKey, $options: "i" } },
      { email: { $regex: searchKey, $options: "i" } },
    ];
  }

  if (roleId) {
    query.roleId = roleId;
  }

  if (departmentId) {
    query.departmentId = departmentId;
  }

  const users = await User.find(query)
    .skip(skip)
    .limit(limit)
    .populate(popQuery);

  res.status(200).send({ users });
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFoundError();
  }

  res.status(200).send({ user });
};

export const assignDepartController = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new NotFoundError();
  }

  user.set({
    departmentId: req.body.departmentId,
  });
  await user.save();

  res.status(200).send({ user });
};

export const deleteUserByIdController = async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    throw new NotFoundError();
  }

  res.status(200).send({ message: "user deleted successfully" });
};
