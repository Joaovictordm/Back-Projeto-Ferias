import {createUser} from "../models/user_models.js";

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