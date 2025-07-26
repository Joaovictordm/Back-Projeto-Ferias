import express from "express";
import { createSerieController } from "../controllers/series_controllers.js";
import { previousSerieController } from "../controllers/series_controllers.js";
import { delSerieController } from "../controllers/series_controllers.js";

const router = express.Router();

router.get("/previousSerie/:serie_id/:exercise_id", previousSerieController)
router.post("/createSerie/:id", createSerieController);
router.delete("/deleteSerie/:id", delSerieController);

export default router; 
