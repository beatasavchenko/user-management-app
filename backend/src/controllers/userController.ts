import { Request, Response } from "express";
import {
  createUser,
  deleteUserByCustomerNumber,
  getAllUsers,
  getUserByCustomerNumber,
  updateUser
} from "../services/UserService";
import { FieldError } from "src/types/fieldError";

const getUsers = async (req: Request, res: Response) => {
  try {
    const { search, sortBy, order } = req.query;

    const usersFound = await getAllUsers({
      search: search as string,
      sortBy: sortBy as any,
      order: order === "desc" ? "desc" : "asc"
    });

    // mapping to DB field names
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

const getSingleUserByCustomerNumber = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserByCustomerNumber(id);
    if (user)
      res.status(200).json({
        customerNumber: user.customer_number,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        lastLogin: user.last_login,
        dateOfBirth: user.date_of_birth
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user by customer number." });
  }
};

const createNewUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    const fieldError = error as FieldError;

    if (fieldError.field) return res.status(400).json(fieldError);

    res.status(500).json({ message: "Failed to create user." });
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
    const originalCustomerNumber = req.params.id;
    const data = req.body;

    const user = await updateUser(originalCustomerNumber, data);
    res.status(200).json(user);
  } catch (error) {
    const fieldError = error as FieldError;

    if (fieldError.field) return res.status(400).json(fieldError);

    res.status(500).json({ message: "Failed to update user." });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await deleteUserByCustomerNumber(id);

    return res.status(200).json({ success: deleted });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete user." });
  }
};

export {
  getUsers,
  createNewUser,
  editUser,
  getSingleUserByCustomerNumber,
  deleteUser
};
