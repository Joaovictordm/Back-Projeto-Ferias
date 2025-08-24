import express from "express";
import { createExerciseController } from "../controllers/exercises_controllers.js";
import { editExerciseController } from "../controllers/exercises_controllers.js";
import { deleteExerciseController } from "../controllers/exercises_controllers.js";
import { getSerieByIdController } from "../controllers/series_controllers.js";
//Importa todas as funcções do controller pra uso

//cria uma constante que usa as rotas do express
const router = express.Router();

//Cada um declara aqui um caminho. Quando cada "/" for acessado, ele chama a função declarada lá em cima e executa essa função. Isso se chama endpoint
router.get("/getSerieById/:id", getSerieByIdController );
router.post("/createExercise/:id", createExerciseController);
router.patch("/editExercise/:id", editExerciseController);
router.delete("/deleteExercise/:id", deleteExerciseController);


//exporta o router com todos os "/" para fora. Aqui a gente tá exportando no server js e chamando lá
export default router; 