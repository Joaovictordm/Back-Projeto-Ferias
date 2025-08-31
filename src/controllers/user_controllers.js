import {createUser} from "../models/user_models.js";
import {getUserById} from "../models/user_models.js";
import { createDataUser } from "../models/user_models.js";
import { editDataUser } from "../models/user_models.js";
import { deleteUser } from "../models/user_models.js";
import { verifUser } from "../models/user_models.js";
import { getLogin } from "../models/user_models.js";
import { encryptPassword } from "../models/user_models.js";
import { comparePassword } from "../models/user_models.js";
import { generateToken } from "./jwt_controllers.js";
import { verifyToken } from "./jwt_controllers.js";
import validator from "validator";
import emojiRegex from "emoji-regex";



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
            return res.status(400).json("Empty field")
        }
         if (!validator.isEmail(data.email)){
            return res.status(406).json("Invalid email format")
         }
         if (!specialCharRegex.test(data.name)){
            return res.status(406).json("Invalid name format")
         }

         if (!validator.isStrongPassword(data.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
            
         })){
            return res.status(406),json("Password must be at least 8 characters long and include 1 lowercase, 1 uppercase, 1 number, and 1 symbol.")
         }
        const hash = await encryptPassword(data.password);
        const newUser = await createUser({name: data.name, email: data.email, password: hash});
        res.status(201).json({message: "User created successfully!"});
         
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Error creating user."});
    }

}
//create user data
export async function createDataUserController(req, res){
    try{
        const user_id = req.user.id;
        const data = req.body;
        const user = await verifUser({id: user_id});

        
        if (!user){
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
            return res.status(400).json("Empty field")
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
            
            if (!regex.test(data[field])){
                return res.status(400).json(`Field does not meet the expected standard ${field}`)
            }   
        }
        // const convertionNumber = ["age", "height", "weight", "target_weight"];
        // for (const convertion of convertionNumber){
        //     if (data[convertion]){
        //        data[convertion] =  parseFloat(data[convertion]);
        //     }
        // }
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
        const id = req.user.id;
        console.log(id)
        const data = await getUserById(id);
        console.log(data)
        if (!data){
            throw new Error ("User does not exist")
        }
        res.status(200).json(data)
        return user
    } catch(error){
        console.error(error.message);
        res.status(404).json({message: "User does not exist."})
    }
}

//update an information
export async function editDataUserController(req, res){
    try{
        const id = req.user.id;
        const user = await verifUser({id});
    
        //Verifica se é masculino ou feminino o que recebeu
        const sexoRegex = /^(Masculino|Feminino)$/i;
        //Verifica se é um númerio inteiro
        const idadeRegex = /^\d+$/;
        //verifica se é um numero com virgula ou ponto
         const floatNumberRegex = /^\d+\.\d+$/;
        //verifica se recebu ou baixo, modera ou alto
        const physicalActivityRegex = /^(baixo|moderado|alto)$/i;

        if(!user){
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
            if (data[key] && !regex.test(data[key])){
                return res.status(400).json(`Invalid value for field ${key}`)
            };
        }
        
        // const forbidenFields = ["user_id", "id", "created_at"];
        // for (const field of forbidenFields){
        //     if (field in data ){
        //         throw new Error (`Cannot change the field ${field}`)
        //     }
        // }
        
        // const convertionNumber = ["age", "height", "weight", "target_wheight"];
        // for (const convertion of convertionNumber){
            //     if (data[convertion]) {
                //         data[convertion] = parseFloat(data[convertion]);
                //     }
                // }
            const allowedColumns = ["sex", "age", "height", "weight", "target_weight", "level_physical_activity"];
            const update = {};

            for (const key of allowedColumns){
                if(data[key]){
                    update[key] = data[key]
                }
            }
            const editUser = await editDataUser({data: update, id: id}); 
            // const editUser = await editDataUser({data,id});
            res.status(200).json({message: "Data updated successfully!"})
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "Something went wrong."})
    }
}
//delete a user
export async function deleteUserController(req, res){
    try{
        const id_login = req.user.id;
        const data = req.body;
        const regex = /^Deletar$/;


        const user = await verifUser({id: id_login});
        if (!user){
            throw new Error ("User does not exist")
        }
        
        if(!regex.test(data.delete)){
            return res.status(401).json({message: "confirmation necessary"})
        }else{

            const deletar = await deleteUser({id_login});
            res.status(200).json({message: "User deleted successfully!"})          

        }

    }catch(error){
        console.error(error.message);
        res.status(500).json({message: "Could not delete user."})
    }
}


export async function loginController(req, res){
    try{

     const data = req.body;
     const user = await getLogin(data.email);
 
     if(!validator.isEmail(data.email)){
        return res.status(400).json("Email format incorrect")
     }
    
     if(!user){
        return res.status(400).json("Email or password incorrect")
     }else{
        const compare = await comparePassword(data.password, user.user_password);
        if(compare){
            const token = generateToken({id: user.id, role: "user"})
            return res.status(200).json({id: user.id, token});
        }else{
            return res.status(400).json("Email or password incorrect")
        }
     }
     
    }catch(error){
        console.log(error); 
    }
}
