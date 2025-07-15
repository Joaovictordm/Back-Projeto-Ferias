import express from "express";
import { createUserController } from "../controllers/user_controllers.js";
const router = express.Router();

router.post("/login" , createUserController);

export default router; 