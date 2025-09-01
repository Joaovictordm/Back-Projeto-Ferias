import express from "express";
import { createRoutineController } from "../controllers/routine_controllers.js";
import { editRoutineController } from "../controllers/routine_controllers.js";
import { deleteRoutineController } from "../controllers/routine_controllers.js";
import { getRoutineByIdController } from "../controllers/routine_controllers.js";
import { authMiddlewareUser } from "../middlewares/authMiddlewares.js";
import { authMiddlewareRoutine } from "../middlewares/authMiddlewares.js";
//Importa todas as funcções do controller pra uso

//cria uma constante que usa as rotas do express
const router = express.Router();

//Cada um declara aqui um caminho. Quando cada "/" for acessado, ele chama a função declarada lá em cima e executa essa função. Isso se chama endpoint
router.get("/rotinaUsuario", authMiddlewareUser, getRoutineByIdController);
router.post("/createRoutine", authMiddlewareUser ,createRoutineController);
router.patch("/editRoutine", authMiddlewareRoutine, editRoutineController );
router.delete("/deleteRoutine", authMiddlewareRoutine, deleteRoutineController);


//exporta o router com todos os "/" para fora. Aqui a gente tá exportando no server js e chamando lá
export default router; 