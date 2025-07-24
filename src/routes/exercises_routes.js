import express from "express";
import { createExerciseController } from "../controllers/exercises_controllers.js";
import { editExerciseController } from "../controllers/exercises_controllers.js";
import { deleteExerciseController } from "../controllers/exercises_controllers.js";

const router = express.Router();

router.post("/createExercise/:id", createExerciseController);
router.patch("/editExercise/:id", editExerciseController);
router.delete("/deleteExercise/:id", deleteExerciseController);



export default router; 