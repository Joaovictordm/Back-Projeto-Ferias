import express from "express";
import { createUserController } from "../controllers/user_controllers.js";
import { createDataUserController } from "../controllers/user_controllers.js";
import { getUserByIdController } from "../controllers/user_controllers.js";
import { editDataUserController } from "../controllers/user_controllers.js";
import { deleteUserController } from "../controllers/user_controllers.js";
import { getRoutineByIdController } from "../controllers/user_controllers.js";

const router = express.Router();



router.get("/getData/:id", getUserByIdController);
router.get("/rotinaUsuario/:id", getRoutineByIdController);
router.post("/login" , createUserController);
router.post("/dataUser/:id", createDataUserController);
router.patch("/editDataUser/:id", editDataUserController);
router.delete("/delete/:id", deleteUserController);

export default router; 



