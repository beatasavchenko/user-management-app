import { Request, Response } from "express";
import {
  createUser,
  deleteUserByCustomerNumber,
  getAllUsers
} from "../services/UserService";

const getUsers = async (req: Request, res: Response) => {
  console.log(req.query);

  try {
    const { search, sortBy, order } = req.query;
    const usersFound = await getAllUsers({
      search: search as string,
      sortBy: sortBy as any,
      order: order === "desc" ? "desc" : "asc"
    });

    const users = usersFound.map((u) => ({
      customerNumber: u.customer_number,
      username: u.username,
      firstName: u.first_name,
      lastName: u.last_name,
      email: u.email,
      lastLogin: u.last_login,
      dateOfBirth: u.date_of_birth,
      password: u.password
    }));

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const createNewUser = async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  return res.status(201).json(user);
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await deleteUserByCustomerNumber(id);
    return res.status(200).json({ success: deleted });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete user" });
  }
};

export { getUsers, createNewUser, deleteUser };
