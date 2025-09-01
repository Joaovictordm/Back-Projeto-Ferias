import express from "express";
import { createUserController } from "../controllers/user_controllers.js";
import { createDataUserController } from "../controllers/user_controllers.js";
import { getUserByIdController } from "../controllers/user_controllers.js";
import { editDataUserController } from "../controllers/user_controllers.js";
import { deleteUserController } from "../controllers/user_controllers.js";
import { loginController } from "../controllers/user_controllers.js";
import { authMiddlewareUser } from "../middlewares/authMiddlewares.js";

//Importa todas as funcções do controller pra uso


//cria uma constante que usa as rotas do express
const router = express.Router();



//Cada um declara aqui um caminho. Quando cada "/" for acessado, ele chama a função declarada lá em cima e executa essa função. Isso se chama endpoint
router.get("/getData", authMiddlewareUser, getUserByIdController);
router.post("/getLogin", loginController);
router.post("/login" , createUserController);
router.post("/dataUser", authMiddlewareUser, createDataUserController);
router.patch("/editDataUser", authMiddlewareUser, editDataUserController);
router.delete("/delete", authMiddlewareUser, deleteUserController);

//exporta o router com todos os "/" para fora. Aqui a gente tá exportando no server js e chamando lá
export default router; 



