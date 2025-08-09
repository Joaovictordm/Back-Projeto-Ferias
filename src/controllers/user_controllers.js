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
            // const visualSymbolsRegex = /[\u2600-\u26FF\u2700-\u27BF\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u25A0-\u25FF]/u;
        //Verifica se tem algum emote
            // const regexEmoji = emojiRegex();
        //Verifica se tem algum simbolo estranho
             // const forbiddenEmailSymbolsRegex = /[(){}[\]|!#$%^&*+=~`'";:/?<>\s\\,]/;


          if (!name || !email || !password){
            throw new Error ("Empty field")
        }
         if (!validator.isEmail(email)){
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
            throw new Error ("Password must be at least 8 characters long and include 2 lowercase, 2 uppercase, 2 number, and 2 symbol.")
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
        const data = req.body;
        const check = await verifUser({id: user_id});
        
        if (!check){
            throw new Error ("User does not exist")
        }
        //Verifica se é masculino ou feminino o que recebeu
        const sexoRegex = /^(Masculino|Feminino)$/i;
        //Verifica se é um númerio inteiro
        const idadeRegex = /^\d+$/;
        //verifica se é um numero com virgula ou ponto
        const floatNumberRegex = /^\d+\.\d+$/;
        //verifica se recebu ou baixo, modera ou alto
        const physicalActivityRegex = /^(baixo|moderado|alto)$/i;
        
        if (!data.sex || !data.age || !data.weight || !data.target_weight || !data.height || !data.level_physical_activity){
            throw new Error ("Empty field")
        }
        const dados = {
            sex: sexoRegex,
            age: idadeRegex,
            weight: floatNumberRegex,
            target_weight: floatNumberRegex,
            height: floatNumberRegex,
            level_physical_activity: physicalActivityRegex
        };
        for (const [field, regex] of Object.entries(dados)){
            

            if (!regex.test(String(data[field]).trim())){
                throw new Error (`Field does not meet the expected standard ${field}`);
            }
        }

        const newData = await createDataUser({user_id, sex: data.sex, age: data.age, weight: data.weight, target_weight: data.target_weight, height: data.height,level_physical_activity: data.level_physical_activity});
        
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

        //Verifica se é masculino ou feminino o que recebeu
        const sexoRegex = /^(Masculino|Feminino)$/i;
        //Verifica se é um númerio inteiro
        const idadeRegex = /^\d+$/;
        //verifica se é um numero com virgula ou ponto
         const floatNumberRegex = /^\d+\.\d+$/;
        //verifica se recebu ou baixo, modera ou alto
        const physicalActivityRegex = /^(baixo|moderado|alto)$/i;

        if(!check){
            throw new Error ("User does not exist")
        }
        const data = req.body;

        const validations = {
            sex: sexoRegex,
            age: idadeRegex,
            height: floatNumberRegex,
            weight: floatNumberRegex,
            target_weight: floatNumberRegex,
            level_physical_activity: physicalActivityRegex
        }
        
        for (const [key, regex] of Object.entries(validations)){
            if (data[key] && !regex.test(String(data[key]).trim())){
                throw new Error (`Invalid value for field ${key}`)
            };
        }

        const forbidenFields = ["user_id", "id", "created_at"];
        for (const field of forbidenFields){
            if (field in data ){
                throw new Error (`Cannot change the field ${field}`)
            }
        }

        const convertionNumber = ["age", "height", "weight", "target_wheight"];
        for (const convertion of convertionNumber){
            if (data.convertion) {
                data.convertion = parseFloat(data.convertion);
            }
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
        const {confirm} = req.body;
        const delRegex = /^Deletar$/;
        const check = await verifUser({id: id_login});

        if (!check){
            throw new Error ("User does not exist")
        }

        if (delRegex.test(String(confirm).trim())){
            
            const deletar = await deleteUser({id_login});
            res.status(200).json({message: "User deleted successfully!"})
        }else{throw new Error ("Confirmation necessary")}

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

        if(!mostrar){
            throw new Error ("no routine registered")
        }

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
        
        if (!validator.isEmail(email)){
            throw new Error ("Incorrect email format ")
        }

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