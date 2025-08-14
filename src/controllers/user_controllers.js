import {createUser} from "../models/user_models.js";
import {getUserById} from "../models/user_models.js";
import { createDataUser } from "../models/user_models.js";
import { editDataUser } from "../models/user_models.js";
import { deleteUser } from "../models/user_models.js";
import { getRoutineById } from "../models/user_models.js";
import { verifUser } from "../models/user_models.js";
import { getLogin } from "../models/user_models.js";
import { encryptPassword } from "../models/user_models.js";
import { comparePassword } from "../models/user_models.js";
import validator from "validator";
import emojiRegex from "emoji-regex";
import bcrypt, { compare } from "bcrypt";


//create a user
export async function createUserController(req, res){
    try{
        const data = req.body;
        //isso é uma expressão regular, ela começa no / e termina no /. Essa diz que tem q ter pelo menos um ou mais campos desses. Se tiver algo diferente ele dá erro. 
        //o ^ significa que vai começar pelo começo da string e o & signiifca que vai terminar no final. O + significa que ele espera pelo menos um ou mais desses campos, se não tiver ou tiver algo diferente ele dá erro.
       const specialCharRegex = /^[A-Za-zÀ-ÿ\s']+$/;
        //Verifica se tem algum simbolo como setas etc
            //  const visualSymbolsRegex = /[\u2600-\u26FF\u2700-\u27BF\u2190-\u21FF\u2200-\u22FF\u2300-\u23FF\u25A0-\u25FF]/u;
        //Verifica se tem algum emote
            // const regexEmoji = emojiRegex();
        //Verifica se tem algum simbolo estranho
             // const forbiddenEmailSymbolsRegex = /[(){}[\]|!#$%^&*+=~`'";:/?<>\s\\,]/;


          if (!data.name || !data.email || !data.password){
            throw new Error ("Empty field")
        }
         if (!validator.isEmail(data.email)){
            throw new Error ("Invalid email format")
         }
         if (!specialCharRegex.test(data.name)){
            throw new Error ("invalid name")
         }

         if (!validator.isStrongPassword(data.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
            
         })){
            throw new Error ("Password must be at least 8 characters long and include 1 lowercase, 1 uppercase, 1 number, and 1 symbol.")
         }

         const hash = await encryptPassword(data.password);
         
        const newUser = await createUser({name: data.name, email: data.email, password: hash});
         
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
        const convertionNumber = ["age", "height", "weight", "target_weight"];
        for (const convertion of convertionNumber){
            if (data[convertion]){
               data[convertion] =  parseFloat(data[convertion]);
            }
        }
  

        const newData = await createDataUser({user_id: user_id, data});
        
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
            if (data[convertion]) {
                data[convertion] = parseFloat(data[convertion]);
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
        

        const check = await verifUser({id: id_login});

        if (!check){
            throw new Error ("User does not exist")
        }

        if (!confirm){
            throw new Error ("password incorrect")
        }else{

            const deletar = await deleteUser({id_login});
            res.status(200).json({message: "User deleted successfully!"})          
        }
    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Could not delete user."})
    }
}

//show the routines
export async function getRoutineByIdController(req, res){
    try{
        const id = req.params.id;
        const check = await verifUser({id});
        if (!check){
            throw new Error ("User does not exist")
        }
        const mostrar = await getRoutineById({id});

        if(!mostrar){
            throw new Error ("no routine registered")
        }

        res.status(200).json(mostrar);
    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Error fetching routine."});
    }
} 

export async function loginController(req, res){
    try{

     const {email, password} = req.body;
     const check = await getLogin({email});
     console.log(check)
     
     
     if(!check){
        throw new Error ("Email not founded")
     }
     const compare = await comparePassword(password, check);
    console.log(compare)
     if(compare){
        console.log("User confirmed");
        res.status(200).json({message: "confirmed"})
     }else{
        throw new Error ("Password incorrect")
     }
    
     
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Password or email incorrect "})
    }
}
