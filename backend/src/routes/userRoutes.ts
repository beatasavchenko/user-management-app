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
router.post("/", createNewUser);
router.put("/:id", editUser);
router.get("/:id", getSingleUserByCustomerNumber);
router.delete("/:id", deleteUser);

export default router;
