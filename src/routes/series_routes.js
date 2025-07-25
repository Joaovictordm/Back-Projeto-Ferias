import express from "express";
import { createSerieController } from "../controllers/series_controllers.js";

const router = express.Router();

router.post("/createSerie/:id", createSerieController);

export default router; 
