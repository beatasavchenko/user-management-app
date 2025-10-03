import { Router } from "express";
import { createNewUser, getUsers } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", createNewUser);

export default router;
