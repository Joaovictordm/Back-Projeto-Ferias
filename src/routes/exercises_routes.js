import express from "express";
import { createExerciseController } from "../controllers/exercises_controllers.js";
import { editExerciseController } from "../controllers/exercises_controllers.js";
import { deleteExerciseController } from "../controllers/exercises_controllers.js";
import { getExerciseByIdController } from "../controllers/exercises_controllers.js";
import { authMiddlewareRoutine } from "../middlewares/authMiddlewares.js";
import { authMiddlewareExercise } from "../middlewares/authMiddlewares.js";

//Importa todas as funcções do controller pra uso

//cria uma constante que usa as rotas do express
const router = express.Router();

//Cada um declara aqui um caminho. Quando cada "/" for acessado, ele chama a função declarada lá em cima e executa essa função. Isso se chama endpoint

router.get("/getExercise", authMiddlewareRoutine, getExerciseByIdController);
router.post("/createExercise", authMiddlewareRoutine, createExerciseController);
router.patch("/editExercise", authMiddlewareExercise, editExerciseController);
router.delete("/deleteExercise", authMiddlewareExercise, deleteExerciseController);


//exporta o router com todos os "/" para fora. Aqui a gente tá exportando no server js e chamando lá
export default router; 