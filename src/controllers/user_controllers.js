import {createUser} from "../models/user_models.js";
import {getUserById} from "../models/user_models.js";
import { createDataUser } from "../models/user_models.js";
import { editDataUser } from "../models/user_models.js";
import { deleteUser } from "../models/user_models.js";


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
       
        const {user_id , sex, age, weight, target_weight, height, level_physical_activity} = req.body;
        const newData = await createDataUser({ user_id,sex, age, weight, target_weight, height, level_physical_activity});
        res.status(201).json({mensagem: "Usuário criado com sucesso! ", id: newData});
    } catch(error){
        console.error("Deu erro, man: ", error.message);
        res.status(500).json({mensagem: "Erro ao criar usuário."});
    }
}

//Controler da query que mostra o usuário por id
export async function getUserByIdController(req, res){
    try{
        const id = req.params.id;
        const user = await getUserById(id);
        res.status(200).json(user)
        return user
    } catch(error){
        console.error("Deu ruim: ", error.message);
        res.status(404).json({mensagem: "O usuário não existe."})
    }
}

//Controler da query que atualiza uma informação
export async function editDataUserController(req, res){
    try{
        const id = req.params.id;
        const data = req.body;
        const editUser = await editDataUser(data,id);
        res.status(200).json({mensagem: "Alteração feita com sucesso!"})
    }catch(error){
        console.error("Deu ruim, mano: ", error.message);
        res.status(400).json({mensagem: "Deu algum erro, mano."})
    }
}

//Controller pra deletar o usuário
export async function deleteUserController(req, res){
    try{
        const id_login = req.params.id;
        const deletar = await deleteUser(id_login);
        res.status(200).json({mensagem: "Usuário deletado com sucesso!"})
    }catch(error){
        console.error("Deu ruim, maninho: ", error.message);
        res.status(500).json({mensagem: "Não deu pra deletar"})
    }
}