import {createUser} from "../models/user_models.js";
import {getUserById} from "../models/user_models.js";
import { createDataUser } from "../models/user_models.js";

//Controler da query que cria o usuário
export async function createUserController(req, res){
    try{
        const {name, email, password } = req.body;
        const newUser = await createUser({name, email, password});

        res.status(201).json({mensagem: "Usuário criado com sucesso!", id: newUser});
    } catch (error) {
        console.error("Deu algum erro: ", error.message);
        res.status(500).json({mensagem: "Erro ao criar o usuário."});
    }

}
//Controler da query que cria os dados do usuário
export async function createDataUserController(req, res){
    try{
        const {sex, age,weight, target_weight, height, level_physical_activity} = req.body;
        const newData = await createDataUser({sex, age, weight, target_weight, height, level_physical_activity});
        res.status(201).json({mensagem: "Usuário criado com sucesso! ", id: newData});
    } catch(error){
        console.error("Deu erro, man: ", message.error);
        res.status(500).jason({mensagem: "Erro ao criar usuário."});
    }
}
//Controler da query que mostra o usuário por id
export async function getUserByIdController(req, res){
    try{
        const [id] = req.params;
        const user = await getUserById(id);
        res.status(200).json(user);
        return user
    } catch(error){
        console.error("Deu ruim: ", error.message);
        res.status(404).json({mensagem: "O usuário não existe."})
    }
}