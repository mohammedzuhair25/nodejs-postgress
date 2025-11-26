import { Router } from "express";
import { getUsers, createUser } from "./controllers/userController.js";

const router = Router();

// GET all users
router.get("/users", getUsers);

// POST create user
router.post("/users", createUser);

export default router;
