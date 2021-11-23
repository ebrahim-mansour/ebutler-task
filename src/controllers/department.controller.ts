import { Request, Response } from "express";
import { NotFoundError } from "../common/errors/not-found-error";
import { Department } from "../models/department.model";
import { User } from "../models/user.model";

export const createDepartmentController = async (
  req: Request,
  res: Response
) => {
  const { name, description } = req.body;

  const department = Department.build({
    name,
    description,
  });
  await department.save();

  res.status(201).send({ department });
};

export const getAllDepartmentsController = async (
  req: Request,
  res: Response
) => {
  const { searchKey, role } = req.query;

  let query = {} as any;
  let limit = +(req.query.limit || 50);
  let page = +(req.query.page || 1);
  let skip = (page - 1) * limit;

  if (searchKey) {
    query.$or = [
      { name: { $regex: searchKey, $options: "i" } },
      { description: { $regex: searchKey, $options: "i" } },
    ];
  }

  if (role) {
    query.role = role;
  }

  const departments = await Department.find(query).skip(skip).limit(limit);

  res.status(200).send({ departments });
};

export const getDepartmentByIdController = async (
  req: Request,
  res: Response
) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    throw new NotFoundError();
  }

  res.status(200).send({ department });
};

export const updateDepartmentByIdController = async (
  req: Request,
  res: Response
) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    throw new NotFoundError();
  }

  department.set({
    name: req.body.name,
    description: req.body.description,
  });
  await department.save();

  res.status(200).send({ department });
};

export const deleteDepartmentByIdController = async (
  req: Request,
  res: Response
) => {
  const department = await Department.findByIdAndDelete(req.params.id);

  if (!department) {
    throw new NotFoundError();
  }

  res.status(200).send({ message: "department deleted successfully" });
};

export const getDepartmentUsersController = async (
  req: Request,
  res: Response
) => {
  const { searchKey } = req.query;

  let query = { departmentId: req.currentUser?.departmentId } as any;
  let limit = +(req.query.limit || 50);
  let page = +(req.query.page || 1);
  let skip = (page - 1) * limit;

  if (searchKey) {
    query.$or = [
      { username: { $regex: searchKey, $options: "i" } },
      { email: { $regex: searchKey, $options: "i" } },
    ];
  }

  const users = await User.find(query).skip(skip).limit(limit);

  res.status(200).send({ users });
};
