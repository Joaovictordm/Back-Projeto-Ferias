import express from "express";
import { createSerieController } from "../controllers/series_controllers.js";
import { previousSerieController } from "../controllers/series_controllers.js";
import { delSerieController } from "../controllers/series_controllers.js";
//Importa todas as funcções do controller pra uso


//cria uma constante que usa as rotas do express
const router = express.Router();



//Cada um declara aqui um caminho. Quando cada "/" for acessado, ele chama a função declarada lá em cima e executa essa função. Isso se chama endpoint
router.get("/previousSerie/:exercise_id", previousSerieController)
router.post("/createSerie/:id", createSerieController);
router.delete("/deleteSerie/:id", delSerieController);


//exporta o router com todos os "/" para fora. Aqui a gente tá exportando no server js e chamando lá
export default router; 
