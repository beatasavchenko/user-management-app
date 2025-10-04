import { Router } from "express";
import {
  createNewUser,
  deleteUser,
  getUsers
} from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", createNewUser);
router.delete("/:id", deleteUser);

export default router;
