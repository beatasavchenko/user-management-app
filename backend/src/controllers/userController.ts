import { Request, Response } from "express";
import { createUser, getAllUsers } from "../services/UserService";

const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.json(users);
};

const createNewUser = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  return res.status(201).json(user);
};

export { getUsers, createNewUser };
