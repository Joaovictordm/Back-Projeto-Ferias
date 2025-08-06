import {createUser} from "../models/user_models.js";
import {getUserById} from "../models/user_models.js";
import { createDataUser } from "../models/user_models.js";
import { editDataUser } from "../models/user_models.js";
import { deleteUser } from "../models/user_models.js";
import { getRoutineById } from "../models/user_models.js";
import { getLoginByPassword } from "../models/user_models.js";
import { verifUser } from "../models/user_models.js";
import validator from "validator";
import emojiRegex from "emoji-regex";


//create a user
export async function createUserController(req, res){
    try{
        const {name, email, password } = req.body;
        //isso é uma expressão regular, ela começa no / e termina no /. Essa diz que tem q ter pelo menos um ou mais campos desses. Se tiver algo diferente ele dá erro. 
        //o ^ significa que vai começar pelo começo da string e o & signiifca que vai terminar no final. O + significa que ele espera pelo menos um ou mais desses campos, se não tiver ou tiver algo diferente ele dá erro.
       const specialCharRegex = /^[A-Za-zÀ-ÿ\s']+$/;
        //Verifica se tem algum simbolo como setas etc
        const visualSymbolsRegex = /[\u2600-\u26FF\u2700-\u27BF\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u25A0-\u25FF]/u;
        //Verifica se tem algum emote
        const regexEmoji = emojiRegex();
        //Verifica se tem algum simbolo estranho
        const forbiddenEmailSymbolsRegex = /[(){}[\]|!#$%^&*+=~`'";:/?<>\s\\,]/;


          if (!name || !email || !password){
            throw new Error ("Empty field")
        }
         if (!validator.isEmail(email) || regexEmoji.test(email) || visualSymbolsRegex.test(email) || forbiddenEmailSymbolsRegex.test(email)){
            throw new Error ("Invalid email format")
         }
         if (!specialCharRegex.test(name)){
            throw new Error ("invalid name")
         }
         if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 2,
            minUppercase: 2,
            minNumbers: 2,
            minSymbols: 2
            
         })){
            throw new Error ("Password must be at least 8 characters long and include lowercase, uppercase, number, and symbol.")
         }
                 
        const newUser = await createUser({name, email, password});
         
        res.status(201).json({message: "User created successfully!", id: newUser});
         
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Error creating user."});
    }

}

//create user data
export async function createDataUserController(req, res){
    try{
        const user_id = req.params.id;
        const { sex, age, weight, target_weight, height, level_physical_activity} = req.body;
        const check = await verifUser({id: user_id});

        //Verifica se é masculino ou feminino o que recebeu
        const sexoRegex = /^(Masculino|Feminino)$/i;
        //Verifica se é um númerio inteiro
        const idadeRegex = /^\d+$/;
        //verifica se é um numero com virgula ou ponto
         const floatNumberRegex = /^\d+\.\d+$/;
        //verifica se recebu ou baixo, modera ou alto
        const physicalActivityRegex = /^(baixo|moderado|alto)$/i;
        
        if (!sex || !age || !weight || !target_weight || !height || !level_physical_activity){
            throw new Error ("Empty field")
        }
        if (!check){
            throw new Error ("User does not exist")
        }
        if (
        !sexoRegex.test(String(sex).trim()) || 
        !idadeRegex.test(String(age).trim()) || 
        !physicalActivityRegex.test(String(level_physical_activity).trim()) || 
        !floatNumberRegex.test(String(weight).trim()) || 
        !floatNumberRegex.test(String(target_weight).trim()) || 
        !floatNumberRegex.test(String(height).trim())){
            throw new Error ("field does not meet the expected standard")
        }
        
        const newData = await createDataUser({ user_id ,sex, age, weight, target_weight, height, level_physical_activity});
        res.status(201).json({message: "User data created successfully!", id: newData});
    } catch(error){
        console.error(error.message);
        res.status(500).json({message: "Error creating user data."});
    }
}

//show the user
export async function getUserByIdController(req, res){
    try{
        const id = req.params.id;
        const user = await getUserById({id});
        
        if (!user){
            throw new Error ("User does not exist")
        }

        res.status(200).json(user)
        return user
    } catch(error){
        console.error(error.message);
        res.status(404).json({message: "User does not exist."})
    }
}

//update an information
export async function editDataUserController(req, res){
    try{
        const id = req.params.id;
        const check = await verifUser({id});

        if(!check){
            throw new Error ("User does not exist")
        }

        const data = req.body;
        

        if (data.user_id || data.id || data.created_at){
            throw new Error ("cannot change the id")
        }

        delete data.created_at;
        delete data.user_id;
        delete data.id;

        const editUser = await editDataUser({data,id});
        res.status(200).json({message: "Data updated successfully!"})
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Something went wrong."})
    }
}

//delete a user
export async function deleteUserController(req, res){
    try{
        const id_login = req.params.id;
        
        const deletar = await deleteUser({id_login});
        res.status(200).json({message: "User deleted successfully!"})
    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Could not delete user."})
    }
}

//show the routines
export async function getRoutineByIdController(req, res){
    try{
        const id = req.params.id;
        const mostrar = await getRoutineById({id});
        res.status(200).json(mostrar)
        return mostrar;
    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Error fetching routine."});
    }
} 

//check login
export async function getLoginByPasswordController(req, res){
    try{
        const {email, password} = req.body;
        const getLogin = await getLoginByPassword ({email}); 
        if (!getLogin){
            throw new Error ("User not founded")
        }
        if (getLogin.user_password !== password){
            throw new Error ("Password incorrect");
        }     
        res.status(200).json({message: "Sucess"});
    }catch(error){
        res.status(400).json(error.message);
        console.error(error.message);
    }
}