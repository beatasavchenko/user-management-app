import { Router } from "express";
import {
  createNewUser,
  deleteUser,
  getUsers,
  getSingleUserByCustomerNumber,
  editUser
} from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getSingleUserByCustomerNumber);
router.post("/", createNewUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
