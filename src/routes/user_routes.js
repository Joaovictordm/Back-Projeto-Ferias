import express from "express";
import { createUserController } from "../controllers/user_controllers.js";
import { createDataUserController } from "../controllers/user_controllers.js";
import { getUserByIdController } from "../controllers/user_controllers.js";
import { editDataUserController } from "../controllers/user_controllers.js";
import { deleteUserController } from "../controllers/user_controllers.js";
import { getRoutineByIdController } from "../controllers/user_controllers.js";
import { getLoginByEmailController } from "../controllers/user_controllers.js";
//Importa todas as funcções do controller pra uso


//cria uma constante que usa as rotas do express
const router = express.Router();



//Cada um declara aqui um caminho. Quando cada "/" for acessado, ele chama a função declarada lá em cima e executa essa função. Isso se chama endpoint
router.get("/getData/:id", getUserByIdController);
router.get("/rotinaUsuario/:id", getRoutineByIdController);
router.get("/getLogin", getLoginByEmailController);
router.post("/login" , createUserController);
router.post("/dataUser/:id", createDataUserController);
router.patch("/editDataUser/:id", editDataUserController);
router.delete("/delete/:id", deleteUserController);

//exporta o router com todos os "/" para fora. Aqui a gente tá exportando no server js e chamando lá
export default router; 



