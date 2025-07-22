import express from "express";
import { createRoutineController } from "../controllers/routine_controllers.js";
import { editRoutineController } from "../controllers/routine_controllers.js";
import { deleteRoutineController } from "../controllers/routine_controllers.js";

const router = express.Router();

router.post("/createRoutine/:id", createRoutineController);
router.patch("/editRoutine/:id", editRoutineController );
router.delete("/deleteRoutine/:id", deleteRoutineController);

export default router; 