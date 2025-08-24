import express from "express";
import { createRoutineController } from "../controllers/routine_controllers.js";
import { editRoutineController } from "../controllers/routine_controllers.js";
import { deleteRoutineController } from "../controllers/routine_controllers.js";
import { getExerciseByIdController } from "../controllers/exercises_controllers.js";
//Importa todas as funcções do controller pra uso

//cria uma constante que usa as rotas do express
const router = express.Router();

//Cada um declara aqui um caminho. Quando cada "/" for acessado, ele chama a função declarada lá em cima e executa essa função. Isso se chama endpoint
router.get("/getExercise/:id", getExerciseByIdController);
router.post("/createRoutine/:id", createRoutineController);
router.patch("/editRoutine/:id", editRoutineController );
router.delete("/deleteRoutine/:id", deleteRoutineController);


//exporta o router com todos os "/" para fora. Aqui a gente tá exportando no server js e chamando lá
export default router; 